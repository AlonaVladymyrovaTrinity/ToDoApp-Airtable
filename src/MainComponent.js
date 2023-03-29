import React, { useState, useEffect } from "react";   
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { addTodo, getTodoList } from "./TodoApi";
import Search from "./Search";

                     
const MainComponent = ({removeTodo, editTitle}) => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
      getTodoList(setTodoList, setIsLoading);
    }, []);

    const handleNewAddTodo = (newTodo) => {
      addTodo(newTodo, setIsLoading, todoList, setTodoList);
    }

    const handleSearch = (inputValue) => {
      setSearchInput(inputValue);
    };

    const filterListTitles = (todoList, searchInput) => {
    return todoList.filter(todo =>
      todo.fields.Title.toLowerCase().includes(searchInput.toLowerCase())
    )
    };

    return(
        <>
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo={handleNewAddTodo} />
          <Search onSearch={handleSearch} value={searchInput}/>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <TodoList 
            onRemoveTodo={removeTodo} 
            todoList={filterListTitles(todoList, searchInput)} 
            onSaveTodo={editTitle} 
            setTodoList={setTodoList} 
            isLoading={isLoading}/>
         )}
        </>)
}
export default MainComponent;