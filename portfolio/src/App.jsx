import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import SocialMagnet from './components/SocialMagnet';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { SmoothCursor } from './components/ui/smooth-cursor';

import './App.css'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Loading screen - hide after 2.5s
    const loadTimer = setTimeout(() => setLoading(false), 2500);

    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);

    // 1. Initialize Lenis with custom settings for scroll speed
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.05,
      smoothWheel: true,
    });

    // 2. Connect Lenis to GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Use GSAP's ticker to drive Lenis's animation loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 4. Cleanup on component unmount
    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${!loading ? 'loaded' : ''}`}>
        <div className="loading-spinner" />
        <p className="loading-text">Kapil Dev</p>
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {!isMobile && <SmoothCursor />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <ContactForm />
        <SocialMagnet />
      </main>
      <Footer />
    </>
  )
}

export default App
