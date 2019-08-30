import React, {useRef, useEffect, useState} from 'react';
import '../css/player.css'
import { scaleLinear } from "d3-scale"
import { extent, max } from "d3-array"
import { axisLeft, axisBottom } from "d3-axis"
import { select, selectAll } from "d3-selection"
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { hittingLabels, hittingLabelsAbr} from "../utils/statsLabels"

function Chart(props) {
    const {data} = props
    const [selectedStat, setSelectedState] = useState({
        stat: "ops"
    })

    const ref = useRef(null)

    const w = 400
    const h = 300
    const rectWidth = 25

    let margin = {
        right: 40,
        left: 40,
        top: 0,
        bottom: 40
      }
  
    let width = w - margin.right - margin.left;
    let height = h - margin.top - margin.bottom;

    const hittingStats = data.stats[0].group.displayName === "hitting" ? data.stats[0] : data.stats[1]
    const fieldingStats = data.stats[0].group.displayName === "fielding" ? data.stats[0] : data.stats[1]

    const xScale = scaleLinear()
      .range([0, width])
    
    const yScale = scaleLinear()
        .range([height, 0])

    xScale.domain(extent(hittingStats.splits, d => d.season))
    yScale.domain([0, max(hittingStats.splits, d => Number(d.stat[selectedStat.stat]))])
    
  const yAxis = axisLeft()
    .scale(yScale)
    .tickSizeOuter(0)

 const xAxis = axisBottom()
      .scale(xScale)
      .tickSizeOuter(0)

    useEffect(() => {

        const years = hittingStats.splits.map(d => Number(d.season))

        const uniqYears = [...new Set(years)];

        selectAll("text").remove()

        select(ref.current)
            .append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis) 
        
        select(ref.current)
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(${rectWidth/2},${height})`)
            .call(xAxis)
            .selectAll("text")
                .text((d) => {
                    console.log(d)
                    if (uniqYears.includes(d)) {
                        return Math.round(d);
                    }
                })

    }, [selectedStat.stat])

    const handleChange = (event) => {
        setSelectedState(oldStat => ({
            ...oldStat,
            stat: event.target.value,
          }));
    }   

   const rects = hittingStats.splits.map((d,i) => (
        <rect key = {"rect" + i}
            x = { xScale(d.season) }
            y = { yScale(d.stat[selectedStat.stat]) }
            width = { rectWidth }
            height = { height - yScale(d.stat[selectedStat.stat]) }
            style = {{fill: "red"}}
        />

    ))

    return (
        <div className = "chart-container">
         <h3> <InputLabel htmlFor="age-native-simple">{}</InputLabel>
            <Select
            native
            value={selectedStat.stat}
            onChange={handleChange}
            inputProps={{
                stat: selectedStat.stat,
                id: 'age-native-simple',
            }}
            >
                <option value={0}> {selectedStat.stat.toUpperCase()} </option>
                {
                    hittingLabels.map((d,i) =>(
                        <option key = {i} value={d}> {d} </option>
                    ))
                }
            </Select> per Season </h3>
            <svg width = {w} height = {h}>
                <g ref={ref} transform={`translate(${margin.left},${margin.top})`}>
                    { rects }
                </g>
            </svg>
        </div>
    );
}

export default Chart;
