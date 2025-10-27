import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { GoDownload } from 'react-icons/go';
import { IoDocument } from 'react-icons/io5';
import { AiFillFileImage, AiOutlineClose } from 'react-icons/ai';

function Notice() {
    const [isUploading, setIsUploading] = useState(false); 
    const [file,setFile] = useState(null);


    const handleUploadClick = () => {
        setIsUploading(true);
    };

    const handleCloseClick = () => {
        setIsUploading(false);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const upload = async(e) => {
        e.preventDefault();
        if (!file){
            alert("Select a file first");
            return;
        }
        const formData = new FormData();
        formData.append('file',file);

        try{
            const res = await axios.post("http://localhost:8000/docs/upload",formData,{
                headers:{ 'Content-Type': 'multipart/form-data' },
            });
            alert("Upload successfull");
            console.log(res);
        }catch(err){
            console.log(err);
            alert("Upload failed");
        }
    }

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
                    <button
                        className="relative cursor-pointer border border-black/30 mr-19 text-sm sm:w-[10rem] block my-2 md:my-0 md:ml-3 py-2 px-6 md:px-2 rounded-md text-center transition-all duration-500 text-black group hover:bg-black hover:border-black hover:text-white"
                        onClick={handleUploadClick}
                    >
                        <span className="absolute inset-0 border-2 border-black rounded-md transition-transform duration-500 transform scale-0 group-hover:scale-100"></span>
                        <span className="relative">Upload</span>
                    </button>
                </div>

                {/* Upload Modal */}
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-all duration-300 ${isUploading
                        ? 'opacity-100 visible z-30'
                        : 'opacity-0 invisible'
                        }`}
                >
                    <div
                        className={`relative z-30 max-w-[80%] md:max-w-[40%] w-full bg-white shadow-lg rounded-lg p-4 transition-transform duration-300 ${isUploading ? 'translate-y-0' : '-translate-y-20'
                            }`}
                        id="pop-up"
                    >
                        {/* Close Button */}
                        <div
                            className="absolute z-30 p-2 bg-white rounded-md right-0 -top-10 sm:top-0 sm:-right-10 cursor-pointer hover:bg-gray-100 transition"
                            onClick={handleCloseClick}
                        >
                            <AiOutlineClose />
                        </div>

                        {/* Form Content */}
                        <form className="p-2 flex flex-col items-center justify-center border rounded-md">
                            <h1 className="capitalize text-base sm:text-lg md:text-2xl font-bold my-2 text-center">
                                Select the file for upload
                            </h1>
                            <div className="mt-3 w-full px-4 sm:px-2 flex flex-col items-center justify-center">
                                <div className="relative w-full mx-auto my-3">
                                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange}/>
                                    <label
                                        htmlFor="file-upload"
                                        className="group flex flex-col justify-center items-center w-full h-28 sm:h-40 border-2 border-dashed border-black rounded-md cursor-pointer transition-all duration-300 hover:border-gray-700 focus-within:border-gray-700"
                                    >
                                        <div className="flex flex-col items-center justify-center py-6">
                                            <AiFillFileImage className="text-3xl md:text-4xl" />
                                            <p className="text-sm text-black group-hover:text-gray-700 mt-2 p-2 text-center">
                                                Click to browse
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                <div className="border w-full rounded-md p-2">
                                    <input
                                        type="text"
                                        placeholder="Notice Name"
                                        className="outline-none w-full"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={upload}
                                    className="relative cursor-pointer w-full border border-black text-sm my-2 py-2 px-6 md:px-2 rounded-sm text-center transition-all duration-500 text-black group hover:bg-black hover:text-white"
                                >
                                    <span className="absolute inset-0 border-2 border-black rounded-md transition-transform duration-500 transform scale-0 group-hover:scale-100"></span>
                                    <span className="relative z-10">Upload Notice</span>
                                </button>
                            </div>
                        </form>
                    </div>
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
