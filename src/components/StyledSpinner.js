import React from "react";
import styled from "styled-components";
import spinnerSvg from "../assets/Spinner.svg";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => (
  <SpinnerWrapper>
    <img src={spinnerSvg} alt="spinner" />
  </SpinnerWrapper>
);

export default Spinner;
