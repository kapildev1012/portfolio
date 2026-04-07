import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
                        href="https://drive.google.com/file/d/1HUSyidPB-EnwbagpZNlVQOJ1-Do7upTP/view"
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
                        {mobileOpen ? <X size={18} color="#fff" /> : <Menu size={18} color="#fff" />}
                    </button>
                </div>
            </header>

            {/* ── Mobile Slide-in Panel ── */}
            <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setMobileOpen(false)}
                />
                {/* Panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-72 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{
                        background: 'rgba(8, 10, 22, 0.97)',
                        backdropFilter: 'blur(30px)',
                        WebkitBackdropFilter: 'blur(30px)',
                        borderLeft: '1px solid rgba(255,255,255,0.07)',
                    }}
                >
                    <div className="flex flex-col pt-20 px-5 gap-1">
                        {NAV_LINKS.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={e => handleNavClick(e, link.id, setMobileOpen)}
                                className="px-4 py-3.5 rounded-xl text-[15px] font-medium text-white/70 transition-all duration-200 hover:text-white hover:bg-white/5"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-5 pt-5 border-t border-white/[0.06]">
                            <a
                                href="https://drive.google.com/file/d/1vuvWLNdXU6Mh2FTUlzscJUAOXo-Uc_D9/view?usp=share_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileOpen(false)}
                                className="block text-center py-3 rounded-full text-sm font-semibold text-white"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                            >
                                View Resume ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}