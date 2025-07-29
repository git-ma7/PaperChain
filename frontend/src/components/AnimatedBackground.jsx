import React from 'react';

function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Blur Blob 1 */}
            <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-30 rounded-full filter blur-3xl animate-blob1 top-10 left-40"></div>

            {/* Blur Blob 2 */}
            <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 opacity-20 rounded-full filter blur-3xl animate-blob2 bottom-20 right-40"></div>

            {/* Blur Blob 3 */}
            <div className="absolute w-[250px] h-[250px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 opacity-25 rounded-full filter blur-3xl animate-blob3 bottom-1/4 right-1/3"></div>
        </div>
    );
}

export default AnimatedBackground;
