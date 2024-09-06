import React, { useEffect, useState } from 'react';
import habesha from '../../assets/main_habesha.png';
import { FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import AdminNavigation from '../../components/AdminNavigation';
import EditPopup from '../../components/EditPopup';
import useAdmin from '../../zustand/useAdmin';

export default function EditElements() {
    const [formData, setFormData] = useState({
        titleLine1: "Threads of tradition,",
        titleLine2: "Woven With Elegance",
        subtitle: "Threads of tradition woven with elegance",
        phone: "0917804499",
        telegram: "@nahom_han",
        productName: "A big discount on the new event",
        productDesc: "Heritage threads was founded with a passion for Ethiopian culture and a commitment to sharing it with the world.",
        shopAddress: "Shiro Meda mall, Shop 371",
        eventTitle: "A big discount on the new event",
        eventDesc: "Heritage threads was founded with a passion for Ethiopian culture and a commitment to sharing it with the world.",
        productTitle2: "Another product",
        productDesc2: "Details about another product",
        discriptionimg1: "https://www.dagmawit.store/cdn/shop/files/LemonD3.jpg?v=1712473013&width=1946",
        discountText: "15%",
        discountDesc: "Don’t miss out on the incredible savings. Shop now and embrace the elegance of Ethiopian fashion for less.",

        titleLine1AMH: "ባሕላዊ እርቃን,",
        titleLine2AMH: "በተግባር የተፈጠረ",
        subtitleAMH: "ባሕላዊ እርቃን በእብሪት የተሰፈረ",
        productNameAMH: "በአዲሱ እንቅስቃሴ ላይ እጅግ ቅናሽ",
        productDescAMH: "የሄሪታጅ እርቃን በኢትዮጵያ ባሕል ላይ የተደረገ ፍቅርና ዓላማ በዓለም ላይ ለማካፈል ነው።",
        shopAddressAMH: "ሽሮ ሜዳ ማል, እቃ ቤት 371",
        eventTitleAMH: "በአዲሱ እንቅስቃሴ ላይ እጅግ ቅናሽ",
        eventDescAMH: "የሄሪታጅ እርቃን በኢትዮጵያ ባሕል ላይ የተደረገ ፍቅርና ዓላማ በዓለም ላይ ለማካፈል ነው።",
        productTitle2AMH: "ሌላ ምርት",
        productDesc2AMH: "ስለ ሌላ ምርት ዝርዝሮች",
        discountDescAMH: "በሚያስደንቅ ቅናሽ ላይ እቅድ አትፍሉ። አሁን ግዙና በእናት ምርጥ አበል ስለ ኢትዮጵያ አውጁ።"
    });
    const { isEng } = useAdmin();

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
                            <span className='text-2xl lg:text-3xl mb-2 block'>
                                {isEng ? formData.titleLine1 : formData.titleLine1AMH}
                            </span>
                            <span className='text-2xl lg:text-3xl mb-1 block'>
                                {isEng ? formData.titleLine2 : formData.titleLine2AMH}
                            </span>
                        </div>
                        <div className='text-slate-500 text-sm'>
                            {isEng ? formData.subtitle : formData.subtitleAMH}
                        </div>

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
                                <h1 className='text-sm lg:text-lg mb-3 font-bold'>
                                    {isEng ? formData.productName : formData.productNameAMH}
                                </h1>
                                <p className='text-slate-700 text-[9px] lg:text-[12px]'>
                                    {isEng ? formData.productDesc : formData.productDescAMH}
                                </p>
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
                            {isEng ? formData.shopAddress : formData.shopAddressAMH}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row items-center gap-10 mt-20 justify-center'>
                    <div className='flex gap-5'>
                        <div className='flex gap-4 w-96 p-4 items-center justify-center bg-opacity-30 rounded-lg bg-[#c4af8e] h-32'>
                            <img className='w-32 object-cover rounded-xl h-28' src={formImages.discriptionimg1} alt='Event' />
                            <div className='w-56'>
                                <h1 className='text-[14px] mb-2 font-bold'>
                                    {isEng ? formData.eventTitle : formData.eventTitleAMH}
                                </h1>
                                <p className='text-[10px] mb-3'>
                                    {isEng ? formData.eventDesc : formData.eventDescAMH}
                                </p>
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
                                <div className='font-bold text-4xl'>
                                    {isEng ? formData.discountText : formData.discountText}
                                </div>
                                <h1 className='text-[14px] mb-2 font-bold'>
                                    {isEng ? formData.productTitle2 : formData.productTitle2AMH}
                                </h1>
                            </div>
                            <p className='text-[12px] mb-3'>
                                {isEng ? formData.productDesc2 : formData.productDesc2AMH}
                            </p>
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
                    <img className='w-[120px]' src={habesha} alt='Discount' />
                    <div className='w-[33%]'>
                        <div className=' flex gap-2 text-xl'>
                            <span className='font-extrabold'>
                                {formData.discountText}
                            </span>
                            <span>{isEng ? 'Discount' : 'ቅናሽ'}</span>
                        </div>
                        <div className='text-[11px] text-slate-300'>
                            {isEng ? formData.discountDesc : formData.discountDescAMH}
                        </div>
                    </div>
                </div>
            </div>

            {/* Render EditPopup if open */}
            {isPopupOpen && (
                <EditPopup
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                    formData={formData}
                    formImages={formImages}
                    onSave={handleSaveData}
                    currentEditField={currentEditField}
                />
            )}
        </div>
    );
}
