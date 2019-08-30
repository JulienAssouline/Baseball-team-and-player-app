import React from 'react';
import '../css/player.css'
import Chart from "./Chart"
import { hittingLabels, hittingLabelsAbr, fieldingLabels, fieldingLabelsAbr} from "../utils/statsLabels"

function PlayerChart(props) {
    const {data} = props

    const hittingStats = data[0].group.displayName === "hitting" ? data[0] : data[1]
    // const fieldingStats = data[0].group.displayName === "fielding" ? data[0] : data[1]
    
    // remove Team and Season from dropdown options
    hittingLabels.splice(0, 2)
    hittingLabelsAbr.splice(0,2)

    return (
        <div className = "stats-container">
            <Chart data = {hittingStats} labels = {hittingLabels} labelsAbr = {hittingLabelsAbr} /> 
        </div>
    );
}

export default PlayerChart;
