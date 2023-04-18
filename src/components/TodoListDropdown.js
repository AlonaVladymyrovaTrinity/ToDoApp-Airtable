import React, { useState } from "react";
import { IconDotsCircleHorizontal } from "@tabler/icons-react";
import style from "../css/TodoListDropdown.module.css";
import baseStyles from "../css/base.module.css";
import Sorting from "./Sorting";
import arrow from "../assets/arrow-forward.svg";
import PropTypes from "prop-types";

const TodoListDropdown = ({ todoList, setTodoList, isLoading }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuOpenClose = () => {
    setShowMenu(!showMenu);
  };

  // const getCreatedTime = (todoList) => {
  //   if (Array.isArray(todoList) && todoList.length > 0) {
  //     return Object.keys(todoList[0])[1];
  //   } else {
  //     return "createdTime";
  //   }
  // };
  // const getTitle = (todoList) => {
  //   if (Array.isArray(todoList) && todoList.length > 0) {
  //     return Object.keys(todoList[0].fields)[1];
  //   } else {
  //     return "Title";
  //   }
  // };
  // const getDone = (todoList) => {
  //   if (Array.isArray(todoList) && todoList.length > 0) {
  //     return Object.keys(todoList[0].fields)[0];
  //   } else {
  //     return "Title";
  //   }
  // };

  return (
    <div className={style.dropdown}>
      <button className={style["dropdown-btn"]} onClick={menuOpenClose}>
        <IconDotsCircleHorizontal />
        <span className={baseStyles["sr-only"]}>Dropdown menu</span>
      </button>
      {showMenu ? (
        <ul>
          <li>
            <img className={style.arrow} src={arrow} alt="go forward arrow" />
            <strong>Sort By</strong>
          </li>
          {!isLoading ? (
            <>
              <li>
                <Sorting
                  todoList={todoList}
                  setTodoList={setTodoList}
                  fieldName="createdTime"
                />
              </li>
              <li>
                <Sorting
                  todoList={todoList}
                  setTodoList={setTodoList}
                  fieldName="Title"
                />
              </li>
              <li>
                <Sorting
                  todoList={todoList}
                  setTodoList={setTodoList}
                  fieldName="done"
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <p>Loading...</p>
              </li>
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
};
TodoListDropdown.propTypes = {
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default TodoListDropdown;
