import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import BOD_Candidates from '../components/BOD_Candidates';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function BOD() {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [tempVoteId, setTempVoteId] = useState(null);
  const [candidates, setCandidates] = useState([]);
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
        setCandidates(res.data.candidates || []);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Could not fetch candidates.");
      }
    };

    fetchCandidates();
  }, []);

  const handleVoteClick = (cid) => {
    setTempVoteId(cid);
    setAlertOpen(true);
  };

  const handleConfirmVote = async () => {
    try {
      const eid = localStorage.getItem("election_id"); 
      await axios.post("http://localhost:8000/bod/cast-vote/", {
        eid: Number(eid),
        cid: tempVoteId,
      });
      toast.success("Vote cast successfully!");
    } catch (err) {
      console.error("Error voting for the candidate:", err);
      setError("Error voting for the candidate.");
    }
    setSelectedCandidateId(tempVoteId);
    setAlertOpen(false);
  };

  // ✅ New: Fetch and show election winner
  const handleShowWinner = async () => {
    const eid = localStorage.getItem("election_id");
    if (!eid) {
      toast.error("No election found.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8000/bod/get-winner/", {
        params: { election_id: eid },
      });
      toast.success(
        `🏆 Winner: ${res.data.winner_name} (${res.data.winning_votes} votes)`,
        { position: "top-center", duration: 4000 }
      );
    } catch (err) {
      console.error("Error fetching winner:", err);
      toast.error("Failed to fetch winner. Election may not have ended yet.");
    }
  };

  const getCandidateName = (id) => {
    const candidate = candidates.find(c => c.Wallet === id);
    return candidate ? candidate.Name : "";
  };

  return (
    <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>
      <Sidebar />

      {/* ✅ Toast Container */}
      <Toaster />

      {/* ✅ Vote confirmation alert */}
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

      {/* ✅ Main UI */}
      <div className="mt-28 md:mt-26 w-full flex flex-col">
        <div className="w-full flex items-center justify-between" style={{ fontFamily: 'Syne' }}>
          <h1 className="text-4xl tracking-wide text-black font-extrabold">For Board of Directors:</h1>
          <button
            onClick={handleShowWinner}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-sm hover:bg-green-700 transition"
          >
            🏆 Show Winner
          </button>
        </div>

        {error && <p className="text-red-600 font-medium mt-4">{error}</p>}

        {candidates.length === 0 ? (
          <p className="text-gray-600 text-lg mt-4">Loading candidates...</p>
        ) : (
          <div className="flex gap-6 mt-4 flex-wrap">
            {candidates.map((candidate, index) => (
              <BOD_Candidates
                key={candidate.Wallet}
                id={index + 1}
                name={candidate.Name}
                isVoted={selectedCandidateId === index + 1}
                isDisabled={selectedCandidateId !== null && selectedCandidateId !== index + 1}
                onVote={() => handleVoteClick(index + 1)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BOD;
