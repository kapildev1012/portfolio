import React from 'react';
import { motion } from 'framer-motion';
import { VelocityText } from './ScrollVelocity';
import {
  Figma, Git, Javascript, Mysql, Nextjs, Node, Php, PostgreSQL,
  ReactLogo, Typescript, Bootstrap, Css, Django, Html, MongoDB, Postman
} from './SkillLogos';

const SKILLS_DATA = [
  {
    category: "Frontend & Core",
    skills: [
      { name: "React", logo: <ReactLogo />, color: "#61DAFB" },
      { name: "Next.js", logo: <Nextjs />, color: "#FFFFFF" },
      { name: "JavaScript", logo: <Javascript />, color: "#F7DF1E" },
      { name: "TypeScript", logo: <Typescript />, color: "#3178C6" },
      { name: "Tailwind", logo: <Css />, color: "#06B6D4" },
      { name: "Bootstrap", logo: <Bootstrap />, color: "#7952B3" },
      { name: "HTML5", logo: <Html />, color: "#E34F26" },
      { name: "CSS3", logo: <Css />, color: "#1572B6" },
    ]
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Node.js", logo: <Node />, color: "#339933" },
      { name: "Django", logo: <Django />, color: "#092E20" },
      { name: "PHP", logo: <Php />, color: "#777BB4" },
      { name: "Postman", logo: <Postman />, color: "#FF6C37" },
      { name: "Git", logo: <Git />, color: "#F05032" },
      { name: "Figma", logo: <Figma />, color: "#F24E1E" },
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", logo: <MongoDB />, color: "#47A248" },
      { name: "PostgreSQL", logo: <PostgreSQL />, color: "#4169E1" },
      { name: "MySQL", logo: <Mysql />, color: "#4479A1" },
    ]
  }
];

const SkillCard = ({ name, logo, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, zIndex: 50 }}
      className="group relative flex flex-col items-center justify-center p-4 md:p-5 min-w-[90px] md:min-w-[150px] rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-500 mx-2 md:mx-4"
    >
      {/* Decorative Glow */}
      <div 
        className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      <div className="w-8 h-8 md:w-14 md:h-14 mb-3 md:mb-4 transition-all duration-500 transform group-hover:scale-110">
        {logo}
      </div>
      
      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/25 group-hover:text-white transition-colors">
        {name}
      </span>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full py-24 md:py-40 overflow-hidden bg-[#0c1120]"
    >
      {/* Background Kinetic Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-indigo-500/5 to-transparent blur-[120px]" />
      </div>

      <div className="relative z-10 w-full">
        <header className="px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto mb-20 md:mb-32 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-indigo-400 text-xs font-black uppercase tracking-[0.6em] mb-4"
          >
            Kinetic_Stack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]"
          >
            Engineering<br /> <span className="text-white/10">The Performance.</span>
          </motion.h2>
        </header>

        <div className="flex flex-col gap-12 md:gap-20">
          <div className="flex flex-col gap-4">
            <VelocityText baseVelocity={-1.5} numCopies={8}>
              {SKILLS_DATA[0].skills.map((skill, i) => (
                <SkillCard key={i} {...skill} />
              ))}
            </VelocityText>
          </div>

          <div className="flex flex-col gap-4">
            <VelocityText baseVelocity={1.5} numCopies={8}>
              {SKILLS_DATA[1].skills.concat(SKILLS_DATA[2].skills).map((skill, i) => (
                <SkillCard key={i} {...skill} />
              ))}
            </VelocityText>
          </div>
        </div>
      </div>
    </section>
  );
}