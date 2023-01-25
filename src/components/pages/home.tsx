import React, { useEffect, useRef, useState } from 'react';
import { getPizzasAsync } from '../../state/reducers/pizzas';
import * as qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Sorts, { sorts } from '../Sorts/sorts';
import { FilerObj, Pizza, UseTypedDispatch, UseTypedSelector } from '../../@types/types';
import Categories from '../Categories/categories';
import PizzaLoudingBlock from '../PizzaBlock/PizzaLoudingBlock';
import PizzaBlock from '../PizzaBlock/pizzaBlock';
import NotFound from '../NotFound/notFound';

function Home() {

  const pizzas = UseTypedSelector(({pizzasState}) => pizzasState.pizzas);
  const isLoading = UseTypedSelector(({pizzasState}) => pizzasState.isLoading);
  const value = UseTypedSelector(({pizzasState}) => pizzasState.value);
  const dispatch = UseTypedDispatch();
  const novigate = useNavigate();
  const firstRender = useRef(false)

  const [activSort, setActivSort] = useState<FilerObj>({name: 'rating', type: 'desc'});
  const [doAxios, setdoAxios] = useState<'yes' | 'no'>('no');
  const [activCategories, setActivCategories] = useState(0);

  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find(el => el.type === params.type && el.name === params.sortName);
      setActivCategories(Number(params.categorie));
      setActivSort(sort ? sort: {name: 'rating', type: 'desc'});
    }
    setdoAxios('yes');
  }, [])

  useEffect(() => {
    if(!value && doAxios === 'yes'){
      dispatch(getPizzasAsync({activSort: activSort, activCategories: activCategories}))
    };
  }, [activSort, activCategories, value, doAxios]);

  useEffect(() => {
    if(firstRender.current){
      const querystring = qs.stringify({
      sortName: activSort.name,
      categorie: activCategories,
      type: activSort.type
    });
    novigate(`?${querystring}`)
  };
  firstRender.current = true;
  }, [activSort, activCategories])

  return (
    <div className="container">
      <div className="content__top">
        <Categories activCategories={activCategories} chooseACategory={(category: number) => setActivCategories(category)}/>
        <Sorts activSort={activSort} chooseASort={(sort: FilerObj) => setActivSort(sort)}/>
      </div>
      <h2 className="content__title">Всe пиццы</h2>
      <div className="content__items">
        {
          pizzas?.length && !isLoading
          ?
            pizzas.map((pizza: Pizza) => <PizzaBlock
            key={pizza.id}
            {...pizza}
            />)
          :
          !isLoading ?
          <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
            <NotFound text={'There is no such pizza in our store'}/>
          </div>:
          Array(10).fill(0).map((pizza, index) => <PizzaLoudingBlock key={index}/>)
        }
      </div>
    </div>
  )
}

export default Home;