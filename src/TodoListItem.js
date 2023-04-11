import React, { useState, useRef, useEffect } from "react";
import style from "./TodoListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { RiCloseCircleLine } from "react-icons/ri";

const TodoListItem = ({
  todo,
  onRemoveTodo,
  onSaveTodo,
  onIsDoneUpdateVal,
  todoList,
  setTodoList,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.fields.Title);
  //if type of data in db in field done is Checkbox:
  const [isDone, setIsDone] = useState(todo.fields.done === true);
  //if type of data in db in column done is string:
  // const [isDone, setIsDone] = useState(
  //   todo.fields.done.toLowerCase() === "true"
  // );
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      autoResize(textareaRef);
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleRemoveClick = () => {
    onRemoveTodo(todo.id, isLoading, todoList, setTodoList);
  };

  const handleCheckClick = () => {
    const updatedIsDone = !isDone;
    setIsDone(updatedIsDone);
    onIsDoneUpdateVal(
      todo.id,
      title,
      //if type of field in db is Checkbox:
      updatedIsDone,
      //if type of field in db is streeng:
      //updatedIsDone.toString(),
      todoList,
      setTodoList
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTitle(todo.fields.Title); // reset the title to the original value
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSaveTodo(
      todo.id,
      title,
      //if type of field in db is Checkbox:
      isDone,
      //if type of field in db is streeng:
      // isDone.toString(),
      todoList,
      setTodoList
    );
  };

  const handleTitleChange = (event) => {
    event.persist(); //to ensure that the event object isn't nullified before it's passed to the editTitle function
    setTitle(event.target.value);
  };

  const autoResize = (textareaRef) => {
    // console.log(textareaRef.current.value);
    // Set textarea height to auto so that it adjusts to the content
    textareaRef.current.style.height = "auto";
    // Set new textarea height based on the scroll height of the content
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  return (
    <>
      <div className={style["list-with-button"]}>
        <button
          onClick={handleCheckClick}
          type="button"
          className={`${
            isDone ? style["check-circle-checked"] : style["check-circle"]
          }`}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          <span className={style["sr-only"]}>Done</span>
        </button>
        <li className={style.list}>
          {isEditing ? (
            <>
              <span className={style["edit-text-label"]}>Edit text</span>
              <button
                className={style["cancel-button"]}
                onClick={handleCancelClick}
                type="button"
              >
                <RiCloseCircleLine />
                <span className={style["sr-only"]}>Cancel</span>
              </button>
              <textarea
                type="text"
                className={style["edit-input"]}
                value={title}
                ref={textareaRef}
                rows={1}
                onChange={handleTitleChange}
              />
            </>
          ) : (
            <>
              <div
                className={`${style.title} ${
                  isDone ? style["title-checked"] : ""
                }`}
              >
                {todo.fields.Title}
              </div>
            </>
          )}
        </li>

        {isEditing ? (
          <>
            <button
              className={style["save-button"]}
              onClick={handleSaveClick}
              type="button"
            >
              <FontAwesomeIcon icon={faSave} />
              <span className={style["sr-only"]}>Save</span>
            </button>
          </>
        ) : (
          <button
            className={style["edit-button"]}
            onClick={handleEditClick}
            type="button"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
            <span className={style["sr-only"]}>Edit</span>
          </button>
        )}
        <button
          className={style["delete-button"]}
          onClick={handleRemoveClick}
          type="button"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          <span className={style["sr-only"]}>Remove</span>
        </button>
      </div>
    </>
  );
};

export default TodoListItem;
