import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import style from "../css/Notes.module.css";


const Notes = ({ id, text, date, onHandleDeleteNote }) => {
  return (
    <div className={style["notes glassmorph"]}>
      <div className={style["notes-text"]}>{text}</div>
      <div className={style["notes-footer"]}>
        <small className={style["notes-footer-date"]}>{date}</small>
        <FontAwesomeIcon icon={faTrashAlt} onClick={() => onHandleDeleteNote(id)} className={style["notes-footer-icon"]}/>
      </div>
    </div>
  );
};

export default Notes;
