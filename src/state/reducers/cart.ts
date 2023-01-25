import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { CartPizza } from '../../@types/types';

type PizzaCartHalf = {id: number, type: string, size: number};

const lsPizzas = localStorage.getItem('cart');
const lsTotalPrice = localStorage.getItem('price');
const lsTotalCount = localStorage.getItem('count');
const findElement = (el: CartPizza, action: PayloadAction<CartPizza | PizzaCartHalf>) => el.id === action.payload.id && el.type === action.payload.type && el.size === action.payload.size

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        pizzas: lsPizzas ? JSON.parse(lsPizzas): [] as CartPizza[],
        totalPrice: lsTotalPrice ? JSON.parse(lsTotalPrice): 0 as number,
        totalCount: lsTotalCount ? JSON.parse(lsTotalCount): 0 as number
    },
    reducers: {
        addPizzaToCart(state, action: PayloadAction<CartPizza>) {
            const pizza = state.pizzas.find((el: CartPizza) => findElement(el, action));
            // if(!pizza){
            //     const newPizza = action.payload;
            //     state.pizzas = [...state.pizzas, newPizza];
            // } else {
            //     state.pizzas = [...state.pizzas].map(el => {
            //         if(el.id === action.payload.id && el.type === action.payload.type && el.size === action.payload.size) {
            //             el.pizzaLength = el.pizzaLength + 1;
            //             el.pizzaPrice = el.pizzaPrice + el.price
            //             return el
            //         } else {
            //             return el
            //         }
            //     });
            // };
            if(!pizza){
                state.pizzas = [...state.pizzas, action.payload];
            } else {
                pizza.pizzaLength++;
                pizza.pizzaPrice = pizza.pizzaPrice + pizza.price
            };
            const addingPrice = pizza?.price ? pizza.price: action.payload.price;
            state.totalPrice = state.totalPrice + addingPrice;
            state.totalCount = state.totalCount + 1
        },
        deleteOnePizzaFromCart(state, action: PayloadAction<PizzaCartHalf>) {
            const pizza = state.pizzas.find((el: CartPizza) => findElement(el, action));
            if(pizza && pizza?.pizzaLength > 1) {
                state.pizzas = [...state.pizzas].filter(el => {
                    if(findElement(el, action)) {
                        el.pizzaLength = el.pizzaLength - 1;
                        el.pizzaPrice = el.pizzaPrice - el.price
                        return el
                    } else {
                        return el
                    }
                });
                state.totalPrice = state.totalPrice - pizza.price;
                state.totalCount = state.totalCount - 1;
            }
        },
        deleteTypePizza(state, action: PayloadAction<PizzaCartHalf>) {
            const pizza = state.pizzas.find((el: CartPizza) => findElement(el, action));
            const newPizzas = [...state.pizzas].filter(el => el.id !== action.payload.id || el.type !== action.payload.type || el.size !== action.payload.size);
            state.pizzas = newPizzas
            if(pizza) {
                state.totalPrice = state.totalPrice - pizza.pizzaPrice;
                state.totalCount = state.totalCount - pizza.pizzaLength;
            }
        },
        deleteAllPizzas(state) {
            state.pizzas = [];
            state.totalPrice = 0;
            state.totalCount = 0;
        }
    }
});


export const {addPizzaToCart, deleteOnePizzaFromCart, deleteTypePizza, deleteAllPizzas} = cartSlice.actions
export default cartSlice.reducer