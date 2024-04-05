import React from "react";
import all_product from '../components/Assets/all_product'
export const ShopContext = createContext(null);


const ShopContextProvider = (props)=>{
    const contextValue = {all_product}

    return (
        <ShopContext.provider value ={contextValue}>
            {props.children}
        </ShopContext.provider>
    )

}
export default ShopContextProvider;