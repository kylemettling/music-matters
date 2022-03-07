import logo from "../logo.svg";
import "./header.css";
import "./style.css";
import React, { useState } from "react";
import { MdOutlinePalette } from "react-icons/md";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { BackButton } from "./BackButton";

export default function Header({ includeBackButton = true }) {
  const [themeToggle, setThemeToggle] = useState(false);
  const history = useHistory();

  function handleThemeToggle(e) {
    !themeToggle
      ? e.target.classList.add("themeSelectForward")
      : e.target.classList.remove("themeSelectForward");
    !themeToggle
      ? e.target.classList.remove("themeSelectBackward")
      : e.target.classList.add("themeSelectBackward");
    !themeToggle
      ? document.body.classList.remove("dark")
      : document.body.classList.add("dark");
    setThemeToggle(!themeToggle);
  }

  useEffect(() => {
    // console.log(themeToggle)
  }, [themeToggle]);

  return (
    <React.Fragment>
      <header>
        <Link to="/">
          {/* <div className='leftHeader'></div> */}
          <img src={logo} className="logo" alt="logo" />
          {/* <div className='rightHeader'></div> */}
        </Link>
      </header>
      <div className="settings">
        <MdOutlinePalette
          className="themeSelect flex"
          onClick={(e) => handleThemeToggle(e)}
        />
        {includeBackButton && <BackButton />}
      </div>
    </React.Fragment>
  );
}
