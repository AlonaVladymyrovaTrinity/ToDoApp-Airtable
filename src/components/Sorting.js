import React, { useState } from "react";

const Sorting = ({ setTodoList, todoList }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    sortingByCreatedTime(isChecked ? "asc" : "desc");
  };

  //   useEffect(() => {
  //     sortingByCreatedTime(todoList, isChecked ? "asc" : "desc");
  //   }, [isChecked, todoList]);

  const sortingByCreatedTime = (order) => {
    const sortedTodoList = [...todoList];
    if (order === "asc") {
      sortedTodoList.sort((a, b) => {
        return a.createdTime < b.createdTime
          ? -1
          : a.createdTime > b.createdTime
          ? 1
          : 0;
      });
    } else {
      sortedTodoList.sort((a, b) => {
        return a.createdTime < b.createdTime
          ? 1
          : a.createdTime > b.createdTime
          ? -1
          : 0;
      });
    }
    setTodoList(sortedTodoList);
  };

  return (
    <div>
      <input
        type="checkbox"
        id="sorting-order"
        name="sorting-order"
        value=""
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="sorting-order">{isChecked ? "asc" : "desc"}</label>
    </div>
  );
};

export default Sorting;
