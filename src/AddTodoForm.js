import React from "react";
import InputWithLabel from "./InputWithLabel";

let AddTodoForm = function ({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");

  let handleTitleChange = function (event) {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  let handleAddTodo = function (event) {
    event.preventDefault();

    if (todoTitle === "") {
      alert("Empty form submission! Please input title.");
    } else {
      onAddTodo({ title: todoTitle, id: Date.now() });
      console.log(todoTitle);
      setTodoTitle("");
    }
  };
  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        title={'todoTitle'}
        placeholder={'Add todo Title'}
        id={'todoTitle'}
        name={'title'}
        type={'text'}
        value={todoTitle}
        todoTitle={todoTitle}
        onChange={handleTitleChange}
        children
      >
        <strong>Title: </strong>
      </InputWithLabel>
      <button type={'submit'}>Add</button>
    </form>
  );
};

export default AddTodoForm;
