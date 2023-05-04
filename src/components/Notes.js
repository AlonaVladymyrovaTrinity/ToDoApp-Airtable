import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import style from "../css/Notes.module.css";
import baseStyles from "../css/base.module.css";
import PropTypes from "prop-types";

const Notes = ({ id, text, date, onHandleDeleteNote, darkMode }) => {
  return (
    // <div
    //   className={
    //     darkMode
    //       ? `${style.glassmorph} ${style.notes} ${style["dark-mode"]}`
    //       : `${style.glassmorph} ${style.notes}`
    //   }
    // >
    <div className={`${darkMode && style["dark-mode"]}`}>
      <div className={`${style.glassmorph} ${style.notes}`}>
        <div className={style["notes-text"]}>{text}</div>
        <div className={style["notes-footer"]}>
          <small className={style["notes-footer-date"]}>{date}</small>
          <button
            className={style["delete-button"]}
            onClick={() => onHandleDeleteNote(id)}
            type="button"
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              className={style["notes-footer-icon"]}
            />
            <span className={baseStyles["sr-only"]}>Delete Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Notes.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  onHandleDeleteNote: PropTypes.func,
  darkMode: PropTypes.bool,
};
export default Notes;
