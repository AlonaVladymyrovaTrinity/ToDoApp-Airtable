import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "../css/Search.module.css";
import baseStyles from "../css/base.module.css";
import PropTypes from "prop-types";

const Search = ({ onSearch }) => {
  const [timer, setTimer] = useState(null);

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
          <InputWithLabel
            title={"Search"}
            placeholder={"Search for titles"}
            id={"search"}
            name={"search"}
            type={"search"}
            onChange={handleInputChange}
            children
          >
            <strong className={baseStyles.title}>Search: </strong>
          </InputWithLabel>
        </div>
      </div>
    </form>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
};

export default Search;
