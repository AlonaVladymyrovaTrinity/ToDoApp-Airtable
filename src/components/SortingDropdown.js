import React, { useState } from "react";
import { IconDotsCircleHorizontal } from "@tabler/icons-react";
import style from "../css/SortingDropdown.module.css";
import baseStyles from "../css/base.module.css";
import SortOptions from "./SortOptions";
// import arrow from "../assets/arrow-downward.svg";
import arrowUpDown from "../assets/arrow-up-down.svg";
import StyledSpinner from "./StyledSpinner";
import PropTypes from "prop-types";

const SortingDropdown = ({
  todoList,
  setTodoList,
  isLoading,
  storedIsChecked,
  storedSortingFieldName,
  darkMode,
}) => {
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
      <button
        className={`${darkMode && style["dark-mode"]} ${style["dropdown-btn"]}`}
        onClick={toggleMenu}
      >
        <IconDotsCircleHorizontal />
        <span className={baseStyles["sr-only"]}>Dropdown menu</span>
      </button>
      {showMenu ? (
        <ul className={style["show-menu"]}>
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
              <SortOptions
                todoList={todoList}
                setTodoList={setTodoList}
                storedIsChecked={storedIsChecked}
                storedSortingFieldName={storedSortingFieldName}
              />
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

SortingDropdown.propTypes = {
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
  isLoading: PropTypes.bool,
  storedIsChecked: PropTypes.string,
  storedSortingFieldName: PropTypes.string,
  darkMode: PropTypes.bool,
};
export default SortingDropdown;
