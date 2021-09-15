import logo from "../logo.svg";
import "./header.css";
import React from "react";

export default function Header() {
  return (
    <React.Fragment>
      <div className="headerCon">
        <header className="header">
          <div className="leftHeader"></div>
          <img src={logo} className="logo" alt="logo" />
          <div className="rightHeader"></div>
        </header>
      </div>
    </React.Fragment>
  );
}
