import React from "react";
// import style from "../css/Toggle.module.css";
import styled from "styled-components";

const ToggleWrapper = styled.div`
  align-items: center;
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
    background: grey;
  }

  ${Input}:checked + &:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  &:active::after {
    width: 45px;
  }
`;

const StyledToggle = ({ handleToggleDarkMode }) => {
  return (
    // <div class="toggle-container">
    <ToggleWrapper>
      <Input
        type="checkbox"
        id="switch"
        name="theme"
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
        // className={style["toggle-input"]}
      />
      {/* <label htmlFor="switch" className={style["toggle-label"]}> */}
      <Label htmlFor="switch">Toggle</Label>
    </ToggleWrapper>
  );
};

export default StyledToggle;
