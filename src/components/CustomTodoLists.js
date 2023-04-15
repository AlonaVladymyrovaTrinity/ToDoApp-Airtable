import React from "react";
import style from "../css/CustomTodoLists.module.css";
import baseStyles from "../css/base.module.css";
import CustomTodoListsItems from "./CustomTodoListsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const CustomTodoLists = ({ customTodoLists, isListsLoading }) => {
  return (
    <>
      {isListsLoading ? (
        <>
          <p>Loading...</p> <Spinner />
        </>
      ) : (
        <ul className={`${baseStyles.ListItem} ${style.ListItem}`}>
          {customTodoLists?.map(function (customTodo) {
            return (
              <React.Fragment key={customTodo.id}>
                <div className={baseStyles["list-with-button"]}>
                  <CustomTodoListsItems customTodo={customTodo} />
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
