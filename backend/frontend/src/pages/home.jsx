import React, { useEffect, useState } from 'react';
import habesha from '../assets/main_habesha.png';
import { FaMapMarkerAlt } from 'react-icons/fa';
import img2 from '../assets/teke3.png';
import img4 from '../assets/Teke21.jpg';
import Products from '../components/Products';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Home() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Backup data in case of API failure
    const backupData = {
        titleLine1: 'Threds of tradition,',
        titleLine2: 'Woven With Elegance',
        subtitle: 'Threds of tradition woven with elegance',
        phone: '0917804499',
        telegram: '@nahom_han',
        productName: 'A big discount on the new event',
        productDesc: 'heritage threds was founded with a passion for ethiopian culture and a comitmrnt of sharing it with the world',
        shopAddress: 'Shiro Meda mall, Shop 371',
        eventTitle: 'A big discount on the new event',
        eventDesc: 'heritage threds was founded with a passion for ethiopian culture and a comitmrnt of sharing it with the world',
        productTitle2: 'Another product',
        productDesc2: 'Details about another product',
        discriptionimg1: img4,
        discountText: '15%',
        discountDesc: 'Dont miss out on the incredible savings. Shop now and embrace the elegance of Ethiopian fashion for less.',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/element/');

                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                } else {
                    console.error('Failed to fetch data');
                    setData(backupData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData(backupData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div>
                <Header />
                <div className='flex items-center justify-center mt-44'>
                    <div className="mt-8 animate-spin h-20 w-20 border-4 border-[#201408] border-t-transparent rounded-full"></div>

                </div>
            </div>)
    }

    if (error) {
        return <div>Error loading data. Please try again later.</div>;
    }

    const {
        titleLine1,
        discriptionimg1,
        titleLine2,
        subtitle,
        productName,
        productDesc,
        shopAddress,
        eventTitle,
        eventDesc,
        productTitle2,
        productDesc2,
        discountText,
        discountDesc
    } = data || backupData;

    return (
        <div>
            <Header />
            <div className='flex flex-col items-center lg:flex-row xl:justify-between mt-5 justify-center'>
                <div className='lg:ml-28 mb-10 lg:mb-0 mt-5'>
                    <div className='font-bold'>
                        <span className='text-3xl lg:text-5xl mb-2 block'>{titleLine1}</span>
                        <span className='text-3xl lg:text-5xl mb-2 block'>{titleLine2}</span>
                    </div>
                    <div className='text-slate-500 text-md mb-2 lg:text-xl'>{subtitle}</div>

                    <button className='bg-black py-1 px-3 border-none rounded-lg text-white mt-4'>Shop now</button>
                </div>
                <div>
                    <div className='flex justify-center mt-12 ml-7 lg:mr-12'>
                        <img className='relative right-2 w-64 z-10' src={habesha} alt="" />
                        <div className='relative top-10 right-24 bg-[#c4af8e] bg-opacity-30 shadow-lg h-40 lg:h-44 p-5 rounded-lg w-[260px]'>
                            <h1 className='text-sm lg:text-xl font-bold'>
                                <span className='block'>{productName}</span>
                            </h1>
                            <p className='text-slate-700 text-[9px] mb-2 lg:text-[12px]'>{productDesc2}</p>

                            <button className='bg-[#ff4500] px-2 lg:px-4 relative shadow-black left-12 lg:shadow-md shadow-sm lg:left-36 lg:rounded-xl rounded-lg lg:font-bold font-medium'>Order now</button>
                        </div>
                    </div>
                    <div className='flex gap-2 justify-center lg:justify-normal mt-5 lg:ml-40 items-center'>
                        <FaMapMarkerAlt className='text-2xl text-[#ff4500]' />
                        {shopAddress}
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center gap-10 mt-20 justify-center'>
                <div className='flex gap-4 w-96 p-4 pt-5 pb-5 items-center justify-center bg-opacity-30 rounded-lg bg-[#c4af8e] h-32'>
                    <img className='w-32 object-cover rounded-xl h-28' src={discriptionimg1} alt="" />
                    <div className='w-56'>
                        <h1 className='text-[14px] mb-2 font-bold'>{eventTitle}</h1>
                        <p className='text-[10px] mb-3'>{eventDesc}</p>
                        <button className='bg-black rounded-md ml-32 px-3 py-1 text-[12px] text-white'>Read more</button>
                    </div>
                </div>
                <div className='gap-4 w-72 p-5 hidden lg:flex flex-col bg-opacity-30 rounded-lg bg-[#c4af8e] h-32'>
                    <div className='flex justify-start items-end gap-3'>
                        <div className='font-bold text-4xl'>{discountText}</div>
                        <h1 className='text-[14px] mb-2 font-bold'>{productTitle2}</h1>
                    </div>

                    <p className='text-[12px] mb-3'>{productDesc}</p>
                </div>
            </div>
            <div>
                <Products productpepage={8} name={'Products'} />
            </div>
            <div className='flex mt-10 mb-10 text-white h-[120px] justify-center bg-[#201408] items-center gap-3 lg:gap-8'>
                <img className='w-[120px]' src={habesha} alt="" />
                <div className='w-[20%]'>
                    <div className='font-bold'>
                        <span className='text-xl lg:text-4xl'>{discountText}</span>
                        <span className='text-md'>Discount</span>
                    </div>
                    <p className='text-[10px] lg:text-[12px] text-slate-300'>{discountDesc}</p>
                </div>
                <div className='bg-[#FFF4E9] px-5 py-1 rounded-3xl flex gap-6'>
                    <button className='text-white rounded-2xl px-4 lg:text-[14px] text-[10px] bg-[#201408]'>Get Product</button>
                    <button className='text-white rounded-2xl px-4 lg:text-[14px] text-[10px] bg-[#201408]'>Products</button>
                </div>
                <img className="hidden lg:block w-[120px]" src={habesha} alt="" />
            </div>
            <div className='pt-10 flex flex-col items-center justify-center'>
                <Products productpepage={4} name={''} />
            </div>
            <Footer />
        </div>
    );
}
