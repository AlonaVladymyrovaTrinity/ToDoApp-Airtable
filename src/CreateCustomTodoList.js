import React, { useState, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import CustomTodoLists from "./CustomTodoLists";
import { getBaseSchema } from "./TodoApi";
import style from "./TodoListItem.module.css";

const CreateCustomTodoList = ({ createNewTable }) => {
  const [newListName, setNewListName] = useState("");
  const [customTodoLists, setCustomTodoLists] = useState([]);
  const [isListsLoading, setIsListsLoading] = useState(true);

  useEffect(() => {
    getBaseSchema(setCustomTodoLists, setIsListsLoading);
  }, []);

  const handleListNameChange = (event) => {
    let newTodoListName = event.target.value;
    setNewListName(newTodoListName);
  };
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
          <CustomTodoLists
            customTodoLists={customTodoLists}
            isListsLoading={isListsLoading}
          />
        </form>
      </div>
    </>
  );
};
export default CreateCustomTodoList;
