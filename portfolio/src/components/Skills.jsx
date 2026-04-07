import React from 'react';
import { motion } from 'framer-motion';
import { VelocityText } from './ScrollVelocity';
import { Figma, Git, Javascript, Mysql, Nextjs, Node, Php, PostgreSQL, ReactLogo, Typescript, Bootstrap, Css, Django, Html, MongoDB, Postman } from './SkillLogos';
import { Highlighter } from "@/components/ui/highlighter";

const skillsRow1 = [
  <ReactLogo key="react" />,
  <Nextjs key="nextjs" />,
  <Javascript key="js" />,
  <Typescript key="ts" />,
  <Bootstrap key="bootstrap" />,
  <Css key="css" />,
  <Django key="django" />,
  <Figma key="figma" />,
];

const skillsRow2 = [
  <Html key="html" />,
  <MongoDB key="mongodb" />,
  <PostgreSQL key="postgresql" />,
  <Postman key="postman" />,
  <Mysql key="mysql" />,
  <Node key="node" />,
  <Git key="git" />,
  <Php key="php" />,
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full py-20 md:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0c1120 0%, #080d1a 55%, #0a0518 100%)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      <div className="relative z-10 section-wrap text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            <Highlighter action="underline" color="rgba(168,85,247,0.3)" strokeWidth={3}>
              Tech Stack
            </Highlighter>
          </h2>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col gap-8 md:gap-12 w-full">
        <VelocityText baseVelocity={-2} numCopies={6}>
          {skillsRow1.map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, color: '#818cf8' }}
              className="w-16 h-16 md:w-20 md:h-20 text-white/30 mx-6 md:mx-10 transition-colors"
            >
              {logo}
            </motion.div>
          ))}
        </VelocityText>
        <VelocityText baseVelocity={2} numCopies={6}>
          {skillsRow2.map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, color: '#a78bfa' }}
              className="w-16 h-16 md:w-20 md:h-20 text-white/30 mx-6 md:mx-10 transition-colors"
            >
              {logo}
            </motion.div>
          ))}
        </VelocityText>
      </div>
    </section>
  );
}