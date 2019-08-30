import React from 'react';
import './css/App.css'
import Teams from "./components/Teams"
import Roster from "./components/Roster"
import Player from "./components/Player"
import { BrowserRouter as Router, Route } from 'react-router-dom'



function App() {
  return (
      <div className="App">
        <Router>
          <Route path='/' exact component={Teams} />
          <Route path = "/team:id" exact component = {Roster}/>
          <Route path = "/player:id" exact component = {Player} /> 
        </Router>
      </div>

  );
}

export default App;
