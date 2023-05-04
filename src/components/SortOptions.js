import React, { useState } from "react";
// import React, { useState, useCallback, useRef } from "react";
import { sortingBy } from "./SortingBy";
import style from "../css/SortOptions.module.css";
import PropTypes from "prop-types";

/* SortOptions component responsible for sorting selection for to-do list items based on criteria such as fild name and ascending or descending order. */
const SortOptions = ({
  setTodoList,
  todoList,
  storedIsChecked,
  storedSortingFieldName,
}) => {
  //State variable isChecked which is initialized to the value of the storedIsChecked variable if it is not null,
  //or to false value if it is null, and provides a function setIsChecked to update its value.
  const [isChecked, setIsChecked] = useState(
    storedIsChecked !== null ? JSON.parse(storedIsChecked) : false
  );

  //State variable sortingFieldName which is initialized to the value of the storedSortingFieldName variable if it is not null,
  //or to "createdTime" value if it is null, and provides a function setSortingFieldName to update its value.
  const [sortingFieldName, setSortingFieldName] = useState(
    storedSortingFieldName !== null ? storedSortingFieldName : "createdTime"
  );

  const options = {
    createdTime: "Created Time",
    Title: "Title",
    done: "Done",
  };

  //Function handleCheckboxChange updates a state variable representing a checkbox, saves the checkbox value to local storage,
  //sorts a list based on the checkbox value and a selected field name(using sortingBy function),
  //and updates the state variable representing the sorted list.
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    localStorage.setItem("isAscending", JSON.stringify(!isChecked)); // Save to local storage

    const sortedList = sortingBy(
      !isChecked ? "asc" : "desc",
      sortingFieldName,
      todoList
    );
    setTodoList(sortedList);
  };

  //Function handleSelectChange updates the sorting field name based on the user's selection from a dropdown menu,
  //saves it to local storage, and re-sorts the todo list(using sortingBy function) according to the new field name.
  const handleSelectChange = (event) => {
    const selectedFieldName = event.target.value;
    setSortingFieldName(selectedFieldName);
    localStorage.setItem("sortingFieldName", selectedFieldName); // Save to local storage
    const sortedList = sortingBy(
      isChecked ? "asc" : "desc",
      selectedFieldName,
      todoList
    );
    setTodoList(sortedList);
  };

  return (
    <div>
      <li>
        <select
          id="sortingOptions"
          name="sortingOptions"
          className={style["select-option"]}
          disabled={!Array.isArray(todoList) || todoList.length === 0}
          onChange={handleSelectChange}
          value={sortingFieldName}
        >
          {Object.entries(options).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </li>
      {Array.isArray(todoList) && todoList.length > 0 ? (
        <>
          <li>
            <input
              className={style["input-checkbox"]}
              type="checkbox"
              id="sorting-order"
              name="sorting-order"
              value=""
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="sorting-order" className={style["input-label"]}>
              {sortingFieldName === "createdTime"
                ? `Default (${options[sortingFieldName]}): `
                : `${options[sortingFieldName]}: `}
              {sortingFieldName === "createdTime"
                ? isChecked
                  ? "Oldest First"
                  : "Newest First"
                : isChecked
                ? "Ascending"
                : "Descending"}
            </label>
          </li>
        </>
      ) : (
        <>
          <li>
            <span>nothing to sort</span>
          </li>
        </>
      )}
    </div>
  );
};

SortOptions.propTypes = {
  setTodoList: PropTypes.func,
  todoList: PropTypes.array,
  storedIsChecked: PropTypes.string,
  storedSortingFieldName: PropTypes.string,
};

export default SortOptions;
