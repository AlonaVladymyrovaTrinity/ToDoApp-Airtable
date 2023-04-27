// import React from "react";
import React, { useState, useEffect } from "react";
import StyledBackButton from "./StyledBackButton";
// import StyledSpinner from "./StyledSpinner";
import style from "../css/CreateNotes.module.css";

import baseStyles from "../css/base.module.css";
import NotesList from "./NotesList";
import Toggle from "./Toggle";
import { nanoid } from "nanoid";

const CreateNotes = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  // Save to local storage (stringify: converts to strings)
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Adding notes
  const handleAddNote = (newNote) => {
    const date = new Date();
    const addToNotes = {
      id: nanoid(),
      text: newNote,
      date: date.toLocaleDateString(),
    };

    const allNotes = [...notes, addToNotes];

    setNotes(allNotes);
  };

  // Delete Note

  const handleDeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  // Retrieve data from local storage (parse: convert from string to json)
  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem("notes"));
  //   if (savedNotes) {
  //     setNotes(savedNotes);
  //   }
  // }, []);

  return (
    <>
      {/* <div className={`${darkMode && style["dark-mode"]}`}> */}
      <div
        className={`${darkMode && style["dark-mode"]} ${baseStyles.container}`}
      >
        <StyledBackButton linkName={"/"} children>
          <span>My lists</span>
        </StyledBackButton>
        {/* <div className={style["create-notes"]}>
            <div className={style["create-notes-container"]}> */}

        {/* <div className={style["header"]}> */}
        <h1 className={`${baseStyles.header} ${style.header}`}>Notes</h1>
        <Toggle handleToggleDarkMode={setDarkMode} />
        {/* </div> */}
        <NotesList
          notes={notes}
          onHandleDeleteNote={handleDeleteNote}
          onHandleAddNote={handleAddNote}
          darkMode={darkMode}
        />
        {/* </div>
        </div> */}

        {/* <p className={style["notes-paragraph"]}>Create Notes</p> */}
        {/* <span className={style["notes-span"]}>
          This page is currently under development. Please come back later.
        </span> */}
      </div>
      {/* </div> */}
    </>
  );
};

export default CreateNotes;
