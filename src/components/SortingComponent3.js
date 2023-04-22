import React, { useState, useCallback, useRef } from "react";
import style from "../css/SortingComponent.module.css";

const SortingComponent = ({ setTodoList, todoList, fieldName, optionName }) => {
  const [isChecked, setIsChecked] = useState(false);
  const sortedListRef = useRef([]);

  const sortingBy = useCallback(
    (order) => {
      const sortedTodoList = [...todoList];
      sortedTodoList.sort((objectA, objectB) => {
        const valA =
          fieldName === "createdTime"
            ? objectA[fieldName]
            : objectA.fields[fieldName];
        const valB =
          fieldName === "createdTime"
            ? objectB[fieldName]
            : objectB.fields[fieldName];
        if (order === "asc") {
          return valA < valB ? -1 : valA > valB ? 1 : 0;
        } else {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
      });
      return sortedTodoList;
    },
    [todoList, fieldName]
  );

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // sort the todo list every time isChecked or fieldName changes
  sortedListRef.current = sortingBy(isChecked ? "asc" : "desc");
  setTodoList(sortedListRef.current);

  return (
    <div>
      {Array.isArray(todoList) && todoList.length > 0 ? (
        <>
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
            {optionName}:{" "}
            {fieldName === "createdTime"
              ? isChecked
                ? "Oldest First"
                : "Newest First"
              : isChecked
              ? "Ascending (A-to-Z)"
              : "Descending (Z-to-A)"}
          </label>
        </>
      ) : (
        <span>nothing to sort</span>
      )}
    </div>
  );
};

export default SortingComponent;
