import React from 'react';
// Update TodoListItem component to use props
let TodoListItem = function (props) { 
    const todo = props.todo;
    return (
       <li> {/*Remove the key attribute*/}
            <span>{`${todo.id} ${todo.title}`}</span>
       </li>
    )
}

export default TodoListItem;