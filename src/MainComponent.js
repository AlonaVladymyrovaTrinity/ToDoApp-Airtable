import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { addTodo, getTodoList } from "./TodoApi";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import style from "./TodoListItem.module.css";

const MainComponent = ({ removeTodo, editTitleAndData }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getTodoList(setTodoList, setIsLoading);
  }, []);

  const handleNewAddTodo = (newTodo) => {
    addTodo(newTodo, setIsLoading, todoList, setTodoList);
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
          <FontAwesomeIcon icon={faClipboardList} /> Todo List
        </h1>
        <AddTodoForm onAddTodo={handleNewAddTodo} />
        {isLoading ? (
          <p>Loading...</p>
        ) : todoList.length === 0 ? (
          <div className={style["pending-tasks"]}>
            <span className={style["pending-num"]}>
              You have no tasks pending in this todo list.
            </span>
          </div>
        ) : (
          <>
            <Search onSearch={handleSearch} />
            <div className={style["pending-tasks"]}>
              <span className={style["pending-num"]}>
                You have {todoList.length} tasks in your list:
              </span>
              {/* <span className={style["pending-num"]}>
                You have{" "}
                {todoList.filter((record) => !("done" in record.fields)).length}{" "}
                of {todoList.length} tasks pending:
              </span> */}
            </div>
            <TodoList
              onRemoveTodo={removeTodo}
              todoList={filterListTitles(todoList, searchInput)}
              onSaveTodo={editTitleAndData}
              onIsDoneUpdateVal={editTitleAndData}
              setTodoList={setTodoList}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </>
  );
};
export default MainComponent;
