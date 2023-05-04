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

// Functional React component named TodoContainer
const TodoContainer = () => {
  const { tableName } = useParams();
  // State variable named todoList with default value of an empty Array ([])
  const [todoList, setTodoList] = useState([]);
  // State variable named isLoading with default value of true
  const [isLoading, setIsLoading] = useState(true);
  // State variable named searchInput with default value of empty string
  const [searchInput, setSearchInput] = useState("");

  //This code initializes state variable "darkMode" to a boolean value that is retrieved from local storage
  //and parsed as JSON, or false value if the stored value does not exist.
  const storedIDarkMode = localStorage.getItem("DarkMode");
  const [darkMode, setDarkMode] = useState(
    storedIDarkMode !== null ? JSON.parse(storedIDarkMode) : false
  );

  // useEffect hook with dependency tableName (prop) and callback function
  useEffect(() => {
    getTodoList(setTodoList, setIsLoading, tableName);
  }, [tableName]);

  const storedIsChecked = localStorage.getItem("isAscending");
  const storedSortingFieldName = localStorage.getItem("sortingFieldName");

  const handleNewAddTodo = (newTodo) => {
    addTodo(newTodo, setIsLoading, todoList, setTodoList, tableName);
  };

  const handleSearch = (inputValue) => {
    setSearchInput(inputValue);
  };

  //Function filterListTitles filters a given todoList by searching for items that have a Title field
  //containing a given searchInput, and returns the filtered list.
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
            darkMode={darkMode}
          />
        </div>
        <div className={baseStyles["header-wrapper"]}>
          {/* Heading level-one with dynamic tableName */}
          <h1 className={`${baseStyles.header} ${style.header}`}>
            <FontAwesomeIcon icon={faClipboardList} /> Todo List: {tableName}
          </h1>
          <StyledToggle setDarkMode={setDarkMode} darkMode={darkMode} />
        </div>
        {/* AddTodoForm Component */}
        <AddTodoForm onAddTodo={handleNewAddTodo} darkMode={darkMode} />
        {/* Conditional rendering based on isLoading state */}
        {isLoading ? (
          <>
            {/* If true, paragraph that reads “Loading…” or some equivalent message */}
            <p>Loading...</p>
            <StyledSpinner />
          </>
        ) : todoList.length === 0 ? (
          <span className={baseStyles["pending-tasks"]}>
            You have no tasks pending in your "{tableName}" todo list.
          </span>
        ) : (
          <>
            {/* If false, TodoList Component */}
            <Search onSearch={handleSearch} darkMode={darkMode} />
            <span className={baseStyles["pending-tasks"]}>
              You have{" "}
              <span className={baseStyles["pending-num"]}>
                {todoList.length}
              </span>{" "}
              task{todoList.length === 1 ? "" : "s"} in your list:
            </span>
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
