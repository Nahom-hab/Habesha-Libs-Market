import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Update the path to where your firebase.js file is

const EditPopup = ({ isOpen, onClose, formData, formImages, onSave, currentEditField }) => {
    const [localFormData, setLocalFormData] = useState(formData);
    // const [localImages, setLocalImages] = useState(formImages);

    useEffect(() => {
        setLocalFormData(formData);
        // setLocalImages(formImages);
    }, [formData, formImages]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // const handleImageChange = async (e) => {
    //     const { name, files } = e.target;
    //     if (files.length > 0) {
    //         const file = files[0];
    //         const storageRef = ref(storage, `images/${name}/${file.name}`);
    //         try {
    //             await uploadBytes(storageRef, file);
    //             const downloadURL = await getDownloadURL(storageRef);
    //             setLocalImages(prevImages => ({ ...prevImages, [name]: downloadURL }));
    //         } catch (error) {
    //             console.error("Error uploading image: ", error);
    //         }
    //     }
    // };

    const handleSave = async () => {
        try {
            const response = await fetch('/api/element/update/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...localFormData }),
            });

            if (response.ok) {
                const updatedElement = await response.json();
                onSave(updatedElement);
                onClose();
            } else {
                console.error('Failed to update element', await response.text());
            }
        } catch (error) {
            console.error('Error updating element:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg w-11/12 lg:w-1/2'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold mb-4'>Edit {currentEditField}</h2>
                    <button onClick={onClose}>
                        <FaTimes className='text-2xl text-red-500' />
                    </button>
                </div>
                <div className='mb-4'>
                    {/* Render input fields based on currentEditField */}
                    {currentEditField === 'titleSubtitle' && (
                        <>
                            <input
                                type='text'
                                name='titleLine1'
                                value={localFormData.titleLine1}
                                onChange={handleInputChange}
                                placeholder='Title Line 1'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            <input
                                type='text'
                                name='titleLine2'
                                value={localFormData.titleLine2}
                                onChange={handleInputChange}
                                placeholder='Title Line 2'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            <input
                                type='text'
                                name='subtitle'
                                value={localFormData.subtitle}
                                onChange={handleInputChange}
                                placeholder='Subtitle'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                        </>
                    )}
                    {currentEditField === 'product' && (
                        <>
                            <input
                                type='text'
                                name='productName'
                                value={localFormData.productName}
                                onChange={handleInputChange}
                                placeholder='Product Name'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            <input
                                type='text'
                                name='productDesc'
                                value={localFormData.productDesc}
                                onChange={handleInputChange}
                                placeholder='Product Description'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                        </>
                    )}
                    {currentEditField === 'address' && (
                        <input
                            type='text'
                            name='shopAddress'
                            value={localFormData.shopAddress}
                            onChange={handleInputChange}
                            placeholder='Shop Address'
                            className='block mb-2 w-full p-2 border border-gray-300 rounded'
                        />
                    )}
                    {currentEditField === 'event' && (
                        <>
                            <input
                                type='text'
                                name='eventTitle'
                                value={localFormData.eventTitle}
                                onChange={handleInputChange}
                                placeholder='Event Title'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            <input
                                type='text'
                                name='eventDesc'
                                value={localFormData.eventDesc}
                                onChange={handleInputChange}
                                placeholder='Event Description'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            {/* <input
                                type='file'
                                name='eventImage'
                                onChange={handleImageChange}
                                className='block mb-2'
                            />
                            {localImages.eventImage && <img src={localImages.eventImage} alt='Event' className='w-24 h-24 object-cover' />} */}
                        </>
                    )}
                    {currentEditField === 'product2' && (
                        <>
                            <input
                                type='text'
                                name='discountText'
                                value={localFormData.discountText}
                                onChange={handleInputChange}
                                placeholder='Discount Text'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            <input
                                type='text'
                                name='productTitle2'
                                value={localFormData.productTitle2}
                                onChange={handleInputChange}
                                placeholder='Product Title 2'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            <input
                                type='text'
                                name='productDesc2'
                                value={localFormData.productDesc2}
                                onChange={handleInputChange}
                                placeholder='Product Description 2'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                        </>
                    )}
                    {currentEditField === 'discount' && (
                        <>
                            <input
                                type='text'
                                name='discountText'
                                value={localFormData.discountText}
                                onChange={handleInputChange}
                                placeholder='Discount Text'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            <input
                                type='text'
                                name='discountDesc'
                                value={localFormData.discountDesc}
                                onChange={handleInputChange}
                                placeholder='Discount Description'
                                className='block mb-2 w-full p-2 border border-gray-300 rounded'
                            />
                            {/* <input
                                type='file'
                                name='advertizeIMG'
                                onChange={handleImageChange}
                                className='block mb-2'
                            />
                            {localImages.advertizeIMG && <img src={localImages.advertizeIMG} alt='Discount' className='w-24 h-24 object-cover' />} */}
                        </>
                    )}
                </div>
                <div className='flex justify-end gap-4'>
                    <button
                        onClick={onClose}
                        className='bg-gray-500 text-white px-4 py-2 rounded'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className='bg-blue-500 text-white px-4 py-2 rounded flex items-center'
                    >
                        <FaSave className='mr-2' /> Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
