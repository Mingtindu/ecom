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
function App() {

  return(
    <div>
      
      <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Shop></Shop>}/>
      <Route path='/mens' element={<ShopCategory category="mens"></ShopCategory>}/>
      <Route path='/womens' element={<ShopCategory category="womens"></ShopCategory>}/>
      <Route path='/kids' element={<ShopCategory category="kids"></ShopCategory>}/>
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
