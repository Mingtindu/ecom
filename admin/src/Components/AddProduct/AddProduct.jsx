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
        let responseData = {}; // Initialize response data object
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);
    
        try {
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });
    
            // Check if the upload was successful
            if (!uploadResponse.ok) {
                throw new Error('Upload failed');
            }
    
            // Parse the JSON response
            responseData = await uploadResponse.json();
            console.log('Response Data:', responseData); // Debugging output
    
            // Check if the upload was successful on the backend
            if (responseData.success) {
                
                product.image= responseData.image_url;
                console.log(product)
                await fetch('http://localhost:4000/addProduct',{
                    method:'POST',
                    headers:{
                        Access:'application/json',
                       'Content-Type':'application/json'
                    },
                    body:JSON.stringify(product)
                }).then((resp)=>resp.json()).then((data)=>{
                    data.success?alert("Product Added"):alert("Failed")
                })
            } else {
                throw new Error('Upload failed on the server');
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred. Please try again.');
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
