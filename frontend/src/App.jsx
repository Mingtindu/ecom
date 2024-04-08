import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ShopCategory from './pages/ShopCategory.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import LoginSignup from './pages/LoginSignup.jsx'
import Shop from './pages/Shop.jsx'
import Footer from './components/Footer/Footer.jsx'
import men_banner from './components/Assets/banner_mens.png';
import women_banner from './components/Assets/banner_women.png';
import kid_banner from './components/Assets/banner_kids.png';

function App() {

  return(
    <div>
      
      <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Shop></Shop>}/>
      <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"></ShopCategory>}/>
      <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"></ShopCategory>}/>
      <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"></ShopCategory>}/>
      <Route path='/product' element= {<Product></Product>}>
        <Route path=':productId' element={<Product></Product>}></Route>
      </Route>

      <Route path='/cart' element={<Cart></Cart>}/>
      <Route path='/login' element={<LoginSignup></LoginSignup>}/>


      
    </Routes>
   <Footer></Footer>
   
    </BrowserRouter>
    </div>
  )

    

  
}

export default App
