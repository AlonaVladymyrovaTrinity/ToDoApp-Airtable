import React, { useState } from "react";
import style from "../css/TodoListItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

let TodoListItem = function ({ id, title, onRemoveTodo }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonChecked, setIsButtonChecked] = useState(false);

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
    setIsButtonChecked(!isButtonChecked);
  };

  return (
    <>
      <div className={style["list-with-button"]}>
        <button
          onClick={handleCheckClick}
          type="button"
          className={`${style["check-circle"]} ${
            isButtonChecked ? style["check-circle-checked"] : ""
          }`}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>
        <li className={style.list}>
          <div
            className={`${style.title} ${
              isChecked ? style["title-checked"] : ""
            }`}
          >
            {title}
          </div>
        </li>
        <button
          onClick={() => onRemoveTodo(id)}
          type="button"
          className={style["delete-button"]}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </>
  );
};

TodoListItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  onRemoveTodo: PropTypes.func,
};

export default TodoListItem;
