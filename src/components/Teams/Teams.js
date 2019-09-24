import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/teams.css";
import Paper from "@material-ui/core/Paper";

function Teams(props) {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://statsapi.mlb.com/api/v1/teams?sportId=1"
      );
      setTeamData(result.data.teams);
    };

    fetchData();
  }, []);

  if (!teamData) return <div data-testid="loading"> loading... </div>;

  return (
    <div className="teams-container">
      {teamData.map((d, i) => (
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
          />
          <h2 data-testid="team-name"> {d.name} </h2>
        </Paper>
      ))}
    </div>
  );
}

export default Teams;
