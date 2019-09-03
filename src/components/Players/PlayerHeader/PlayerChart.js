import React from 'react';
import Chart from "./Chart"
import { hittingLabels, hittingLabelsAbr } from "../../../utils/statsLabels"

function PlayerChart(props) {
    const {data} = props

    const hittingStats = data[0].group.displayName === "hitting" ? data[0] : data[1]
    
    // remove Team and Season from dropdown options
  const hittingLabelsFiltered = hittingLabels.slice(2, hittingLabels.length)
  const hittingLabelsAbrFiltered = hittingLabelsAbr.slice(2,hittingLabelsAbr.length)

    return (
        <div className = "stats-container">
            <Chart data = {hittingStats} labels = {hittingLabelsFiltered} labelsAbr = {hittingLabelsAbrFiltered} /> 
        </div>
    );
}

export default PlayerChart;
