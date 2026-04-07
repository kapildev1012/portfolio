import React from 'react';
import { Heart } from 'lucide-react';

const FOOTER_LINKS = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
];

const SOCIAL_LINKS = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kapil-dev-2a48103a7/' },
    { name: 'GitHub', url: 'https://github.com/kapildev1012' },
    { name: 'Twitter', url: 'https://x.com/kapildev921390' },
];

export default function Footer() {
    const handleClick = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <footer className="footer-gradient text-white">
            {/* Gradient Divider */}
            <div className="footer-divider" />

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left - Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold gradient-text" style={{WebkitTextFillColor: 'transparent'}}>
                            Kapil Dev
                        </h3>
                        <p className="text-white/40 text-sm mt-1">Full-Stack Software Engineer</p>
                    </div>

                    {/* Center - Nav Links */}
                    <div className="flex items-center gap-6">
                        {FOOTER_LINKS.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={e => handleClick(e, link.id)}
                                className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right - Socials */}
                    <div className="flex items-center gap-4">
                        {SOCIAL_LINKS.map(link => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-xs">
                        © {new Date().getFullYear()} Kapil Dev. All rights reserved.
                    </p>
                    <p className="text-white/30 text-xs flex items-center gap-1">
                        Designed & Developed with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by Kapil Dev
                    </p>
                </div>
            </div>
        </footer>
    );
}
