import React, {useRef, useEffect, useState} from 'react';
import '../css/player.css'
import { scaleLinear } from "d3-scale"
import { extent, max } from "d3-array"
import { axisLeft, axisBottom } from "d3-axis"
import { select, selectAll } from "d3-selection"
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

function Chart(props) {
    const {data, labels, labelsAbr} = props
    const [selectedStat, setSelectedState] = useState({
        stat: data.group.displayName === "pitching" ? "era" : "ops",
    })

    console.log(data.splits)

    const ref = useRef(null)

    const w = 400
    const h = 300
    const rectWidth = 25

    let margin = {
        right: 40,
        left: 40,
        top: 10,
        bottom: 40
      }
  
    let width = w - margin.right - margin.left;
    let height = h - margin.top - margin.bottom;

    // const hittingStats = data.stats[0].group.displayName === "hitting" ? data.stats[0] : data.stats[1]
    // const fieldingStats = data.stats[0].group.displayName === "fielding" ? data.stats[0] : data.stats[1]

    const xScale = scaleLinear()
      .range([0, width])
    
    const yScale = scaleLinear()
        .range([height, 0])

    xScale.domain(extent(data.splits, d => d.season))
    yScale.domain([0, max(data.splits, d => Number(d.stat[selectedStat.stat]))])
    
  const yAxis = axisLeft()
    .scale(yScale)
    .ticks(6)
    .tickSizeOuter(0)

 const xAxis = axisBottom()
      .scale(xScale)
      .ticks(6)
      .tickSizeOuter(0)

    useEffect(() => {

        const years = data.splits.map(d => Number(d.season))

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
                    if (uniqYears.includes(d)) {
                        return Math.round(d);
                    }
                })

    }, [selectedStat.stat, data.splits,xAxis, yAxis, height])

    const handleChange = (event) => {
       const value = event.target.value
        setSelectedState(oldStat => ({
            ...oldStat,
            stat: value,
          }));
    }   

   const rects = data.splits.map((d,i) => (
        <rect key = {"rect" + i}
            x = { xScale(d.season) }
            y = { yScale(d.stat[selectedStat.stat]) }
            width = { rectWidth }
            height = { height - yScale(d.stat[selectedStat.stat]) }
            style = {{fill: "#131953"}}
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
                {
                    labels.map((d,i) =>(
                        <option key = {i} value={d}> {labelsAbr[i]} </option>
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
