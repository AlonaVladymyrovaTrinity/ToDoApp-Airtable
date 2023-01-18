import React from 'react';

let AddTodoForm = function() {
return (
    <form>
        <label htmlFor = "todoTitle">Title</label>
        <input id = "todoTitle"></input>
        <button type="submit">Add</button>
    </form>
)
}

export default AddTodoForm;