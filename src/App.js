import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          resolve({
            data: {
              todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
            },
          }),
        2000
      )
    ).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  let removeTodo = function (id) {
    const newTodoList = todoList.filter((todo) => todo.id !== id); //The filter method creates a new array with all the elements that pass the conditions specified by a given function and returns the new array.
    setTodoList(newTodoList);
  };

  let addTodo = function (newTodo) {
    setTodoList([...todoList, newTodo]);
  };
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
      )}
    </>
  );
}

export default App;
