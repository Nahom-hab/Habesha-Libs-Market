import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('q', searchTerm); // Set searchTerm in query params
        navigate(`/search?${urlParams.toString()}`); // Navigate with the search query
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('q');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <form onSubmit={handleSearch} className="flex items-center ml-4 bg-orange-100 p-1 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-orange-100 flex-grow pl-2 lg:text-lg text-[12px] border-none outline-none"
            />
            <button
                type="submit"
                className="bg-transparent border-none text-gray-800 text-xl cursor-pointer hover:text-red-400"
            >
                <FaSearch className="w-10" />
            </button>
        </form>
    );
}
