"use client"

import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { ScrambleText } from './ui/ScrambleText';
import { Highlighter } from "@/components/ui/highlighter";
import { ArrowUpRight, Github, Code2, Plus } from 'lucide-react';

import project1 from '../assets/projects/project1.png';
import project2 from '../assets/projects/project2.png';
import project3 from '../assets/projects/Project3.png';
import project4 from '../assets/projects/Project4.png';
import project5 from '../assets/projects/project5.png';
import project7 from '../assets/projects/project7.png';
import hotspotImg from '../assets/projects/hotspot.png';

const GITHUB_USERNAME = 'kapildev1012';

// Repos to always exclude (profile README)
const EXCLUDED_REPOS = ['kapildev1012'];

// Pinned repos shown first (in this exact order)
const PINNED_REPOS = ['wellfire.new2', 'hotspot.new'];

// Curated overrides for known repos — image, video, live URL
const REPO_OVERRIDES = {
  'wellfire.new2': {
    imageUrl: project4,
    liveUrl: 'https://wellfire-new2.vercel.app',
    description: 'A full-stack MERN e-commerce storefront with real-time inventory, cart management, and secure checkout.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  'hotspot.new': {
    imageUrl: hotspotImg,
    liveUrl: 'https://github.com/kapildev1012/hotspot.new',
    description: 'A multi-store inventory & order management system with real-time updates and JWT-based role authentication.',
    tags: ['React', 'Node.js', 'Socket.IO'],
  },
  'react-personal-portfolio-main': {
    imageUrl: project7,
    liveUrl: 'https://kapildev.netlify.app',
    description: 'This very portfolio — built with React, GSAP, Spline 3D, Framer Motion, and Lenis smooth scroll.',
    tags: ['React', 'GSAP', 'Spline'],
  },
};

const FALLBACK_IMAGES = [project1, project2, project3, project4, project5];

function formatTitle(repoName) {
  return repoName
    .replace(/[-_.]/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function repoToProject(repo, fallbackIdx) {
  const key = repo.name.toLowerCase();
  const overrides = REPO_OVERRIDES[key] || {};
  return {
    title: formatTitle(repo.name),
    description: overrides.description || repo.description || 'A project built with modern web technologies.',
    imageUrl: overrides.imageUrl || FALLBACK_IMAGES[fallbackIdx % FALLBACK_IMAGES.length],
    videoUrl: overrides.videoUrl || null,
    liveUrl: overrides.liveUrl || repo.homepage || repo.html_url,
    repoUrl: repo.html_url,
    tags: overrides.tags || [repo.language || 'Code'].filter(Boolean),
  };
}

const ProjectCard = memo(({ project, index }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group flex flex-col h-full bg-white transition-all duration-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100 shadow-sm group-hover:shadow-2xl group-hover:shadow-black/5 transition-all duration-700">
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.05]"
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-50">
            <Github size={48} className="text-black/5 group-hover:text-black/10 transition-colors duration-500" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500 flex items-center justify-center">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-black text-white opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center shadow-xl backdrop-blur-sm pointer-events-auto"
          >
            <ArrowUpRight size={24} strokeWidth={2.5} />
          </motion.a>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-8 px-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-black/20 text-[10px] font-black uppercase tracking-[0.3em]">{formattedIndex}</span>
              <div className="h-[1px] w-8 bg-black/10" />
              <span className="text-black/20 text-[10px] font-black uppercase tracking-[0.3em]">Project</span>
            </div>
            <h3 className="text-2xl font-black text-black tracking-tightest group-hover:text-black/70 transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
          </div>
          {project.repoUrl && project.repoUrl !== '#' && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 p-2 rounded-full border border-black/5 hover:border-black/20 hover:bg-black/5 transition-all text-black/20 hover:text-black"
            >
              <Github size={18} strokeWidth={1.5} />
            </a>
          )}
        </div>

        <p className="text-zinc-500 text-sm md:text-base font-medium max-w-full leading-relaxed mt-1 line-clamp-2 min-h-[3rem]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black text-black/25 uppercase tracking-widest transition-all group-hover:text-black/50 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-current" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

// The 3 featured projects shown by default (hardcoded, curated)
const FEATURED = [
  {
    title: 'Wellfire Ecommerce',
    description: 'A full-stack MERN e-commerce storefront with real-time inventory, cart management, and secure checkout.',
    imageUrl: project4,
    videoUrl: null,
    liveUrl: 'https://wellfire-new2.vercel.app',
    repoUrl: 'https://github.com/kapildev1012/wellfire.new2',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Hotspot — SmartStock',
    description: 'A multi-store inventory & order management system with real-time updates and JWT-based role authentication.',
    imageUrl: hotspotImg,
    videoUrl: null,
    liveUrl: 'https://github.com/kapildev1012/hotspot.new',
    repoUrl: 'https://github.com/kapildev1012/hotspot.new',
    tags: ['React', 'Node.js', 'Socket.IO'],
  },
  {
    title: 'Portfolio Website',
    description: 'This very portfolio — built with React, GSAP, Spline 3D, Framer Motion, and Lenis smooth scroll.',
    imageUrl: project7,
    videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764395075/1764395026924189_ij9257.mov',
    liveUrl: 'https://kapildev.netlify.app',
    repoUrl: 'https://github.com/kapildev1012/React-Personal-Portfolio-main',
    tags: ['React', 'GSAP', 'Spline'],
  },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [extraProjects, setExtraProjects] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        );
        if (!res.ok) return;
        const data = await res.json();

        // Exclude forks, profile readme, and any repos already in FEATURED
        const featuredKeys = ['wellfire.new2', 'hotspot.new', 'react-personal-portfolio-main'];
        const filtered = data.filter(
          (r) =>
            !r.fork &&
            !EXCLUDED_REPOS.includes(r.name.toLowerCase()) &&
            !featuredKeys.includes(r.name.toLowerCase())
        );

        setExtraProjects(filtered.map((repo, idx) => repoToProject(repo, idx)));
      } catch (err) {
        console.error('GitHub API error:', err);
      }
    };
    fetchRepos();
  }, []);

  const allProjects = [...FEATURED, ...extraProjects];
  const displayedProjects = showAll ? allProjects : FEATURED;

  return (
    <section
      id="projects"
      className="relative w-full flex flex-col items-center bg-white overflow-hidden py-24 md:py-48"
    >
      <div className="relative z-10 w-full section-wrap px-6 md:px-12 lg:px-24 max-w-[120rem]">
        {/* Header */}
        <div className="flex flex-col mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6 md:mb-10"
          >
            <div className="w-8 md:w-12 h-[1px] bg-black/10" />
            <span className="text-black/30 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">
              Selected_Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-black tracking-tightest leading-[0.9] md:leading-[0.85] uppercase"
          >
            <ScrambleText text="Curated" duration={1} /><br />
            <Highlighter action="underline" color="#f5f5f5" strokeWidth={12}>
              <ScrambleText text="Projects" duration={1.5} delay={0.2} />
            </Highlighter>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 md:gap-y-32">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Show More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 flex flex-col items-center"
        >
          {extraProjects.length > 0 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex flex-col items-center gap-10"
            >
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
              <span className="text-black/40 group-hover:text-black font-black text-[10px] tracking-[0.5em] uppercase transition-all duration-500">
                {showAll ? 'Collapse Gallery' : 'Explore full archive'}
              </span>
              <div className="p-6 rounded-full border border-black/5 group-hover:border-black/20 group-hover:bg-black/5 transition-all duration-700">
                <Plus size={24} className="text-black/30 group-hover:text-black transition-all transform group-hover:rotate-90 duration-700" />
              </div>
            </button>
          )}

          <div className="mt-48 flex items-center justify-center gap-6 md:gap-12 text-black/[0.03] select-none w-full overflow-hidden">
            <Code2 size={24} />
            <span className="text-[40px] md:text-[100px] lg:text-[150px] font-black uppercase tracking-tightest truncate">Technical_Excellence</span>
            <Code2 size={24} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
