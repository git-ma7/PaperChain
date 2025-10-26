import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BOD_Candidates from '../components/BOD_Candidates';

function BOD() {

    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [tempVoteId, setTempVoteId] = useState(null);

    const candidates = [
        { id: 1, name: "Anshul Jani" },
        { id: 2, name: "Harsh Patel" },
        { id: 3, name: "Krisha Shah" },
        { id: 4, name: "Rohan Desai" },
        { id: 5, name: "Vidhi Mehta" },
        { id: 6, name: "Manav Patel" },
        { id: 7, name: "Aarav Shah" },
        { id: 8, name: "Divya Joshi" },
        { id: 9, name: "Sahil Sharma" }
    ];

    const handleVoteClick = (id) => {
        setTempVoteId(id);
        setAlertOpen(true);
    };

    const handleConfirmVote = () => {
        setSelectedCandidateId(tempVoteId);
        setAlertOpen(false);
    };

    const getCandidateName = (id) => {
        const candidate = candidates.find(c => c.id === id);
        return candidate ? candidate.name : "";
    };

    return (
        <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>

            <Sidebar />

            {/* ✅ Custom Alert Popup */}
            {alertOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
                    <div className="bg-white border border-black/10 w-80 p-6 rounded-md shadow-xl text-center animate-popup">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Are you sure to vote <span className="font-bold">{getCandidateName(tempVoteId)}</span>?
                        </h3>

                        <div className="mt-5 flex justify-center gap-4">
                            <button
                                onClick={handleConfirmVote}
                                className="w-full py-2 cursor-pointer bg-cyan-400 font-semibold text-black rounded-sm transition"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setAlertOpen(false)}
                                className="w-full py-2 cursor-pointer bg-gray-800 font-semibold text-white rounded-sm transition"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-28 md:mt-26 w-full flex flex-col">

                <div className="w-full flex items-center justify-between" style={{ fontFamily: 'Syne' }}>
                    <h1 className="text-4xl tracking-wide text-black font-extrabold">
                        For Board of Directors:
                    </h1>
                </div>

                {/* ✅ Candidate Cards */}
                <div className="flex gap-6 mt-4 flex-wrap">
                    {candidates.map((candidate) => (
                        <BOD_Candidates
                            key={candidate.id}
                            name={candidate.name}
                            isVoted={selectedCandidateId === candidate.id}
                            isDisabled={selectedCandidateId !== null && selectedCandidateId !== candidate.id}
                            onVote={() => handleVoteClick(candidate.id)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default BOD;
