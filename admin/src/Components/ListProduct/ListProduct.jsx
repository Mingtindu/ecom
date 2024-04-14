import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import croos_icon from '../../assets/cross_icon.png'
const LIstProduct = () => {
  //fetch data from backend API 
  const [allProducts,setAllProduct]= useState([]);

  const fetchInfo = async()=>{
    //fetching data from backend and storing it into allProducts state variable :
    await fetch('http://localhost:4000/allProducts')
    .then((res)=>res.json()).then((data)=>{setAllProduct(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])


  return (
    <div className='list-product'>
    <h1>
      All Products List
    </h1>
    <div className="listproduct-format-main">
      <p>Product</p>
      <p>Title</p>
      <p>Old Price</p>
      <p>New Price</p>
      <p>Category</p>
      <p>Remove</p>
    
    </div>
    <div className="listproduct-all-product">
      <hr />
      {allProducts.map((product,index)=>{
        console.log(product.image);
        return <div key={index} className="listproduct-format-main listproduct-format">
          <img className='listproduct-product-icon' src={product.image} alt="product-img" />
          <p>{product.name}</p>
          <p>${product.old_price}</p>
          <p>#{product.new_price}</p>
          <p>{product.category}</p>
          <img src={croos_icon} alt="" className="listproduct-remove-icon"/>


        
        </div>

      })}

    </div>
    </div>
  )
}

export default LIstProduct