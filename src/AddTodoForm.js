import React from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import { FaRegPlusSquare } from "react-icons/fa";

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
      <div className={style["input-with-button"]}>
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
          <strong className={style.title}>Title: </strong>
        </InputWithLabel>
        <button type={"submit"} className={style["add-button"]}>
          <FaRegPlusSquare />
          <span className={style["sr-only"]}>Add</span>
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
