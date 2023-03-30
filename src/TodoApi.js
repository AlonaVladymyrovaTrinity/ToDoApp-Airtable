const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/`;

//GET Items
export const getTodoList = (setTodoList, setIsLoading) => {
  fetch(`${API_ENDPOINT}?${Date.now()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      "Cache-Control": "no-cache",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log("Success:", result);
      setTodoList(result.records);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

//UPDATE Items
export const editTitle = (id, value, todoList, setTodoList) => {
  const newTodoList = todoList.map((todo) => {
    if (todo.id === id) {
      const newFields = { ...todo.fields, Title: value };
      updateAirtableRecord(todo.id, newFields); // update the record in Airtable
      return { id: todo.id, fields: newFields };
    } else {
      return todo;
    }
  });
  setTodoList(newTodoList);
  updateAirtableRecord(id, newTodoList.find((todo) => todo.id === id).fields);
};

export const updateAirtableRecord = (id, fields) => {
  if (typeof fields !== "object") {
    console.error("Error: fields parameter must be an object");
    return;
  }
  fetch(`${API_ENDPOINT}${id}?_=${Date.now()}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify({
      //records: [{ id, fields }],
      fields,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log("Success:", result);
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

//DELETE Items
export const removeTodo = (id, isLoading, todoList, setTodoList) => {
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
      // .then((result) => {
      //   console.log("Success:", result);
      // })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};
//ADD Items
export const addTodo = (newTodo, setIsLoading, todoList, setTodoList) => {
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
            // Completed: newTodo.completed,
          },
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log("Success:", result);
      setTodoList([...todoList, result.records[0]]);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false);
    });
};
