import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './search.module.scss';
import close from './../../assets/img/close.png';
import search from './../../assets/img/search.png';
import debounce from 'lodash.debounce'; 
import { setValue, getPizzasBySearchAsync } from '../../state/reducers/pizzas';
import { UseTypedDispatch, UseTypedSelector } from '../../@types/types';

const Search = () => {
    const value = UseTypedSelector(({pizzasState}) => pizzasState.value);
    const [localValue, setLocalValue] = useState('')
    const dispatch = UseTypedDispatch()
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(value) {
            dispatch(getPizzasBySearchAsync(value))
        }
    }, [value])

    const cleanSearch = () => {
        setLocalValue('')
        dispatch(setValue(''));
        inputRef.current?.focus()
    };

    const changeInputWith = useCallback(
        debounce((value) => {
            dispatch(setValue(value));
        }, 1000),
        [])

    const addValue = (value: string) => {
        setLocalValue(value)
        changeInputWith(value);
    }

    return (
        <div className={classes.search}>
            <img className={classes.searchIcon} src={search} alt="" />
            <input 
            ref={inputRef}
            placeholder='pizza name...' 
            type="text" 
            value={localValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => addValue(e.target.value)}
            />
            {
                value ?
                <img 
                className={classes.closeIcon} 
                src={close} 
                alt="" 
                onClick={() => cleanSearch()}
                />:
                null
            }
        </div>
    )
};

export default Search;