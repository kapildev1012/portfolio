import React from 'react';
import { motion } from 'framer-motion';
import { Highlighter } from "@/components/ui/highlighter";
import TiltCard from "./TiltCard";
import { GraduationCap, Award, Briefcase, Microscope, Terminal, Layers, Activity, Sparkles, Github } from 'lucide-react';

const GRAD = {
    background: 'linear-gradient(to right, #818cf8, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold'
};

const QUAL_DATA = [
    {
        category: "Education",
        icon: <GraduationCap size={20} />,
        items: [
            {
                title: "H.P. Technical University",
                subtitle: "B.Tech – CS & Engineering",
                period: "2023 – 2027",
                status: "Ongoing",
                color: "indigo"
            },
            {
                title: "Him Academy Public School",
                subtitle: "Senior Secondary (Non-Med)",
                period: "Class XII – 2021",
                color: "indigo"
            }
        ]
    },
    {
        category: "Experience",
        icon: <Briefcase size={20} />,
        items: [
            {
                title: "Zippin Full-Stack Solutions",
                subtitle: "Founder & Lead Developer",
                period: "Jan 2023 – Present",
                status: "Active",
                color: "emerald"
            },
            {
                title: "Project Architecture",
                subtitle: "Multi-store Systems & E-Com",
                period: "Scalable Solutions",
                color: "emerald"
            }
        ]
    },
    {
        category: "Open Source",
        icon: <Github size={20} />,
        items: [
            { title: "Wellfire Ecommerce", subtitle: "MERN Stack Storefront", status: "Public", color: "purple" },
            { title: "Hotspot Inventory", subtitle: "Multi-store Management", color: "purple" },
            { title: "Sahityaa Sangamm", subtitle: "Laravel E-Com Engine", status: "Active", color: "purple" }
        ]
    },
    {
        category: "Research",
        icon: <Microscope size={20} />,
        items: [
            { title: "AI Attendance", subtitle: "Facial Recognition logging", color: "pink" },
            { title: "Virtual Class Platform", subtitle: "Real-time collaboration", color: "pink" }
        ]
    }
];

export default function Education() {
    return (
        <section
            id="education"
            className="relative w-full py-32 md:py-48 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #0a0518 0%, #080d1a 55%, #0c1120 100%)' }}
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:60px_60px]" />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10"
                    style={{ background: 'radial-gradient(circle at center, rgba(129,140,248,0.15) 0%, transparent 70%)', filter: 'blur(100px)' }}
                />
            </div>

            <div className="relative z-10 w-full section-wrap">
                <div className="flex flex-col items-center text-center mb-24 md:mb-56">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6"
                    >
                        <Terminal size={20} className="text-indigo-400" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-indigo-400 text-xs font-black tracking-[0.4em] uppercase mb-4"
                    >
                        Academic Journey
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold text-white tracking-tighter"
                    >
                        <Highlighter action="underline" color="rgba(129,140,248,0.3)" strokeWidth={3}>
                            Qualifications
                        </Highlighter>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-40 max-w-[110rem] mx-auto px-8 md:px-16">
                    {QUAL_DATA.map((node, idx) => (
                        <div key={idx} className="relative group">
                            {/* Vertical Divider */}
                            {idx < 3 && (
                                <div className="hidden lg:block absolute -right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                            )}

                            {/* Header */}
                            <div className="flex items-center gap-4 mb-12">
                                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                                    {node.icon}
                                </div>
                                <h3 className="text-white/80 text-[10px] font-black tracking-[0.4em] uppercase">
                                    {node.category}
                                </h3>
                            </div>

                            {/* List Items */}
                            <div className="space-y-12 md:space-y-16 relative z-10">
                                {node.items.map((item, i) => (
                                    <div key={i} className="group/item relative pl-5 border-l border-white/5 hover:border-indigo-500/40 transition-colors duration-300">
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <p className="text-white font-bold text-sm md:text-base leading-tight group-hover/item:text-indigo-400 transition-colors">
                                                    {item.title}
                                                </p>
                                                {item.status && (
                                                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-black border border-emerald-500/20 uppercase tracking-widest shrink-0">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                        {item.status}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-white/40 text-[12px] font-medium leading-relaxed max-w-[200px]">
                                                {item.subtitle}
                                            </p>
                                            {item.period && (
                                                <p className="text-white/20 text-[10px] font-black tracking-widest uppercase italic border-t border-white/5 pt-2 mt-2 w-fit">
                                                    {item.period}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-col items-center gap-4"
                >
                    <div className="h-10 w-px bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
                    <div className="flex items-center gap-3 text-white/20">
                        <Activity size={12} className="text-indigo-400/50" />
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase">End of Knowledge Base</span>
                        <Activity size={12} className="text-indigo-400/50" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
