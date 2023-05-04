import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { RiSunFill } from "react-icons/ri";
import PropTypes from "prop-types";

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
//This is functional styled 'StyledToggle' component in the shape of toggle button to switch dark mod
const StyledToggle = ({ setDarkMode, darkMode }) => {
  //Function handleToggleClick toggles the value of the darkMode state and saves the new value to local storage
  //using the setItem() method.
  const handleToggleClick = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("DarkMode", JSON.stringify(!darkMode)); // Save to local storage
  };

  return (
    <>
      {/* This code renders a set of icons and a toggle switch button for dark mode, where the icons change color 
    based on the current theme (light/dark) and the toggle switch handles a state change for the dark mode. */}
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
          />
          <Label htmlFor="switch">Dark mode toggle</Label>
        </ToggleWrapper>
        <RiSunFill className={darkMode ? "black-icon" : "white-icon"} />
      </IconsWrapper>
    </>
  );
};
StyledToggle.propTypes = {
  setDarkMode: PropTypes.func,
  darkMode: PropTypes.bool,
};

export default StyledToggle;
