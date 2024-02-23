import PropTypes from 'prop-types';
import { sortingBy } from './SortingBy';

const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}`;
const API_ENDPOINT_TABLES = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;

//GET Items from todo list.Function getTodoList does the following:
//Using Fetch API, GET table records from Airtable for the given tableName
export const getTodoList = async (setTodoList, setIsLoading, tableName) => {
  await fetch(
    `${API_ENDPOINT}/${tableName}`,
    // ?sort[0][field]=Title&sort[0][direction]=asc`,
    // ?view=Grid%20view&sort[0][field]=done&sort[0][direction]=asc
    {
      method: 'GET',
      headers: {
        //Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN_GET_DATA_FROM_TABLE}`,
        // 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        // SameSite: 'None',
        // Secure: true,
      },
    }
  )
    //Response is being parsed as JSON using the response.json() method
    .then((response) => response.json())
    .then((result) => {
      //Sort response data by one or more properties
      const sortedList = sortingBy(null, null, result.records);
      //Set todoList state to sorted data
      setTodoList(sortedList);

      //Set isLoading to false
      setIsLoading(false);
    })
    //If the request fails, the .catch() callback is called and logs the error to the console
    .catch((error) => {
      console.error('Error:', error);
      setIsLoading(false);
      throw error;
    });
};

getTodoList.propTypes = {
  setTodoList: PropTypes.func,
  setIsLoading: PropTypes.func,
  tableName: PropTypes.string,
};

//ADD Items to todo list. Function named addTodo that does the following:
//Using Fetch API, POST new record to Airtable with the given title field value
export const addTodo = async (
  newTodo,
  setIsLoading,
  todoList,
  setTodoList,
  tableName
) => {
  setIsLoading(true);
  await fetch(`${API_ENDPOINT}/${tableName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN_CREATE_EDIT_DELETE_DATA_FROM_TABLE}`,
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            Title: newTodo.title,
            done: null,
          },
        },
      ],
    }),
  })
    //Response is being parsed as JSON using the response.json() method
    .then((response) => response.json())
    .then((result) => {
      //Set todoList state to a new Array containing the added record
      //(Bonus) Re-sort list data
      const sortedList = sortingBy(null, null, [
        ...todoList,
        result.records[0],
      ]);
      setTodoList(sortedList);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Error:', error);
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

//DELETE Items from todo list. Function named removeTodo with parameter id that does the following:
//Using Fetch API, Delete record from Airtable given id
export const removeTodo = async (
  id,
  isLoading,
  todoList,
  setTodoList,
  tableName
) => {
  if (!isLoading) {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    //Set todoList state to new Array NOT containing the removed record
    setTodoList(newTodoList);

    await fetch(`${API_ENDPOINT}/${tableName}/${id}`, {
      method: 'DELETE',
      headers: {
        // Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN_CREATE_EDIT_DELETE_DATA_FROM_TABLE}`,
      },
    })
      //Response is being parsed as JSON using the response.json() method
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
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
      const newFields = done
        ? { ...todo.fields, Title: title, done: done }
        : { ...todo.fields, Title: title, done: null };
      updateAirtableRecord(todo.id, newFields, tableName); // update the record in Airtable
      return { id: todo.id, createdTime: todo.createdTime, fields: newFields };
    } else {
      return todo;
    }
  });
  const sortedList = sortingBy(null, null, newTodoList);
  setTodoList(sortedList);
};

editTitleAndData.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  done: PropTypes.bool,
  todoList: PropTypes.object,
  setTodoList: PropTypes.func,
  tableName: PropTypes.string,
};
//Function updateAirtableRecord updates the records in Airtable
export const updateAirtableRecord = async (id, fields, tableName) => {
  if (typeof fields !== 'object') {
    console.error('Error: fields parameter must be an object');
    return;
  }

  await fetch(`${API_ENDPOINT}/${tableName}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN_CREATE_EDIT_DELETE_DATA_FROM_TABLE}`,
      // 'Cache-Control': 'no-cache',
      // SameSite: 'None',
      // Secure: true,
    },
    body: JSON.stringify({
      fields,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};
updateAirtableRecord.propTypes = {
  id: PropTypes.string,
  fields: PropTypes.object,
  tableName: PropTypes.string,
};

//CREATE new table (new todo list)
export const createNewTable = async (
  newListName,
  setIsListsLoading,
  setCustomTodoLists,
  customTodoLists
) => {
  setIsListsLoading(true);
  await fetch(`${API_ENDPOINT_TABLES}`, {
    method: 'POST',
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN_CREATE_TABLE}`,
    },
    body: JSON.stringify({
      description: 'A new todo list',
      fields: [
        {
          description: 'Custom todo list',
          name: 'Title',
          type: 'multilineText',
        },
        {
          name: 'done',
          options: {
            color: 'greenBright',
            icon: 'check',
          },
          type: 'checkbox',
        },
      ],
      name: newListName,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      setCustomTodoLists([...customTodoLists, result]);
      setIsListsLoading(false);
    })
    .catch((error) => {
      console.error('Error:', error);
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
export const getBaseSchema = async (setCustomTodoLists, setIsListsLoading) => {
  await fetch(`${API_ENDPOINT_TABLES}`, {
    method: 'GET',
    // mode: 'cors',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN_GET_DB_SCHEMA}`,
      // 'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      // SameSite: 'None',
      // Secure: true,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      setCustomTodoLists(result.tables);
      setIsListsLoading(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsListsLoading(false);
      throw error;
    });
};

getBaseSchema.propTypes = {
  setCustomTodoLists: PropTypes.func,
  setIsListsLoading: PropTypes.func,
};
