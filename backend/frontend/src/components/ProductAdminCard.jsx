import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ProductAdminCard({ img, name, id, onDelete }) {

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/product/delete/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete product');
            }

            // Call the onDelete callback to refresh the product list
            onDelete();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert('Failed to delete the product. Please try again.');
        }
    };

    return (
        <div className='lg:w-[200px] w-[160px] bg-[#201408] rounded-xl overflow-hidden shadow-md shadow-black relative'>
            {/* Image container */}
            <div className='relative overflow-hidden lg:w-[196px] w-[156px] h-[200px] ml-[2px] lg:h-[230px]'>
                <img className='w-full h-full object-cover ' src={img} alt={name} />

                {/* Delete icon */}
                <div className='absolute top-2 right-2'>
                    <FaTrashAlt onClick={handleDelete} className='text-white text-xl cursor-pointer hover:text-red-500' />
                </div>
            </div>

            {/* Content */}
            <div className='flex p-1 pr-3 text-white bg-[#201408] justify-between items-center'>
                <div className='pl-2'>
                    <div className='text-[13px] font-bold'>{name}</div>
                    <div className='font-light text-[12px]'>More detail</div>
                </div>
                <Link to={`/editproduct/${id}`}>
                    <FaEdit className='hover:text-red-500 text-xl' />
                </Link>
            </div>
        </div>
    );
}
