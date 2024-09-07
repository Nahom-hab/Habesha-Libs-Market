import React from 'react';
import { NavLink } from 'react-router-dom';
import useAdmin from '../zustand/useAdmin';

export default function AdminNavigation() {
    const { isEng, setIsEng } = useAdmin()
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        const isEnglish = selectedLanguage === 'English';
        setIsEng(isEnglish);

        // Save language preference to localStorage
        localStorage.setItem('isEng', isEnglish);
    };
    return (
        <div className="lg:h-screen lg:w-44 border-r border-slate-300  flex justify-evenly lg:justify-normal lg:flex-col lg:fixed">
            <div className='font-bold hidden lg:block   text-2xl pt-4'>Teke Habesha</div>
            <nav className="flex lg:flex-col gap-4 p-5 lg:p-8">
                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `text-base font-medium transition-colors duration-300 ${isActive ? "text-yellow-600 font-semibold" : "text-gray-800 hover:text-yellow-600"
                        }`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/addproduct"
                    className={({ isActive }) =>
                        `text-base font-medium transition-colors duration-300 ${isActive ? "text-yellow-600 font-semibold" : "text-gray-800 hover:text-yellow-600"
                        }`
                    }
                >
                    Add Products
                </NavLink>
                <NavLink
                    to="/editElements"
                    className={({ isActive }) =>
                        `text-base font-medium transition-colors duration-300 ${isActive ? "text-yellow-600 font-semibold" : "text-gray-800 hover:text-yellow-600"
                        }`
                    }
                >
                    Edit Elements
                </NavLink>
                <div className='lg:mt-32 lg:ml-0 ml-6'>
                    <select
                        className='lg:block bg-[#FFF4E9] border-none outline-none'
                        value={isEng ? 'English' : 'Amharic'}
                        onChange={handleLanguageChange}
                    >
                        <option value='English'>English</option>
                        <option value='Amharic'>Amharic</option>
                    </select>
                </div>

            </nav>

        </div>
    );
}
