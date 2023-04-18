import React, { useState } from "react";
import { IconDotsCircleHorizontal } from "@tabler/icons-react";
import style from "../css/TodoListDropdown.module.css";
import baseStyles from "../css/base.module.css";

const TodoListDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuOpenClose = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className={style.dropdown}>
      <button className={style["dropdown-btn"]} onClick={menuOpenClose}>
        <IconDotsCircleHorizontal />
        <span className={baseStyles["sr-only"]}>Dropdown menu</span>
      </button>
      {showMenu ? (
        <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      ) : null}
    </div>
  );
};

export default TodoListDropdown;
