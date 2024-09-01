import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ name, img, id }) {
    const navigate = useNavigate()

    const handleclick = () => {
        navigate(`/product/${id}`)
    }

    return (

        <div onClick={handleclick} key={id} className='lg:w-[200px] w-[160px]    bg-[#201408] rounded-xl overflow-hidden shadow-md shadow-black'>
            <div className='overflow-hidden lg:w-[196px] w-[156px] h-[200px]  ml-[2px] lg:h-[230px]'>
                <img className='w-full h-full  object-cover transform transition-transform duration-300 ease-in-out hover:scale-125' src={img} alt="" />
            </div>
            <div className='flex p-1 pr-3 text-white bg-[#201408] justify-between items-center'>
                <div className='pl-2'>
                    <div className='text-[13px] font-bold'>{name}</div>
                    <div className='font-light text-[12px]'>More detail</div>
                </div>
                <FaShoppingCart className='text-2xl' />
            </div>
        </div>
    )
}
