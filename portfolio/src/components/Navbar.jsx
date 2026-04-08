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

            {/* ── Mobile Top Bar ── */}
            <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
                <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-white text-sm font-semibold tracking-widest opacity-90">KD</span>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                        }}
                    >
                        {mobileOpen ? <X size={18} color="#000" /> : <Menu size={18} color="#fff" />}
                    </button>
                </div>
            </header>

            {/* ── Premium Glassmorphic Mobile Slide-Bar ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Interactive Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Floating Drawer Shell */}
                        <motion.div
                            initial={{ x: '100%', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                            animate={{ x: 0, borderTopLeftRadius: '40px', borderBottomLeftRadius: '40px' }}
                            exit={{ x: '100%', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                            transition={{ type: "spring", damping: 25, stiffness: 220, mass: 0.8 }}
                            className="fixed top-0 right-0 z-40 h-[100dvh] w-[82%] max-w-sm flex flex-col justify-between py-16 px-10 shadow-2xl md:hidden overflow-hidden"
                            style={{
                                background: 'rgba(255, 255, 255, 0.70)',
                                backdropFilter: 'blur(36px)',
                                WebkitBackdropFilter: 'blur(36px)',
                                borderLeft: '1px solid rgba(255,255,255,0.4)',
                            }}
                        >
                            {/* Inner Links */}
                            <div className="flex flex-col gap-10 mt-24 z-50 pr-4">
                                {NAV_LINKS.map((link, i) => (
                                    <div key={link.id} className="overflow-hidden p-1">
                                        <motion.a
                                            href={`#${link.id}`}
                                            onClick={e => handleNavClick(e, link.id, setMobileOpen)}
                                            initial={{ opacity: 0, x: 40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            whileHover={{ x: -10, color: '#000' }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ delay: 0.1 + (i * 0.08), type: "spring", stiffness: 300, damping: 25 }}
                                            className="block w-full text-right text-4xl font-black uppercase tracking-tighter text-black/70 transition-colors"
                                        >
                                            {link.label}
                                        </motion.a>
                                    </div>
                                ))}
                            </div>

                            {/* Crisp Layout Footer */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className="w-full flex flex-col gap-6"
                            >
                                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-black/20" />
                                <a
                                    href="https://drive.google.com/file/d/1PNoOM-hgEHcUPdvFzyM4crW9Q93exKFY/view"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMobileOpen(false)}
                                    className="w-full py-4 rounded-full bg-black text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 transition-all outline-none"
                                    style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}
                                >
                                    <span>Download Resume</span>
                                    <ArrowUpRight size={16} />
                                </a>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}