import React from 'react';
import { Pizza } from '../../@types/types';
import OnePizza from './onePizza';

function PizzaBlock({
    imageUrl,
    name,
    types,
    sizes,
    price,
    id}: Pizza) {

    return (
        <div className='pizza-block'>
            <OnePizza
            localCartPizzas={null}
            pizza={null}
            fullInfo = {false}
            classname={'pizza-block__'}
            imageUrl={imageUrl}
            name={name}
            types={types}
            sizes={sizes}
            price={price}
            id={id}
            />
        </div>
    )
};

export default PizzaBlock;
