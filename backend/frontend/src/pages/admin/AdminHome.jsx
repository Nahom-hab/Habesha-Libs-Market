import React, { useEffect, useState } from 'react';
import AdminNavigation from '../../components/AdminNavigation';
import ProductAdminCard from '../../components/ProductAdminCard';
import useAdmin from '../../zustand/useAdmin';

export default function AdminHome() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/product/get');
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div>
                <AdminNavigation />
                <div className='flex items-center justify-center pt-44'>
                    <div className="mt-8 animate-spin h-20 w-20 border-4 border-[#201408] border-t-transparent rounded-full"></div>

                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminNavigation />
            <div>
                <div className='font-bold text-2xl lg:ml-52 ml-10 pt-4 h-9'>Overview Products</div>
                <div className='pt-10 lg:ml-44 flex flex-col items-center justify-center flex-wrap'>
                    <div className='mt-2 grid gap-4 lg:gap-10 grid-cols-2 lg:grid-cols-4'>
                        {products.map(product => (
                            <ProductAdminCard
                                key={product._id}
                                img={product.imageURLs[0]} // Assuming the first image is used for the card
                                id={product._id}
                                name={product.name}
                                onDelete={fetchProducts}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
