import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function BOD_Admin() {
    const [candidatesData, setCandidatesData] = useState(null);
    const [votersData, setVotersData] = useState(null);
    const [candidateFile, setCandidateFile] = useState(null);
    const [votersFile, setVotersFile] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [electionStarted, setElectionStarted] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [timeLeft, setTimeLeft] = useState("");
    const [electionId, setElectionId] = useState("");

    // ✅ Read Excel files properly
    const handleFileUpload = (file, setData) => {
        if (!file) return;

        const fileType = file.name.split(".").pop();
        if (fileType !== "xlsx" && fileType !== "xls") {
            setError("Please upload a valid Excel file (.xlsx or .xls)");
            setMessage("");
            setData([]);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setData(jsonData);
                setError("");
            } catch (err) {
                console.error(err);
                setError("Error reading the Excel file.");
                setMessage("");
            }
        };
        reader.readAsArrayBuffer(file);
    };

    // ✅ Handle Upload Button
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!candidatesData || !votersData) {
            setError("Please upload both files before proceeding!");
            setMessage("");
            return;
        }

        const formData1 = new FormData();
        formData1.append("file", candidateFile);
        const formData2 = new FormData();
        formData2.append("file", votersFile);

        try {
            const res1 = await axios.post("http://localhost:8000/docs/upload", formData1, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const parsed = JSON.parse(res1.data[0]);  // convert JSON string to object
            const ipfsHash = parsed.Hash;              // extract Hash

            localStorage.setItem("cid_candidates", ipfsHash);
            
            const res2 = await axios.post("http://localhost:8000/docs/upload", formData2, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log(res1, res2);

            const names = votersData.map((row) => row.Name?.trim());
            const wallets = votersData.map((row) => row.Wallet?.trim());
            const sharesList = votersData.map((row) => row.Shares);

            await axios.post("http://localhost:8000/bod/add-shareholders/", {
                names,
                wallets,
                shares: sharesList,
            });

            const names_c = candidatesData.map((row) => row.Name?.trim());
            const wallets_c = candidatesData.map((row) => row.Wallet?.trim());

            await axios.post("http://localhost:8000/bod/add-candidates/", {
                names: names_c,
                wallets: wallets_c,
            });

            setUploaded(true);
            setError("");
            setMessage("Files uploaded successfully. You can now create elections.");
        } catch (err) {
            console.log(err);
            alert("Upload failed");
        }
    };

    // ✅ Create election and schedule automatic start/end
    const toggleElection = async () => {
        if (!electionStarted) {
            if (!startDate || !endDate) {
                alert("Please select both start and end dates before creating the election.");
                return;
            }

            try {
                const wallets = candidatesData.map((row) => row.Wallet?.trim());
                const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
                const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

                const res = await axios.post("http://localhost:8000/bod/create-election/", {
                    wallets,
                    startTime: startTimestamp,
                    endTime: endTimestamp,
                });

                const eid = res.data.electionId;
                setElectionId(eid);
                setMessage("Election created successfully! It will start automatically at the selected time.");

                const now = Date.now();
                const startTimeMs = new Date(startDate).getTime();
                const endTimeMs = new Date(endDate).getTime();

                const startDelay = startTimeMs - now;
                const endDelay = endTimeMs - now;

                // ✅ Schedule automatic start
                if (startDelay > 1) {
                    setTimeout(async () => {
                        try {
                            console.log("Starting: ",eid)
                            await axios.post("http://localhost:8000/bod/start-election/", { eid });
                            setElectionStarted(true);
                            setMessage("Election started automatically!");
                        } catch (err) {
                            console.error("Auto-start failed:", err);
                            setError("Failed to start election automatically.");
                        }
                    }, startDelay);
                } else {
                    // If start time is already passed, start immediately
                    await axios.post("http://localhost:8000/bod/start-election/", { eid });
                    setElectionStarted(true);
                    setMessage("Election started immediately!");
                }

                // ✅ Schedule automatic end
                if (endDelay > 1) {
                    setTimeout(async () => {
                        try {
                            console.log("Ending:",eid)
                            await axios.post("http://localhost:8000/bod/end-election/", { eid });
                            setElectionStarted(false);
                            setMessage("Election ended automatically!");
                        } catch (err) {
                            console.error("Auto-end failed:", err);
                            setError("Failed to end election automatically.");
                        }
                    }, endDelay);
                }
            } catch (err) {
                console.error(err);
                alert("Election could not be created.");
            }
        } else {
            // Optional manual stop
            try {
                await axios.post("http://localhost:8000/bod/end-election/", { eid: electionId });
                setElectionStarted(false);
                setTimeLeft("");
                setMessage("Election ended manually.");
            } catch (err) {
                console.error(err);
                alert("Election cannot be stopped manually.");
            }
        }
    };

    // ✅ Countdown Timer
    useEffect(() => {
        if (electionStarted && endDate) {
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const end = new Date(endDate).getTime();
                const distance = end - now;

                if (distance <= 0) {
                    clearInterval(interval);
                    setElectionStarted(false);
                    setTimeLeft("Elections Ended");
                } else {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    const minutes = Math.floor(
                        (distance % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [electionStarted, endDate]);

    return (
        <div
            className="relative flex min-h-screen border border-transparent"
            style={{ fontFamily: "montserrat" }}
        >
            <Sidebar />

            <div className="mt-28 md:mt-26 w-full flex flex-col items-center">
                <div
                    className="w-full flex items-center justify-between px-6"
                    style={{ fontFamily: "Syne" }}
                >
                    <h1 className="text-4xl tracking-wide text-black font-extrabold">
                        For Board of Directors:
                    </h1>
                </div>

                {/* Upload Form */}
                <div className="flex items-center justify-center h-full p-6 w-full">
                    {!uploaded ? (
                        <form
                            className="border border-black/20 bg-white/15 backdrop-blur-lg min-w-[300px] max-w-[550px] w-full flex flex-col items-center gap-4 p-4 rounded-md"
                            onSubmit={handleUpload}
                        >
                            <h1 className="text-2xl font-bold text-center">
                                Upload Candidates and Voters List
                            </h1>

                            {/* ✅ Candidates Upload */}
                            <div className="w-full flex flex-col gap-2 justify-center">
                                <h3 className="md:text-lg">Upload Candidates List</h3>

                                {!candidatesData ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="candidateFileInput"
                                            type="file"
                                            accept=".xlsx, .xls"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setCandidateFile(file);
                                                handleFileUpload(file, setCandidatesData);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="flex-1 p-2 bg-cyan-600 text-white font-semibold rounded-sm cursor-pointer"
                                            onClick={() =>
                                                document.querySelector("#candidateFileInput")?.click()
                                            }
                                        >
                                            Upload Candidates File
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-3 rounded-md bg-white/25 border border-black/20 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png"
                                                alt="Excel"
                                                className="w-8 h-8"
                                            />
                                            <p className="font-medium text-black truncate max-w-[180px]">
                                                {candidatesData.name || "Excel Data Loaded"}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-red-600 font-semibold hover:underline"
                                            onClick={() => {
                                                setCandidateFile(null);
                                                setCandidatesData(null);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* ✅ Shareholders Upload */}
                            <div className="w-full flex flex-col gap-2 justify-center mt-2">
                                <h3 className="md:text-lg">Upload Shareholder's List</h3>

                                {!votersData ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="voterFileInput"
                                            type="file"
                                            accept=".xlsx, .xls"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setVotersFile(file);
                                                handleFileUpload(file, setVotersData);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="flex-1 p-2 bg-cyan-600 text-white font-semibold rounded-sm cursor-pointer"
                                            onClick={() =>
                                                document.querySelector("#voterFileInput")?.click()
                                            }
                                        >
                                            Upload Shareholder File
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-3 rounded-md bg-white/25 border border-black/20 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="https://img.icons8.com/color/48/microsoft-excel-2019--v1.png"
                                                alt="Excel"
                                                className="w-8 h-8"
                                            />
                                            <p className="font-medium text-black truncate max-w-[180px]">
                                                {votersData.name || "Excel Data Loaded"}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-red-600 font-semibold hover:underline"
                                            onClick={() => {
                                                setVotersFile(null);
                                                setVotersData(null);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>

                            {error && <p className="text-red-600 font-medium">{error}</p>}

                            <button
                                className="w-full p-2 bg-cyan-600 text-white font-semibold rounded-sm cursor-pointer mt-3"
                                type="submit"
                            >
                                Upload All Files
                            </button>
                        </form>
                    ) : (
                        // ✅ Election Control Panel
                        <div className="border border-black/20 bg-white/15 backdrop-blur-lg min-w-[300px] max-w-[550px] w-full flex flex-col items-center gap-4 p-4 rounded-md">
                            <h1 className="text-2xl font-bold text-center mb-2">
                                Election Control Panel
                            </h1>

                            {!electionStarted && (
                                <div className="w-full flex flex-col gap-3">
                                    <label className="font-medium text-sm">Election Start Date:</label>
                                    <input
                                        type="datetime-local"
                                        className="p-2 border border-black/50 rounded-sm"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <label className="font-medium text-sm">Election End Date:</label>
                                    <input
                                        type="datetime-local"
                                        className="p-2 border border-black/50 rounded-sm"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            )}

                            <button
                                className={`w-full p-2 font-semibold rounded-sm text-white bg-green-600`}
                                onClick={toggleElection}
                            >
                                {electionStarted ? "Election Started" : "Create Election"}
                            </button>

                            <p className="text-green-600 font-medium">{message}</p>

                            {/* Countdown */}
                            {electionStarted && (
                                <div className="mt-4 flex flex-col items-center">
                                    <h2 className="text-lg font-semibold">⏳ Election Ends In</h2>
                                    <div className="text-3xl font-bold text-blue-700 animate-pulse">
                                        {timeLeft}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ✅ Display Candidates and Voters Tables */}
                {uploaded && candidatesData && votersData && (
                    <div className="grid md:grid-cols-1 gap-6 p-6 w-full max-w-5xl mb-20">
                        {/* Candidates */}
                        <div className="border border-black/30 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-4">
                            <h2 className="text-2xl font-bold mb-3 text-center">Candidates List</h2>
                            <div className="max-h-80 overflow-y-auto rounded-lg overflow-hidden border border-black/40">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-cyan-600 text-white">
                                            {Object.keys(candidatesData[0] || {}).map((key, index) => (
                                                <th key={index} className="py-2 px-1 border border-black/30">
                                                    {key}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidatesData.map((row, i) => (
                                            <tr key={i} className="odd:bg-white/30 even:bg-white/10">
                                                {Object.values(row).map((val, j) => (
                                                    <td
                                                        key={j}
                                                        className="border border-black/30 py-2 px-1 text-center"
                                                    >
                                                        {val}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Voters */}
                        <div className="border border-black/30 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-4">
                            <h2 className="text-2xl font-bold mb-3 text-center">Shareholders List</h2>
                            <div className="max-h-80 overflow-y-auto rounded-lg overflow-hidden border border-black/40">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-cyan-600 text-white">
                                            {Object.keys(votersData[0] || {}).map((key, index) => (
                                                <th key={index} className="py-2 px-1 border border-black/30">
                                                    {key}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {votersData.map((row, i) => (
                                            <tr key={i} className="odd:bg-white/30 even:bg-white/10">
                                                {Object.values(row).map((val, j) => (
                                                    <td
                                                        key={j}
                                                        className="border border-black/30 py-2 px-1 text-center"
                                                    >
                                                        {val}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BOD_Admin;
