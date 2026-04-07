import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Code2, Rocket, Users, Monitor, MapPin, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import { WordRotate } from "@/components/ui/word-rotate";
import { Highlighter } from "@/components/ui/highlighter";
import GlareHover from './GlareHover';
import Magnet from './Magnet';

function Counter({ value, suffix }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    useEffect(() => {
        if (!inView) return;

        const ctrl = animate(0, value, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
                if (ref.current) ref.current.textContent = Math.floor(v) + suffix;
            },
        });

        return () => ctrl.stop();
    }, [inView, value, suffix]);

    return <span ref={ref}>0{suffix}</span>;
}

const STATS = [
    { icon: Rocket, value: 9, suffix: '+', label: 'Projects' },
    { icon: Code2, value: 2, suffix: '+', label: 'Years Exp.' },
    { icon: Monitor, value: 15, suffix: '+', label: 'Technologies' },
    { icon: Users, value: 5, suffix: '+', label: 'Clients' },
];

const SKILLS = [
    'React.js',
    'Next.js',
    'Tailwind CSS',
    'Redux',
    'Framer Motion',
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
    'Python',
    'AI/ML',
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const GRAD = {
    background: 'linear-gradient(135deg, #818cf8, #a78bfa, #e879f9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
};

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section
            id="about"
            ref={ref}
            className="relative w-full min-h-screen"
            style={{ background: 'linear-gradient(160deg, #0c1120 0%, #080d1a 55%, #0a0518 100%)' }}
        >
            <div
                className="absolute top-0 left-0 w-[800px] h-[800px] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 0 0, rgba(99,102,241,0.18) 0%, transparent 65%)',
                    filter: 'blur(100px)',
                }}
            />
            <div
                className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 100% 100%, rgba(168,85,247,0.15) 0%, transparent 65%)',
                    filter: 'blur(100px)',
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="relative z-10 w-full section-wrap">
                <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className="mb-20 md:mb-28">
                    <motion.p variants={fadeUp} className="text-indigo-400 text-xs font-bold tracking-[0.22em] uppercase mb-4">
                        Get to know me
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-3">
                        About <span style={GRAD}>Me</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-white/40 text-base max-w-md">
                        Innovative Full-Stack Software Engineer (MERN) building scalable applications.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-3 space-y-8"
                    >
                        <div className="space-y-5">
                            <div className="flex flex-col mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                                    I am a <span style={GRAD}>Creative</span>
                                </h3>
                                <WordRotate
                                    words={['Full-Stack Engineer', 'MERN Stack Expert', 'Founder at Zippin', 'Tech Solutionist']}
                                    className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
                                    duration={3000}
                                />
                            </div>
                            <div className="space-y-6 text-white/75 leading-[1.8] text-[16px]">
                                <p>
                                    I'm a <Highlighter action="underline" color="rgba(129,140,248,0.4)" strokeWidth={2.5}>
                                        Full-Stack Software Engineer (MERN)
                                    </Highlighter>{' '}
                                    with strong expertise in building scalable web applications, e-commerce systems, and enterprise dashboards.
                                </p>
                                <p>
                                    As <Highlighter action="bracket" color="rgba(167,139,250,0.5)" strokeWidth={2}>
                                        Founder & Lead Developer at Zippin Full-Stack Solutions
                                    </Highlighter>, I've built multi-store inventory systems for food chains & cafés, gym management platforms with membership tiers, and Amazon-style e-commerce marketplaces.
                                </p>
                                <p>
                                    Currently pursuing <Highlighter action="highlight" color="rgba(139,92,246,0.15)" padding={1}>
                                        B.Tech in Computer Science & Engineering (2023 - 2027) at HPTU
                                    </Highlighter>, with proven track record leading college projects including AI attendance systems with facial recognition and virtual class platforms.
                                </p>
                            </div>
                        </div>

                        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className="flex flex-wrap gap-2">
                            {SKILLS.map((skill) => (
                                <motion.span
                                    key={skill}
                                    variants={fadeUp}
                                    className="px-3.5 py-1.5 text-xs font-medium rounded-full border border-white/10 text-white/50 bg-white/4 hover:border-indigo-400/30 hover:text-white/75 transition-all duration-200 cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>

                        <Magnet magnetStrength={4} padding={40}>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.getElementById('contact');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center gap-2 text-base font-semibold text-indigo-400 hover:text-indigo-300 group transition-colors duration-200"
                            >
                                Let's work together
                                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                        </Magnet>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <GlareHover
                            width="100%"
                            height="auto"
                            borderRadius="24px"
                            borderColor="rgba(255,255,255,0.08)"
                            background="rgba(255,255,255,0.03)"
                            className="w-full"
                        >
                            <div className="w-full flex items-start gap-5 p-6 md:p-8 lg:p-10">
                                <div
                                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                                >
                                    <Briefcase className="w-5 h-5 text-white" />
                                </div>
                                <div className="min-w-0 flex-1 space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-white text-sm font-semibold">Founder & Lead Dev</span>
                                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-indigo-400 text-xs font-medium">Zippin Full-Stack Solutions</p>
                                    <p className="text-white/30 text-xs">Jan 2023– Present</p>
                                </div>
                            </div>
                        </GlareHover>

                        <GlareHover
                            width="100%"
                            height="auto"
                            borderRadius="24px"
                            borderColor="rgba(255,255,255,0.08)"
                            background="rgba(255,255,255,0.03)"
                            className="w-full"
                        >
                            <div className="w-full flex items-start gap-5 p-6 md:p-8 lg:p-10">
                                <div
                                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed, #c026d3)' }}
                                >
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <div className="min-w-0 flex-1 space-y-2">
                                    <p className="text-white text-sm font-semibold">B.Tech— CS & Engineering</p>
                                    <p className="text-purple-400 text-xs font-medium">HPTU, Himachal Pradesh</p>
                                    <p className="text-white/30 text-xs">2023– 2027</p>
                                </div>
                            </div>
                        </GlareHover>

                        <GlareHover
                            width="100%"
                            height="auto"
                            borderRadius="24px"
                            borderColor="rgba(255,255,255,0.08)"
                            background="rgba(255,255,255,0.03)"
                            className="w-full"
                        >
                            <div className="w-full flex items-center gap-5 p-6 md:p-8 lg:p-10">
                                <div
                                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, #db2777, #be123c)' }}
                                >
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-white text-sm font-semibold">Based in India</p>
                                    <p className="text-white/35 text-xs">Himachal Pradesh🇮🇳 · Open to remote</p>
                                </div>
                            </div>
                        </GlareHover>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
