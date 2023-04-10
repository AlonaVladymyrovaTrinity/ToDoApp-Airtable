import React, { useState, useEffect } from "react";
import { getBaseSchema } from "./TodoApi";
import style from "./TodoListItem.module.css";

const CustomTodoLists = () => {
  const [customTodoLists, setCustomTodoLists] = useState([]);
  const [isListsLoading, setIsListsLoading] = useState(true);
  console.log("customTodoLists" + customTodoLists);

  useEffect(() => {
    getBaseSchema(setCustomTodoLists, setIsListsLoading);
  }, []);

  return (
    <ul className={style.ListItem}>
      {customTodoLists?.map(function (customTodo) {
        return (
          <>
            <div className={style["list-with-button"]}>
              {isListsLoading ? (
                <p>Loading!</p>
              ) : (
                <li key={customTodo.id} className={style.list}>
                  <div className={style.title}>{customTodo.name}</div>
                </li>
              )}
            </div>
          </>
        );
      })}
    </ul>
  );
};

export default CustomTodoLists;
