import React, { useState } from "react";
import { IconDotsCircleHorizontal } from "@tabler/icons-react";
import style from "../css/TodoListDropdown.module.css";
import baseStyles from "../css/base.module.css";
import SortingComponent from "./SortingComponent";
// import arrow from "../assets/arrow-downward.svg";
import arrowUpDown from "../assets/arrow-up-down.svg";
import StyledSpinner from "./StyledSpinner";
import PropTypes from "prop-types";

const TodoListDropdown = ({ todoList, setTodoList, isLoading }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
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
      <button className={style["dropdown-btn"]} onClick={toggleMenu}>
        <IconDotsCircleHorizontal />
        <span className={baseStyles["sr-only"]}>Dropdown menu</span>
      </button>
      {showMenu ? (
        <ul>
          <li>
            {/* <img className={style.arrow} src={arrow} alt="arrow downward" /> */}
            <label htmlFor="sortingOptions">
              <strong>Sort By</strong>
            </label>
            <img
              className={style["arrow-up-down"]}
              src={arrowUpDown}
              alt="arrow up down"
            />
          </li>
          {!isLoading ? (
            <>
              <SortingComponent todoList={todoList} setTodoList={setTodoList} />
            </>
          ) : (
            <>
              <li>
                <p>Loading...</p>
                <StyledSpinner className="small-spinner" />
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