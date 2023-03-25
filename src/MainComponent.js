import React, { useState } from "react";   
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
//import { addTodo } from "./TodoApi";
import { addTodo, getTodoList } from "./TodoApi";

                     
const MainComponent = ({removeTodo /*, todoList*/, editTitle/*, setTodoList, isLoading, setIsLoading*/}) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    React.useEffect(() => {
      getTodoList(setTodoList, setIsLoading);
    }, []);

        return(
            <>
          <h1>Todo List</h1>
          {/* onAddTodo={addTodo}*/}
          <AddTodoForm onAddTodo={(newTodo) => addTodo(newTodo, setIsLoading, todoList, setTodoList)} />
          {/* <Search onSearch={onSearch} /> */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <TodoList 
            onRemoveTodo={removeTodo} 
            todoList={todoList} 
            onSaveTodo={editTitle} 
            setTodoList={setTodoList} 
            isLoading={isLoading}/>
         )}
        </>)
}
export default MainComponent;