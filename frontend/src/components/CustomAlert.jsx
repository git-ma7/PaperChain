import React from "react";

const CustomAlert = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
            <div className="bg-white w-80 p-6 rounded-2xl shadow-xl text-center animate-popup">
                <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>

                <div className="mt-5 flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomAlert;
