import React from 'react';
import Sidebar from '../components/Sidebar';
import { GoDownload } from 'react-icons/go';
import { IoDocument } from 'react-icons/io5';

function Notice() {

    return (
        <div
            className="relative flex min-h-screen border border-transparent"
            style={{ fontFamily: 'montserrat' }}
        >
            {/* Sidebar */}
            <Sidebar />

            <div className="mt-28 md:mt-26 w-full flex flex-col">
                {/* Header */}
                <div
                    className="w-full md:px-9 px-4 flex items-center justify-between"
                    style={{ fontFamily: 'Syne' }}
                >
                    <h1 className="text-4xl tracking-wide text-black font-extrabold">
                        Notice
                    </h1>
                </div>

                {/* Notice Cards */}
                <div className="w-full h-full flex gap-4 flex-wrap p-8">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="max-w-[220px] max-h-[260px] h-full w-full flex flex-col gap-2 rounded-md border border-black/20 group bg-white/40 hover:bg-white/70 backdrop-blur-2xl transition-all duration-250 hover:shadow-lg"
                        >
                            <div className="p-4">
                                <div>
                                    <IoDocument className="w-full h-full text-black/70" />
                                </div>
                                <div className="flex gap-2 items-center justify-between">
                                    <h1 className="font-bold text-black">
                                        Board Of Directors
                                    </h1>
                                    <GoDownload
                                        size={20}
                                        className="cursor-pointer"
                                    />
                                </div>
                                <div className="mt-1">
                                    <p className="text-sm text-black/80">
                                        Date: 20th October, 2023
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notice;
