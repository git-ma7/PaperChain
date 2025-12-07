import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BOD_Candidates from "../components/BOD_Candidates";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function BOD() {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [tempVoteId, setTempVoteId] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  // Derived values from localStorage (kept as state so UI updates if component re-renders)
  const cidCandidates = localStorage.getItem("cid_candidates");
  const electionId = localStorage.getItem("election_id");

  // Helper to check if user has voted for the current election (persisted)
  const hasUserVotedForCurrentElection = () => {
    if (!electionId) return false;
    return Boolean(localStorage.getItem(`voted_election_${electionId}`));
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      const cid = cidCandidates; // using derived var

      if (!cid) {
        setError("No candidate ID found in local storage.");
        setCandidates([]); // ensure empty
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/bod/get-candidates/", {
          params: { cid },
        });

        // defensive: expect res.data.candidates to be an array
        setCandidates(Array.isArray(res.data.candidates) ? res.data.candidates : []);
        setError("");
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Could not fetch candidates.");
        setCandidates([]);
      }
    };

    fetchCandidates();
  }, [cidCandidates]); // re-run if localStorage key changes (rare)

  const handleVoteClick = (candidateWalletId) => {
    // keep wallet id as identifier (not array index) so it matches backend expectation
    setTempVoteId(candidateWalletId);
    setAlertOpen(true);
  };

  const handleConfirmVote = async () => {
    if (!tempVoteId) {
      toast.error("No candidate selected.");
      return;
    }

    try {
      const eid = localStorage.getItem("election_id");
      if (!eid) {
        toast.error("No active election found.");
        setAlertOpen(false);
        return;
      }

      // Send vote to backend
      await axios.post("http://localhost:8000/bod/cast-vote/", {
        eid: Number(eid),
        cid: tempVoteId,
      });

      // Persist that the user has voted in this election (so UI can show Show Winner button)
      localStorage.setItem(
        `voted_election_${eid}`,
        JSON.stringify({ cid: tempVoteId, timestamp: Date.now() })
      );

      // update local selected candidate state (use wallet id for consistency)
      setSelectedCandidateId(tempVoteId);

      toast.success("Vote cast successfully!");
    } catch (err) {
      console.error("Error voting for the candidate:", err);

      // try to show a useful message from server if present
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.detail || null;

      setError("Error voting for the candidate.");
      toast.error(serverMsg || "Error voting for the candidate. Please try again.");
    } finally {
      setAlertOpen(false);
    }
  };

  // Fetch and show election winner with robust response handling
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

      // Typical clear success payload:
      // { winner_name: "Alice", winning_votes: 123 }
      if (res?.data?.winner_name) {
        toast.success(
          `🏆 Winner: ${res.data.winner_name} (${res.data.winning_votes ?? "N/A"} votes)`,
          { position: "top-center", duration: 5000 }
        );
        return;
      }

      // If backend uses an explicit status field (recommended), handle it
      const status = res?.data?.status?.toString().toLowerCase?.() ?? null;
      if (status) {
        if (["ongoing", "not_ended", "in_progress"].includes(status)) {
          toast("The election is still ongoing — results are not available yet.", {
            icon: "⏳",
            duration: 4000,
            position: "top-center",
          });
          return;
        }

        if (["no_votes", "no_winner", "not_concluded"].includes(status)) {
          toast("No winner determined yet. The election may not have concluded.", {
            icon: "ℹ️",
            duration: 4000,
            position: "top-center",
          });
          return;
        }
      }

      // If endpoint returns a message string
      if (res?.data?.message) {
        toast(res.data.message, { duration: 4000, position: "top-center" });
        return;
      }

      // Fallback if response is empty or unexpected
      toast.error("Winner not available yet. Please try later.");
    } catch (err) {
      console.error("Error fetching winner:", err);

      // Look for common server signals (HTTP 202 Accepted could mean not ready)
      const statusCode = err?.response?.status;
      const respData = err?.response?.data;

      if (statusCode === 202 || respData?.status === "ongoing") {
        toast("Result not ready yet — the election is still in progress.", {
          icon: "⏳",
        });
      } else if (statusCode === 404) {
        toast.error("No results found for this election.");
      } else {
        toast.error(
          respData?.message || "Failed to fetch winner. Please try again later."
        );
      }
    }
  };

  // UI logic: only show winner button when:
  // 1) we have candidates in localStorage (cidCandidates truthy)
  // 2) user has voted for the current election (persisted)
  const shouldShowWinnerButton = Boolean(cidCandidates && electionId && hasUserVotedForCurrentElection());

  const getCandidateNameByWallet = (walletId) => {
    const candidate = candidates.find((c) => c.Wallet === walletId);
    return candidate ? candidate.Name : "";
  };

  return (
    <div
      className="relative flex min-h-screen border border-transparent"
      style={{ fontFamily: "montserrat" }}
    >
      <Sidebar />

      <Toaster />

      {alertOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <div className="bg-white border border-black/10 w-80 p-6 rounded-md shadow-xl text-center animate-popup">
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure to vote{" "}
              <span className="font-bold">
                {getCandidateNameByWallet(tempVoteId) || tempVoteId}
              </span>
              ?
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

      <div className="mt-28 md:mt-26 p-5 w-full flex flex-col">
        <div
          className="w-10/11 flex items-center justify-between"
          style={{ fontFamily: "Syne" }}
        >
          <h1 className="text-4xl tracking-wide text-black font-extrabold">
            For Board of Directors:
          </h1>

          {shouldShowWinnerButton && (
            <button
              onClick={handleShowWinner}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-sm hover:bg-green-700 transition"
            >
              🏆 Show Winner
            </button>
          )}
        </div>

        {/* {error && <p className="text-red-600 font-medium mt-4">{error}</p>} */}

        {candidates.length === 0 ? (
          <p className="text-gray-600 text-lg mt-4">{candidates ? "There are no elections going on at this moment." : "Loading candidates..."}</p>
        ) : (
          <div className="flex gap-6 mt-4 flex-wrap">
            {candidates.map((candidate) => (
              <BOD_Candidates
                key={candidate.Wallet}
                id={candidate.Wallet} // use stable wallet as id
                name={candidate.Name}
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