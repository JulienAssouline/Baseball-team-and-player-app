import React from 'react';
import '../css/player.css'
import TableData from "./TableData"

function PitcherStats(props) {
    const {data} = props
    
    const title = "Pitcher Stats";

    const pitcherData = data[0]

    console.log(pitcherData)

    let basicHeaders = ["season", "team", "wins", "losses", "era", "gamesPlayed", "gamesStarted", "saves", "inningsPitched", "hits", "runs", "earnedRuns", "homeRuns", "baseOnBalls", "strikeOuts", "whip"]
    let basicHeadersAbr = ["Season", "Team", "W", "L", "ERA", "G", "GS",  "SV", "IP", "H", "R", "ER", "HR", "BB", "SO", "WHIP"]

    return (
        <div className = "stats-container">
            <TableData data = {pitcherData} headers = {basicHeaders} headerAbr = {basicHeadersAbr} title = {title}  /> 
        </div>
    );
}

export default PitcherStats;
