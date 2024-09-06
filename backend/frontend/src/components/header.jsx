import React, { useState, useRef } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import { FaBars, FaChevronLeft } from 'react-icons/fa';
import img from '../assets/tilet.png';
import useAdmin from '../zustand/useAdmin';

export default function Header() {
    const { setIsEng, isEng } = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        const isEnglish = selectedLanguage === 'English';
        setIsEng(isEnglish);

        // Save language preference to localStorage
        localStorage.setItem('isEng', isEnglish);
    };

    return (
        <div className='relative'>
            <div className='flex p-2 h-18 justify-between'>
                <Link to='/'>
                    <h3 className='text-lg md:text-4xl'>
                        <span className={`font-bold md:text-4xl ${isEng ? '' : 'mr-3'} text-lg`}>{isEng ? 'Teke' : 'ቴክ'}</span>{isEng ? 'Habesha' : 'ሐበሻ'}
                    </h3>
                </Link>
                <div className='flex lg:gap-14 gap-4 justify-between items-center'>
                    <div className='md:flex hidden gap-14 items-center'>
                        <Link to='/' className='text-black'>{isEng ? 'Home' : 'መነሻ'}</Link>
                        <Link to='/about' className='text-black'>{isEng ? 'About' : 'ስለእኛ'}</Link>
                        <Link to='/products' className='text-black'>{isEng ? 'Products' : 'ምርቶች'}</Link>
                    </div>
                    <div className=''>
                        <Search />
                    </div>
                    <FaBars
                        className='md:hidden text-2xl cursor-pointer'
                        onClick={toggleSidebar}
                    />
                    <div>
                        <select
                            className='hidden md:block bg-[#FFF4E9] border-none outline-none'
                            value={isEng ? 'English' : 'Amharic'}
                            onChange={handleLanguageChange}
                        >
                            <option value='English'>{isEng ? 'English' : 'እንግሊዝኛ'}</option>
                            <option value='Amharic'>{isEng ? 'Amharic' : 'አማርኛ'}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Sidebar Menu */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 z-50 right-0   h-full w-64 bg-cover bg-center bg-no-repeat shadow-lg transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{
                    backgroundImage: `url(${img})`
                }}
            >
                <div className='p-4 bg-opacity-70 bg-gray-800 text-white h-full flex flex-col'>
                    <button
                        className='text-3xl font-bold self-start'
                        onClick={toggleSidebar}
                    >
                        <FaChevronLeft />
                    </button>
                    <nav className='mt-8'>
                        <Link to='/' className='block py-2 font-semibold text-xl' onClick={toggleSidebar}>{isEng ? 'Home' : 'መነሻ'}</Link>
                        <Link to='/about' className='block py-2 font-semibold text-xl' onClick={toggleSidebar}>{isEng ? 'About' : 'ስለእኛ'}</Link>
                        <Link to='/products' className='block py-2 font-semibold text-xl' onClick={toggleSidebar}>{isEng ? 'Products' : 'ምርቶች'}</Link>
                    </nav>
                    <div className='mt-auto'>
                        <select
                            className='bg-white text-black border-none outline-none p-2 rounded'
                            value={isEng ? 'English' : 'Amharic'}
                            onChange={handleLanguageChange}
                        >
                            <option value='English'>{isEng ? 'English' : 'እንግሊዝኛ'}</option>
                            <option value='Amharic'>{isEng ? 'Amharic' : 'አማርኛ'}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
