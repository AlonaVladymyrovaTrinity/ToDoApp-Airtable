import React, {useState} from 'react';
import InputWithLabel from "./InputWithLabel";

const Search = ({onSearch}) => {
    const [timer, setTimer] = useState(null);

    const handleInputChange = (event) => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                const inputValue = event.target.value;
                onSearch(inputValue);
            }, 500)
        );
    }

    return (
        <form>
            <InputWithLabel
                title={'Search'}
                placeholder={'Search for titles'}
                id={'search'}
                name={'search'}
                type={'text'}
                onChange={handleInputChange}
                children
            >
            <strong>Search: </strong>
            </InputWithLabel>
        </form>
    )
};

export default Search;


