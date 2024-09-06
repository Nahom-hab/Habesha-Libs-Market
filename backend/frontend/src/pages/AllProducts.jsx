import React from 'react'
import Products from '../components/Products'
import Footer from '../components/footer'
import Header from '../components/header'
import useAdmin from '../zustand/useAdmin';

export default function AllProducts() {
    const { isEng } = useAdmin();

    return (
        <div>
            <Header />
            <Products productpepage={8} name={isEng ? 'Recent Products' : 'የቅርብ ምርቶች'} />
            <Products productpepage={8} name={isEng ? 'Most Selling' : 'በጣም የታወቁ ምርቶች'} />
            <Products productpepage={8} name={isEng ? 'Best Design' : 'ምርጥ ዲዛይን'} />
            <Footer />
        </div>
    )
}
