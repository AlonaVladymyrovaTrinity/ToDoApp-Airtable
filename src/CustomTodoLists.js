import React from "react";
import style from "./TodoListItem.module.css";

const CustomTodoLists = ({ customTodoLists, isListsLoading }) => {
  return (
    <>
      {isListsLoading ? (
        <p>Loading!</p>
      ) : (
        <ul className={style.ListItem}>
          {customTodoLists?.map(function (customTodo) {
            return (
              <React.Fragment key={customTodo.id}>
                <div className={style["list-with-button"]}>
                  <li className={style.list}>
                    <div className={style.title}>{customTodo.name}</div>
                  </li>
                </div>
              </React.Fragment>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CustomTodoLists;
