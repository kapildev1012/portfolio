"use client"

import React, { useState } from 'react';
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from 'lucide-react';

import project1Img from '../assets/projects/project1.png';
import project2Img from '../assets/projects/project2.png';
import project3Img from '../assets/projects/Project3.png';
import project4Img from '../assets/projects/Project4.png';
import project5Img from '../assets/projects/project5.png';
import project6Img from '../assets/projects/project6.png';
import project7Img from '../assets/projects/project7.png';
import project8Img from '../assets/projects/project8.png';
import project9Img from '../assets/projects/project9.png';

const GITHUB_USERNAME = 'kapildev1012';

const projectData = [{
        title: 'Sahityaa Sangamm',
        description: 'A modern e-commerce platform built with Blade and Laravel with full payment integration.',
        videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764394626/1764393871242766_dqfnqn.mp4',
        imageUrl: project1Img,
        liveUrl: 'https://sahityaasangamm.in',
        repoUrl: '#',
        tags: ['Blade', 'Laravel', 'MySQL'],
    },
    {
        title: 'AI Attendance & Surveillance',
        description: 'Professional facial recognition system for automated logging and real-time security tracking.',
        imageUrl: project4Img,
        liveUrl: '#',
        repoUrl: 'https://github.com/kapildev1012',
        tags: ['Python', 'OpenCV', 'AI / ML', 'React'],
    },
    {
        title: 'Wellfire Ecommerce',
        description: 'A high-performance MERN stack storefront built for Zippin clients.',
        imageUrl: project3Img,
        liveUrl: 'https://wellfire-new2.vercel.app',
        repoUrl: 'https://github.com/kapildev1012/wellfire.new2',
        tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    },
    {
        title: 'Gym Management Platform',
        description: 'Enterprise dashboard for gym owners with automated renewals and membership analytics.',
        imageUrl: project5Img,
        liveUrl: '#',
        repoUrl: 'https://github.com/kapildev1012',
        tags: ['React', 'Express', 'MySQL', 'Node.js'],
    },
    {
        title: 'Virtual Class Platform',
        description: 'A collaborative educational tool with real-time video, document sharing, and chat.',
        imageUrl: project7Img,
        liveUrl: '#',
        repoUrl: 'https://github.com/kapildev1012',
        tags: ['Node.js', 'WebRTC', 'React', 'Socket.io'],
    },
    {
        title: 'Creatorhub',
        description: 'An Influencer Marketing platform connecting Creators with brands.',
        videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764396382/1764396334647746_qruqaf.mp4',
        liveUrl: 'https://creatorhub.in',
        repoUrl: '#',
        tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
        title: 'Hotspot Inventory',
        description: 'Multi-store inventory management system for food chains with real-time stock tracking.',
        imageUrl: project8Img,
        liveUrl: '#',
        repoUrl: 'https://github.com/kapildev1012',
        tags: ['React', 'Next.js', 'PostgreSQL'],
    },
    {
        title: 'Tea Country',
        description: 'A Tourist website for exploring tea estates and travel experiences.',
        imageUrl: project2Img,
        liveUrl: 'https://teacountry.in',
        repoUrl: '#',
        tags: ['React', 'Tailwind CSS'],
    },
    {
        title: 'Scabbard Tech',
        description: 'A Digital Marketing agency website with modern animations.',
        videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764397211/1764397136159111_zlcckk.mp4',
        liveUrl: 'https://scabbardtech.com',
        repoUrl: '#',
        tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    },
    {
        title: 'Healthcare NGO Platform',
        description: 'A Healthcare NGO website (Jana Kalyan Swastha Sewa) with service booking and donation information.',
        imageUrl: project6Img,
        liveUrl: 'https://jkssewa.org',
        repoUrl: '#',
        tags: ['HTML', 'PHP', 'MySQL'],
    },
];

const TAG_COLORS = {
    React: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Node.js': 'bg-green-500/10 text-green-400 border-green-500/20',
    MongoDB: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    MySQL: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Tailwind CSS': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    Django: 'bg-green-600/10 text-green-300 border-green-600/20',
    Laravel: 'bg-red-500/10 text-red-400 border-red-500/20',
    Vue: 'bg-green-500/10 text-green-400 border-green-500/20',
    GSAP: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
    Spline: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    GitHub: 'bg-gray-100 text-gray-600 border-gray-200',
    default: 'bg-gray-100 text-gray-600 border-gray-200',
};

const getTagColor = (tag) => TAG_COLORS[tag] || TAG_COLORS.default;

const ProjectCard = ({ project }) => ( <
    div className = "project-card-premium group h-full flex flex-col" >
    <
    div className = "relative overflow-hidden aspect-video bg-slate-950" > {
        project.videoUrl ? ( <
            video src = { project.videoUrl }
            autoPlay loop muted playsInline className = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            poster = { project.imageUrl }
            />
        ) : project.imageUrl ? ( <
            img src = { project.imageUrl }
            alt = { project.title }
            className = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /
            >
        ) : ( <
            div className = "w-full h-full flex items-center justify-center bg-slate-900 text-white px-4 text-center" >
            <
            div >
            <
            p className = "text-sm font-semibold" > GitHub Repository < /p> <
            p className = "text-xs text-slate-400 mt-2" > { project.title } < /p> <
            /div> <
            /div>
        )
    }

    <
    div className = "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4 gap-3" >
    <
    a href = { project.liveUrl }
    target = "_blank"
    rel = "noopener noreferrer"
    className = "px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-gray-100 transition-colors" >
    <
    ExternalLink size = { 14 }
    />
    Live Demo <
    /a> {
        project.repoUrl && project.repoUrl !== '#' && ( <
            a href = { project.repoUrl }
            target = "_blank"
            rel = "noopener noreferrer"
            className = "px-4 py-2 bg-white/10 backdrop-blur text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-white/20 hover:bg-white/20 transition-colors" >
            <
            Github size = { 14 }
            />
            Code <
            /a>
        )
    } <
    /div> <
    /div>

    <
    div className = "p-8 md:p-12 grow flex flex-col" >
    <
    h3 className = "text-lg font-bold text-gray-900 mb-1.5" > { project.title } < /h3> <
    p className = "text-gray-500 text-sm mb-3 grow leading-relaxed" > { project.description } < /p> <
    div className = "flex flex-wrap gap-1.5" > {
        project.tags.map((tag) => ( <
            span key = { tag }
            className = { `text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getTagColor(tag)}` } >
            { tag } <
            /span>
        ))
    } <
    /div> <
    /div> <
    /div>
);

export default function Projects() {
    const [showAll, setShowAll] = useState(false);
    const [githubRepos, setGithubRepos] = useState([]);
    const [githubLoading, setGithubLoading] = useState(true);
    const [githubError, setGithubError] = useState(null);

    React.useEffect(() => {
        const fetchRepos = async() => {
            try {
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=12&sort=updated`);
                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }
                const data = await response.json();
                const repos = data
                    .filter((repo) => !repo.fork)
                    .map((repo) => ({
                        title: repo.name,
                        description: repo.description || 'GitHub repository',
                        imageUrl: repo.owner ? .avatar_url || '',
                        liveUrl: repo.homepage || repo.html_url,
                        repoUrl: repo.html_url,
                        tags: [repo.language || 'GitHub'],
                    }));
                setGithubRepos(repos);
            } catch (error) {
                setGithubError(error.message);
            } finally {
                setGithubLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const projectItems = githubRepos.length ? githubRepos : projectData;
    const displayedProjects = showAll ? projectItems : projectItems.slice(0, 6);

    return ( <
            section id = "projects"
            className = "relative w-full text-black py-20 md:py-28 bg-white min-h-screen" >
            <
            InteractiveGridPattern className = {
                cn(
                    'absolute inset-0 h-full w-full',
                    '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]'
                )
            }
            width = { 20 }
            height = { 20 }
            squares = {
                [80, 80] }
            squaresClassName = "fill-gray-50" /
            >

            <
            div className = "relative z-10 section-wrap" >
            <
            div className = "text-center mb-14" >
            <
            h2 className = "text-4xl md:text-5xl font-bold inline-block" >
            <
            Highlighter action = "underline"
            color = "#FFD700" >
            Projects🚀 <
            /Highlighter> <
            /h2> <
            p className = "text-gray-500 mt-4 text-lg max-w-md mx-auto" > {
                githubRepos.length ?
                `Latest GitHub repos from @${GITHUB_USERNAME}` :
                    'A collection of production-grade apps built for real businesses'
            } <
            /p> <
            /div>

            {
                githubLoading && < div className = "text-center mb-8 text-sm text-gray-500" > Loading GitHub projects… < /div>} {
                    githubError && < div className = "text-center mb-8 text-sm text-red-500" > Unable to load GitHub projects: { githubError } < /div>}

                    <
                    div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" > {
                            displayedProjects.map((project, index) => ( <
                                div key = { index } >
                                <
                                ProjectCard project = { project }
                                /> <
                                /div>
                            ))
                        } <
                        /div>

                    <
                    div className = "text-center mt-12" > {!showAll && projectItems.length > 6 && ( <
                                button onClick = {
                                    () => setShowAll(true) }
                                className = "btn" >
                                View More <
                                /button>
                            )
                        } {
                            showAll && ( <
                                button onClick = {
                                    () => setShowAll(false) }
                                className = "btn" >
                                View Less <
                                /button>
                            )
                        } <
                        /div> <
                        /div> <
                        /section>
                );
            }