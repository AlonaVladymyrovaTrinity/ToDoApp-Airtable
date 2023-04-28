import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { editTitleAndData, removeTodo, addTodo, getTodoList } from "./TodoApi";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import style from "../css/TodoContainer.module.css";
import baseStyles from "../css/base.module.css";
import StyledSpinner from "./StyledSpinner";
import StyledBackButton from "./StyledBackButton";
import SortingDropdown from "./SortingDropdown";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import StyledToggle from "./StyledToggle";

// const TodoContainer = ({ tableName }) => {
const TodoContainer = () => {
  const { tableName } = useParams();

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    getTodoList(setTodoList, setIsLoading, tableName);
  }, [tableName]);

  const defaultIsChecked = false;
  const defaultSortingFieldName = "createdTime";

  const storedIsChecked = localStorage.getItem("isChecked");
  const storedSortingFieldName = localStorage.getItem("sortingFieldName");

  if (storedIsChecked === null) {
    localStorage.setItem("isChecked", JSON.stringify(defaultIsChecked));
  }

  if (storedSortingFieldName === null) {
    localStorage.setItem("sortingFieldName", defaultSortingFieldName);
  }

  const handleNewAddTodo = (newTodo) => {
    addTodo(newTodo, setIsLoading, todoList, setTodoList, tableName);
  };

  const handleSearch = (inputValue) => {
    setSearchInput(inputValue);
  };

  const filterListTitles = (todoList, searchInput) => {
    return todoList.filter(
      (todo) =>
        todo.fields.Title &&
        todo.fields.Title.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <>
      <div
        className={`${darkMode && style["dark-mode"]} ${baseStyles.container}`}
      >
        <div className={style["top-wrapper"]}>
          <StyledBackButton
            linkName={"/"}
            children
            className={darkMode ? "link-color" : ""}
            darkMode={darkMode}
          >
            <span>My Lists</span>
          </StyledBackButton>
          <SortingDropdown
            todoList={todoList}
            setTodoList={setTodoList}
            isLoading={isLoading}
            storedIsChecked={storedIsChecked}
            storedSortingFieldName={storedSortingFieldName}
          />
        </div>
        <div className={baseStyles["header-wrapper"]}>
          {/* Heading level-one with dynamic tableName */}
          <h1 className={`${baseStyles.header} ${style.header}`}>
            <FontAwesomeIcon icon={faClipboardList} /> Todo List: {tableName}
          </h1>
          <StyledToggle handleToggleDarkMode={setDarkMode} />
        </div>
        {/* AddTodoForm Component */}
        <AddTodoForm onAddTodo={handleNewAddTodo} darkMode={darkMode} />
        {/* Conditional rendering based on isLoading state */}
        {isLoading ? (
          <>
            <p>Loading...</p>
            <StyledSpinner />
          </>
        ) : todoList.length === 0 ? (
          <span className={baseStyles["pending-tasks"]}>
            You have no tasks pending in your "{tableName}" todo list.
          </span>
        ) : (
          <>
            <Search onSearch={handleSearch} darkMode={darkMode} />
            <span className={baseStyles["pending-tasks"]}>
              You have{" "}
              <span className={baseStyles["pending-num"]}>
                {todoList.length}
              </span>{" "}
              task{todoList.length === 1 ? "" : "s"} in your list:
            </span>
            {/* <span className={baseStyles["pending-num"]}>
                You have{" "}
                {todoList.filter((record) => !("done" in record.fields)).length}{" "}
                of {todoList.length} tasks pending:
              </span> */}
            <TodoList
              onRemoveTodo={removeTodo}
              todoList={filterListTitles(todoList, searchInput)}
              onSaveTodo={editTitleAndData}
              onIsDoneUpdateVal={editTitleAndData}
              setTodoList={setTodoList}
              isLoading={isLoading}
              tableName={tableName}
            />
          </>
        )}
      </div>
    </>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string,
};

export default TodoContainer;
