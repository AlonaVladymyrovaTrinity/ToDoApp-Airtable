import React from "react";
import AddNotes from "./AddNotes";
import Notes from "./Notes";
import style from "../css/NotesList.module.css";
import baseStyles from "../css/base.module.css";
import PropTypes from "prop-types";

const NotesList = ({
  notes,
  onHandleDeleteNote,
  onHandleAddNote,
  darkMode,
}) => {
  return (
    <div
      className={`${style["notes-list"]} ${baseStyles.ListItem} ${style.ListItem}`}
    >
      {notes.map((note) => (
        <Notes
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          onHandleDeleteNote={onHandleDeleteNote}
          darkMode={darkMode}
        />
      ))}
      <AddNotes onHandleAddNote={onHandleAddNote} darkMode={darkMode} />
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array,
  onHandleDeleteNote: PropTypes.func,
  onHandleAddNote: PropTypes.func,
  darkMode: PropTypes.bool,
};

export default NotesList;
