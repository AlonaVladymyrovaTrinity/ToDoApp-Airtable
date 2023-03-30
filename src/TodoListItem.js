import React, { useState } from "react";
import style from "./TodoListItem.module.css";

const TodoListItem = ({
  todo,
  onRemoveTodo,
  onSaveTodo,
  todoList,
  setTodoList,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.fields.Title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTitle(todo.fields.Title); // reset the title to the original value
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSaveTodo(todo.id, title, todoList, setTodoList);
  };

  const handleTitleChange = (event) => {
    event.persist(); //to ensure that the event object isn't nullified before it's passed to the editTitle function
    setTitle(event.target.value);
  };

  return (
    <li className={style.ListItem}>
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={handleTitleChange} />
          <button onClick={handleSaveClick} type="button">
            Save
          </button>
          <button onClick={handleCancelClick} type="button">
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{todo.fields.Title}</span>
          <button onClick={handleEditClick} type="button">
            Edit
          </button>
          <button
            onClick={() =>
              onRemoveTodo(todo.id, isLoading, todoList, setTodoList)
            }
            type="button"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default TodoListItem;
