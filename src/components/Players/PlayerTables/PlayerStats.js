import React from 'react'
import TableData from "./TableData"
import { hittingLabels, hittingLabelsAbr, fieldingLabels, fieldingLabelsAbr} from "../../../utils/statsLabels"

function PlayerStats(props) {
    const {data} = props

    const hittingTitle = "Hitting Stats"
    const fieldingTitle = "Fielding Stats"

    if(data === undefined) return <div> No Data :(</div>

    const hittingStats = data[0].group.displayName === "hitting" ? data[0] : data[1]
    const fieldingStats = data[0].group.displayName === "fielding" ? data[0] : data[1]



    return (
        <div className = "stats-container">
            <TableData data = {hittingStats} headers = {hittingLabels} headerAbr = {hittingLabelsAbr} title = {hittingTitle}  /> 
            <TableData data = {fieldingStats} headers = {fieldingLabels} headerAbr = {fieldingLabelsAbr} title = {fieldingTitle} />
        </div>
    );
}

export default PlayerStats;
