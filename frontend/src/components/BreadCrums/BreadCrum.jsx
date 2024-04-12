import React from "react";
import './BreadCrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const BreadCrum = (props)=>{
    const product = props;
    console.log(product);
    return (
        <div className="breadcrum">
          
            HOME <img src={arrow_icon} alt="" />
            SHOP <img src={arrow_icon} alt="" />
            {console.log(props.id)}
            {
              product.product.category} <img src={arrow_icon} alt="" />
            {product.product.name}

        </div>
    )
}

export default BreadCrum;
