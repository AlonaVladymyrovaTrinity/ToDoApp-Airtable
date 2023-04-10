const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;
const API_ENDPOINT_TABLES = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;

//GET Items
export const getTodoList = (setTodoList, setIsLoading) => {
  fetch(`${API_ENDPOINT}/Default/?${Date.now()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      "Cache-Control": "no-cache",
      SameSite: "None",
      Secure: true,
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
      setIsLoading(false);
      throw error;
    });
};
//UPDATE Items
export const editTitleAndData = (id, title, done, todoList, setTodoList) => {
  const newTodoList = todoList.map((todo) => {
    if (todo.id === id) {
      //if type of data in db in column done is string:
      // const newFields = { ...todo.fields, Title: title, done: done };
      //if type of data in db in field done is Checkbox:
      const newFields = done
        ? { ...todo.fields, Title: title, done: done }
        : { ...todo.fields, Title: title, done: null };
      // console.log(newFields);
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
  fetch(`${API_ENDPOINT}/Default/${id}?_=${Date.now()}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      "Cache-Control": "no-cache",
      SameSite: "None",
      Secure: true,
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

    fetch(`${API_ENDPOINT}/Default/${id}`, {
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
  fetch(`${API_ENDPOINT}/Default/`, {
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
            //is type of data in db in column done is string:
            //done: "false",
            //if type of data in db in field done is Checkbox:
            done: null,
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
//CREATE new table
export const createNewTable = (
  newListName,
  setIsListsLoading,
  setCustomTodoLists,
  customTodoLists
) => {
  setIsListsLoading(true);
  fetch(`${API_ENDPOINT_TABLES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN_CREATE_TABLE}`,
    },
    body: JSON.stringify({
      description: "A new todo list",
      fields: [
        {
          description: "Custom todo list",
          name: "Title",
          type: "multilineText",
        },
        {
          name: "done",
          options: {
            color: "greenBright",
            icon: "check",
          },
          type: "checkbox",
        },
      ],
      name: newListName,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log("Success:", result);
      setCustomTodoLists([...customTodoLists, result]);
      setIsListsLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsListsLoading(false);
    });
};
//GET table names
export const getBaseSchema = (setCustomTodoLists, setIsListsLoading) => {
  fetch(`${API_ENDPOINT_TABLES}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN_GET_DB_SCHEMA}`,
      "Cache-Control": "no-cache",
      SameSite: "None",
      Secure: true,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log("Success:", result);
      setCustomTodoLists(result.tables);
      setIsListsLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsListsLoading(false);
      throw error;
    });
};
