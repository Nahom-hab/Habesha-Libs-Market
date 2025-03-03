import React, { useState } from 'react';
import AdminNavigation from '../../components/AdminNavigation';
import { FaTimes } from 'react-icons/fa';
import ImageUploader from '../../components/ImageUploader';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = `${new Date().getTime()}_${file.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            null,
            (error) => {
                console.error('Error uploading file', error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
            }
        );
    });
};

export default function AddProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productNameAMH: '',          // New field for Amharic name
        productDescriptionAMH: '',   // New field for Amharic description
        basePrice: '',
        discountPercent: '',
        tags: [],
        imageURLs: [],
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddTag = () => {
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, `#${newTag}`] }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData((prev) => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.productName) newErrors.productName = 'Product Name is required';
        if (!formData.productDescription) newErrors.productDescription = 'Product Description is required';
        if (!formData.productNameAMH) newErrors.productNameAMH = 'Amharic Product Name is required';
        if (!formData.productDescriptionAMH) newErrors.productDescriptionAMH = 'Amharic Product Description is required';
        if (!formData.basePrice) newErrors.basePrice = 'Base Price is required';
        if (!formData.discountPercent) newErrors.discountPercent = 'Discount Percent is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                const imageUploadPromises = imageFiles.map(file => storeImage(file));
                const imageURLs = await Promise.all(imageUploadPromises);

                // Adjusting the form data to match the schema
                const updatedFormData = {
                    name: formData.productName,
                    nameAMH: formData.productNameAMH,           // Added Amharic name field
                    description: formData.productDescription,
                    descriptionAMH: formData.productDescriptionAMH, // Added Amharic description field
                    regularPrice: formData.basePrice,
                    discountedPercent: formData.discountPercent,
                    tags: formData.tags,
                    imageURLs,
                    ViewCount: 0,  // Initializing ViewCount to 0
                };

                const res = await fetch('/api/product/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedFormData),
                });

                if (!res.ok) {
                    throw new Error('Failed to post product');
                }
                navigate('/admin');

                // Clear form after successful submission
                setFormData({
                    productName: '',
                    productDescription: '',
                    productNameAMH: '',           // Clear Amharic name
                    productDescriptionAMH: '',    // Clear Amharic description
                    basePrice: '',
                    discountPercent: '',
                    tags: [],
                    imageURLs: [],
                });
                setImageFiles([]);
            } catch (error) {
                console.error("Error uploading images or posting product:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleImagesSelect = (files) => {
        setImageFiles(files);
    };

    return (
        <div className='flex flex-col lg:flex-row gap-5'>
            <AdminNavigation />
            <div className='lg:pl-48 flex-1 p-5'>
                <div className='font-bold text-2xl mb-5'>Add Products</div>
                <form className='flex flex-col lg:flex-row gap-5' onSubmit={handleSubmit}>
                    <div className='mt-5 flex-1'>
                        {/* General Information */}
                        <div className='rounded-xl border border-slate-300 p-5 mb-5 lg:w-[600px] border-3'>
                            <h2 className='font-bold text-lg mb-3'>General Information</h2>
                            <div className='mb-4'>
                                <label className='block mb-1'>Product Name:</label>
                                <input
                                    name='productName'
                                    value={formData.productName}
                                    onChange={handleChange}
                                    className={`w-full border ${errors.productName ? 'border-red-500' : 'border-slate-300'} outline-none border-none bg-[#ffecd7] p-2 rounded-md`}
                                />
                                {errors.productName && <p className='text-red-500 text-sm'>{errors.productName}</p>}
                            </div>
                            <div className='mb-4'>
                                <label className='block mb-1'>Product Description:</label>
                                <textarea
                                    name='productDescription'
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    className={`w-full border ${errors.productDescription ? 'border-red-500' : 'border-slate-300'} outline-none border-none bg-[#ffecd7] p-2 rounded-md`}
                                />
                                {errors.productDescription && <p className='text-red-500 text-sm'>{errors.productDescription}</p>}
                            </div>
                            <div className='mb-4'>
                                <label className='block mb-1'>Amharic Product Name:</label>
                                <input
                                    name='productNameAMH'
                                    value={formData.productNameAMH}
                                    onChange={handleChange}
                                    className={`w-full border ${errors.productNameAMH ? 'border-red-500' : 'border-slate-300'} outline-none border-none bg-[#ffecd7] p-2 rounded-md`}
                                />
                                {errors.productNameAMH && <p className='text-red-500 text-sm'>{errors.productNameAMH}</p>}
                            </div>
                            <div className='mb-4'>
                                <label className='block mb-1'>Amharic Product Description:</label>
                                <textarea
                                    name='productDescriptionAMH'
                                    value={formData.productDescriptionAMH}
                                    onChange={handleChange}
                                    className={`w-full border ${errors.productDescriptionAMH ? 'border-red-500' : 'border-slate-300'} outline-none border-none bg-[#ffecd7] p-2 rounded-md`}
                                />
                                {errors.productDescriptionAMH && <p className='text-red-500 text-sm'>{errors.productDescriptionAMH}</p>}
                            </div>
                        </div>
                        <div className='rounded-xl border border-slate-300 p-5 mb-5 lg:w-[600px] border-3'>
                            <h2 className='font-bold text-lg mb-3'>Pricing</h2>
                            <div className='mb-4'>
                                <label className='block mb-1'>Base Price:</label>
                                <input
                                    name='basePrice'
                                    value={formData.basePrice}
                                    onChange={handleChange}
                                    type='number'
                                    className={`w-full border ${errors.basePrice ? 'border-red-500' : 'border-slate-300'} outline-none border-none bg-[#ffecd7] p-2 rounded-md`}
                                />
                                {errors.basePrice && <p className='text-red-500 text-sm'>{errors.basePrice}</p>}
                            </div>
                            <div className='mb-4'>
                                <label className='block mb-1'>Discount Percent:</label>
                                <input
                                    name='discountPercent'
                                    value={formData.discountPercent}
                                    onChange={handleChange}
                                    type='number'
                                    className={`w-full border ${errors.discountPercent ? 'border-red-500' : 'border-slate-300'} outline-none border-none bg-[#ffecd7] p-2 rounded-md`}
                                />
                                {errors.discountPercent && <p className='text-red-500 text-sm'>{errors.discountPercent}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='flex-1'>
                        {/* Image Upload */}
                        <div className='mb-5'>
                            <ImageUploader onImagesSelect={handleImagesSelect} formimages={[]} />
                        </div>

                        {/* Tag Selection */}
                        <div className='rounded-xl border border-slate-300 p-5 mb-5 lg:w-[500px] border-3'>
                            <div className='flex justify-between items-center'>
                                <h2 className='font-bold text-lg'>Tags</h2>
                                <div className='flex gap-2'>
                                    <input
                                        type='text'
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        className='p-2 text-sm outline-none border-none bg-[#ffead1] rounded-md flex-1'
                                        placeholder='Add a new tag'
                                    />
                                    <button
                                        type='button'
                                        onClick={handleAddTag}
                                        className='bg-orange-400 hover:bg-orange-500 p-2 text-sm rounded-md text-white'
                                    >
                                        Add Tag
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-2 mt-4'>
                                {formData.tags.map(tag => (
                                    <div key={tag} className='flex items-center text-[12px] bg-[#ffead1] gap-1 rounded px-2 py-1'>
                                        {tag}
                                        <FaTimes
                                            onClick={() => handleRemoveTag(tag)}
                                            className='text-slate-700 hover:text-red-500 cursor-pointer'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='flex justify-center mt-5'>
                            <button
                                type='submit'
                                className='bg-orange-500 w-[98%] text-white py-3 rounded-md hover:bg-orange-600'
                                disabled={loading}
                            >
                                {loading ? 'Posting...' : 'POST PRODUCT'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
