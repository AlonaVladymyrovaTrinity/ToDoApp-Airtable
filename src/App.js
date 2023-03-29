import React from "react";
//import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainComponent from "./MainComponent";
import { removeTodo, editTitle } from "./TodoApi";
//import { getTodoList, removeTodo, editTitle } from "./TodoApi";

// import Search from './Search';

function App() {

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <Link to="/">Todo List</Link> | <Link to="/new">New Todo List</Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<MainComponent
        removeTodo={removeTodo} 
        // todoList={todoList} 
        editTitle={editTitle} 
        // setTodoList={setTodoList} 
        // isLoading={isLoading} 
        // setIsLoading={setIsLoading}
        />}/>
        <Route path="/new" element={<MainComponent
        removeTodo={removeTodo} 
        editTitle={editTitle} 
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
