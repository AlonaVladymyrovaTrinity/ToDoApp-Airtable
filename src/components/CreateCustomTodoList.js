import React, { useState, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import CustomTodoLists from "./CustomTodoLists";
import { getBaseSchema, createNewTable } from "./TodoApi";
import { FaRegPlusSquare } from "react-icons/fa";
import style from "../css/CreateCustomTodoList.module.css";
import baseStyles from "../css/base.module.css";

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
        customTodoLists,
      );
      setNewListName("");
    }
  };

  return (
    <>
      <div className={baseStyles.container}>
        <h1 className={`${baseStyles.header} ${style.header}`}>
          {/*<FontAwesomeIcon icon={faClipboardList} /> */}Create new List:
        </h1>
        <form onSubmit={handleAddNewTodoList}>
          <div className={baseStyles["input-with-button"]}>
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
              <strong className={baseStyles.title}>List: </strong>
            </InputWithLabel>
            <button type={"submit"} className={style["create-list-button"]}>
              <FaRegPlusSquare />
              <span className={baseStyles["sr-only"]}>Add New List</span>
            </button>
          </div>
        </form>
        <span className={baseStyles["pending-tasks"]}>
          You have{" "}
          <span className={baseStyles["pending-num"]}>
            {customTodoLists.length}
          </span>{" "}
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
