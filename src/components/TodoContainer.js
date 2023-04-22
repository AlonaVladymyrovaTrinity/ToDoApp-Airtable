import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { editTitleAndData, removeTodo, addTodo, getTodoList } from "./TodoApi";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import style from "../css/TodoContainer.module.css";
import baseStyles from "../css/base.module.css";
import { useParams } from "react-router-dom";
import StyledSpinner from "./StyledSpinner";
import StyledBackButton from "./StyledBackButton";
import TodoListDropdown from "./TodoListDropdown";
// import SortingComponent from "./SortingComponent";

// import PropTypes from "prop-types";

// const TodoContainer = ({ tableName }) => {
const TodoContainer = () => {
  const { tableName } = useParams();

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getTodoList(setTodoList, setIsLoading, tableName);
  }, [tableName]);

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
      <div className={baseStyles.container}>
        <div className={style["top-wrapper"]}>
          <StyledBackButton linkName={"/"} children>
            <span>My lists</span>
          </StyledBackButton>
          <TodoListDropdown
            todoList={todoList}
            setTodoList={setTodoList}
            isLoading={isLoading}
          />
        </div>
        <h1 className={baseStyles.header}>
          <FontAwesomeIcon icon={faClipboardList} /> Todo List: {tableName}
        </h1>
        <AddTodoForm onAddTodo={handleNewAddTodo} />
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
            {/* <SortingComponent
              todoList={todoList}
              setTodoList={setTodoList}
              fieldName="createdTime"
              optionName="Created Time"
            /> */}
            <Search onSearch={handleSearch} />
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

// TodoContainer.propTypes = {
//   tableName: PropTypes.string,
// };

export default TodoContainer;
