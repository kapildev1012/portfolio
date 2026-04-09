"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, ArrowUp, Heart } from 'lucide-react';

import kapilPortrait from '../assets/kapil_portrait.png';

const NAV_LINKS = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
];

const SOCIAL_LINKS = [
    { name: 'GitHub', url: 'https://github.com/kapildev1012', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kapil-dev-2a48103a7/', icon: Linkedin },
    { name: 'Twitter', url: 'https://x.com/kapildev921390', icon: Twitter },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
            <div className="section-wrap px-8 md:px-24 w-full max-w-7xl mx-auto">

                {/* Main 4-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* Column 1: Bio & Photo */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shadow-xl">
                                <img
                                    src={kapilPortrait}
                                    alt="Kapil Dev"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-bold tracking-tight">Kapil Dev</h3>
                                <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Full-Stack Engineer</p>
                            </div>
                        </div>
                        <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                            Dedicated to building scalable web ecosystems and high-performance digital solutions with the MERN stack.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/20">Navigation</h4>
                        <div className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => scrollToSection(e, link.id)}
                                    className="text-sm font-medium text-white/50 hover:text-white transition-colors w-fit"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button
                                onClick={scrollToTop}
                                className="text-sm font-medium text-white/50 hover:text-white transition-colors w-fit flex items-center gap-2"
                            >
                                Back to Top <ArrowUp size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Column 3: Socials */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/20">Social Channels</h4>
                        <div className="flex flex-col gap-4">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm font-medium text-white/50 hover:text-white transition-colors group"
                                >
                                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/20">Contact</h4>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-3">
                                <Mail size={18} className="text-white/30 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Email</span>
                                    <a href="mailto:kapil16072004@gmail.com" className="text-sm font-medium hover:text-indigo-400 transition-colors underline underline-offset-4 decoration-white/10">
                                        kapil16072004@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-white/30 mt-0.5" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Region</span>
                                    <span className="text-sm font-medium text-white/50">Himachal Pradesh, India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </footer>
    );
}
