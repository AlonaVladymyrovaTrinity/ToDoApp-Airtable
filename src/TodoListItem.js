import React from 'react';
// Update TodoListItem component to use props
let TodoListItem = function ({id, title}) { 
    return (
       <li> 
            <span>{`${id} ${title}`}</span>
       </li>
    )
}

export default TodoListItem;