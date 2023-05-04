import React, { useState } from "react";
import style from "../css/AddNotes.module.css";
import PropTypes from "prop-types";

const AddNotes = ({ onHandleAddNote, darkMode }) => {
  //Initializes a state variable noteText to an empty string.
  //Function setNoteText updates its value later in the component's lifecycle.
  const [noteText, setNoteText] = useState("");

  //Sets a characterLimit to 200. Function handleChange updates the noteText
  //state variable only if the length of the input text is less than or equal to the characterLimit.
  const characterLimit = 200;
  const handleChange = (ev) => {
    if (characterLimit - ev.target.value.length >= 0) {
      setNoteText(ev.target.value);
    }
  };
  //Function handleAddNote adds a new note to the list by passing the noteText as a parameter to the
  //onHandleAddNote callback function, then resets the noteText state variable to an empty string.
  const handleAddNote = () => {
    if (noteText.trim().length > 0) {
      onHandleAddNote(noteText);
    }
    setNoteText("");
  };

  return (
    // Conditionally applying a CSS class dark-mode to the div element based on the darkMode state variable
    <div className={`${darkMode && style["dark-mode"]}`}>
      <div className={`${style.addNotes} ${style.glassmorph}`}>
        {/* Textarea element for adding notes */}
        <textarea
          className={style["addNotes-text"]}
          cols="10"
          rows="6"
          placeholder="Add Your Notes..."
          value={noteText}
          onChange={handleChange}
        ></textarea>
        <div className={style["addNotes-footer"]}>
          {/* Renders a character limit count of the remaining number of characters that can be typed into the textarea. */}
          <small className={style["addNotes-footer-chars"]}>
            {characterLimit - noteText.length} remaining
          </small>
          {/* Renders a button that calls the handleAddNote function when clicked, allowing the user to add a new note. */}
          <button
            onClick={handleAddNote}
            className={`${style.glassmorph} ${style.button} ${style["addNotes-footer-btn"]}`}
          >
            <span>Add Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};
AddNotes.propTypes = {
  onHandleAddNote: PropTypes.func,
  darkMode: PropTypes.bool,
};

export default AddNotes;
