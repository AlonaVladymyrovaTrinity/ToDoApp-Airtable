import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import CustomTodoLists from "./CustomTodoLists";
// import { getBaseSchema } from "./TodoApi";
import style from "./TodoListItem.module.css";

const CreateCustomTodoList = ({ createNewTable }) => {
  const [newListName, setNewListName] = useState("");

  const handleListNameChange = (event) => {
    let newTodoListName = event.target.value;
    setNewListName(newTodoListName);
  };
  const handleAddNewTodoList = (event) => {
    event.preventDefault();

    if (newListName === "") {
      alert("Empty form submission! Please input new todo list name.");
    } else {
      createNewTable(newListName);
      console.log(newListName);
      setNewListName("");
      console.log(newListName);
    }
  };

  return (
    <>
      <div className={style.container}>
        <form onSubmit={handleAddNewTodoList}>
          <div className={style["input-with-button"]}>
            <InputWithLabel
              title={"createTodoList"}
              placeholder={"Enter new todo list name"}
              id={"createTodoList"}
              name={"createTodoList"}
              type={"text"}
              value={newListName}
              onChange={handleListNameChange}
              children
            >
              <strong className={style.title}>Todo list name: </strong>
            </InputWithLabel>
            <button type={"submit"} className={style.createListButton}>
              Create New List
              <span className={style["sr-only"]}>Create New List</span>
            </button>
          </div>
          <CustomTodoLists />
          {/* <button onClick={getBaseSchema} className={style.createListButton}>
            Get Base Schema
          </button> */}
        </form>
      </div>
    </>
  );
};
export default CreateCustomTodoList;
