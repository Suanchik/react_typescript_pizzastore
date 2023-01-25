import React from 'react';
import pizzaImg from './../../assets/img/pizza.gif';
import './loading.scss'

const Loading = () => {
    return (
        <div className='loader'>
            <div className='item'>L</div>
            <img className='pizzaImg' src={pizzaImg} alt="pizzaImg" />
            <div className='item'>ading...</div>
        </div>
    )
};

export default Loading;