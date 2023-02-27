import React from "react";

let AddTodoForm = function (props) {
  //-----Another approach----
  // const handleAddTodo = (event) => {
  //     event.preventDefault();
  //     let todoTitle = event.target.title.value;
  //     //ALL OF THESE OPTIONS ARE WORKING!
  //     let todoTitle = event.target.title.value;
  //     //let todoTitle = event.target.elements.title.value;
  //     //let todoTitle = event.target.elements["todoTitle"].value;
  //     //let todoTitle = event.target[0].value;
  //     console.log(todoTitle);
  //     props.onAddTodo(todoTitle);
  //     //Clears out the text from input text box
  //     //ALL OF THESE OPTIONS ARE WORKING!
  //     //event.target.reset();
  //     event.target.title.value = "";
  // };

  const [inputText, setInputText] = React.useState("");
  let handleAddTodo = function (event) {
    event.preventDefault(); // prevent the default behavior of the form submit
    let todoTitle = inputText; // retrieve the value of the title element from the event target and store it in a variable named todoTitle
    console.log(todoTitle); //Log the value of todoTitle in the console
    setInputText(""); //Reset the form so the text input value is cleared
    props.onAddTodo(todoTitle); //  Inside the handleAddTodo function, invoke the onAddTodo callback prop and pass todoTitle as an argument
  };
  //-----Another approach----
  //   return (
  //     <form onSubmit={handleAddTodo}>
  //       <label htmlFor="todoTitle">Title:</label>
  //       <input name="title" type="text" id="todoTitle" />
  //       <button type="submit">Add</button>
  //     </form>
  //   );

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        name="title"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
