import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import MainComponent from "./MainComponent";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { getTodoList, addTodo, removeTodo, editTitle, updateAirtableRecord } from "./TodoApi";

// import Search from './Search';

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getTodoList(setTodoList, setIsLoading);
  }, []);

  const MainComponent = ({isLoading, todoList}) => {
    return(
        <>
          <h1>Todo List</h1>
          {/* onAddTodo={addTodo}*/}
          <AddTodoForm onAddTodo={(newTodo) => addTodo(newTodo, setIsLoading, todoList, setTodoList)} />
          {/* <Search onSearch={onSearch} /> */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <TodoList onRemoveTodo={removeTodo} todoList={todoList} editTitle={editTitle} setTodoList={setTodoList} isLoading={isLoading} updateAirtableRecord={updateAirtableRecord}/>
         )}
        </>)
}

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <Link to="/">Todo List</Link> | <Link to="/new">New Todo List</Link>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<MainComponent
            isLoading={isLoading}
            todoList={todoList}/>}
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
