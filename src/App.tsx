import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound/notFound';
import Header from './components/Header/header';
import Home from './components/pages/home';
import LazyHoc from './components/Hocs/lazyHoc';
const PizzaInfo = React.lazy(() => import('./components/pages/pizza'));
const Cart = React.lazy(() => import('./components/pages/cart'));

function App() {

  return (
    <div className="wrapper">
      <BrowserRouter>
      <div className="wrapper">
        <Header/>
        <div className="content">
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={LazyHoc(Cart)}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/home/:id" element={LazyHoc(PizzaInfo)}/>
          <Route path="*" element={<NotFound text={'unfortunately this page is not available in our online store'}/>}/>
         </Routes>
        </div>
      </div>
    </BrowserRouter>
    </div>
  )
}

export default App;
