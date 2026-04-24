import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAME = 'Kapil Dev';
const ROLE = 'Full-Stack Engineer';

// Scramble characters pool
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

function useScramble(finalText, delay = 0) {
  const [display, setDisplay] = useState(() => finalText.split('').map(() => ' '));
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      let iteration = 0;
      const letters = finalText.split('');

      intervalRef.current = setInterval(() => {
        setDisplay(prev =>
          letters.map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return finalText[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
        );

        if (iteration >= letters.length) {
          clearInterval(intervalRef.current);
        }
        iteration += 0.4;
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [finalText, delay]);

  return display;
}

export default function LoadingScreen({ loading }) {
  const [progress, setProgress] = useState(0);

  const nameDisplay = useScramble(NAME, 200);
  const roleDisplay = useScramble(ROLE, 500);

  useEffect(() => {
    const duration = 1200; // ms
    const start = Date.now();
    let raf;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">

          {/* ── 1. SPLIT DOORS (Background) ── */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#030509] overflow-hidden"
            initial={{ y: "0%" }}
            exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.15 } }}
          >
            {/* Grid overlay top */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#030509] overflow-hidden"
            initial={{ y: "0%" }}
            exit={{ y: "100%", transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.15 } }}
          >
            {/* Grid overlay bottom */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              backgroundPosition: '0 -50vh' // Match alignment with top
            }} />
          </motion.div>

          {/* ── 2. CENTRAL LASER PROGRESS ── */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-[1px] bg-indigo-400 z-50 shadow-[0_0_15px_rgba(99,102,241,1),0_0_30px_rgba(168,85,247,0.8)]"
            style={{
              transform: `translateY(-50%) scaleX(${progress / 100})`,
              transformOrigin: "left"
            }}
            exit={{
              scaleY: 50,
              opacity: 0,
              filter: "blur(10px)",
              boxShadow: "0 0 50px rgba(255,255,255,1)",
              transition: { duration: 0.4, ease: "easeOut" }
            }}
          />

          {/* ── 3. CONTENT OVERLAY ── */}
          <motion.div
            className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              scale: 1.15,
              filter: "blur(12px)",
              transition: { duration: 0.45, ease: "easeIn" }
            }}
          >
            {/* Massive Background Counter */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <span className="text-[45vw] font-black text-white select-none leading-none tracking-tighter" style={{ fontFamily: 'Inter' }}>
                {Math.round(progress).toString().padStart(3, '0')}
              </span>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute bg-indigo-500/20 w-[40vw] h-[40vw] rounded-full blur-[100px] top-1/4 -left-1/4" />
            <div className="absolute bg-fuchsia-500/10 w-[50vw] h-[50vw] rounded-full blur-[120px] bottom-1/4 -right-1/4" />

            {/* Text Elements */}
            <div className="flex flex-col items-center z-10 -mt-16">
              <motion.span
                className="text-xs tracking-[0.4em] text-white/40 font-mono mb-6 uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                HI I'M
              </motion.span>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-white to-purple-400 mb-4 whitespace-nowrap">
                {nameDisplay.map((char, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.03 + 0.2}s` }} className="inline-block animate-fade-in-up opacity-0">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h1>

              <motion.div
                className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {roleDisplay.map((char, i) => (
                  <span key={i} className="inline-block transition-colors duration-100">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Floating percentage status */}
            <motion.div
              className="absolute bottom-20 flex flex-col items-center gap-3 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="px-5 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Loading Core</span>
                <span className="text-[10px] font-black text-indigo-400 tracking-widest tabular-nums">{Math.round(progress)}%</span>
              </div>
            </motion.div>

            {/* ── 4. CORNER HUD ELEMENTS ── */}


          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
