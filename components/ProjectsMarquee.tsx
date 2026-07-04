"use client";

import { useEffect, useState } from "react";
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
    { label: "AWS Certified Developer", accent: "#FF9900" },
    { label: "Google UX Design", accent: "#4285F4" },
    { label: "Meta Frontend Developer", accent: "#0668E1" },
    { label: "Professional Scrum Master I", accent: "#00A0DE" },
    { label: "TOEIC 900+", accent: "#00C896" },
    { label: "React Advanced Patterns", accent: "#61DAFB" },
    // { label: "Google UX Design", src: "/img/certificates/google-ux.png" }, //public/img/certificates/
];

const SLIDE_INTERVAL = 5000;

function MockScreen({ project }: { project: (typeof PROJECTS)[number] }) {
    return (
        // <div className={`w-full h-full rounded-xl bg-gradient-to-br ${project.mockBg} border border-white/10 p-3 flex flex-col gap-2`}>
        //     <div className="flex items-center gap-1.5">
        //         <span className="h-2 w-2 rounded-full bg-red-500/70" />
        //         <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
        //         <span className="h-2 w-2 rounded-full bg-green-500/70" />
        //         <div className="ml-2 h-1.5 flex-1 rounded-full bg-white/10" />
        //     </div>
        //     <div className="flex flex-col gap-1.5 mt-1">
        //         {project.mockLines.map((line, i) => (
        //             <div key={i} className="flex items-center gap-2">
        //                 <div
        //                     className="h-1.5 rounded-full"
        //                     style={{ width: `${55 + i * 10}%`, backgroundColor: project.accent, opacity: 0.3 + i * 0.15 }}
        //                 />
        //                 <span className="font-mono text-[9px] text-white/40 whitespace-nowrap hidden sm:inline">{line}</span>
        //             </div>
        //         ))}
        //     </div>
        //     <div className="mt-auto h-10 rounded-lg" style={{ background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}08)` }}>
        //         <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
        //             <polyline points="0,32 40,20 80,26 120,10 160,16 200,4" fill="none" stroke={project.accent} strokeWidth="1.5" strokeOpacity="0.6" />
        //             <polygon points="0,32 40,20 80,26 120,10 160,16 200,4 200,40 0,40" fill={project.accent} fillOpacity="0.08" />
        //         </svg>
        //     </div>
        // </div>

        <div className="w-full h-full flex flex-row items-center gap-4 md:gap-12">
            <div className="flex-1 min-w-0 flex flex-col gap-1.5 md:gap-3 text-left">
                {/* label / title / description เดิม */}
            </div>
            <div className="w-28 h-28 md:w-110 md:h-auto shrink-0 rounded-2xl overflow-hidden border border-line">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={440}
                    height={315}
                    loading="lazy"
                />
            </div>
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
        <div className="w-32 h-20 md:w-48 md:h-28 shrink-0 mr-4 rounded-xl border border-dashed border-line bg-ink/[0.02] dark:bg-paper/[0.03] flex flex-col items-center justify-center gap-1.5 px-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cert.accent} strokeWidth="1.5">
                <circle cx="12" cy="8" r="5" />
                <path d="M8.5 12.5 7 21l5-2.5 5 2.5-1.5-8.5" />
            </svg>
            <span className="font-mono text-[10px] text-graphite text-center leading-tight">
                {cert.label}
            </span>

            {/* <img
                src={cert.src}
                alt={cert.label}
                className="w-full h-full object-cover"
                loading="lazy"
              /> */}
        </div>
    );
}

function CertificatesFooter() {
    const doubled = [...CERTIFICATES, ...CERTIFICATES];
    return (
        <div className="w-full shrink-0 overflow-hidden border-t border-line py-3 md:py-5 mt-2 md:mt-4">
            <div className="flex w-max animate-marquee-left">
                {doubled.map((cert, i) => (
                    <CertificateCard key={i} cert={cert} />
                ))}
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
