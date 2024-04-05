import React from "react";
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from'../components/Offers/Offers'
import NewCollections from '../components/NewCollections/NewCollections'
import NewsLetter from "../components/NewsLetter/NewsLetter";
const Shop = ()=>{
    return(
        <div>
            <Hero></Hero>
            <Popular></Popular>
            <Offers></Offers>
            <NewCollections></NewCollections>
            <NewsLetter></NewsLetter>

        </div>
    )

}
export default Shop;