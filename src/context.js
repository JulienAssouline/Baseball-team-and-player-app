import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const TeamsContext = createContext();

export const TeamsProvider = props => {
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

  return (
    <TeamsContext.Provider value={[teamData, error]}>
      {props.children}
    </TeamsContext.Provider>
  );
};
