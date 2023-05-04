import React, { useState } from "react";
import { IconDotsCircleHorizontal } from "@tabler/icons-react";
import style from "../css/SortingDropdown.module.css";
import baseStyles from "../css/base.module.css";
import SortOptions from "./SortOptions";
import arrowUpDown from "../assets/arrow-up-down.svg";
import StyledSpinner from "./StyledSpinner";
import PropTypes from "prop-types";

// This is a component of dropdown sorting menu
const SortingDropdown = ({
  todoList,
  setTodoList,
  isLoading,
  storedIsChecked,
  storedSortingFieldName,
  darkMode,
}) => {
  //State variable "showMenu"  is declared and initialized to false valuse using the "useState" hook.
  //Function setShowMenu updates its value later in the component's lifecycle.
  const [showMenu, setShowMenu] = useState(false);

  //Function toggleMenu sets the state of showMenu to its opposite value each time it is called.
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={style.dropdown}>
      {/* This button toggles a dropdown menu when clicked. It includes an icon and an invisible 
     label for screen readers. If darkMode is true, it applies a dark mode style. */}
      <button
        className={`${darkMode && style["dark-mode"]} ${style["dropdown-btn"]}`}
        onClick={toggleMenu}
      >
        <IconDotsCircleHorizontal />
        <span className={baseStyles["sr-only"]}>Dropdown menu</span>
      </button>
      {showMenu ? (
        <ul className={style["show-menu"]}>
          {/* This code renders a list item containing a label "Sort By" and an arrow up-down image. 
          The "htmlFor" attribute connects the label to the input field with the "sortingOptions" id. */}
          <li>
            <label htmlFor="sortingOptions">
              <strong>Sort By</strong>
            </label>
            <img
              className={style["arrow-up-down"]}
              src={arrowUpDown}
              alt="arrow up down"
            />
          </li>
          {/* This is a conditional rendering of either a SortOptions component if isLoading is false, 
          or a loading message with a StyledSpinner component if isLoading is true. */}
          {!isLoading ? (
            <>
              {/* SortOptions component responsible for sorting selection for to-do list items based on criteria such as fild name and ascending or descending order. */}
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
                {/* Renders a styled spinner component that displays a spinner with smaller size based on the given class name 'small-spinner'.*/}
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
