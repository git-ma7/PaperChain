import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import BOD_Candidates from '../components/BOD_Candidates';
import axios from 'axios';

function BOD() {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [tempVoteId, setTempVoteId] = useState(null);
  const [candidates, setCandidates] = useState([]); // ✅ FIXED
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      const cid = localStorage.getItem("cid_candidates");

      if (!cid) {
        setError("No candidate ID found in local storage.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/bod/get-candidates/", {
          params: { cid },
        });
        console.log("Candidates fetched:", res.data.candidates); // ✅ debug log
        setCandidates(res.data.candidates || []); // ✅ safe fallback
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Could not fetch candidates.");
      }
    };

    fetchCandidates();
  }, []);

  const handleVoteClick = (wallet) => {
    setTempVoteId(wallet);
    setAlertOpen(true);
};


  const handleConfirmVote = () => {
    setSelectedCandidateId(tempVoteId);
    setAlertOpen(false);
  };

  const getCandidateName = (id) => {
    const candidate = candidates.find(c => c.Wallet === id);
    return candidate ? candidate.Name : "";
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
          <h1 className="text-4xl tracking-wide text-black font-extrabold">For Board of Directors:</h1>
        </div>

        {error && <p className="text-red-600 font-medium mt-4">{error}</p>}

        {/* ✅ Candidate Cards */}
        {candidates.length === 0 ? (
          <p className="text-gray-600 text-lg mt-4">Loading candidates...</p>
        ) : (
          <div className="flex gap-6 mt-4 flex-wrap">
            {candidates.map((candidate) => (
            <BOD_Candidates
                key={candidate.Wallet} // ✅ unique
                name={candidate.Name}  // ✅ capitalized per your data
                isVoted={selectedCandidateId === candidate.Wallet}
                isDisabled={selectedCandidateId !== null && selectedCandidateId !== candidate.Wallet}
                onVote={() => handleVoteClick(candidate.Wallet)}
            />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BOD;
