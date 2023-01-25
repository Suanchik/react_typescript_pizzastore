import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '../Button/button';
import { addPizzaToCart } from '../../state/reducers/cart';
import { CartPizza, UseTypedDispatch, UseTypedSelector } from '../../@types/types';

type OnePizzaProps = {
    localCartPizzas: CartPizza[] | null,
    fullInfo: null | boolean,
    classname: string,
    pizza: {} | null,
    imageUrl: string,
    name: string,
    types: number[], 
    sizes: number[],
    price: number,
    id: string | number
}


const OnePizza: React.FC<OnePizzaProps> = ({ localCartPizzas = null, fullInfo = null, classname, pizza = null, imageUrl,name, types, sizes, price, id}) => {

    const [priceFromType, setPriceFromType] = useState(0);
    const [activClassTypes, setActivClassTypes] = useState(0);
    const [activClassSizes, setActivClassSizes] = useState(26);
    const [pizzaCount, setPizzaCount] = useState(0);

    const pizzasCart = UseTypedSelector(({ cartState }) => cartState.pizzas);
    const dispatch = UseTypedDispatch()

    const typeNames: string[] = ['тонкое', 'традиционное'];

    useEffect(() => {
        const filterdPizzas = [...pizzasCart].filter((el: CartPizza) => el.id === +id);
        const count = filterdPizzas.reduce((total, el: CartPizza) => {
            return total + el.pizzaLength
        }, 0)
        setPizzaCount(count ? count: 0)
    }, [pizza]);

    useEffect(() => {
        if(typeNames[activClassTypes] === 'тонкое' && activClassSizes === 26) {
            setPriceFromType(price)
        } else if(typeNames[activClassTypes] === 'тонкое' && activClassSizes === 30) {
            setPriceFromType(price + 20)
        } else if(typeNames[activClassTypes] === 'тонкое' && activClassSizes === 40) {
            setPriceFromType(price + 30)
        } else if(typeNames[activClassTypes] === 'традиционное' && activClassSizes === 26) {
            setPriceFromType(price + 30)
        } else if(typeNames[activClassTypes] === 'традиционное' && activClassSizes === 30) {
            setPriceFromType(price + 40)
        } else if(typeNames[activClassTypes] === 'традиционное' && activClassSizes === 40) {
            setPriceFromType(price + 50)
        }
    }, [activClassTypes, activClassSizes, pizza]);

    const addPizza = () => {
        const NewPizza = {
            id: +id,
            imageUrl: imageUrl,
            name: name,
            type: typeNames[activClassTypes],
            size: activClassSizes,
            price: priceFromType,
            pizzaLength: 1,
            pizzaPrice: priceFromType
        };
        dispatch(addPizzaToCart(NewPizza));
        setPizzaCount((pizzaCount) => pizzaCount + 1)
    }

    return (
        <>
            <div className='ImgName'>
                <NavLink to={'/home/' + id}>
                    <img
                        className={`${classname}image`}
                        src={imageUrl}
                        alt="Pizza"
                    />
                </NavLink>
                <h4 className={`${classname}title`}>{name}</h4>
            </div>
            <div>
                <div className={`${classname}selector`}>
                    <ul>
                        {
                            types?.map((type) => 
                            <li 
                            key={type}
                            onClick={() => setActivClassTypes(type)}
                            className={type === activClassTypes || types.length === 1 ? 'active': ''}
                            >
                                {typeNames[type]}
                            </li>)
                        }
                    </ul>
                    <ul>
                        {
                            sizes.map((size) => 
                            <li 
                            key={size}
                            onClick={() => setActivClassSizes(size)}
                            className={size === activClassSizes ? 'active': ''}
                            >
                                {size} cm
                            </li>)
                        }
                    </ul>
                </div>
                <div className={`${classname}bottom`}>
                    <div className={`${classname}price`}>{priceFromType} ₽</div>
                    <Button
                    onClick={() => addPizza()}
                        className="button button--outline button--add"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        <i>{pizzaCount}</i>
                    </Button>
                </div>
                {
                fullInfo && 
                <div className='fullInfoo'>
                    <h3>in cart</h3>
                    {
                        localCartPizzas?.length ? 
                        localCartPizzas.map(el => 
                            <div className='item'>
                                <span>{el.type}</span>
                                <span>{el.size} см.</span>
                                <span className='lengthOfpizza'>{el.pizzaLength}</span>
                            </div>):
                            <div className='empty'>
                                no added in cart
                            </div>
                    }
                </div>
                }
            </div>
        </>
    )
}

export default OnePizza;