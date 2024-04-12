import React, { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';
import './AddProduct.css';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;


        let formData = new FormData();
        formData.append('product',image);
        


        // API to send data to backend 
        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formData   
        }).then((resp)=>{
            resp.json().then((data)=> {responseData=data}  )

        })
        if(responseData.success){
            product.image= responseData.image_url;
            console.log(product)
        }
    };

    return (
        <div className='add-product'> 
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-item">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} className='addproduct-selector' name="category">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-item">
                <label htmlFor="file-input">
                    <img onChange={imageHandler} src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-image' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>Add</button>
        </div>
    );
};

export default AddProduct;
