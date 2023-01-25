import axios from "axios"
import { FilerObj } from "../@types/types"

export const PizzasApi = {
    getPizzas(activSort: FilerObj, activCategories: number) {
        return axios.get(`https://63930fbf11ed187986a94794.mockapi.io/pizzas?category=${activCategories ? activCategories: ''}&sortBy=${activSort.name}&order=${activSort.type}`)
    },
    getPizzasBySearch(value: string) {
        return axios.get(`https://63930fbf11ed187986a94794.mockapi.io/pizzas?search=${value}`)
    },
    getOnePizza(id: string | number | undefined) {
        return axios.get(`https://63930fbf11ed187986a94794.mockapi.io/pizzas?id=${id}`)
    }
}