import React, { useState, useEffect } from "react";
import style from "../css/TodoListItem.module.css";
import { Link } from "react-router-dom";
import { getTodoList } from "./TodoApi";
import PropTypes from "prop-types";

const CustomTodoListsItems = ({ customTodo }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodoList(setTodoList, setIsLoading, customTodo.name);
  }, [customTodo.name]);

  return (
    <>
      {!isLoading && (
        <>
          {todoList ? (
            <>
              <li className={style.list}>
                <Link
                  to={`/todolist/${customTodo.name}`}
                  // className={style.link}
                >
                  {customTodo.name}
                </Link>
              </li>
              <span className={style["pending-tasks"]}>
                <span className={style["pending-num"]}>{todoList.length}</span>{" "}
                task
                {todoList.length === 1 ? "" : "s"}
              </span>
            </>
          ) : (
            <>
              <li className={style.list}>
                <Link
                  to={`/todolist/${customTodo.name}`}
                  // className={style.link}
                >
                  {customTodo.name}
                </Link>
              </li>
              <span className={style["pending-tasks"]}>
                No tasks to display
              </span>
            </>
          )}
        </>
      )}
      {/* {isLoading && <p>Loading tasks...</p>} */}
    </>
  );
};

CustomTodoListsItems.propTypes = {
  customTodo: PropTypes.object,
};

export default CustomTodoListsItems;
