import React from "react";
import style from "../css/CreateNotes.module.css";
import baseStyles from "../css/base.module.css";

const CreateNotes = () => {
  return (
    <>
      <div className={baseStyles.container}>
        <h1 className={baseStyles.header}>Create Notes</h1>
        <p className={style["notes-paragraph"]}>Create Notes</p>
      </div>
    </>
  );
};

export default CreateNotes;
