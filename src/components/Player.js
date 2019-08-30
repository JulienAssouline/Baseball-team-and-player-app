import React, {useState, useEffect} from 'react';
import axios from "axios"
import '../css/player.css'
import PlayerBio from "./PlayerBio"
import PlayerStats from "./PlayerStats"
import PitcherStats from "./PitcherStats"
import PlayerChart from "./PlayerChart"
import PitcherChart from "./PitcherChart"
import Paper from '@material-ui/core/Paper';




function Player(props) {
    const [playerData, setPlayerData] = useState([])
    
    let playerID = props.match.params.id
    const position = props.location.state.position


    useEffect(() => {

       let URL = position === "Pitcher" ? 
            `https://statsapi.mlb.com/api/v1/people/${playerID}?hydrate=stats(group=[pitching],type=[yearByYear])`
            : `https://statsapi.mlb.com/api/v1/people/${playerID}?hydrate=stats(group=[hitting,fielding],type=[yearByYear])`

        const fetchData = async () => {
            const result = await axios(URL)
            setPlayerData(result.data.people)
        }

        fetchData()

    }, [playerID])

    if (playerData[0] === undefined) return <div>loading...</div>

    return (
        <div className = "player-page">
            <Paper className = "header container">
                <PlayerBio data = {playerData[0]} />
                {position === "Pitcher" ? <PitcherChart data = {playerData[0].stats} /> : <PlayerChart data = {playerData[0].stats} />
                }
            </Paper>
            {
                position === "Pitcher" ? 
                    <PitcherStats data = {playerData[0].stats} />
                    : <PlayerStats data = {playerData[0].stats} />
            }
        </div>
    );
}

export default Player;
