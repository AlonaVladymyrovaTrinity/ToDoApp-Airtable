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
  const [isDone, setIsDone] = useState(
    todo.fields.done.toLowerCase() === "true"
  );
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

  const handleCheckClick = () => {
    const updatedIsDone = !isDone;
    setIsDone(updatedIsDone);
    onIsDoneUpdateVal(
      todo.id,
      title,
      updatedIsDone.toString(),
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
    onSaveTodo(todo.id, title, isDone.toString(), todoList, setTodoList);
  };

  const handleTitleChange = (event) => {
    event.persist(); //to ensure that the event object isn't nullified before it's passed to the editTitle function
    setTitle(event.target.value);
  };

  function autoResize(textareaRef) {
    // console.log(textareaRef.current.value);
    // Set textarea height to auto so that it adjusts to the content
    textareaRef.current.style.height = "auto";
    // Set new textarea height based on the scroll height of the content
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }

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
            </button>
          </>
        ) : (
          <button
            className={style["edit-button"]}
            onClick={handleEditClick}
            type="button"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        )}
        <button
          className={style["delete-button"]}
          onClick={() =>
            onRemoveTodo(todo.id, isLoading, todoList, setTodoList)
          }
          type="button"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </>
  );
};

export default TodoListItem;
