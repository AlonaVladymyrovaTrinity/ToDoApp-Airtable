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
      {/*This code maps over an array of "notes" objects, and for each "note" it renders a component called "Notes" 
      passing in its "id", "text", "date", "onHandleDeleteNote", and "darkMode" as props. */}
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
      {/* This code renders the AddNotes component, which allows users to add a new note, and passes 
      the onHandleAddNote and darkMode props to it.*/}
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
