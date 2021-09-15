// import logo from "../logo.svg";
// import "./header.css";
import React from "react";

export default function Header() {
  return (
    <React.Fragment>
      <div className="searchCon">
        <input className="searchInput" type="text" />
        <button className="searchButton" type="submit"></button>
      </div>
    </React.Fragment>
  );
}
