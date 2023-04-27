import React from "react";
import style from "../css/Toggle.module.css";

const Toggle = ({ handleToggleDarkMode }) => {
  return (
    // <div class="toggle-container">
    <div>
      <input
        type="checkbox"
        id="switch"
        name="theme"
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
        className={style["toggle-input"]}
      />
      <label htmlFor="switch" className={style["toggle-label"]}>
        Toggle
      </label>
    </div>
  );
};

export default Toggle;
