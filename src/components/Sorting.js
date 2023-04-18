import React, { useState } from "react";
import style from "../css/Sorting.module.css";

const Sorting = ({ setTodoList, todoList, fieldName }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    sortingBy(!isChecked ? "asc" : "desc");
  };

  //   useEffect(() => {
  //     sortingBy(todoList, isChecked ? "asc" : "desc");
  //   }, [isChecked, todoList]);

  const sortingBy = (order) => {
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
    return setTodoList(sortedTodoList);
  };
  // if (order === "asc") {
  //   sortedTodoList.sort((objectA, objectB) => {
  //     let valA, valB;
  //     if (fieldName === "Title" || fieldName === "done") {
  //       valA = objectA.fields[fieldName];
  //       valB = objectB.fields[fieldName];
  //     } else if (fieldName === "createdTime") {
  //       valA = objectA[fieldName];
  //       valB = objectB[fieldName];
  //     }
  //     return valA < valB ? -1 : valA > valB ? 1 : 0;
  //   });
  // sortedTodoList.sort((objectA, objectB) => {
  //   return objectA.fieldName < objectB.fieldName
  //     ? -1
  //     : objectA.fieldName > objectB.fieldName
  //     ? 1
  //     : 0;
  // });
  // } else {
  // sortedTodoList.sort((objectA, objectB) => {
  //   return objectA.fieldName < objectB.fieldName
  //     ? 1
  //     : objectA.fieldName > objectB.fieldName
  //     ? -1
  //     : 0;
  // });
  // }
  // };
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
          <label htmlFor="sorting-order">
            {fieldName}: {isChecked ? "asc (A-to-Z)" : "desc (Z-to-A)"}
          </label>
        </>
      ) : (
        <span>nothing to sort</span>
      )}
    </div>
  );
};

export default Sorting;
