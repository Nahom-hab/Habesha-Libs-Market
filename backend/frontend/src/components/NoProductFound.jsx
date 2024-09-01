import React from 'react';
import img from '../assets/no-results.png'
function NoProducts() {
    return (
        <div className="mt-8 p-4 lg:p-32 text-xl text-center text-gray-600">
            <div className="flex mb-32 lg:mb-0 flex-col items-center">
                <img src={img} alt="" className="lg:w-44 lg:h-44 w-20 h-20 text-gray-400 mb-4" />
                <p className="font-semibold text-red-500">No products found</p>
                <p className="text-gray-500 mt-2">Please try adjusting your search</p>
            </div>
        </div>
    );
}

export default NoProducts;
