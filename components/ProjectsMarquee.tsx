"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const PROJECTS = [
    {
        label: "Backend API",
        title: "NRCA Web Application",
        description:
            "Develop Login & Register API, SSO function with ThaID for this website",
        accent: "#3D5AFE",
        image: "/img/projects/NRCA_web.png"
    },
    {
        label: "Frontend",
        title: "CM Square",
        description:
            "Re-design and Develop new UI using new stack",
        accent: "#0C2F53",
        image: "/img/projects/cm_square.png"
    },
    {
        label: "Full-Stack",
        title: "OTOD API Portal",
        description:
            "Develop Backend API and Frontend UI for Provider testing Durian Project API",
        accent: "#ffc107",
        image: "/img/projects/otod_api_portal.png"
    },
    {
        label: "Frontend",
        title: "OTOD Dashboard",
        description:
            "Develop Frontend UI Dashboard for Provider Durian Project checking farmer stat",
        accent: "#fff200",
        image: "/img/projects/otod_dashboard.png"
    },
    {
        label: "Backend API",
        title: "EdubroadCast",
        description:
            "Develop Backend API for this website",
        accent: "#3840e4",
        image: "/img/projects/edubroadcast.png"
    },
    {
        label: "Full-Stack",
        title: "OpenAPI Sandbox",
        description:
            "Develop Backend API and Frontend UI for Business partner try to connect they application to my application",
        accent: "#1976d2",
        image: "/img/projects/open_api_sandbox.png"
    },
    {
        label: "Backend API",
        title: "Tatip AI Camera",
        description:
            "Develop Backend API for this project",
        accent: "#181818",
        image: "/img/projects/tatip_ai_camera.png"
    },
];

const SLIDE_INTERVAL = 5000;

function MockScreen({ project }: { project: (typeof PROJECTS)[number] }) {
    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-line bg-ink/[0.02] dark:bg-paper/[0.03]">
            <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 420px, 112px"
                className="object-cover"
                loading="lazy"
            />
        </div>
    );
}

function ProjectSlide({ project }: { project: (typeof PROJECTS)[number] }) {
    return (
        <div className="w-full h-full flex flex-row items-center gap-4 md:gap-12">
            <div className="flex-1 min-w-0 flex flex-col gap-1.5 md:gap-3 text-left">
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest" style={{ color: project.accent }}>
                    {project.label}
                </p>
                <h3 className="font-display text-lg md:text-4xl font-medium leading-tight text-ink">
                    {project.title}
                </h3>
                <p className="font-body text-xs md:text-base leading-relaxed text-graphite max-w-md line-clamp-3">
                    {project.description}
                </p>
            </div>
            <div className="w-28 h-28 md:w-[420px] md:h-auto md:aspect-[4/3] shrink-0">
                <MockScreen project={project} />
            </div>
        </div>
    );
}

export default function ProjectsMarquee() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % PROJECTS.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(id);
    }, [paused]);

    return (
        <div
            className="flex-1 min-h-0 flex flex-col items-center justify-start gap-4 px-6 pt-2 md:pt-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="mt-10 mb-28">
                <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                    My Projects
                </h2>
            </div>
            <div className="relative w-full max-w-5xl min-h-[130px] md:min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <ProjectSlide project={PROJECTS[index]} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
                {PROJECTS.map((p, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                            width: i === index ? 22 : 8,
                            backgroundColor: i === index ? p.accent : "var(--color-line)",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
