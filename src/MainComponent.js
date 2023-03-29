import React, { useState, useEffect } from "react";   
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { addTodo, getTodoList } from "./TodoApi";
import Search from "./Search";

                     
const MainComponent = ({removeTodo, editTitle}) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredTodoList, setFilteredTodoList] = useState([]);

    useEffect(() => {
      getTodoList(setTodoList, setIsLoading);
    }, []);

    const handleNewAddTodo = (newTodo) => {
      addTodo(newTodo, setIsLoading, todoList, setTodoList);
    }

    const handleFilter = (filteredList) => {
      setFilteredTodoList(filteredList);
    };

    return(
        <>
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo={handleNewAddTodo} />
          <Search todoList={todoList} onFilter={handleFilter}/>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <TodoList 
            onRemoveTodo={removeTodo} 
            todoList={filteredTodoList.length > 0 ? filteredTodoList : todoList} 
            onSaveTodo={editTitle} 
            setTodoList={setTodoList} 
            isLoading={isLoading}/>
         )}
        </>)
}
export default MainComponent;