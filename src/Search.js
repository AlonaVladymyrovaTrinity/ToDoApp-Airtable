import React, {useState} from 'react';
//import React from 'react';
import InputWithLabel from "./InputWithLabel";

const Search = ({todoList, onFilter}) => {
    const [searchInput, setSearchInput] = useState("");
//    const [filteredTodoList, setFilteredTodoList] = useState(todoList);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);
  
      const filteredList = todoList.filter((todo) =>
        todo.fields.Title.toLowerCase().includes(inputValue.toLowerCase())
      );
     // setFilteredTodoList(filteredList);
      onFilter(filteredList);
      };
// const [timer, setTimer] = useState(null);

//    let handleSearch = function (event) {
//         if (timer) {
//             clearTimeout(timer);
//             setTimer(null);
//         }
//         setTimer(
//             setTimeout(() => {
//                 const searchInput = event.target.value.toLowerCase();
//                 const filteredTodoList = todoList.filter((todo) =>
//                   todo.title && todo.title.toLowerCase().includes(searchInput)
//                 );
//                 onSearch(filteredTodoList);
//               }, 1000)
//         );
//     }

    return (
        <form>
            <InputWithLabel
                title={'Search'}
                placeholder={'Search for titles'}
                id={'search'}
                name={'search'}
                type={'text'}
                value={searchInput}
                onChange={handleInputChange}
                children
            >
            <strong>Search: </strong>
            </InputWithLabel>
        </form>
    )
};

export default Search;


