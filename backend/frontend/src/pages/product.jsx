import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FaShoppingCart, FaTelegramPlane } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        // Fetch the product data by ID
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/product/get/${id}`);
                const data = await response.json();
                setProduct(data);
                setCurrentImage(data.imageURLs[0]); // Set the first image as the current image
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className='flex lg:flex-row flex-col items-center mt-5  justify-center'>
                <div className='flex flex-col justify-center items-center'>
                    <img className='lg:m-5 mb-6 rounded-xl w-[400px] h-[430px] lg:w-[500px] lg:h-[500px] object-cover' src={currentImage} alt={product.name} />
                    <div className='flex lg:ml-5 gap-3'>
                        {product.imageURLs.map((url, index) => (
                            <img
                                key={index}
                                className='w-[70px] rounded-lg h-[80px] object-cover'
                                onClick={() => setCurrentImage(url)}
                                src={url}
                                alt={product.name}
                            />
                        ))}
                    </div>
                </div>
                <div className='pt-10 p-2 w-[340px] lg:w-[500px]'>
                    <div className='flex justify-between'>
                        <div className='text-[23px] lg:text-4xl'>
                            <span className='text-slate-500'>Name:</span> {product.name}
                        </div>
                        <div className='rounded-full lg:text-lg text-[15px] h-16 w-18 flex ml-2 p-3 font-bold text-center items-center  bg-green-600 text-white'>
                            {product.discountedPercent}% OFF
                        </div>
                    </div>

                    <div className='mt-4 text-md lg:text-lg text-slate-600'>
                        <span className='text-lg lg:text-2xl text-black'>Description:</span> {product.description}
                    </div>
                    <div className='mt-5 gap-3 flex text-xl'>
                        <span className='text-2xl'>Price:</span>
                        <div className='flex gap-3'>
                            <span className='text-2xl text-green-500'>{product.regularPrice - (product.regularPrice * product.discountedPercent / 100)} birr</span>
                            <span className='text-red-600 text-md mt-1 line-through'>{product.regularPrice} birr</span>
                        </div>
                    </div>
                    <div className='mt-5 flex gap-3 text-2xl'>
                        <span>Tags:</span>
                        <div className='flex flex-wrap gap-2 text-[15px]'>
                            {product.tags.map((tag, index) => (
                                <span key={index} className='bg-[#ffead1] rounded-2xl px-2'>{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className='mt-10 mb-20 flex gap-5 flex-col lg:flex-row items-center'>
                        <div className='text-lg lg:text-2xl hover:opacity-50 items-center flex gap-2 rounded-xl bg-green-500 text-white p-2 w-fit'>
                            <FaShoppingCart className='text-xl lg:text-2xl' />
                            Order Now
                        </div>
                        <ul className="flex gap-5">
                            <li><a href="#" aria-label="Facebook" className="text-3xl hover:text-4xl text-blue-800 hover:text-[#61dafb]"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                            <li><a href="#" aria-label="Twitter" className="text-3xl hover:text-4xl text-sky-400 hover:text-[#61dafb]"><FontAwesomeIcon icon={faTwitter} /></a></li>
                            <li><a href="#" aria-label="Instagram" className="text-3xl hover:text-4xl text-red-500 hover:text-[#61dafb]"><FontAwesomeIcon icon={faInstagram} /></a></li>
                            <li><a href="" aria-label="LinkedIn" className="text-3xl hover:text-4xl text-blue-950 hover:text-[#61dafb]"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                            <li><a href="https://t.me/nahom_hab" aria-label="GitHub" className="text-3xl hover:text-4xl text-blue-300 hover:text-[#61dafb]"><FaTelegramPlane /></a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
