import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePizzahAsync } from '../../state/reducers/pizzas';
import { CartPizza, Pizza, UseTypedDispatch, UseTypedSelector } from '../../@types/types';
import OnePizza from '../PizzaBlock/onePizza';
import './pizza.scss'
import Loading from '../Loading/loading';

const PizzaInfo: React.FC = () => {

    const {id} = useParams<{id: string}>();
    const loading = UseTypedSelector(({pizzasState}) => pizzasState.isLoading);
    const pizza = UseTypedSelector(({pizzasState}) => pizzasState.pizza);
    const cartPizza = UseTypedSelector(({cartState}) => cartState.pizzas);
    const [pizzaLocal, setPizzaLocal] = useState<Pizza | null>(null);
    const [localCartPizzas, setLocalCartPizzas] = useState<CartPizza[]>([])
    const dispatch = UseTypedDispatch()

    useEffect(() => {
        dispatch(getOnePizzahAsync(id));
    }, []);

    useEffect(() => {
        setLocalCartPizzas(cartPizza.filter((el: CartPizza) => el.id === Number(id)))
    }, [cartPizza])

    useEffect(() => {
        setPizzaLocal(pizza);
    }, [pizza]);

    return (
        <>
        {
            !loading ? 
            <div>
                {
                pizzaLocal &&
                <div className='pizza'>
                    <OnePizza
                    fullInfo={true}
                    localCartPizzas={localCartPizzas}
                    pizza={pizzaLocal}
                    classname={'pizza__'}
                    imageUrl={pizzaLocal.imageUrl}
                    name={pizzaLocal.name}
                    types={pizzaLocal.types}
                    sizes={pizzaLocal.sizes}
                    price={pizzaLocal.price}
                    id={id ? id: 0}
                    />
                </div>
                }
            </div>:
            <Loading/>
        }
        </>
    )
}

export default PizzaInfo;
