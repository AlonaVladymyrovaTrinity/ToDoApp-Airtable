import React, { useState, useCallback, useEffect } from "react";
import style from "../css/SortingComponent.module.css";
import { useRef } from "react";

const SortingComponent = ({ setTodoList, todoList, fieldName, optionName }) => {
  const [isChecked, setIsChecked] = useState(false);
  const initialValue = [];
  const reference = useRef(initialValue);

  //   useEffect(() => {
  const sortingBy = useCallback(
    (order, fieldName) => {
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
      //   console.log(isChecked, fieldName, sortedTodoList);
      //   return (reference.current = sortedTodoList);
      // setTodoList(sortedTodoList);
      // };
      return sortedTodoList;
      // sortingBy(isChecked ? "asc" : "desc");
    },
    [todoList]
  );

  //   setTodoList(reference.current);
  useEffect(() => {
    const sortedTodoList = sortingBy(isChecked ? "asc" : "desc", fieldName);
    reference.current = sortedTodoList;
    console.log(reference.current);
  }, [sortingBy, isChecked, fieldName]);

  const handleCheckboxChange = () => {
    setTodoList(() => reference.current);
    setIsChecked(!isChecked);
  };

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
                ? "Newest First"
                : "Oldest First"
              : isChecked
              ? "Descending (Z-to-A)"
              : "Ascending (A-to-Z)"}
          </label>
        </>
      ) : (
        <span>nothing to sort</span>
      )}
    </div>
  );
};

export default SortingComponent;
