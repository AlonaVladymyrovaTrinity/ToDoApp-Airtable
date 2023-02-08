import React from 'react'; 

let AddTodoForm = function({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = React.useState("");

    let handleTitleChange = function (event) {
        let newTodoTitle = event.target.value; //retrieve the input value from the event object and store in variable named newTodoTitle
        setTodoTitle(newTodoTitle); // call the state setter setTodoTitle and pass newTodoTitle
    }

    let handleAddTodo = function (event) {
         event.preventDefault(); // prevent the default behavior of the form submit      

         if (todoTitle==="") {
            alert ("Empty form submission! Please input title.");
            } else {
                onAddTodo({title: todoTitle, id: Date.now()});
                console.log(todoTitle);//Log the value of todoTitle in the console
                setTodoTitle(''); //Inside handleAddTodo, remove the reset() method and replace it with logic to reset the todoTitle state to an empty String
            }
        }
return (
    <form onSubmit={handleAddTodo}>
        <label htmlFor = "todoTitle">Title</label>
        <input id = "todoTitle" name="title" type="text" value={todoTitle}  onChange={handleTitleChange}></input>    
        <button type="submit">Add</button>
    </form>
)
}

export default AddTodoForm;