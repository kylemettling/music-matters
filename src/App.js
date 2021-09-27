import Header from "./components/header.js";
import { Fragment, useEffect, useState } from "react";
import Profile from "./components/profile";
import Search from "./components/search";
import Results from "./components/results";

function App() {
  const [searchData, setSearchData] = useState("");
  const [results, setResults] = useState("No Results");
  // const [data, setData] = useState("No Data");
  const data = [1, 2, 3, 4, 5];

  // function onDataChange(data) {
  //   setData(data);
  // }

  return (
    <Fragment>
      <Header />
      <Search setResults={setResults} />
      <Results data={results} />
      <Profile />
    </Fragment>
  );
}

export default App;
