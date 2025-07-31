import { React, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Overview from './../components/dashboard/Overview';
import DB_List_Card from '../components/dashboard/DB_List_Card';
import { GoUpload, GoFile, GoShieldCheck, GoXCircle, GoClock, GoX } from 'react-icons/go';

// Sample data
const list = [
    { fileName: "Aadhar Card", type: "Personal", size: "1.2MB", date: "15/07/25", status: "Verified" },
    { fileName: "Pan Card", type: "Personal", size: "3.6MB", date: "22/07/25", status: "Pending" },
    { fileName: "Driving License", type: "Personal", size: "3.3MB", date: "12/07/25", status: "Verified" },
    { fileName: "10th Marksheet", type: "Personal", size: "4.5MB", date: "20/07/25", status: "Failed" },
];

function Dashboard() {
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleUploadClick = () => setIsUploading(true);
    const handleCloseClick = () => {
        setIsUploading(false);
        setSelectedFile(null);
        setPreviewUrl("");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl("");
        }
    };

    return (
        <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>
            {/* Sidebar */}
            <Sidebar name="Travis Scott" email="fein@gmail.com" />

            <div className="md:ml-[250px] mt-28 md:mt-26 w-full flex flex-col">
                <div className='w-full md:px-9 px-4' style={{ fontFamily: 'Syne' }}>
                    <h1 className='text-4xl tracking-wide text-black font-extrabold'>Dashboard</h1>
                </div>

                {/* Overview section */}
                <div className="w-full flex flex-col lg:flex-row justify-between px-4 md:px-10 py-4 md:py-8 gap-3 md:gap-6">
                    <Overview title="Total Documents" num="5" logo={<GoFile size={34} />} />
                    <Overview title="Verified" num="3" logo={<GoShieldCheck size={34} />} />
                    <Overview title="Pending" num="1" logo={<GoClock size={34} />} />
                    <Overview title="Failed" num="1" logo={<GoXCircle size={34} />} />
                </div>

                {/* Upload Button */}
                <div className="w-full px-4 mt-4 md:mt-0 md:px-10 py-2">
                    <button
                        className="flex gap-2 items-center justify-center py-3 hover:shadow-lg transition-all duration-200 rounded-md border border-black/15 md:max-w-[170px] w-full bg-white cursor-pointer"
                        onClick={handleUploadClick}
                    >
                        <GoUpload size={18} />
                        Upload
                    </button>

                    {/* Upload Modal */}
                    <div className={`fixed h-screen inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${isUploading ? "opacity-100 visible z-30" : "opacity-0 invisible"}`}>
                        <div className={`relative z-30 max-w-[80%] md:max-w-[40%] w-full bg-white shadow-lg border border-black/20 rounded-lg p-4 transition-transform duration-300 ${isUploading ? "translate-y-0" : "-translate-y-20"}`}>
                            <div className="absolute z-30 border border-black/30 p-2 bg-white rounded-md right-0 -top-10 sm:top-0 sm:-right-10 cursor-pointer hover:bg-gray-100 transition" onClick={handleCloseClick}>
                                <GoX />
                            </div>
                            <form action="/" className="p-2 flex flex-col items-center justify-center border border-black/40 rounded-md">
                                <h1 className="capitalize text-base sm:text-lg md:text-2xl font-bold my-2 text-center">Upload Document</h1>
                                <div className="mt-3 w-full px-4 sm:px-2 flex flex-col items-center justify-center">
                                    <div className="relative w-full mx-auto my-3">
                                        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                                        <label htmlFor="file-upload" className="group flex flex-col justify-center items-center w-full h-28 sm:h-40 border-2 border-dashed border-black rounded-md cursor-pointer hover:border-gray-700">
                                            <div className="flex flex-col items-center justify-center py-6">
                                                <GoFile className="text-3xl md:text-4xl" />
                                                <p className="text-sm text-black group-hover:text-gray-700 mt-2 text-center">Click to browse</p>
                                            </div>
                                        </label>
                                    </div>
                                    {selectedFile && (
                                        <div className="w-full my-2 px-3 text-center">
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Preview" className="max-h-48 w-auto mx-auto rounded-md border border-black/20" />
                                            ) : (
                                                <p className="text-sm text-gray-700">
                                                    Selected File: <strong>{selectedFile.name}</strong>
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    <button className="relative cursor-pointer w-full border-2 border-black text-sm my-2 py-2 px-6 md:px-2 rounded-sm text-center transition-all duration-500 text-black group hover:bg-black hover:text-white">
                                        <span className="absolute inset-0 border-2 border-black rounded-md transition-transform duration-500 transform scale-0 group-hover:scale-100"></span>
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Upload <GoUpload />
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Document List */}
                <div className="w-full gap-4 md:gap-6 px-4 md:px-10 my-8 flex flex-col justify-center">
                    {list.map((item, index) => (
                        <DB_List_Card
                            key={index}
                            fileName={item.fileName}
                            type={item.type}
                            size={item.size}
                            date={item.date}
                            status={item.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
