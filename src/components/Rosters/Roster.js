import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/roster.css";
import Paper from "@material-ui/core/Paper";
import Errors from "../Errors";

function Roster(props) {
  const [rosterData, setRosterData] = useState(null);
  const [error, setError] = useState(false);

  const team = props.location.state.team;
  const teamID = props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://statsapi.mlb.com/api/v1/teams/${teamID}/roster`
        );
        setRosterData(result.data.roster);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [teamID]);

  if (!rosterData) return <div data-testid="loading"> loading... </div>;

  return (
    <div className="roster-page">
      <Errors error={error} />
      <h1> {team} </h1>
      <div className="roster-container">
        {rosterData.map(d => (
          <Paper
            key={d.person.id}
            onClick={() => {
              props.history.push({
                pathname: `/player${d.person.id}`,
                state: { position: d.position.name, teamID: teamID }
              });
            }}
            className="card-container"
          >
            <img
              className="player-image"
              src={`https://securea.mlb.com/mlb/images/players/head_shot/${d.person.id}.jpg`}
              alt={`${d.person.fullName}`}
            />
            <h3 data-testid="player-name"> {d.person.fullName} </h3>
            <p data-testid="player-position"> {d.position.name} </p>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default Roster;
