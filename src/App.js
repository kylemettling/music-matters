import Header from "./components/header.js";
import { Fragment } from "react";
import Profile from "./components/profile";
import Search from "./components/search";
import "./App.css";

function App() {
  return (
    <Fragment>
      <Header />
      <Search />
      {/* <Results data={result} /> */}
      {/* <Profile /> */}
    </Fragment>
  );
}

export default App;
