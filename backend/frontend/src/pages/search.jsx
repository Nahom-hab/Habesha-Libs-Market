import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import ProductCard from '../components/ProductCard';

export default function Search() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;
    const [totalPages, setTotalPages] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const fetchData = async () => {
            setLoading(true); // Set loading to true
            try {
                const res = await fetch(`/api/product/search?${urlParams.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setTotalPages(Math.ceil(data.length / productsPerPage));
                    setProducts(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false when the fetch is complete
            }
        };
        fetchData();
    }, [location.search]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentPage(pageNumber);
            setIsAnimating(false);
        }, 300); // Ensure this matches your transition duration
    };

    return (
        <div>
            <Header />
            <div className="pt-10 flex flex-col items-center justify-center">
                <div className="font-bold text-4xl">Results</div>
                {loading ? ( // Show spinner while loading
                    <div className="mt-8 animate-spin h-10 w-10 border-4 border-[#201408] border-t-transparent rounded-full"></div>
                ) : currentProducts.length === 0 ? ( // No products found
                    <div className="mt-8 text-xl">No products found</div>
                ) : (
                    <div
                        className={`grid grid-cols-2 mt-8 gap-10 lg:grid-cols-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                    >
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
                <div className="flex items-center my-10 gap-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="lg:px-4 px-1 rounded-md py-2 border border-red-950"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`lg:px-4 px-1 lg:h-8 h-6 rounded-md border border-red-950 ${currentPage === index + 1 ? 'bg-red-950 text-white' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="lg:px-4 px-1 rounded-md py-2 border border-red-950"
                    >
                        Next
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}