import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { PizzasApi } from '../../api/api';
import { FilerObj, Pizza } from '../../@types/types';

export const getPizzasAsync = createAsyncThunk(
    'pizzas/getPizzas',
    async function(sortsAndCategories: {activSort: FilerObj, activCategories: number}) {
        const {data} = await PizzasApi.getPizzas(sortsAndCategories.activSort, sortsAndCategories.activCategories);
        return data as Pizza[]
    }
);

export const getPizzasBySearchAsync = createAsyncThunk(
    'pizzas/getPizzasBySearch',
    async (value: string) => {
        const {data} = await PizzasApi.getPizzasBySearch(value);
        return data as Pizza[]
    }
);

export const getOnePizzahAsync = createAsyncThunk(
    'pizzas/getPizza',
    async (id: string | undefined) => {
        const {data} = await PizzasApi.getOnePizza(id);
        return data as Pizza[]
    }
);

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState: {
        pizzas: [] as Array<Pizza>,
        pizza: null as Pizza | null,
        isLoading: false as boolean,
        value: '' as string,
        error: '' as string
    },
    reducers: {
        setPizzas(state, action: PayloadAction<Pizza[]>) {
            state.pizzas = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setValue(state, action: PayloadAction<string>) {
            state.value = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getPizzasAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPizzasAsync.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
            state.isLoading = false;
            state.pizzas = action.payload;
        });
        builder.addCase(getPizzasAsync.rejected, (state) => {
            state.isLoading = false;
            state.error = 'ошибка при получении пицц'
        });
        builder.addCase(getPizzasBySearchAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPizzasBySearchAsync.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
            state.isLoading = false;
            state.pizzas = action.payload;
        });
        builder.addCase(getPizzasBySearchAsync.rejected, (state) => {
            state.isLoading = false;
            state.error = 'ошибка при получении пицц'
        });
        builder.addCase(getOnePizzahAsync.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getOnePizzahAsync.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
            state.isLoading = false;
            state.pizza = action.payload[0];
        });
        builder.addCase(getOnePizzahAsync.rejected, (state) => {
            state.error = 'ошибка при получении пиццы';
            state.isLoading = false;
        })
    }
});


export const {setPizzas, setIsLoading, setValue} = pizzasSlice.actions
export default pizzasSlice.reducer