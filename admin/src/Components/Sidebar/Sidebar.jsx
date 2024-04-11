import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import list_product_icon from '../../assets/Product_list_icon.svg'
import add_product_icon from '../../assets/Product_Cart.svg'
export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addProduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listProduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p> Product List</p>
            </div>
        </Link>

    </div>
  )
}
export default Sidebar;