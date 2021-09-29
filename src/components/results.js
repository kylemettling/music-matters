// import logo from "../logo.svg";
// import "./header.css";
import React, { useState } from "react";

export default function Results({ searchData }) {
  //   const API_KEY = process.env.REACT_APP_API_KEY;
  // searchData = JSON.stringify(searchData.data) || searchData;
  // console.log(searchData);

  // const [results, setResult] = useState("No Artists");
  //   let data;
  //   const data = [2, 2];

  return (
    <React.Fragment>
      <div className="resultCon">
        <span>{searchData || "No search made."}</span>
      </div>
    </React.Fragment>
  );
}
