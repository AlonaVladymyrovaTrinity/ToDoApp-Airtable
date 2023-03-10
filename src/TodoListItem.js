import React from "react";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo, editTitle, onSaveTodo }) {

  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(todo.fields.Title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTitle(todo.fields.Title);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const newFields = { ...todo.fields, Title: title };
    onSaveTodo(todo.id, newFields);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    editTitle(event, todo.id);
  };

  return (
    <li className={style.ListItem}>
      {isEditing ? (
        <>
          <input type="text" value={title} onChange={handleTitleChange} />
          <button onClick={handleSaveClick} type="button">Save</button>
          <button onClick={handleCancelClick} type="button">Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.fields.Title}</span>
          <button onClick={handleEditClick} type="button">Edit</button>
          <button onClick={() => onRemoveTodo(todo.id)} type="button">Delete</button>
        </>
      )}
    </li>
  );
}

 export default TodoListItem;
