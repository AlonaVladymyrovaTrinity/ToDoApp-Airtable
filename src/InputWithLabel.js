import React from 'react';

let InputWithLabel = function(props) {
    return (
    <>
        <label htmlFor = "todoTitle">{props.children}</label>
        <input id = "todoTitle" name="title" type="text" value={props.todoTitle}  onChange={props.handleTitleChange} autoFocus></input>  
    </>)  
}
export default InputWithLabel;
