import React, { useEffect, useState } from 'react';
import habesha from '../../assets/main_habesha.png';
import { FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import img1 from '../../assets/teke1.png';
import AdminNavigation from '../../components/AdminNavigation';
import EditPopup from '../../components/EditPopup';

export default function EditElements() {
    const [formData, setFormData] = useState({
        titleLine1: 'Threads of tradition,',
        titleLine2: 'Woven With Elegance',
        subtitle: 'Threads of tradition woven with elegance',
        phone: '0917804499',
        telegram: '@nahom_han',
        shopAddress: 'Shiro Meda mall, Shop 371',
        discountText: '15%',
        discountDesc: 'Don\'t miss out on the incredible saving. Shop now and embrace the elegance of Ethiopian fashion for less',
        productName: 'New Cross design Habesha kemis',
        productDesc: 'This cross design is the best design that has traditional significance',
        eventTitle: 'A big discount on the new event',
        eventDesc: 'Heritage threads was founded with a passion for Ethiopian culture and a commitment to sharing it with the world',
        productTitle2: 'Embrace Ethiopian Culture',
        productDesc2: 'Heritage threads was founded with a passion for Ethiopian culture and a commitment to sharing it with the world',
    });

    const [formImages, setFormImages] = useState({
        discriptionimg1: '',
        advertizeIMG: habesha,
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentEditField, setCurrentEditField] = useState(null);

    useEffect(() => {
        const fetchElement = async () => {
            try {
                const response = await fetch('/api/element/');
                if (response.ok) {
                    const element = await response.json();
                    setFormData(element);
                    setFormImages({
                        discriptionimg1: element.discriptionimg1,
                        discriptionimg2: element.discriptionimg2,
                        advertizeIMG: element.advertizeIMG,
                    });
                } else {
                    console.error('Failed to fetch element');
                }
            } catch (error) {
                console.error('Error fetching element:', error);
            }
        };

        fetchElement();
    }, []);

    const handleEditClick = (field) => {
        setCurrentEditField(field);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSaveData = (newData) => {
        setFormData(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <div>
            <AdminNavigation />
            <div className='lg:ml-44'>
                <div className='font-bold text-2xl pt-4 ml-10'>Edit Elements</div>
                <div className='flex flex-col items-center lg:flex-row lg:justify-between justify-center'>
                    <div className='lg:ml-28 mb-10 lg:mb-0 mt-10'>
                        <div className='flex justify-end'>
                            <FaEdit
                                className='flex text-blue-500 text-3xl cursor-pointer'
                                onClick={() => handleEditClick('titleSubtitle')}
                                aria-label='Edit Title and Subtitle'
                            />
                        </div>
                        <div className='font-bold'>
                            <span className='text-2xl lg:text-3xl mb-2 block'>{formData.titleLine1}</span>
                            <span className='text-2xl lg:text-3xl mb-1 block'>{formData.titleLine2}</span>
                        </div>
                        <div className='text-slate-500 text-sm'>{formData.subtitle}</div>

                        <button className='bg-black py-1 px-3 border-none rounded-lg text-white mt-4'>
                            Shop now
                        </button>
                    </div>
                    <div>
                        <div className='flex justify-center'>
                            <FaEdit
                                className='flex text-blue-500 text-3xl cursor-pointer'
                                onClick={() => handleEditClick('product')}
                                aria-label='Edit Product'
                            />
                        </div>
                        <div className='flex justify-center ml-7 lg:mr-12'>
                            <img className='relative right-2 z-10' src={habesha} alt='Habesha' />
                            <div className='relative top-10 right-20 bg-[#c4af8e] bg-opacity-30 shadow-lg h-40 lg:h-44 p-5 rounded-lg w-[220px]'>
                                <h1 className='text-sm lg:text-lg mb-3 font-bold'>{formData.productName}</h1>
                                <p className='text-slate-700 text-[9px] lg:text-[12px]'>{formData.productDesc}</p>
                                <button className='bg-[#ff4500] px-2 lg:px-4 relative lg:top-3 top-2 shadow-black left-16 lg:shadow-md shadow-sm lg:left-32 lg:rounded-xl rounded-lg lg:font-bold font-medium'>
                                    Order now
                                </button>
                            </div>
                        </div>
                        <div className='flex gap-2 mt-12 ml-40 items-center'>
                            <div className='flex justify-end'>
                                <FaEdit
                                    className='flex text-blue-500 text-3xl cursor-pointer'
                                    onClick={() => handleEditClick('address')}
                                    aria-label='Edit Address'
                                />
                            </div>
                            <FaMapMarkerAlt className='text-2xl text-[#ff4500]' />
                            {formData.shopAddress}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row items-center gap-10 mt-20 justify-center'>
                    <div className='flex gap-5'>

                        <div className='flex gap-4 w-96 p-4 items-center justify-center bg-opacity-30 rounded-lg bg-[#c4af8e] h-32'>
                            <img className='w-32 object-cover rounded-xl h-28' src={formImages.discriptionimg1} alt='Event' />
                            <div className='w-56'>
                                <h1 className='text-[14px] mb-2 font-bold'>{formData.eventTitle}</h1>
                                <p className='text-[10px] mb-3'>{formData.eventDesc}</p>
                                <button className='bg-black rounded-md ml-32 px-3 py-1 text-white text-[12px]'>
                                    Order now
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <FaEdit
                                className='flex text-blue-500 text-3xl cursor-pointer'
                                onClick={() => handleEditClick('event')}
                                aria-label='Edit Event'
                            />
                        </div>
                    </div>

                    <div className='flex gap-5'>
                        <div className='gap-4 w-72 p-5  flex flex-col bg-opacity-30 rounded-lg bg-[#c4af8e] h-32'>

                            <div className='flex justify-start items-end gap-3'>
                                <div className='font-bold text-4xl'>{formData.discountText}</div>
                                <h1 className='text-[14px] mb-2 font-bold'>{formData.productTitle2}</h1>
                            </div>

                            <p className='text-[12px] mb-3'>{formData.productDesc}</p>

                        </div>
                        <div className='flex justify-center'>
                            <FaEdit
                                className='flex text-blue-500 text-3xl cursor-pointer'
                                onClick={() => handleEditClick('product2')}
                                aria-label='Edit Product 2'
                            />
                        </div>
                    </div>
                </div>
                <div className='flex mb-10 mt-20 text-white h-[120px] justify-center bg-[#201408] items-center gap-3 lg:gap-8'>
                    <div className='flex justify-center'>
                        <FaEdit
                            className='flex text-blue-500 text-3xl cursor-pointer'
                            onClick={() => handleEditClick('discount')}
                            aria-label='Edit Discount'
                        />
                    </div>
                    <img className='w-[120px]' src={formImages.advertizeIMG} alt='Discount' />
                    <div className='w-[33%]'>
                        <div className=' flex gap-2 text-xl'> <span className='font-extrabold'>{formData.discountText} </span> <span>Discount</span> </div>
                        <div className='text-[11px] text-slate-300'>{formData.discountDesc}</div>
                    </div>
                </div>``
            </div>

            {/* Render EditPopup if open */}
            {
                isPopupOpen && (
                    <EditPopup
                        isOpen={isPopupOpen}
                        onClose={handleClosePopup}
                        formData={formData}
                        formImages={formImages}
                        onSave={handleSaveData}
                        currentEditField={currentEditField}
                    />
                )
            }
        </div >
    );
}
