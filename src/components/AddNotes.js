import React, { useState } from "react";
import style from "../css/AddNotes.module.css"

const AddNotes = ({ onHandleAddNote }) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleChange = (ev) => {
    if (characterLimit - ev.target.value.length >= 0) {
      setNoteText(ev.target.value);
    }
  };

  const handleAddNote = () => {
    if (noteText.trim().length > 0) {
      onHandleAddNote(noteText);
    }
    setNoteText("");
  };

  return (
    <div className={`${style.addNotes} ${style.glassmorph}`}>
      <textarea
        className={style["addNotes-text"]}
        cols="10"
        rows="6"
        placeholder="Add Your Notes..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className={style["addNotes-footer"]}>
        <small className={style["addNotes-footer-chars"]}>
          {characterLimit - noteText.length} remaining
        </small>
        <button
          onClick={handleAddNote}
          className={`${style.glassmorph} ${style.button} ${style["addNotes-footer-btn"]}`}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default AddNotes;
