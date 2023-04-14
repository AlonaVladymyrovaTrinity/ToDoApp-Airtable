import React, { useState, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import CustomTodoLists from "./CustomTodoLists";
import { getBaseSchema, createNewTable } from "./TodoApi";
import style from "../css/TodoListItem.module.css";
import { FaRegPlusSquare } from "react-icons/fa";

const CreateCustomTodoList = () => {
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
        <h1 className={style.header}>
          {/*<FontAwesomeIcon icon={faClipboardList} /> */}Create new List:
        </h1>
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
            <button type={"submit"} className={style["create-list-button"]}>
              <FaRegPlusSquare />
              <span className={style["sr-only"]}>Add New List</span>
            </button>
          </div>
        </form>
        <span className={style["pending-tasks"]}>
          You have{" "}
          <span className={style["pending-num"]}>{customTodoLists.length}</span>{" "}
          to-do list{customTodoLists.length === 1 ? "" : "s"}:
        </span>
        <CustomTodoLists
          customTodoLists={customTodoLists}
          isListsLoading={isListsLoading}
        />
      </div>
    </>
  );
};
export default CreateCustomTodoList;
