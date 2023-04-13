import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { editTitleAndData, removeTodo, addTodo, getTodoList } from "./TodoApi";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import style from "./TodoListItem.module.css";
import { useParams } from "react-router-dom";

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
      <div className={style.container}>
        <h1 className={style.header}>
          <FontAwesomeIcon icon={faClipboardList} /> Todo List: {tableName}
        </h1>
        <AddTodoForm onAddTodo={handleNewAddTodo} />
        {isLoading ? (
          <p>Loading...</p>
        ) : todoList.length === 0 ? (
          <span className={style["pending-tasks"]}>
            You have no tasks pending in your "{tableName}" todo list.
          </span>
        ) : (
          <>
            <Search onSearch={handleSearch} />
            <span className={style["pending-tasks"]}>
              You have{" "}
              <span className={style["pending-num"]}>{todoList.length}</span>{" "}
              task{todoList.length === 1 ? "" : "s"} in your list:
            </span>
            {/* <span className={style["pending-num"]}>
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
export default TodoContainer;
