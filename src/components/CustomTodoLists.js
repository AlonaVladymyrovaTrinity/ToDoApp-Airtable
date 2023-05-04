import React from "react";
import style from "../css/CustomTodoLists.module.css";
import baseStyles from "../css/base.module.css";
import CustomTodoListsItems from "./CustomTodoListsItems";
import StyledSpinner from "./StyledSpinner";
import PropTypes from "prop-types";

const CustomTodoLists = ({ customTodoLists, isListsLoading }) => {
  return (
    <>
      {/* Conditional rendering of either a loading message and a StyledSpinner component or a list of custom to-do lists 
    using the ternary operator. If isListsLoading is true, it will display "Loading..." text and a spinner, otherwise 
    it will display custom to-do lists by mapping through the customTodoLists array and rendering each one using the CustomTodoListsItems component. */}
      {isListsLoading ? (
        <>
          <p>Loading...</p> <StyledSpinner />
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
