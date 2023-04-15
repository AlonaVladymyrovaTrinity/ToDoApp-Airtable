import React, { useState, useEffect } from "react";
import style from "../css/CustomTodoListsItems.module.css";
import baseStyles from "../css/base.module.css";
import { Link } from "react-router-dom";
import { getTodoList } from "./TodoApi";
import PropTypes from "prop-types";
import arrow from "../assets/arrow-forward.svg";
// import Spinner from "./Spinner";

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
              <Link
                to={`/todolist/${customTodo.name}`}
                className={`${baseStyles.list} ${style["table-names-list"]}`}
              >
                <li className={`${style["table-list-element"]}`}>
                  {customTodo.name}
                  <img
                    className={style.arrow}
                    src={arrow}
                    alt="arrow forward"
                  />
                </li>
              </Link>
              <span className={baseStyles["pending-tasks"]}>
                <span className={baseStyles["pending-num"]}>
                  {todoList.length}
                </span>{" "}
                task
                {todoList.length === 1 ? "" : "s"}
              </span>
            </>
          ) : (
            <>
              <li className={baseStyles.list}>
                <Link
                  to={`/todolist/${customTodo.name}`}
                  className={style["table-names-list"]}
                >
                  {customTodo.name}
                </Link>
              </li>
              <span className={baseStyles["pending-tasks"]}>
                No tasks to display
              </span>
            </>
          )}
        </>
      )}
      {/* {isLoading && (
        <>
          <Spinner />
          <p>Loading tasks...</p>
        </>
      )} */}
    </>
  );
};

CustomTodoListsItems.propTypes = {
  customTodo: PropTypes.object,
};

export default CustomTodoListsItems;
