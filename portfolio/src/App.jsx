import { useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';

// Critical above-the-fold components loaded eagerly
import Hero from './components/hero';
import Navbar from './components/Navbar';

// Lazy load everything below the fold
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const SocialMagnet = lazy(() => import('./components/SocialMagnet'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const SmoothCursor = lazy(() =>
  import('./components/ui/smooth-cursor').then(m => ({ default: m.SmoothCursor }))
);

import './App.css'

// Minimal loading fallback — invisible, no layout shift
const SectionFallback = () => (
  <div style={{ minHeight: '50vh' }} />
);

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const scrollBarRef = useRef(null);
  const resizeTimerRef = useRef(null);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    resizeTimerRef.current = setTimeout(() => {
      setIsMobile(window.innerWidth < 768);
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });

    // Faster loading — 1.4s instead of 2.5s
    const loadTimer = setTimeout(() => setLoading(false), 1400);

    // Scroll progress — direct DOM manipulation instead of React state
    // This avoids re-rendering the ENTIRE app tree on every scroll frame
    const progressBar = scrollBarRef.current;
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
        }
        rafId = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Lenis — faster, snappier scroll response
    const lenis = new Lenis({
      duration: 0.8,        // was 1.2 — snappier
      lerp: 0.12,           // was 0.05 — MUCH faster interpolation
      smoothWheel: true,
      wheelMultiplier: 1.2, // slightly faster wheel
      touchMultiplier: 1.5, // faster touch scroll
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(loadTimer);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, [handleResize]);

  return (
    <>
      {/* Cinematic Loading Screen */}
      <LoadingScreen loading={loading} />

      {/* Scroll Progress Bar — ref-driven, no React re-renders */}
      <div ref={scrollBarRef} className="scroll-progress" style={{ width: '0%' }} />

      {!isMobile && (
        <Suspense fallback={null}>
          <SmoothCursor />
        </Suspense>
      )}
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactForm />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SocialMagnet />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
