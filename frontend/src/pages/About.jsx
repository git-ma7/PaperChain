import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { CheckCircle, Lock, Clock, Users, Database } from "lucide-react";

export default function About() {
    return (
        <div className="relative">

            <Navbar />

            <div className="flex">
                <main className="max-w-[1300px] w-full mx-auto p-6 md:px-20 md:py-10">
                    
                    {/* Hero / Title */}
                    <section className="mt-16">
                        <div className="bg-white/30 backdrop-blur-sm border border-black/6 rounded-xl p-8 shadow-lg">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="flex-1">
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900" style={{ fontFamily: 'Syne, ui-sans-serif, system-ui' }}>
                                        Our Vision
                                    </h1>
                                    <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                                        <strong className="font-semibold">Blockchain-based Document Verification System</strong>
                                        <br />
                                        A secure, decentralized solution that makes document authenticity instant, transparent and tamper-proof. Built for universities, employers and government agencies that require authoritative document validation at scale.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-800 font-medium text-sm">
                                            <CheckCircle size={16} /> Tamper-proof verification
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 font-medium text-sm">
                                            <Lock size={16} /> Decentralized trust model
                                        </span>
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 font-medium text-sm">
                                            <Clock size={16} /> Fast & automated
                                        </span>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                    </section>

                    {/* Our Goal */}
                    <section className="mt-8">
                        <div className="bg-white/30 backdrop-blur-sm border border-black/6 rounded-xl p-8 shadow-lg">
                            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900" style={{ fontFamily: 'Syne, ui-sans-serif, system-ui' }}>Our Goal</h3>
                            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                                Eliminate document fraud and simplify verification workflows for educational institutions, employers and public organizations by using blockchain as a single source of truth.
                            </p>
                        </div>
                    </section>

                    {/* How it works */}
                    <section className="mt-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/30 backdrop-blur-sm border border-black/6 rounded-xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-slate-900">How the System Works</h2>

                                <ol className="mt-4 space-y-4 list-decimal list-inside text-slate-700">
                                    <li>
                                        <strong>Upload Document:</strong> The user uploads a digital file via the interface.
                                    </li>
                                    <li>
                                        <strong>Hash Generation:</strong> A secure SHA‑256 cryptographic hash is derived from the file contents.
                                    </li>
                                    <li>
                                        <strong>Blockchain Storage:</strong> The resulting hash is stored on the blockchain as an immutable transaction.
                                    </li>
                                    <li>
                                        <strong>Verification:</strong> Anyone can re-upload the document to generate its hash and compare it to the blockchain entry — a match proves authenticity.
                                    </li>
                                </ol>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm border border-black/6 rounded-xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-slate-900">Why Blockchain?</h2>

                                <div className="mt-4 space-y-3 text-slate-700">
                                    <p><strong>Immutability:</strong> Entries cannot be altered once stored on the ledger.</p>
                                    <p><strong>Transparency:</strong> All transactions are auditable and visible to permitted parties.</p>
                                    <p><strong>Decentralization:</strong> Eliminates single points of failure or corruption by distributing trust.</p>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-black/10">
                                        <Database size={20} />
                                        <div>
                                            <div className="text-sm font-semibold">Storage Efficiency</div>
                                            <div className="text-xs text-slate-600">Only hashes stored on-chain; files live off-chain.</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/80 border border-black/10">
                                        <Users size={20} />
                                        <div>
                                            <div className="text-sm font-semibold">Wide Audibility</div>
                                            <div className="text-xs text-slate-600">Institutions and employers can verify documents in seconds.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Key features */}
                    <section className="mt-10">
                        <div className="bg-white/50 backdrop-blur-xl border border-black/6 rounded-xl p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900">Key Features</h2>

                            <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <li className="p-4 rounded-lg border border-black/10 bg-white/80">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-800">Tamper-proof verification</div>
                                            <div className="text-xs text-slate-600">Hashes are immutable on-chain.</div>
                                        </div>
                                    </div>
                                </li>

                                <li className="p-4 rounded-lg border border-black/10 bg-white/80">
                                    <div className="flex items-center gap-3">
                                        <Clock size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-800">Fast & automated validation</div>
                                            <div className="text-xs text-slate-600">Verification completes in seconds.</div>
                                        </div>
                                    </div>
                                </li>

                                <li className="p-4 rounded-lg border border-black/10 bg-white/80">
                                    <div className="flex items-center gap-3">
                                        <Lock size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-800">Decentralized trust model</div>
                                            <div className="text-xs text-slate-600">No single authority controls the ledger.</div>
                                        </div>
                                    </div>
                                </li>

                                <li className="p-4 rounded-lg border border-black/10 bg-white/80">
                                    <div className="flex items-center gap-3">
                                        <Users size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-800">User Friendly</div>
                                            <div className="text-xs text-slate-600">Easy to interact.</div>
                                        </div>
                                    </div>
                                </li>

                                <li className="p-4 rounded-lg border border-black/10 bg-white/80">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-800">Scalable Design</div>
                                            <div className="text-xs text-slate-600">Reliable for high volume.</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
