import React from "react";
// import style from "../css/Toggle.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { RiSunFill } from "react-icons/ri";

const ToggleWrapper = styled.div`
  align-items: center;
  margin: 0 5px 0 5px;
  @media (max-width: 280px) {
    transform: scale(0.7);
  }
`;
const IconsWrapper = styled.div`
  align-items: center;
  display: flex;
  align-items: center;
  @media (max-width: 280px) {
    transform: scale(0.7);
  }
  .black-icon {
    color: black;
  }

  .white-icon {
    color: white;
  }
`;

const Input = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 52px;
  height: 27px;
  background: grey;
  float: right;
  border-radius: 100px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  ${Input}:checked + & {
    background: #fe83a1;
  }

  ${Input}:checked + &:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
  &:active::after {
    width: 45px;
  }
`;

const StyledToggle = ({ setDarkMode, darkMode }) => {
  const handleToggleClick = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("DarkMode", JSON.stringify(!darkMode)); // Save to local storage
  };

  return (
    <>
      {/* // <div class="toggle-container"> */}
      <IconsWrapper>
        <FontAwesomeIcon
          icon={faMoon}
          className={darkMode ? "black-icon" : "white-icon"}
        />
        <ToggleWrapper>
          <Input
            type="checkbox"
            id="switch"
            name="theme"
            onChange={handleToggleClick}
            checked={darkMode}
            // className={style["toggle-input"]}
          />
          {/* <label htmlFor="switch" className={style["toggle-label"]}> */}
          <Label htmlFor="switch">Dark mode toggle</Label>
        </ToggleWrapper>
        <RiSunFill className={darkMode ? "black-icon" : "white-icon"} />
      </IconsWrapper>
    </>
  );
};

export default StyledToggle;
