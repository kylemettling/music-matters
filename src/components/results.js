// import logo from "../logo.svg";
// import "./header.css";
import React, { useState } from "react";

export default function Results({ set }) {
  //   const API_KEY = process.env.REACT_APP_API_KEY;

  //   console.log(API_KEY);

  const [results, setResults] = useState("No Artists");
  //   let data;
  //   const data = [2, 2];

  return (
    <React.Fragment>
      <div className="searchCon">
        <table>
          <h4>Results</h4>
          <tr>
            <th>Name</th>
            {/* <th>2</th>
            <th>3</th> */}
          </tr>
          <tr>
            {/* <td>One</td>
            <td>Two</td> */}
            <td>{results}</td>
            <td>{data}</td>
          </tr>
        </table>
      </div>
    </React.Fragment>
  );
}
