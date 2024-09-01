import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function Products({ name, productpepage }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = productpepage;
    const [totalPages, setTotalPages] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const res = await fetch('/api/product/get');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                    setTotalPages(Math.ceil(data.length / productsPerPage));
                }
            } catch (error) {
                console.error('Error fetching products:', error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [productsPerPage]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setIsAnimating(false);
        }, 300);
    };

    // Determine the pages to display
    const getPaginationGroup = () => {
        const maxPageDisplay = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
        let endPage = Math.min(totalPages, startPage + maxPageDisplay - 1);

        // Adjust startPage if at the last few pages
        if (endPage - startPage < maxPageDisplay - 1) {
            startPage = Math.max(1, endPage - maxPageDisplay + 1);
        }

        return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
    };

    return (
        <div className='pt-10 flex flex-col items-center justify-center'>
            <div className='w-[70%]'>
                <div className='font-bold text-3xl'>{name}</div>
            </div>
            {isLoading ? (
                <div className="mt-8 animate-spin h-10 w-10 border-4 border-[#201408] border-t-transparent rounded-full"></div>

            ) : (
                <div className={`grid grid-cols-2 mt-8 gap-10 lg:grid-cols-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            img={product.imageURLs}
                            name={product.name}
                            description={product.description}
                            regularPrice={product.regularPrice}
                            discountedPercent={product.discountedPercent}
                            tags={product.tags}
                            ViewCount={product.ViewCount}
                        />
                    ))}
                </div>
            )}
            <div className='flex items-center my-10 gap-6'>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='lg:px-4 px-1 rounded-md py-2 border border-red-950'>
                    Previous
                </button>
                {getPaginationGroup().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`lg:px-4 px-3 lg:h-8  h-7 rounded-md border border-red-950 ${currentPage === pageNumber ? 'bg-red-950 text-white' : ''}`}>
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='lg:px-4 px-1 rounded-md py-2 border border-red-950'>
                    Next
                </button>
            </div>
        </div>
    );
}
