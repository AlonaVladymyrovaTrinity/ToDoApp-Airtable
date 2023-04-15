import React from "react";
import InputWithLabel from "./InputWithLabel";
import style from "../css/AddTodoForm.module.css";
import baseStyles from "../css/base.module.css";

import { FaRegPlusSquare } from "react-icons/fa";
import PropTypes from "prop-types";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = React.useState("");

  const handleTitleChange = (event) => {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (todoTitle === "") {
      alert("Empty form submission! Please input title.");
    } else {
      // onAddTodo({ title: todoTitle, id: Date.now() });
      onAddTodo({ title: todoTitle });

      // console.log(todoTitle);
      setTodoTitle("");
    }
  };
  return (
    <form onSubmit={handleAddTodo}>
      <div className={baseStyles["input-with-button"]}>
        <InputWithLabel
          title={"todoTitle"}
          placeholder={"Add todo Title"}
          id={"todoTitle"}
          name={"title"}
          type={"text"}
          value={todoTitle}
          todoTitle={todoTitle}
          onChange={handleTitleChange}
          children
        >
          <strong className={baseStyles.title}>Title: </strong>
        </InputWithLabel>
        <button type={"submit"} className={style["add-button"]}>
          <FaRegPlusSquare />
          <span className={baseStyles["sr-only"]}>Add</span>
        </button>
      </div>
    </form>
  );
};

AddTodoForm.propTypes = { onAddTodo: PropTypes.func };

export default AddTodoForm;
