import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/teams.css";
import { Paper } from "@material-ui/core";
import Errors from "../Errors";

function Teams(props) {
  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          "https://statsapi.mlb.com/api/v1/teams?sportId=1"
        );
        setTeamData(result.data.teams);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (!teamData) return <div data-testid="loading"> loading... </div>;

  return (
    <>
      <Errors error={error} />
      <div className="teams-container">
        {teamData.map(d => (
          <Paper
            onClick={() => {
              props.history.push({
                pathname: `/team${d.id}`,
                state: { team: d.name }
              });
            }}
            key={d.id}
            className="card-container"
          >
            <img
              className="team-image"
              src={`https://www.mlbstatic.com/team-logos/${d.id}.svg`}
              alt={`${d.name}`}
              data-testid="image-test"
            />
            <h2 data-testid="team-name"> {d.name} </h2>
          </Paper>
        ))}
      </div>
    </>
  );
}

export default Teams;
