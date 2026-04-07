"use client"

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Highlighter } from "@/components/ui/highlighter";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github, Code2, Plus } from 'lucide-react';

const GITHUB_USERNAME = 'kapildev1012';

const ProjectCard = ({ project, index }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-10 md:gap-14"
    >
      {/* Media Showcase - Pure Clean Float */}
      <div className="relative aspect-video overflow-hidden bg-[#111] rounded-sm transition-all duration-700">
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-[1.03]"
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 filter group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900/50">
            <Github size={60} className="text-white/5 group-hover:text-white/10 transition-colors duration-500" />
          </div>
        )}
        
        {/* Interaction Layer */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center scale-90 group-hover:scale-100 shadow-2xl"
            >
              <ArrowUpRight size={30} strokeWidth={2.5} />
            </motion.a>
        </div>
      </div>

      {/* Info Layer - Nike Bold Typography */}
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-2">{formattedIndex} — Project</span>
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter transition-colors duration-500 group-hover:text-white leading-none">
              {project.title}
            </h3>
          </div>
          {project.repoUrl && project.repoUrl !== '#' && (
             <a 
              href={project.repoUrl} 
              target="_blank"
              className="p-2.5 rounded-full border border-white/5 hover:border-white transition-all text-white/20 hover:text-white"
             >
                <Github size={16} />
             </a>
          )}
        </div>

        <p className="text-zinc-500 text-sm md:text-base font-medium max-w-xl leading-relaxed mt-1 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4 mt-3">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-black text-white/20 uppercase tracking-widest px-0 py-1 transition-all group-hover:text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [githubRepos, setGithubRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=12&sort=updated`);
        if (response.ok) {
          const data = await response.json();
          const repos = data
            .filter((repo) => !repo.fork)
            .map((repo) => ({
              title: repo.name,
              description: repo.description || 'Professional portfolio infrastructure development case study.',
              imageUrl: repo.owner?.avatar_url || '',
              liveUrl: repo.homepage || repo.html_url,
              repoUrl: repo.html_url,
              tags: [repo.language || 'Software', 'Case Study'],
            }));
          setGithubRepos(repos);
        }
      } catch (error) {
        console.error('GitHub API error:', error);
      }
    };
    fetchRepos();
  }, []);

  const projectItems = githubRepos.length ? githubRepos : [];
  const displayedProjects = showAll ? projectItems : projectItems.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative w-full py-32 md:py-48 flex flex-col items-center bg-black overflow-hidden"
    >
      <div className="relative z-10 w-full section-wrap px-8 md:px-24 max-w-[100rem]">
        {/* Header - Nike Bold */}
        <div className="flex flex-col mb-48 md:mb-64">
           <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/20 text-xs font-black uppercase tracking-[0.8em] mb-8"
           >
              Case_Studies
           </motion.span>
           <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tightest leading-[0.85] uppercase"
           >
            Selected<br />
            <Highlighter action="underline" color="#333" strokeWidth={8}>
              Works
            </Highlighter>
          </motion.h2>
        </div>

        {/* The List - Nike Clean Grid - More Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24 md:gap-y-40">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Show More - Nike Minimalist */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-64 flex flex-col items-center"
        >
          {projectItems.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex flex-col items-center gap-12"
            >
              <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <span className="text-white/40 group-hover:text-white font-black text-xs tracking-[0.6em] uppercase transition-all duration-500">
                {showAll ? 'View Less' : 'View more projects'}
              </span>
              <div className="p-8 rounded-full border border-white/5 group-hover:border-white transition-all duration-500">
                 <Plus size={32} className="text-white/20 group-hover:text-white transition-all transform group-hover:rotate-90 duration-700" />
              </div>
            </button>
          )}

          <div className="mt-64 flex items-center gap-10 text-white/5 select-none">
             <Code2 size={16} />
             <span className="text-[60px] font-black uppercase tracking-tighter">Athletic_Code</span>
             <Code2 size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
