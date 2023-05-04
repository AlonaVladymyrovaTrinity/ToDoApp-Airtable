import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "../css/AddTodoForm.module.css";
import baseStyles from "../css/base.module.css";
import { FaRegPlusSquare } from "react-icons/fa";
import PropTypes from "prop-types";
// Functional React component named AddTodoForm with prop: onAddTodo
const AddTodoForm = ({ onAddTodo, darkMode }) => {
  // State variable named todoTitle with default value of an empty String ("")
  const [todoTitle, setTodoTitle] = useState("");

  // Function named handleTitleChange with parameter event that does the following:
  // Set todoTitle to given value from event
  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  // Function named handleAddTodo with parameter event that does the following:
  const handleAddTodo = (event) => {
    //Prevent default event behavior (i.e. page refresh)
    event.preventDefault();
    if (todoTitle === "") {
      alert("Empty form submission! Please input title.");
    } else {
      // Invoke callback prop onAddTodo and pass todoTitle from state
      onAddTodo({ title: todoTitle });
      // Reset todoTitle value to an empty String ("")
      setTodoTitle("");
    }
  };

  return (
    //Form element with submit event handler listener that triggers a function handleAddTodo when the form is submitted.
    <form onSubmit={handleAddTodo}>
      <div className={baseStyles["input-with-button"]}>
        {/* InputWithLabel Component: input element with label. */}
        <InputWithLabel
          placeholder={"Add todo Title"}
          id={"todoTitle"}
          name={"title"}
          type={"text"}
          value={todoTitle}
          todoTitle={todoTitle}
          handleTitleChange={handleTitleChange}
          children
        >
          <strong className={darkMode ? style.title : baseStyles.title}>
            Title:
          </strong>
        </InputWithLabel>

        {/* Button element with type “submit”. Renders a button with a plus icon and a hidden "Add" text that submits a form when clicked. */}
        <button type={"submit"} className={style["add-button"]}>
          <FaRegPlusSquare />
          <span className={baseStyles["sr-only"]}>Add</span>
        </button>
      </div>
    </form>
  );
};

AddTodoForm.propTypes = { onAddTodo: PropTypes.func, darkMode: PropTypes.bool };

export default AddTodoForm;
