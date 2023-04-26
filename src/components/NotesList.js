import React from "react";
import AddNotes from "./AddNotes";
import Notes from "./Notes";
import style from "../css/NotesList.module.css";
import baseStyles from "../css/base.module.css";

const NotesList = ({ notes, onHandleDeleteNote, onHandleAddNote }) => {
  return (
    <div className={`${style["notes-list"]} ${baseStyles.ListItem} ${style.ListItem}`}>
      {notes.map((note) => (
        <Notes
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          onHandleDeleteNote={onHandleDeleteNote}
        />
      ))}
      <AddNotes onHandleAddNote={onHandleAddNote} />
    </div>
  );
};

export default NotesList;