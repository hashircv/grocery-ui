import React from 'react'
import Banner from "../../components/banner/Banner";
import CategoryGrid from "../../components/category/CategoryGrid";
import StoresSection from "../../components/StoresCard";
import Brands from "../../components/Brands";
import ProductSections from "../../components/products";
function Home() {
    return (
        <div>
            <Banner />
            <CategoryGrid />
            <StoresSection />
            <Brands />
            <ProductSections />
        </div>
    )
}

export default Home;
