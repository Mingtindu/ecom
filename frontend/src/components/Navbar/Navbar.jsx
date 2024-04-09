import React, { useContext, useState,useRef } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";
import nav_dropdown from '../Assets/dropdown_icon.png'

// import ShopContext from '.../Context/ShopContext.jsx'
const Navbar = ()=>{
    const [menu,setMenu]= useState("Shop");
    // const {getTotalCartItems0} = useContext(ShopContext)
    const menuRef = useRef();
    const dropdown_toggle=()=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open');

    }
    return(
        <div className="navbar">
           <div className="nav-logo">
            <img src={logo} alt="logo" />
            <p>SHOPE ME</p>
           </div>
           <img src={nav_dropdown} onClick={dropdown_toggle} alt="" />
           <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("Shop")}}><Link style={{ textDecoration:'none'}} to='/'>Shop</Link>{menu=="Shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Men")}}><Link style={{ textDecoration:'none'}} to='/mens'>Men</Link>{menu=="Men"?<hr/>:<></>}</li>
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