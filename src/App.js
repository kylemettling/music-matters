import Header from "./components/header.js";
import { Fragment } from "react";
// import Profile from './components/profile'
import Search from "./components/search";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TrackDetail } from "./components/TrackDetail.js";
import { Artist } from "./components/Artist.js";
import { Chordbook } from "./components/Chordbook.js";
import { PageWrapper } from "./state";
import "./App.css";
import { useScript } from "./components/hooks/useScript.js";
// import { SpotifyToken } from "./components/SpotifyToken.js";

function App() {
  useScript(
    '<script async type="text/javascript" src="https://www.scales-chords.com/api/scales-chords-api.js"></script>'
  );

  return (
    <PageWrapper>
      <Fragment>
        <Router>
          <Header />
          <Switch>
            <Route path="/track/:id">
              <TrackDetail />
            </Route>
            <Route path="/artist/:id">
              <Artist />
            </Route>
            <Route path="/">
              {/* <SpotifyToken /> */}
              <Search />
              <Chordbook />
            </Route>
          </Switch>
        </Router>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Yantramanav:wght@100&display=swap');
        </style>
      </Fragment>
    </PageWrapper>
  );
}

export default App;
