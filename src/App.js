import React from "react";
import "./css/App.css";
import Teams from "./components/Teams/Teams";
import Roster from "./components/Rosters/Roster";
import Player from "./components/Players/Player";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { TeamsProvider } from "./context";

function App() {
  return (
    <TeamsProvider>
      <div className="App">
        <Router>
          <Route path="/" exact component={Teams} />
          <Route path="/team:id" exact component={Roster} />
          <Route path="/player:id" exact component={Player} />
        </Router>
      </div>
    </TeamsProvider>
  );
}

export default App;
