import React from 'react';
import Spline from '@splinetool/react-spline';
import { Github, Linkedin, Download } from 'lucide-react';
import RotatingText from './RotatingText';

const roles = ['Full-Stack Developer', 'MERN Stack Engineer', 'UI/UX Designer', 'Entrepreneur'];

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <Spline scene="https://prod.spline.design/9xuF1oRA5poA131s/scene.splinecode" />
        {/* Hard cover over Spline watermark (bottom-right) */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '260px',
          height: '80px',
          background: 'linear-gradient(to top left, #0c1120 60%, transparent 100%)',
          zIndex: 999999,
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }} />
        {/* Secondary safety cover (top-right) */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '80px',
          background: 'linear-gradient(to bottom left, #0c1120 60%, transparent 100%)',
          zIndex: 999999,
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }} />
      </div>

      {/* Gradient overlay - ensures Hero text pop */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#0c1120]/40 via-transparent to-[#0c1120]/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 flex items-center justify-center w-full h-full text-center pointer-events-none px-6">
        <div className="pointer-events-auto">

          {/* Name */}
          <h1 className="flex flex-col items-center gap-1 text-white" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            <span className="text-3xl font-light tracking-wide opacity-75">Hi, I'm</span>
            <span
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight gradient-text"
              style={{ WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}
            >
              Kapil Dev
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
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="https://github.com/kapildev1012"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-primary"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kapil-dev-2a48103a7/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-outline"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href="https://drive.google.com/file/d/1HUSyidPB-EnwbagpZNlVQOJ1-Do7upTP/view"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium btn-outline"
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