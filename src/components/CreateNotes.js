import React, { useState, useEffect } from "react";
import StyledBackButton from "./StyledBackButton";
import style from "../css/CreateNotes.module.css";
import baseStyles from "../css/base.module.css";
import NotesList from "./NotesList";
import StyledToggle from "./StyledToggle";
import { nanoid } from "nanoid";

const CreateNotes = () => {
  //This code initializes state variable "darkMode" to a boolean value that is retrieved from local storage
  //and parsed as JSON, or false value if the stored value does not exist.
  const storedIDarkMode = localStorage.getItem("DarkMode");
  const [darkMode, setDarkMode] = useState(
    storedIDarkMode !== null ? JSON.parse(storedIDarkMode) : false
  );
  //Initializes state variable "notes" to an array that is retrieved from
  //local storage and parsed as JSON, or an empty array if the parsing fails or the "notes" key does not exist.
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  //Usesing the useEffect hook to save the notes array as a JSON string in the browser's localStorage
  //whenever notes is updated.
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  //Adding notes
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

  return (
    <>
      <div
        className={`${darkMode && style["dark-mode"]} ${baseStyles.container}`}
      >
        {/* Renders a custom StyledBackButton component with a link to the home page, 
      styled with a color based on the darkMode state variable. */}
        <StyledBackButton
          linkName={"/"}
          children
          className={darkMode ? "link-color" : ""}
          darkMode={darkMode}
        >
          <span>My lists</span>
        </StyledBackButton>
        <div className={baseStyles["header-wrapper"]}>
          <h1 className={`${style.header} ${baseStyles.header}`}>Notes</h1>
          {/* Renders a custom StyledToggle component that allows the user to toggle the darkMode state variable. */}
          <StyledToggle setDarkMode={setDarkMode} darkMode={darkMode} />
        </div>
        {/* Rendering a component NotesList with props passed to it. */}
        <NotesList
          notes={notes}
          onHandleDeleteNote={handleDeleteNote}
          onHandleAddNote={handleAddNote}
          darkMode={darkMode}
        />
      </div>
    </>
  );
};

export default CreateNotes;
