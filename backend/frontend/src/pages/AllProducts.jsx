import React from 'react'
import Products from '../components/Products'
import Footer from '../components/footer'
import Header from '../components/header'

export default function AllProducts() {
    return (
        <div>
            <Header />

            <Products productpepage={8} name={'Recent Products'} />
            <Products productpepage={8} name={'Most Selling'} />
            <Products productpepage={8} name={'Best Design'} />
            <Footer />
        </div>
    )
}
