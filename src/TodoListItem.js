import React from "react";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo, onSaveTodo, editTitle, isLoading, todoList, setTodoList, updateAirtableRecord}) {

  const [isEditing, setIsEditing] = React.useState(false);
 // const [title, setTitle] = React.useState(todo.fields.Title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
   // setTitle(todo.fields.Title);// reset the title to the original value
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const newFields = { ...todo.fields, Title: todo.fields.Title };
    // onSaveTodo(todo.id, newFields);
    const updatedTodo = { ...todo, fields: newFields };
    onSaveTodo(updatedTodo);
  };
  // const handleTitleChange = (event) => {
  //   const newFields = { ...todo.fields, Title: event.target.value };
  //   editTitle(todo, newFields, updateAirtableRecord);
  // };
  
  // const editTitle = (todo, newFields, updateAirtableRecord) => {
  //   const updatedTodo = { ...todo, fields: newFields };
  //   updateAirtableRecord(updatedTodo.id, newFields);
  //   return updatedTodo;
  // };
  

  const handleTitleChange = (event) => {
    event.persist(); //to ensure that the event object isn't nullified before it's passed to the editTitle function
    //setTitle(event.target.value); // update the title in state
   editTitle(todo.id, event.target.value, todoList, setTodoList, updateAirtableRecord);
    // editTitle(todo.id, event.target.value);
  };

  return (
    <li className={style.ListItem}>
      {isEditing ? (
        <>
          <input type="text" value={todo.fields.Title} onChange={handleTitleChange} />
          <button onClick={handleSaveClick} type="button">Save</button>
          <button onClick={handleCancelClick} type="button">Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.fields.Title}</span>
          <button onClick={handleEditClick} type="button">Edit</button>
          <button onClick={() => onRemoveTodo(todo.id, isLoading, todoList, setTodoList)} type="button">Delete</button>
        </>
      )}
    </li>
  );
}

 export default TodoListItem;
