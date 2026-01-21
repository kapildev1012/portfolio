import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WordRotate } from "@/components/ui/word-rotate";
import { Highlighter } from "@/components/ui/highlighter";

export default function About() {
    const aboutMe = [
        "I craft digital experiences",
        "I design with purpose",
        "I code with passion",
        "I solve problems creatively"
    ];

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const gradientStyle = {
        background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #0a0f1e 50%, #050811 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
    };

    const particleStyle = (index) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animation: `float ${Math.random() * 10 + 10}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.1,
    });

    return ( <
        section id = "about"
        className = "relative w-full min-h-screen overflow-hidden bg-gray-900"
        onMouseEnter = {
            () => setIsHovered(true) }
        onMouseLeave = {
            () => setIsHovered(false) } >
        { /* Animated Background */ } <
        motion.div className = "absolute inset-0 z-10 w-full h-full"
        style = { gradientStyle }
        animate = {
            {
                backgroundPosition: [
                    '0% 0%',
                    '100% 100%',
                    '0% 100%',
                    '0% 0%',
                ],
            }
        }
        transition = {
            {
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
            }
        } >
        { /* Animated Particles */ } {
            [...Array(30)].map((_, i) => ( <
                div key = { i }
                className = "absolute rounded-full bg-white/30"
                style = { particleStyle(i) }
                />
            ))
        }

        { /* Subtle Grid Overlay */ } <
        div className = "absolute inset-0 opacity-10"
        style = {
            {
                backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }
        }
        /> <
        /motion.div>

        { /* Animated Cursor Light */ } <
        motion.div className = "pointer-events-none fixed -left-1/2 -top-1/2 w-full h-full rounded-full mix-blend-overlay"
        style = {
            {
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translate(-50%, -50%)`,
                width: '100vw',
                height: '100vh',
                transition: isHovered ? 'all 0.1s ease-out' : 'all 0.3s ease-out',
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.8 : 0.5,
            }
        }
        />

        { /* Content */ } <
        div className = "relative z-20 flex items-center justify-center w-full h-full p-8 text-center text-white sm:p-16 md:p-24" >
        <
        div className = "max-w-4xl" >
        <
        h2 className = "mb-8 font-pixel text-4xl font-bold md:text-6xl lg:text-7xl [text-shadow:0_3px_5px_rgb(0_0_0/40%)]" >
        <
        Highlighter action = "highlight"
        color = "#3b82f6" >
        About Me <
        /Highlighter> <
        /h2>

        <
        div className = "mb-12" >
        <
        WordRotate words = { aboutMe }
        className = "text-2xl md:text-4xl font-bold text-white/90 [text-shadow:0_2px_4px_rgb(0_0_0/40%)]" /
        >
        <
        /div>

        <
        div className = "max-w-3xl mx-auto text-lg leading-relaxed text-white/90 md:text-xl [text-shadow:0_1px_2px_rgb(0_0_0/40%)]" >
        <
        p className = "mb-6" >
        I 'm a passionate developer who loves creating beautiful, functional web experiences. 
        With a keen eye
        for design and a love
        for clean code, I bring ideas to life through thoughtful interfaces and engaging interactions. <
        /p> <
        p className = "mb-6" >
        My journey in web development has taken me through various technologies and frameworks,
        always focusing on creating seamless user experiences.I believe in the power of design to solve problems and the importance of performance and accessibility in every project. <
        /p> <
        p >
        When I 'm not coding, you can find me exploring new technologies, contributing to open-source 
        projects, or sharing my knowledge with the developer community. <
        /p> <
        /div> <
        /div> <
        /div>

        <
        style jsx global > { `
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes float {
                    0% { 
                        transform: translateY(0) translateX(0) rotate(0deg); 
                        opacity: 0.1; 
                    }
                    100% { 
                        transform: translateY(-100vh) translateX(20px) rotate(360deg); 
                        opacity: 0; 
                    }
                }
            ` } < /style> <
        /section>
    );
}