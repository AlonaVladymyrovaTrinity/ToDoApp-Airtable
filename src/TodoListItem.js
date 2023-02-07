import React from 'react';
// Update TodoListItem component to use props
let TodoListItem = function ({id, title}) { 
    return (
       <li> {/*Remove the key attribute*/}
            <span>{`${id} ${title}`}</span>
       </li>
    )
}

export default TodoListItem;