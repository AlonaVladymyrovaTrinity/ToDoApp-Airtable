import React, { useState, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import CustomTodoLists from "./CustomTodoLists";
import { getBaseSchema, createNewTable } from "./TodoApi";
import { FaRegPlusSquare } from "react-icons/fa";
import style from "../css/CreateCustomTodoList.module.css";
import baseStyles from "../css/base.module.css";
import StyledToggle from "./StyledToggle";

const CreateCustomTodoList = () => {
  //State variable 'newListName' is declared and initialized with an empty string using useState hook.
  const [newListName, setNewListName] = useState("");
  //State variable 'customTodoLists' is declared and initialized with an empty array using useState hook.
  const [customTodoLists, setCustomTodoLists] = useState([]);
  //State variable "isListsLoading"  is declared and initialized to true valuse using the "useState" hook.
  const [isListsLoading, setIsListsLoading] = useState(true);

  //Retrieves the dark mode setting from local storage and initializes a state variable with its value if it exists,
  //otherwise it sets it to false value.
  const storedIDarkMode = localStorage.getItem("DarkMode");
  const [darkMode, setDarkMode] = useState(
    storedIDarkMode !== null ? JSON.parse(storedIDarkMode) : false
  );

  useEffect(() => {
    getBaseSchema(setCustomTodoLists, setIsListsLoading);
  }, []);

  //Function that updates the state of anewListName with the value of an event target.
  const handleListNameChange = (event) => {
    let newTodoListName = event.target.value;
    setNewListName(newTodoListName);
  };
  //Function handles the submission of a new todo list name. It's checking if the input is empty
  //and alerting the user if so, otherwise creating a new table(new todo list) and updating the state variables to an empty string.
  const handleAddNewTodoList = (event) => {
    event.preventDefault();
    if (newListName === "") {
      alert("Empty form submission! Please input new todo list name.");
    } else {
      createNewTable(
        newListName,
        setIsListsLoading,
        setCustomTodoLists,
        customTodoLists
      );
      setNewListName("");
    }
  };

  return (
    <>
      <div
        className={`${darkMode && style["dark-mode"]} ${baseStyles.container}`}
      >
        <div className={baseStyles["header-wrapper"]}>
          <h1 className={`${baseStyles.header} ${style.header}`}>
            Create new List:
          </h1>
          {/* Renders a custom StyledToggle component that allows the user to toggle the darkMode state variable. */}
          <StyledToggle setDarkMode={setDarkMode} darkMode={darkMode} />
        </div>
        {/* Form element with submit event listener that triggers a function handleAddNewTodoList when the form is submitted.*/}
        <form onSubmit={handleAddNewTodoList}>
          <div className={baseStyles["input-with-button"]}>
            {/* Custom component: input element with label. */}
            <InputWithLabel
              todoTitle={"createTodoList"}
              placeholder={"Enter new todo list name"}
              id={"createTodoList"}
              name={"createTodoList"}
              type={"text"}
              value={newListName}
              handleTitleChange={handleListNameChange}
              children
            >
              <strong className={darkMode ? style.title : baseStyles.title}>
                List:
              </strong>
            </InputWithLabel>
            {/* Renders a button with a plus icon and a hidden "Add New List" text that submits a form when clicked. */}
            <button type={"submit"} className={style["create-list-button"]}>
              <FaRegPlusSquare />
              <span className={baseStyles["sr-only"]}>Add New List</span>
            </button>
          </div>
        </form>
        {/* This code is rendering a text message indicating the number of to-do lists the user has, by accessing the 
       length of the customTodoLists array and using conditional rendering to properly pluralize the word "to-do list" when necessary. */}
        <span className={baseStyles["pending-tasks"]}>
          You have{" "}
          <span className={baseStyles["pending-num"]}>
            {customTodoLists.length}
          </span>{" "}
          to-do list{customTodoLists.length === 1 ? "" : "s"}:
        </span>
        {/* Rendering a component CustomTodoLists with props passed to it. */}
        <CustomTodoLists
          customTodoLists={customTodoLists}
          isListsLoading={isListsLoading}
        />
      </div>
    </>
  );
};
export default CreateCustomTodoList;
