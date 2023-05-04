import React, { useState } from "react";
import style from "../css/PageNotFound.module.css";
import baseStyles from "../css/base.module.css";
import StyledBackButton from "./StyledBackButton";
import imgPageNotFound from "../images/404-error.jpg";
import StyledToggle from "./StyledToggle";
// import { Link } from "react-router-dom";

function PageNotFound() {
  const storedIDarkMode = localStorage.getItem("DarkMode");
  const [darkMode, setDarkMode] = useState(
    storedIDarkMode !== null ? JSON.parse(storedIDarkMode) : false
  );
  return (
    <div
      className={`${darkMode && style["dark-mode"]} 
      ${baseStyles.container} 
      ${style.container}`}
    >
      <StyledBackButton
        linkName={"/"}
        children
        className={darkMode ? "link-color" : ""}
        darkMode={darkMode}
      >
        <span>My lists</span>
      </StyledBackButton>
      <div className={baseStyles["header-wrapper"]}>
        <h1 className={`${style.header} ${baseStyles.header}`}>
          Page not found
        </h1>
        <StyledToggle setDarkMode={setDarkMode} darkMode={darkMode} />
      </div>
      <div
        className={`${baseStyles.ListItem} ${style.ListItem} ${style["not-found-wrapper"]}`}
      >
        <div>
          <h2>The requested page does not exist.</h2>
          <img
            className={style["img-page-not-found"]}
            src={imgPageNotFound}
            alt="Page not found"
          />
          <StyledBackButton
            linkName={"/"}
            children
            className={"link-color"}
            // className={darkMode ? "link-color" : ""}
            darkMode={true}
          >
            <span>Go back to home</span>
          </StyledBackButton>
          {/* <Link to="/">Go back to home</Link> */}
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
