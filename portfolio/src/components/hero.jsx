import React from 'react';
import Spline from '@splinetool/react-spline';
import { Github, Linkedin, Download } from 'lucide-react';
import RotatingText from './RotatingText';
import { ScrambleText } from './ui/ScrambleText';

const roles = ['Full-Stack Developer', 'MERN Stack Engineer', 'UI/UX Designer', 'Entrepreneur'];

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <Spline scene="https://prod.spline.design/9xuF1oRA5poA131s/scene.splinecode" />

      </div>

      {/* Gradient overlay - ensures Hero text pop */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#0c1120]/40 via-transparent to-[#0c1120]/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 flex items-center justify-center w-full h-full text-center pointer-events-none px-6">
        <div className="pointer-events-auto">

          {/* Name */}
          <h1 className="flex flex-col items-center gap-1 text-white" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span className="text-xl sm:text-3xl font-light tracking-wide opacity-75">
              <ScrambleText text="Hi, I'm" duration={0.8} delay={0.2} />
            </span>
            <span
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight gradient-text"
              style={{ WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}
            >
              <ScrambleText text="Kapil Dev" duration={1.5} delay={0.4} />
            </span>
          </h1>

          {/* Rotating role */}
          <div className="flex justify-center mt-4">
            <RotatingText
              texts={roles}
              mainClassName="text-lg md:text-xl text-white/65 font-normal"
              splitLevelClassName="overflow-hidden"
              staggerDuration={0.08}
              staggerFrom="last"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-8 w-full max-w-[85vw] mx-auto">
            <a
              href="https://github.com/kapildev1012"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-primary w-full sm:w-auto justify-center"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kapil-dev-2a48103a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-outline w-full sm:w-auto justify-center"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href="https://drive.google.com/file/d/1RcR8AhLy9C1x4r4t_iYanBT3v9iCfzEx/view"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-outline w-full sm:w-auto justify-center"
            >
              <Download size={18} />
              Resume
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}