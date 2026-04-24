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
    { label: 'About',    id: 'about',    tag: 'Who I am' },
    { label: 'Skills',   id: 'skills',   tag: 'What I do' },
    { label: 'Projects', id: 'projects', tag: 'What I built' },
    { label: 'Contact',  id: 'contact',  tag: "Let's talk" },
];

export default function Navbar() {
    const [scrolled, setScrolled]     = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hovered, setHovered]       = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* ══════════════════════════════════════════
                DESKTOP NAV — COMPLETELY UNTOUCHED
            ══════════════════════════════════════════ */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
                <nav style={{
                    display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 8px',
                    borderRadius: '100px',
                    border: scrolled ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.2)',
                    background: scrolled ? 'rgba(8,10,22,0.80)' : 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: scrolled
                        ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
                        : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                    {NAV_LINKS.map(link => (
                        <a key={link.id} href={`#${link.id}`} onClick={e => handleNavClick(e, link.id)}
                            style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.78)', textDecoration: 'none', transition: 'all 0.2s ease', whiteSpace: 'nowrap', letterSpacing: '0.01em' }}
                            onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(255,255,255,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.78)'; e.currentTarget.style.background='transparent'; }}>
                            {link.label}
                        </a>
                    ))}
                    <div style={{ width:'1px', height:'20px', background:'rgba(255,255,255,0.2)', margin:'0 4px', flexShrink:0 }} />
                    <a href="https://drive.google.com/file/d/1RcR8AhLy9C1x4r4t_iYanBT3v9iCfzEx/view" target="_blank" rel="noopener noreferrer"
                        style={{ padding:'8px 22px', borderRadius:'100px', fontSize:'14px', fontWeight:'600', color:'#fff', textDecoration:'none', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow:'0 2px 12px rgba(99,102,241,0.45)', transition:'all 0.2s ease', whiteSpace:'nowrap' }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow='0 4px 20px rgba(99,102,241,0.65)'; e.currentTarget.style.transform='translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 12px rgba(99,102,241,0.45)'; e.currentTarget.style.transform='translateY(0)'; }}>
                        Resume ↗
                    </a>
                </nav>
            </header>

            {/* ══════════════════════════════════════════
                MOBILE TOP PILL
            ══════════════════════════════════════════ */}
            <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-[998] w-[88vw] md:hidden transition-all duration-500 ${mobileOpen ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <div className="flex items-center justify-between w-full" style={{
                    padding: '8px 10px 8px 22px', borderRadius: '100px',
                    border: scrolled ? '1px solid rgba(255,255,255,0.14)' : '1px solid rgba(255,255,255,0.07)',
                    background: scrolled ? 'rgba(6,7,18,0.85)' : 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.12)',
                    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                    <span className="text-white text-[11px] font-black tracking-[0.28em] uppercase select-none">Kapil Dev</span>
                    <motion.button whileTap={{ scale: 0.88 }} onClick={() => setMobileOpen(true)} aria-label="Open menu"
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.14)', cursor: 'pointer' }}>
                        <Menu size={17} color="#fff" strokeWidth={2.5} />
                    </motion.button>
                </div>
            </header>

            {/* ══════════════════════════════════════════
                WORLD-CLASS FULLSCREEN MOBILE MENU
            ══════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
                {mobileOpen && (
                    <motion.div
                        key="nav-overlay"
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[999] md:hidden flex flex-col"
                        style={{ background: '#080808' }}
                    >
                        {/* ── Rich background layers ── */}
                        {/* Grain */}
                        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
                            opacity: 0.03,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            backgroundSize: '200px 200px',
                        }} />
                        {/* Top-right glow */}
                        <div aria-hidden className="absolute top-0 right-0 pointer-events-none" style={{
                            width: '320px', height: '320px',
                            background: 'radial-gradient(circle at 90% 5%, rgba(139,92,246,0.14) 0%, transparent 60%)',
                        }} />
                        {/* Bottom-left accent */}
                        <div aria-hidden className="absolute bottom-0 left-0 pointer-events-none" style={{
                            width: '200px', height: '200px',
                            background: 'radial-gradient(circle at 10% 90%, rgba(99,102,241,0.07) 0%, transparent 65%)',
                        }} />

                        {/* ── HEADER ── */}
                        <div className="shrink-0 flex items-start justify-between" style={{ padding: '28px 28px 0' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ delay: 0.22, duration: 0.35, ease: 'easeOut' }}
                                className="flex flex-col"
                            >
                                <span style={{ color: '#fff', fontWeight: 900, fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase', lineHeight: 1 }}>
                                    Kapil Dev
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginTop: '5px' }}>
                                    Full-Stack Engineer · MERN
                                </span>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                                transition={{ delay: 0.2, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                                whileTap={{ scale: 0.84 }}
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)',
                                    cursor: 'pointer',
                                }}
                            >
                                <X size={16} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                            </motion.button>
                        </div>

                        {/* Top divider */}
                        <motion.div
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0, originX: 1 }}
                            transition={{ delay: 0.28, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '24px 28px 0', flexShrink: 0 }}
                        />

                        {/* ── NAV ITEMS ── */}
                        <nav style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-evenly', padding: '0 28px' }}>
                            {NAV_LINKS.map((link, i) => (
                                <div key={link.id} style={{ overflow: 'hidden' }}>
                                    <motion.a
                                        href={`#${link.id}`}
                                        onClick={e => handleNavClick(e, link.id, setMobileOpen)}
                                        initial={{ y: '110%' }}
                                        animate={{ y: 0 }}
                                        exit={{ y: '110%' }}
                                        transition={{ duration: 0.55, delay: 0.24 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                        onMouseEnter={() => setHovered(link.id)}
                                        onMouseLeave={() => setHovered(null)}
                                        style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.055)', transition: 'opacity 0.2s' }}
                                        onTouchStart={e => e.currentTarget.style.opacity = '0.5'}
                                        onTouchEnd={e => e.currentTarget.style.opacity = '1'}
                                    >
                                        {/* Number */}
                                        <span style={{
                                            fontSize: '8.5px', fontWeight: 800, letterSpacing: '0.14em',
                                            color: hovered === link.id ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.2)',
                                            lineHeight: 1, minWidth: '16px', flexShrink: 0,
                                            transition: 'color 0.2s',
                                        }}>
                                            {String(i + 1).padStart(2, '0')}
                                        </span>

                                        {/* Label */}
                                        <span style={{
                                            fontSize: '1.85rem', fontWeight: 900, textTransform: 'uppercase',
                                            letterSpacing: '-0.02em', lineHeight: 1.0, flex: 1,
                                            color: hovered === link.id ? 'rgba(255,255,255,0.55)' : '#fff',
                                            transition: 'color 0.25s ease',
                                        }}>
                                            {link.label}
                                        </span>

                                        {/* Tag label — appears on hover */}
                                        <span style={{
                                            fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em',
                                            textTransform: 'uppercase', flexShrink: 0,
                                            color: 'rgba(167,139,250,0.7)',
                                            opacity: hovered === link.id ? 1 : 0,
                                            transform: hovered === link.id ? 'translateX(0)' : 'translateX(8px)',
                                            transition: 'opacity 0.25s, transform 0.25s',
                                        }}>
                                            {link.tag}
                                        </span>

                                        <ArrowUpRight
                                            size={16} strokeWidth={2.5}
                                            style={{
                                                flexShrink: 0,
                                                color: 'rgba(167,139,250,0.7)',
                                                opacity: hovered === link.id ? 1 : 0,
                                                transform: hovered === link.id ? 'translate(1px,-1px)' : 'translate(0,0)',
                                                transition: 'opacity 0.2s, transform 0.2s',
                                            }}
                                        />
                                    </motion.a>
                                </div>
                            ))}

                            {/* RÉSUMÉ */}
                            <div style={{ overflow: 'hidden' }}>
                                <motion.a
                                    href="https://drive.google.com/file/d/1RcR8AhLy9C1x4r4t_iYanBT3v9iCfzEx/view"
                                    target="_blank" rel="noopener noreferrer"
                                    initial={{ y: '110%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '110%' }}
                                    transition={{ duration: 0.55, delay: 0.24 + NAV_LINKS.length * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                    onMouseEnter={() => setHovered('resume')}
                                    onMouseLeave={() => setHovered(null)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', padding: '10px 0', transition: 'opacity 0.2s' }}
                                    onTouchStart={e => e.currentTarget.style.opacity = '0.5'}
                                    onTouchEnd={e => e.currentTarget.style.opacity = '1'}
                                >
                                    <span style={{
                                        fontSize: '8.5px', fontWeight: 800, letterSpacing: '0.14em',
                                        color: 'rgba(167,139,250,0.4)', lineHeight: 1, minWidth: '16px', flexShrink: 0,
                                    }}>05</span>
                                    <span style={{
                                        fontSize: '1.85rem', fontWeight: 900, textTransform: 'uppercase',
                                        letterSpacing: '-0.02em', lineHeight: 1.0, flex: 1,
                                        background: 'linear-gradient(100deg, #c4b5fd 0%, #818cf8 100%)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                    }}>
                                        Résumé
                                    </span>
                                    <span style={{
                                        fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em',
                                        textTransform: 'uppercase', color: 'rgba(167,139,250,0.7)',
                                        opacity: hovered === 'resume' ? 1 : 0,
                                        transition: 'opacity 0.25s',
                                        flexShrink: 0,
                                    }}>View PDF</span>
                                    <ArrowUpRight size={16} strokeWidth={2.5} color="#a78bfa" style={{ flexShrink: 0, opacity: 0.5 }} />
                                </motion.a>
                            </div>
                        </nav>

                        {/* ══ PREMIUM FOOTER ══ */}
                        <motion.footer
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.56, duration: 0.38, ease: 'easeOut' }}
                            style={{ flexShrink: 0, padding: '0 28px 30px' }}
                        >
                            {/* Divider */}
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '18px' }} />

                            {/* Two-column footer grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px 20px', alignItems: 'end' }}>

                                {/* Left — tagline + email */}
                                <div>
                                    <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', lineHeight: 1 }}>
                                        Let's collaborate
                                    </p>
                                    <a href="mailto:kapil16072004@gmail.com" style={{ textDecoration: 'none', display: 'block' }}>
                                        <span style={{
                                            fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.01em',
                                            color: 'rgba(255,255,255,0.5)',
                                            transition: 'color 0.2s',
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                                        >
                                            kapil16072004@gmail.com ↗
                                        </span>
                                    </a>
                                </div>

                                {/* Right — availability chip */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '6px 10px', borderRadius: '20px',
                                    background: 'rgba(16,185,129,0.08)',
                                    border: '1px solid rgba(16,185,129,0.18)',
                                }}>
                                    <span style={{ position: 'relative', width: '6px', height: '6px', display: 'inline-flex', flexShrink: 0 }}>
                                        <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#34d399', opacity: 0.5 }} />
                                        <span style={{ display: 'inline-flex', borderRadius: '50%', width: '6px', height: '6px', background: '#10b981' }} />
                                    </span>
                                    <span style={{ fontSize: '8.5px', color: 'rgba(52,211,153,0.8)', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                        Available
                                    </span>
                                </div>

                                {/* Social links row — spans both columns */}
                                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                    {[
                                        { label: 'LinkedIn', short: 'in',  href: 'https://www.linkedin.com/in/kapil-dev-2a48103a7/' },
                                        { label: 'GitHub',   short: 'gh',  href: 'https://github.com/kapildev1012' },
                                        { label: 'Twitter',  short: 'x',   href: 'https://x.com/kapildev921390' },
                                        { label: 'Email',    short: '✉',   href: 'mailto:kapil16072004@gmail.com' },
                                    ].map(s => (
                                        <a key={s.short} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                height: '30px', padding: '0 12px', borderRadius: '6px',
                                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                                color: 'rgba(255,255,255,0.35)', fontSize: '9.5px', fontWeight: 800,
                                                letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
                                                transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                                        >
                                            {s.short}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}