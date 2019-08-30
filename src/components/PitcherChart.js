import React from 'react';
import '../css/player.css'
import Chart from "./Chart"
import { pitchingLabels, pitchingLabelsAbr } from "../utils/statsLabels"

function PlayerChart(props) {
    const {data} = props

    const pitchingStats = data[0]
    
    // remove Team and Season from dropdown options
    pitchingLabels.splice(0, 2)
    pitchingLabelsAbr.splice(0,2)

    return (
        <div className = "stats-container">
            <Chart data = {pitchingStats} labels = {pitchingLabels} labelsAbr = {pitchingLabelsAbr} /> 
        </div>
    );
}

export default PlayerChart;
