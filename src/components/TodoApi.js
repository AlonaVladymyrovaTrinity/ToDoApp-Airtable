import PropTypes from "prop-types";
import { sortingBy } from "./SortingBy";

const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;
const API_ENDPOINT_TABLES = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;

//GET Items from todo list. Using Fetch API, GET table records from Airtable for the given tableName
export const getTodoList = (setTodoList, setIsLoading, tableName) => {
  fetch(
    `${API_ENDPOINT}/${tableName}`,
    // ?sort[0][field]=Title&sort[0][direction]=asc`,
    // ?view=Grid%20view&sort[0][field]=done&sort[0][direction]=asc
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Cache-Control": "no-cache",
        SameSite: "None",
        Secure: true,
      },
    }
  )
    //Response is being parsed as JSON using the response.json() method
    .then((response) => response.json())
    .then((result) => {
      // console.log("Success:", result.records);
      // console.log("GET result:", JSON.stringify(result.records));

      //Sort response data by one or more properties
      const sortedList = sortingBy(null, null, result.records);
      //Set todoList state to sorted data
      setTodoList(sortedList);
      // setTodoList(result.records);

      //Set isLoading to false
      setIsLoading(false);
    })
    //If the request fails, the .catch() callback is called and logs the error to the console
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false);
      throw error;
    });
};

getTodoList.propTypes = {
  setTodoList: PropTypes.func,
  setIsLoading: PropTypes.func,
  tableName: PropTypes.string,
};

//ADD Items to todo list. Using Fetch API, POST new record to Airtable with the given title field value
export const addTodo = (
  newTodo,
  setIsLoading,
  todoList,
  setTodoList,
  tableName
) => {
  setIsLoading(true);
  fetch(`${API_ENDPOINT}/${tableName}`, {
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
    //Response is being parsed as JSON using the response.json() method
    .then((response) => response.json())
    .then((result) => {
      // console.log("Success:", result);

      //Set todoList state to a new Array containing the added record
      //(Bonus) Re-sort list data
      const sortedList = sortingBy(null, null, [
        ...todoList,
        result.records[0],
      ]);
      setTodoList(sortedList);

      // setTodoList([...todoList, result.records[0]]);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsLoading(false);
    });
};
addTodo.propTypes = {
  newTodo: PropTypes.object,
  setIsLoading: PropTypes.func,
  todoList: PropTypes.object,
  setTodoList: PropTypes.func,
  tableName: PropTypes.string,
};

//DELETE Items from todo list. Using Fetch API, Delete record from Airtable given id
export const removeTodo = (id, isLoading, todoList, setTodoList, tableName) => {
  if (!isLoading) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    //Set todoList state to new Array NOT containing the removed record
    setTodoList(newTodoList);

    fetch(`${API_ENDPOINT}/${tableName}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      //Response is being parsed as JSON using the response.json() method
      .then((response) => response.json())
      // .then((result) => {
      //   console.log("Success:", result);
      // })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};
removeTodo.propTypes = {
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  todoList: PropTypes.object,
  setTodoList: PropTypes.func,
  tableName: PropTypes.string,
};

//UPDATE Items in todo list
export const editTitleAndData = (
  id,
  title,
  done,
  todoList,
  setTodoList,
  tableName
) => {
  const newTodoList = todoList.map((todo) => {
    if (todo.id === id) {
      //if type of data in db in column done is string:
      // const newFields = { ...todo.fields, Title: title, done: done };
      //if type of data in db in field done is Checkbox:
      const newFields = done
        ? { ...todo.fields, Title: title, done: done }
        : { ...todo.fields, Title: title, done: null };
      // console.log(JSON.stringify(newFields));
      updateAirtableRecord(todo.id, newFields, tableName); // update the record in Airtable
      return { id: todo.id, createdTime: todo.createdTime, fields: newFields };
    } else {
      return todo;
    }
  });
  const sortedList = sortingBy(null, null, newTodoList);
  setTodoList(sortedList);
  // setTodoList(newTodoList);
  // updateAirtableRecord(id, newTodoList.find((todo) => todo.id === id).fields);
};

editTitleAndData.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  done: PropTypes.bool,
  todoList: PropTypes.object,
  setTodoList: PropTypes.func,
  tableName: PropTypes.string,
};

export const updateAirtableRecord = (id, fields, tableName) => {
  if (typeof fields !== "object") {
    console.error("Error: fields parameter must be an object");
    return;
  }

  fetch(`${API_ENDPOINT}/${tableName}/${id}`, {
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
updateAirtableRecord.propTypes = {
  id: PropTypes.string,
  fields: PropTypes.object,
  tableName: PropTypes.string,
};

//CREATE new table (new todo list)
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
        /**** I will keep this code below for the future (commented out) because Airtable didn't support creating fields with type createdTime at this time:
         **   "type": "UNSUPPORTED_FIELD_TYPE_FOR_CREATE",
         **   "message": "Invalid options for newListName.Created time: Creating createdTime fields is not supported at this time"*/
        //   {
        //     name: "Created time",
        //     options: {
        //         result: {
        //             type: "dateTime",
        //                 options: {
        //                     dateFormat: {
        //                         name: "local",
        //                         format: "l"
        //                     },
        //                     timeFormat: {
        //                         name: "12hour",
        //                         format: "h:mma"
        //                     },
        //                     timeZone: "America/Los_Angeles"
        //                 }
        //         }
        //     },
        //     type: "createdTime"
        // }
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

createNewTable.propTypes = {
  newListName: PropTypes.string,
  setIsListsLoading: PropTypes.func,
  setCustomTodoLists: PropTypes.func,
  customTodoLists: PropTypes.array,
};

//GET table names (todo list names)
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

getBaseSchema.propTypes = {
  setCustomTodoLists: PropTypes.func,
  setIsListsLoading: PropTypes.func,
};
