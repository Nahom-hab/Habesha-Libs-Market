import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminNavigation() {
    return (
        <div className="lg:h-screen lg:w-44 border-r border-slate-300 flex lg:flex-col lg:fixed">
            <div className='font-bold hidden lg:block   text-2xl pt-4'>Biruk Habesha</div>
            <nav className="flex lg:flex-col gap-4 p-6 lg:p-8">
                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `text-base font-medium transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold" : "text-gray-800 hover:text-blue-500"
                        }`
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/addproduct"
                    className={({ isActive }) =>
                        `text-base font-medium transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold" : "text-gray-800 hover:text-blue-500"
                        }`
                    }
                >
                    Add Products
                </NavLink>
                <NavLink
                    to="/editElements"
                    className={({ isActive }) =>
                        `text-base font-medium transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold" : "text-gray-800 hover:text-blue-500"
                        }`
                    }
                >
                    Edit Elements
                </NavLink>
            </nav>
        </div>
    );
}
