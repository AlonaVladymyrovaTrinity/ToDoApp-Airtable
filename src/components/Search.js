import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "../css/Search.module.css";
import baseStyles from "../css/base.module.css";
import PropTypes from "prop-types";

const Search = ({ onSearch, darkMode }) => {
  const [timer, setTimer] = useState(null);

  /* Function handleInputChange is triggered when the value of an input field changes. 
  It first checks if there is a timer running and clears it, and then sets a new timer with a delay of 500ms. 
  Once the timer expires, the function extracts the input value and passes it to the onSearch function. 
  This technique is implementing a "debounce" effect, where the search is executed after a short delay once the user stops typing.*/
  const handleInputChange = (event) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        const inputValue = event.target.value;
        onSearch(inputValue);
      }, 500)
    );
  };

  return (
    <form>
      <div className={style["search-input"]}>
        <div className={baseStyles["input-with-button"]}>
          {/*Reusable Component InputWithLabel (input element with label) is used for Search by passing the 'search' type for input element
           into the Reusable Component InputWithLabel*/}
          <InputWithLabel
            todoTitle={"Search"}
            placeholder={"Search for titles"}
            id={"search"}
            name={"search"}
            type={"search"}
            handleTitleChange={handleInputChange}
            children
          >
            <strong className={darkMode ? style.title : baseStyles.title}>
              Search:
            </strong>
          </InputWithLabel>
        </div>
      </div>
    </form>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
  darkMode: PropTypes.bool,
};

export default Search;
