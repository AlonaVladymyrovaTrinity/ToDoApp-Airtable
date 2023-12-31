import React, { useState, useRef, useEffect } from "react";
import style from "../css/TodoListItem.module.css";
import baseStyles from "../css/base.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { RiCloseCircleLine } from "react-icons/ri";
import PropTypes from "prop-types";
import moment from "moment";
import { format } from "date-fns";

// Functional React component named TodoListItem with props: todo and onRemoveTodo
const TodoListItem = ({
  todo,
  onRemoveTodo,
  onSaveTodo,
  onIsDoneUpdateVal,
  todoList,
  setTodoList,
  isLoading,
  tableName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.fields.Title);
  const [isDone, setIsDone] = useState(todo.fields.done === true);
  const textareaRef = useRef(null);
  const elapsedTime =
    moment(todo.createdTime).fromNow() +
    ". " +
    format(new Date(todo.createdTime), "MM/dd/yyyy HH:mm:ss");

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
    onRemoveTodo(todo.id, isLoading, todoList, setTodoList, tableName);
  };

  const handleCheckClick = () => {
    const updatedIsDone = !isDone;
    setIsDone(updatedIsDone);
    onIsDoneUpdateVal(
      todo.id,
      title,
      updatedIsDone,
      todoList,
      setTodoList,
      tableName
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
    onSaveTodo(todo.id, title, isDone, todoList, setTodoList, tableName);
  };

  const handleTitleChange = (event) => {
    event.persist(); //to ensure that the event object isn't nullified
    setTitle(event.target.value);
  };

  const autoResize = (textareaRef) => {
    // Set textarea height to auto so that it adjusts to the content
    textareaRef.current.style.height = "auto";
    // Set new textarea height based on the scroll height of the content
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  return (
    <>
      <div className={baseStyles["list-with-button"]}>
        <div className={style["checkbox-wrapper"]}>
          <label className={style["container"]}>
            <input
              className={style["checked"]}
              type="checkbox"
              checked={isDone}
              onChange={handleCheckClick}
            />
            <span className={baseStyles["sr-only"]}>
              {isDone ? "Done" : "Not done"}
            </span>
          </label>
        </div>
        {/* List-item element */}
        <li className={baseStyles.list}>
          {isEditing ? (
            <>
              <span className={style["edit-text-label"]}>Edit text</span>
              <button
                className={style["cancel-button"]}
                onClick={handleCancelClick}
                type="button"
              >
                <RiCloseCircleLine />
                <span className={baseStyles["sr-only"]}>Cancel</span>
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
                className={
                  isDone ? style["title-checked"] : baseStyles["title-item"]
                }
              >
                {/* Title from todo Object */}
                {todo.fields.Title}
              </div>
            </>
          )}
          <span className={style["created-time"]}>Created: {elapsedTime}</span>
        </li>
        {isEditing ? (
          <>
            <button
              className={style["save-button"]}
              onClick={handleSaveClick}
              type="button"
            >
              <FontAwesomeIcon icon={faSave} />
              <span className={baseStyles["sr-only"]}>Save</span>
            </button>
          </>
        ) : (
          <button
            className={style["edit-button"]}
            onClick={handleEditClick}
            type="button"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
            <span className={baseStyles["sr-only"]}>Edit</span>
          </button>
        )}
        {/* Button element with text "Remove" and "onClick" event handler */}
        <button
          className={style["delete-button"]}
          onClick={handleRemoveClick}
          type="button"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          <span className={baseStyles["sr-only"]}>Remove</span>
        </button>
      </div>
    </>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
  onSaveTodo: PropTypes.func,
  onIsDoneUpdateVal: PropTypes.func,
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
  isLoading: PropTypes.bool,
  tableName: PropTypes.string,
};

export default TodoListItem;
