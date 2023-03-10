import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/`;

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

//GET Items  
  React.useEffect(() => {
    fetch(`${API_ENDPOINT}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records); 
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
      
//UPDATE Items  
const editTitle = (event, id) => {
  const newTodoList = todoList.map((todo) => {
    if (todo.id === id) {
      const newFields = { ...todo.fields, Title: event.target.value };
      updateAirtableRecord(todo.id, newFields); // update the record in Airtable
      return { id: todo.id, fields: newFields };
    } else {
      return todo;
    }
  });

  setTodoList(newTodoList);
};

  const updateAirtableRecord = (id, fields) => {
    fetch(`${API_ENDPOINT}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify({
        records: [{ id, fields }],
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

//DELETE Items
  let removeTodo = function (id) {
    if (!isLoading) {
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
  
      fetch(`${API_ENDPOINT}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  };
};
//ADD Items
let addTodo = function (newTodo) {
  setIsLoading(true);
  fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            Title: newTodo.title,
            Completed: newTodo.completed,
          },
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
      setTodoList([...todoList, result.records[0]]);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false);
    });
};

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
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList onRemoveTodo={removeTodo} todoList={todoList} editTitle={editTitle} onSaveTodo={updateAirtableRecord} />
              )}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
