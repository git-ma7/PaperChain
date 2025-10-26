import React from 'react';
import profile from '../assets/profile.jpg';

function BOD_Candidates({ name, onVote, isVoted, isDisabled }) {
    return (
        <div
            className={`
                max-w-[290px] max-h-[465px] h-full flex flex-col rounded-md border border-black/20
                group bg-white/40 backdrop-blur-2xl transition-all duration-300
                ${isVoted ? "scale-[1.02] shadow-2xl" : ""}
                ${isDisabled ? "opacity-30 pointer-events-none" : "hover:bg-white/70 hover:shadow-lg"}
            `}
        >
            <div className="p-4">
                <img src={profile} alt="profile" className="rounded-sm" />

                <div className="flex gap-2 items-center justify-between mt-2">
                    <h1 className="font-bold text-black">{name}</h1>
                </div>

                <div className="mt-2">
                    <button
                        className={`
                            rounded-sm w-full py-2 font-semibold transition-all duration-300
                            ${isVoted ? "bg-cyan-500 text-black" : "bg-cyan-300 hover:bg-cyan-400"}
                            ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
                        `}
                        onClick={onVote}
                        disabled={isDisabled}
                    >
                        {isVoted ? "Voted" : "Vote"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BOD_Candidates;
