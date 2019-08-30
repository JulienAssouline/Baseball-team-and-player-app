import React, {useState, useEffect} from 'react';
import axios from "axios"
import '../css/roster.css'
import Paper from '@material-ui/core/Paper';

function Roster(props) {
    const [rosterData, setRosterData] = useState([])

    const team = props.location.state.team

    useEffect(() => {

        const teamID = props.match.params.id

        const fetchData = async () => {
            const result = await axios(`https://statsapi.mlb.com/api/v1/teams/${teamID}/roster`)
            setRosterData(result.data.roster)
        }

        fetchData()

    }, [])

    return (
        <div className = "roster-page">
            <h1> {team} </h1>
            <div className="roster-container">
                {
                rosterData.map((d,i) => (
                    <Paper key = {d.person.id}
                        onClick = {() => {
                            console.log(d)
                            props.history.push({
                                pathname: `/player${d.person.id}`,
                                state: { position: d.position.name }
                            })
                        }}
                        className = "card-container">
                        <img className = "player-image" src = {`https://securea.mlb.com/mlb/images/players/head_shot/${d.person.id}.jpg`} alt="Italian Trulli"/>
                        <h3> {d.person.fullName} </h3>
                        <p> {d.position.name} </p>
                    </Paper>
                )) 
                }
            </div>
        </div>
    );
}

export default Roster;
