import React, { useState } from "react";
// import React, { useState, useCallback, useRef } from "react";
import { sortingBy } from "./SortingBy";
import style from "../css/SortingComponent.module.css";

const SortingComponent = ({
  setTodoList,
  todoList,
  storedIsChecked,
  storedSortingFieldName,
}) => {
  const [isChecked, setIsChecked] = useState(
    storedIsChecked !== null ? JSON.parse(storedIsChecked) : false
  );
  const [sortingFieldName, setSortingFieldName] = useState(
    storedSortingFieldName !== null ? storedSortingFieldName : "createdTime"
  );

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
    localStorage.setItem("isChecked", JSON.stringify(!isChecked)); // Save to local storage

    // sortedListRef.current = sortingBy(
    const sortedList = sortingBy(
      !isChecked ? "asc" : "desc",
      sortingFieldName,
      todoList
    );
    setTodoList(sortedList);
  };

  // useEffect(() => {
  //   const storedIsChecked = JSON.parse(localStorage.getItem("isChecked"));
  //   if (storedIsChecked !== null) {
  //     setIsChecked(storedIsChecked);
  //   }
  // }, []);

  const handleSelectChange = (event) => {
    const selectedFieldName = event.target.value;
    setSortingFieldName(selectedFieldName);
    localStorage.setItem("sortingFieldName", selectedFieldName); // Save to local storage
    // sortedListRef.current = sortingBy(
    const sortedList = sortingBy(
      isChecked ? "asc" : "desc",
      selectedFieldName,
      todoList
    );
    setTodoList(sortedList);
    // setTodoList(sortedListRef.current);
  };

  // useEffect(() => {
  //   const storedSelectedFieldName = localStorage.getItem("sortingFieldName");
  //   if (storedSelectedFieldName !== null) {
  //     setSortingFieldName(storedSelectedFieldName);
  //   }
  // }, []);

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
