import React, { useState } from "react";
// import React, { useState, useCallback, useRef } from "react";
import { sortingBy } from "./SortingBy";
import style from "../css/SortingComponent.module.css";

const SortingComponent = ({ setTodoList, todoList }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [sortingFieldName, setSortingFieldName] = useState("createdTime");

  // const sortedListRef = useRef([]);

  const options = {
    // "": "--Select sort criteria--",
    createdTime: "Created Time",
    Title: "Title",
    done: "Done",
  };

  // const sortingBy = useCallback(
  // sortingBy function...
  //, [todoList]
  // );

  // console.log(
  //   sortingFieldName,
  //   isChecked,
  //   sortingBy(!isChecked ? "asc" : "desc", sortingFieldName, todoList)
  // );

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    // sortedListRef.current = sortingBy(
    const sortedList = sortingBy(
      !isChecked ? "asc" : "desc",
      sortingFieldName,
      todoList
    );
    setTodoList(sortedList);
  };

  const handleSelectChange = (event) => {
    const selectedFieldName = event.target.value;
    setSortingFieldName(selectedFieldName);
    // sortedListRef.current = sortingBy(
    const sortedList = sortingBy(
      isChecked ? "asc" : "desc",
      selectedFieldName,
      todoList
    );
    setTodoList(sortedList);
    // setTodoList(sortedListRef.current);
  };

  return (
    <div>
      {Array.isArray(todoList) && todoList.length > 0 ? (
        <>
          <li>
            <select
              id="sortingOptions"
              name="sortingOptions"
              className={style["select-option"]}
              disabled={!Array.isArray(todoList) || todoList.length === 0}
              onChange={handleSelectChange}
              value={sortingFieldName}
            >
              {" "}
              {/* <option value="">--Select sort criteria--</option> */}
              {Object.entries(options).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
              {/* <option value="createdTime">Created Time</option>
        <option value="Title">Title</option>
        <option value="done">Done</option> */}
            </select>
          </li>
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
            <label className={style["input-label"]} htmlFor="sorting-order">
              {sortingFieldName === "createdTime"
                ? `Default (${options[sortingFieldName]}): `
                : `${options[sortingFieldName]}: `}
              {sortingFieldName === "createdTime"
                ? isChecked
                  ? "Oldest First"
                  : "Newest First"
                : isChecked
                ? "Ascending (A-to-Z)"
                : "Descending (Z-to-A)"}
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

export default SortingComponent;
