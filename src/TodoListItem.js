import React from 'react';
// Update TodoListItem component to use props
let TodoListItem = function ({ todo }) { 
    return (
       <li> {/*Remove the key attribute*/}
            <span>{`${todo.id} ${todo.title}`}</span>
       </li>
    )
}

export default TodoListItem;