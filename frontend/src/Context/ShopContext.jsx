import React, { useEffect, useState } from "react";
import { createContext } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for(let i = 0;i<=300+1; i++){
        cart[i]=0;
    }
        return cart;
}

const ShopContextProvider = (props)=>{
    const [all_product,setAll_Product]= useState([]);//creted a var using useState
    //function to retrieve data:
    useEffect(()=>{
        fetch('http://localhost:4000/allProducts').
        then((response)=>(response.json()))
        .then((data)=>{setAll_Product(data)});
    },[]);
   
    const [cartItems,setCartItems]= useState(getDefaultCart);
    
    const addToCart = (itemId)=>{

        setCartItems((prev)=>({
            ...prev, [itemId]:prev[itemId]+1,
         

        }));
        console.log(cartItems);

    }
    const removeFromCart = (itemId)=>{

        setCartItems((prev)=>({
            ...prev, [itemId]:prev[itemId]-1
         

        }));
        

    }
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
            return totalAmount;
        }
    }
    const contextValue = {getTotalCartAmount, all_product,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value ={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;