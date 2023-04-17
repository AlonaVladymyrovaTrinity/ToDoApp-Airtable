import React from "react";
import StyledBackButton from "./StyledBackButton";
import StyledSpinner from "./StyledSpinner";
import style from "../css/CreateNotes.module.css";
import baseStyles from "../css/base.module.css";

const CreateNotes = () => {
  return (
    <>
      <div className={baseStyles.container}>
        <StyledBackButton linkName={"/"} children>
          <span>My lists</span>
        </StyledBackButton>
        <h1 className={`${baseStyles.header} ${style.header}`}>Create Notes</h1>
        <p className={style["notes-paragraph"]}>Create Notes</p>
        <span className={style["notes-span"]}>
          This page is currently under development. Please come back later.
        </span>
        <StyledSpinner />
      </div>
    </>
  );
};

export default CreateNotes;
