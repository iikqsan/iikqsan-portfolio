"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const PROJECTS = [
    {
        label: "Backend API",
        title: "NRCA Web Application",
        description:
            "Develop Login & Register API, SSO function with ThaID for NRCA Web Application",
        accent: "#3D5AFE",
        image: "/img/projects/NRCA_web.png"
    },
    {
        label: "Frontend",
        title: "CM Square",
        description:
            "",
        accent: "#0C2F53",
        image: "/img/projects/cm_square.png"
    },
];

// Placeholder entries until real certificate images are added.
const CERTIFICATES = [
    { label: "Postman API Fundamentals Student Expert", src: "/img/certificates/Postman-badge.png" },
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

function CertificateCard({ cert }: { cert: (typeof CERTIFICATES)[number] }) {
    return (
        <div className="relative w-32 h-20 md:w-48 md:h-28 shrink-0 mr-4 rounded-xl border border-dashed border-line bg-ink/[0.02] dark:bg-paper/[0.03] p-3">
            <Image
                src={cert.src}
                alt={cert.label}
                fill
                sizes="(min-width: 768px) 192px, 128px"
                className="object-contain"
                loading="lazy"
            />
        </div>
    );
}

function CertificatesFooter() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [setCount, setSetCount] = useState(2);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const recalculate = () => {
            const singleSetWidth = track.scrollWidth / setCount;
            if (singleSetWidth <= 0) return;
            const needed = Math.ceil(window.innerWidth / singleSetWidth) + 1;
            setSetCount((prev) => (needed > prev ? needed : prev));
        };

        recalculate();
        window.addEventListener("resize", recalculate);
        return () => window.removeEventListener("resize", recalculate);
    }, [setCount]);

    const sets = Array.from({ length: setCount * 2 });

    return (
        <div className="w-full shrink-0 overflow-hidden border-t border-line py-3 md:py-5 mt-2 md:mt-4">
            <div
                ref={trackRef}
                className="flex w-max animate-marquee-left"
                style={{ animationDuration: `${(setCount / 2) * 30}s` }}
            >
                {sets.map((_, setIndex) =>
                    CERTIFICATES.map((cert, i) => (
                        <CertificateCard key={`${setIndex}-${i}`} cert={cert} />
                    ))
                )}
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
        <div className="flex-1 min-h-0 flex flex-col">
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

            <CertificatesFooter />
        </div>
    );
}
