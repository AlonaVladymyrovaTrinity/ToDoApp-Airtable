import React from "react";
import styled from "styled-components";
import BackButtonSvg from "../assets/arrow-back.svg";
import { Link } from "react-router-dom";

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: left;
  margin: 10px 0 0 15px;
`;
const GoBackImg = styled.img`
  align-items: center;
  width: 35px;
  height: 40px;
`;
const BackLink = styled(Link)`
  text-decoration: none;
  color: #2f2f2f;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledGoBackButton = ({ linkName, children }) => (
  <BackLink to={`${linkName}`}>
    <BackButtonWrapper>
      <GoBackImg src={BackButtonSvg} alt="go back button image" />
      {children}
    </BackButtonWrapper>
  </BackLink>
);

export default StyledGoBackButton;
