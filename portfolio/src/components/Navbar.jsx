import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function handleNavClick(e, id, setMobileOpen) {
    e.preventDefault();
    if (setMobileOpen) setMobileOpen(false);
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

const NAV_LINKS = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* ── Desktop Floating Pill ── */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
                <nav
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 8px',
                        borderRadius: '100px',
                        border: scrolled
                            ? '1px solid rgba(255,255,255,0.15)'
                            : '1px solid rgba(255,255,255,0.2)',
                        background: scrolled
                            ? 'rgba(8, 10, 22, 0.80)'
                            : 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        boxShadow: scrolled
                            ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
                            : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {NAV_LINKS.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={e => handleNavClick(e, link.id)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '100px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: 'rgba(255,255,255,0.78)',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                letterSpacing: '0.01em',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.78)';
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* Divider */}
                    <div style={{
                        width: '1px',
                        height: '20px',
                        background: 'rgba(255,255,255,0.2)',
                        margin: '0 4px',
                        flexShrink: 0,
                    }} />

                    {/* Resume CTA */}
                    <a
                        href="https://drive.google.com/file/d/1PNoOM-hgEHcUPdvFzyM4crW9Q93exKFY/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '8px 22px',
                            borderRadius: '100px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#fff',
                            textDecoration: 'none',
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            boxShadow: '0 2px 12px rgba(99,102,241,0.45)',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.65)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = '0 2px 12px rgba(99,102,241,0.45)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Resume ↗
                    </a>
                </nav>
            </header>

            {/* ── Mobile Top Bar (Glass Pill) ── */}
            <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] md:hidden transition-all duration-500 ${mobileOpen ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <div
                    className="flex flex-row items-center justify-between w-full pointer-events-auto"
                    style={{
                        padding: '8px 12px 8px 36px',
                        borderRadius: '100px',
                        border: scrolled
                            ? '1px solid rgba(255,255,255,0.15)'
                            : '1px solid rgba(255,255,255,0.05)',
                        background: scrolled
                            ? 'rgba(8, 10, 22, 0.75)'
                            : 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        boxShadow: scrolled
                            ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                            : '0 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <span className="text-white text-[11px] sm:text-xs font-black tracking-[0.25em] uppercase opacity-90 select-none">
                        Kapil Dev
                    </span>
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                        }}
                        className="active:scale-95 active:bg-white/20"
                    >
                        <Menu size={18} color="#fff" />
                    </button>
                </div>
            </header>

            {/* ── Elite Editorial Mobile Navigation ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Interactive Blur Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md md:hidden"
                        />

                        {/* Floating Terminal Island */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed inset-6 sm:inset-10 z-50 md:hidden flex flex-col bg-[#050505] rounded-[32px] border border-white/10 shadow-2xl text-white py-12 px-12 sm:px-20 overflow-y-auto"
                        >
                            {/* Inner Menu Header */}
                            <div className="flex items-center justify-between w-full mb-12 shrink-0">
                                <span className="text-white text-[11px] font-black tracking-[0.25em] uppercase opacity-90 select-none pl-4">
                                    Kapil Dev
                                </span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    aria-label="Close menu"
                                    style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    className="active:scale-90 active:bg-white/10"
                                >
                                    <X size={18} color="#fff" />
                                </button>
                            </div>

                            {/* Structured Link Grid */}
                            <div className="flex flex-col w-full flex-grow">
                                <div className="w-full h-[1px] bg-white/10" />
                                {NAV_LINKS.map((link, i) => (
                                    <div key={link.id} className="w-full">
                                        <motion.a
                                            href={`#${link.id}`}
                                            onClick={e => handleNavClick(e, link.id, setMobileOpen)}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ delay: 0.05 + (i * 0.05), ease: "easeOut" }}
                                            className="w-full flex flex-col items-center justify-center py-6 sm:py-10 px-8 sm:px-12 group active:bg-white/5 transition-colors"
                                        >
                                            <span className="text-[10px] sm:text-xs font-mono text-white/40 tracking-[0.3em] uppercase mb-2">
                                                [ 0{i + 1} ]
                                            </span>
                                            <span className="text-[28px] sm:text-4xl font-light tracking-widest uppercase text-white/80 group-hover:text-white transition-colors text-center">
                                                {link.label}
                                            </span>
                                        </motion.a>
                                        <div className="w-full h-[1px] bg-white/10" />
                                    </div>
                                ))}
                                {/* Resume Link integrated next to Contact */}
                                <div className="w-full">
                                    <motion.a
                                        href="https://drive.google.com/file/d/1PNoOM-hgEHcUPdvFzyM4crW9Q93exKFY/view"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: 0.05 + (NAV_LINKS.length * 0.05), ease: "easeOut" }}
                                        className="w-full flex flex-col items-center justify-center py-6 sm:py-10 group bg-indigo-500/5 active:bg-indigo-500/10 transition-colors"
                                    >
                                        <span className="text-[9px] font-mono text-indigo-400 tracking-[0.4em] uppercase mb-2">
                                            [ File_05 ]
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[26px] sm:text-4xl font-black tracking-widest uppercase text-indigo-400">
                                                Resume
                                            </span>
                                            <ArrowUpRight size={22} className="text-indigo-400 stroke-[3]" />
                                        </div>
                                    </motion.a>
                                    <div className="w-full h-[1px] bg-white/10" />
                                </div>
                            </div>


                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}