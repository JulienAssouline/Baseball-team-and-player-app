import React from 'react';
import TableData from "./TableData"
import { pitchingLabels, pitchingLabelsAbr } from "../../../utils/statsLabels"

function PitcherStats(props) {
    const {data} = props
    
    const title = "Pitcher Stats";

    const pitcherData = data[0]

    return (
        <div className = "stats-container">
            <TableData data = {pitcherData} headers = {pitchingLabels} headerAbr = {pitchingLabelsAbr} title = {title}  /> 
        </div>
    );
}

export default PitcherStats;
