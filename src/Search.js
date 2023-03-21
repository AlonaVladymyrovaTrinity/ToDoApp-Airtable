import React from 'react';
import InputWithLabel from "./InputWithLabel";

let Search = function ({onSearch}) {
    const [timer, setTimer] = React.useState(null);

   let onChange = function (event) {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                const searchInput = event.target.value
                onSearch(searchInput);
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
                onChange={onChange}
                children
            >
            <strong>Search: </strong>
            </InputWithLabel>
        </form>
    )
};

export default Search;


