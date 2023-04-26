// import React from "react";
import React, { useState, useEffect } from "react";
import StyledBackButton from "./StyledBackButton";
// import StyledSpinner from "./StyledSpinner";
import style from "../css/CreateNotes.module.css";
import baseStyles from "../css/base.module.css";
import NotesList from "./NotesList";
// import Toggle from "./Toggle"
import { nanoid } from "nanoid"; //??????


const DEFAULT_NOTES = [
    {
        id: nanoid(),
        text: "This is my First Note",
        date: "09/03/2022",
    },
    {
        id: nanoid(),
        text: "This is my Second Note",
        date: "12/03/2022",
    },
    {
        id: nanoid(),
        text: "This is my Third Note",
        date: "07/04/2022",
    },
];

const CreateNotes = () => {
    // const [darkMode, setDarkMode] = useState(false);
    const [notes, setNotes] = useState(DEFAULT_NOTES);

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
    useEffect(() => {
        const savedNotes = JSON.parse(
            localStorage.getItem("glassmorph-notes")
        );
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);

    // Save to local storage (stringify: convert text to strings)
    useEffect(() => {
        localStorage.setItem(
            "glassmorph-notes",
            JSON.stringify(notes)
        );
    }, [notes]);

  return (
    <>
    <div className={baseStyles.container}>
       {/* <div className={`${darkMode && style["dark-mode"]}`}> */}
        <StyledBackButton linkName={"/"} children>
          <span>My lists</span>
        </StyledBackButton>
        {/* <div className={style["create-notes"]}>
            <div className={style["create-notes-container"]}> */}
           
                {/* <div className={style["header"]}> */}
               <h1 className={`${baseStyles.header} ${style.header}`}>Notes</h1>
                {/* <Toggle handleToggleDarkMode={setDarkMode} /> */}
                {/* </div> */}
                
                    <NotesList
                        notes={notes}
                        onHandleDeleteNote={handleDeleteNote}
                        onHandleAddNote={handleAddNote}
                    />
            {/* </div>
        </div> */}

        {/* <p className={style["notes-paragraph"]}>Create Notes</p> */}
        {/* <span className={style["notes-span"]}>
          This page is currently under development. Please come back later.
        </span> */}
      {/* </div>  */}
      
      </div>
    </>
  );
};

export default CreateNotes;
