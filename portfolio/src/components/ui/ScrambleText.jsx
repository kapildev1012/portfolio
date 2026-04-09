import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function ScrambleText({ text, duration = 1.2, delay = 0, className = "" }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let timeoutId;
    let intervalId;

    const startAnimation = () => {
      let iteration = 0;
      const totalIterations = (duration * 1000) / 40; // 40ms frame rate

      intervalId = setInterval(() => {
        setDisplayText((prev) => {
          return text.split('').map((char, index) => {
            if (char === ' ') return ' ';
            // If we've passed this character's reveal threshold, show the actual character
            if (index < (iteration / totalIterations) * text.length) {
              return text[index];
            }
            // Otherwise show random character
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          }).join('');
        });

        iteration++;
        if (iteration >= totalIterations) {
          clearInterval(intervalId);
          setDisplayText(text);
        }
      }, 40);
    };

    timeoutId = setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, duration, delay, isInView]);

  return (
    <motion.span 
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {displayText}
    </motion.span>
  );
}
