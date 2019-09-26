import React, { useContext } from "react";
import "../../css/teams.css";
import { Paper } from "@material-ui/core";
import Errors from "../Errors";
import { TeamsContext } from "../../context";

function Teams(props) {
  const [teamData, error] = useContext(TeamsContext);

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
