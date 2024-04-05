import React, { useState } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";
const Navbar = ()=>{
    const [menu,setMenu]= useState("Shop");
    return(
        <div className="navbar">
           <div className="nav-logo">
            <img src={logo} alt="logo" />
            <p>SHOPE ME</p>
           </div>
           <ul className="nav-menu">
            <li onClick={()=>{setMenu("Shop")}}><Link style={{ textDecoration:'none'}} to='/'>Shop</Link>{menu=="Shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Men")}}><Link style={{ textDecoration:'none'}} to='/men'>Men</Link>{menu=="Men"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Women")}}><Link style={{ textDecoration:'none'}} to='/womens'>Womens</Link> {menu=="Women"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Kids")}}><Link style={{ textDecoration:'none'}} to='/kids'>Kids</Link> {menu=="Kids"?<hr/>:<></>}</li>

           </ul>
           <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'> <img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">

            </div>

           </div>

        </div>
    )
}

export default Navbar;