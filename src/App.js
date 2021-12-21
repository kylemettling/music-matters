import Header from "./components/header.js";
import { Fragment } from "react";
import Profile from "./components/profile";
import Search from "./components/search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Track } from "./components/Track.js";
import { Artist } from "./components/Artist.js";
import { Chordbook } from "./components/Chordbook.js";
import "./App.css";
// import { SpotifyToken } from "./components/SpotifyToken.js";

function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route path="/track/:id">
            <Track />
          </Route>
          <Route path="/artist/:id">
            <Artist />
          </Route>
          <Route path="/">
            {/* <SpotifyToken /> */}
            <Search />
            {/* <Chordbook /> */}
          </Route>
        </Switch>
      </Router>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Yantramanav:wght@100&display=swap');
      </style>
    </Fragment>
  );
}

export default App;
