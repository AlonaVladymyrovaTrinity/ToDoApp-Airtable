import React, { useState } from "react";
import style from "../css/PageNotFound.module.css";
import baseStyles from "../css/base.module.css";
import StyledBackButton from "./StyledBackButton";
import imgPageNotFound from "../images/404-error.jpg";
import StyledToggle from "./StyledToggle";

function PageNotFound() {
  //This code initializes state variable "darkMode" to a boolean value that is retrieved from local storage
  //and parsed as JSON, or false value if the stored value does not exist.
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
      {/* Renders a custom StyledBackButton component with a link to the home page, 
        styled with a color based on the darkMode state variable. */}
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
        {/* Renders a custom StyledToggle component that allows the user to toggle the darkMode state variable. */}
        <StyledToggle setDarkMode={setDarkMode} darkMode={darkMode} />
      </div>
      <div
        className={`${baseStyles.ListItem} ${style.ListItem} ${style["not-found-wrapper"]}`}
      >
        <div>
          {/* Header with error message "The requested page does not exist." and an image of a 404 Error to indicate 
        that the requested page could not be found. */}
          <h2>The requested page does not exist.</h2>
          <img
            className={style["img-page-not-found"]}
            src={imgPageNotFound}
            alt="Page not found"
          />
          {/* Renders a custom StyledBackButton component with a link to the home page, 
             styled by default with a className "link-color" color, and text "Go back to home" 
             which passed to the component as a child */}
          <StyledBackButton
            linkName={"/"}
            children
            className={"link-color"}
            darkMode={true}
          >
            <span>Go back to home</span>
          </StyledBackButton>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
