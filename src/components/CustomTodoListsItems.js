import React, { useState, useEffect } from "react";
import style from "../css/CustomTodoListsItems.module.css";
import baseStyles from "../css/base.module.css";
import { Link } from "react-router-dom";
import { getTodoList } from "./TodoApi";
import PropTypes from "prop-types";
import arrow from "../assets/arrow-forward.svg";

const CustomTodoListsItems = ({ customTodo }) => {
  //State variable 'customTodoLists' is declared and initialized with an empty array using useState hook.
  const [todoList, setTodoList] = useState([]);
  //State variable "isListsLoading"  is declared and initialized to true valuse using the "useState" hook.
  const [isLoading, setIsLoading] = useState(true);

  //This useEffect hook triggers a function getTodoList to get a list of custom todo lists when mounted and whenever customTodo.name is changing.
  useEffect(() => {
    getTodoList(setTodoList, setIsLoading, customTodo.name);
  }, [customTodo.name]);

  return (
    <>
      {!isLoading && (
        <>
          {todoList ? (
            <>
              {/* Clickable link to a specific to-do list with its name and with an arrow image. */}
              <Link
                to={`/todolist/${customTodo.name}`}
                className={`${baseStyles.list} ${style.list} ${style["table-names-list"]}`}
              >
                <li className={`${style["table-list-element"]}`}>
                  {customTodo.name}
                  <img
                    className={style.arrow}
                    src={arrow}
                    alt="go forward arrow"
                  />
                </li>
              </Link>
              {/* Displays the number of tasks in a to-do list, with the displayed number and the word 
              "task" or "tasks" adjusted depending on whether the number is singular or plural. */}
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
              <li className={`${baseStyles.list} ${style.list}`}>
                {/* Link to a specific to-do list with its name, but without an arrow image. */}
                <Link
                  to={`/todolist/${customTodo.name}`}
                  className={style["table-names-list"]}
                >
                  {customTodo.name}
                </Link>
              </li>
              {/* Renders a text message "No tasks to display" in a span element. */}
              <span className={baseStyles["pending-tasks"]}>
                No tasks to display
              </span>
            </>
          )}
        </>
      )}
    </>
  );
};

CustomTodoListsItems.propTypes = {
  customTodo: PropTypes.object,
};

export default CustomTodoListsItems;
