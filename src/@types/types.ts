import { TypedUseSelectorHook, useSelector,useDispatch } from "react-redux"
import { AppDispatch, AppThunkDispatch, RootState } from "../state/store"

export type Pizza = {
    id: number,
    imageUrl: any,
    name: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number
  }

  export type CartPizza = {
    id: number,
    imageUrl: string,
    name: string,
    type: string,
    size: number,
    price: number,
    pizzaLength: number,
    pizzaPrice: number
  }
  

  export type FilerObj = {
    name: string,
    type: string
  }

  export const UseTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  // export const UseTypedDispatch = () => useDispatch<AppDispatch>();
  export const UseTypedDispatch = () => useDispatch<AppThunkDispatch>();