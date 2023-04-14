import React from "react";
import style from "../css/TodoListItem.module.css";
// import { Link } from "react-router-dom";
import CustomTodoListsItems from "./CustomTodoListsItems";
import PropTypes from "prop-types";

const CustomTodoLists = ({ customTodoLists, isListsLoading }) => {
  return (
    <>
      {isListsLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className={style.ListItem}>
          {customTodoLists?.map(function (customTodo) {
            return (
              <React.Fragment key={customTodo.id}>
                <div className={style["list-with-button"]}>
                  <CustomTodoListsItems customTodo={customTodo} />
                  {/* <li className={style.list}>
                     <Link
                       to={`/todolist/${customTodo.name}`}
                       // className={style.link}
                     >
                       {customTodo.name}
                     </Link>
                   </li>
                   <span></span> */}
                </div>
              </React.Fragment>
            );
          })}
        </ul>
      )}
    </>
  );
};

CustomTodoLists.propTypes = {
  customTodoLists: PropTypes.array,
  isListsLoading: PropTypes.bool,
};

export default CustomTodoLists;
