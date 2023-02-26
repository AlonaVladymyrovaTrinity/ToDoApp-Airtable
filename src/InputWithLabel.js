import React from "react";
import { useRef } from "react";

// useRef hook named inputRef passed to the ref attribute of the input element.
// useEffect hook should be defined with an empty dependency list. I'm not giving it second argument,
// so it runs first on mount and then on every re-render.The side-effect handler function
// of the useEffect hook calls the focus() method on the current property of the inputRef
// to set focus on the input element.

// • You can store information between re-renders (unlike regular variables, which reset on every render).
//  • Changing it does not trigger a re-render (unlike state variables, which trigger a re-render).
let InputWithLabel = function (props) {
  const inputRef = useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        id="todoTitle"
        ref={inputRef}
        name="title"
        type="text"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      ></input>
    </>
  );
};
export default InputWithLabel;
