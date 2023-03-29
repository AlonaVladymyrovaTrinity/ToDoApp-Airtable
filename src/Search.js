//import React, {useState} from 'react';
import React from 'react';
import InputWithLabel from "./InputWithLabel";

const Search = ({value, onSearch}) => {
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        onSearch(inputValue);
    //const [filteredTodoList, setFilteredTodoList] = useState([]);

    // const handleSearch = (event) => {
    // const searchInput = event.target.value.toLowerCase();
    // const filteredList = todoList.filter((todo) =>
    // todo.title && todo.title.toLowerCase().includes(searchInput));
    // setFilteredTodoList(filteredList);
    // onSearch(filteredList);
    }
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
                value={value}
                onChange={handleInputChange}
                children
            >
            <strong>Search: </strong>
            </InputWithLabel>
        </form>
    )
};

export default Search;


