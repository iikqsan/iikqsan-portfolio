"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const PROJECTS = [
    {
        label: "Full-Stack Web App",
        title: "iikQsan Portfolio",
        description:
            "Personal portfolio built with Next.js 16, Tailwind CSS v4, and Framer Motion. Features dark mode, snap-scroll, and animated sections.",
        accent: "#3D5AFE",
        mockBg: "from-[#3D5AFE]/20 to-[#0a0a0f]",
        mockLines: ["navbar", "hero section", "projects", "skills"],
    },
    {
        label: "Backend Service",
        title: "REST API Platform",
        description:
            "Scalable RESTful API built with Node.js and Express. Includes JWT auth, rate limiting, and PostgreSQL integration.",
        accent: "#00C896",
        mockBg: "from-[#00C896]/20 to-[#0a0a0f]",
        mockLines: ["GET /api/users", "POST /api/auth", "PUT /api/profile", "DELETE /api/session"],
    },
    {
        label: "Frontend Dashboard",
        title: "Analytics Dashboard",
        description:
            "Data visualization dashboard with real-time charts, filterable tables, and exportable reports built with React and Recharts.",
        accent: "#FF6B35",
        mockBg: "from-[#FF6B35]/20 to-[#0a0a0f]",
        mockLines: ["Sessions Today", "Avg Duration", "Bounce Rate", "Conversion"],
    },
    {
        label: "Mobile-First App",
        title: "Task Manager",
        description:
            "Responsive task management app with drag-and-drop boards, priority tagging, and team collaboration features.",
        accent: "#A855F7",
        mockBg: "from-[#A855F7]/20 to-[#0a0a0f]",
        mockLines: ["To Do (4)", "In Progress (2)", "Review (1)", "Done (8)"],
    },
];

function MockScreen({ project }: { project: (typeof PROJECTS)[number] }) {
    return (
        <div
            className={`w-full h-full rounded-xl bg-gradient-to-br ${project.mockBg} border border-white/10 p-4 flex flex-col gap-3`}
        >
            {/* fake window chrome */}
            <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <div className="ml-2 h-2 flex-1 rounded-full bg-white/10" />
            </div>
            {/* fake content rows */}
            <div className="flex flex-col gap-2 mt-2">
                {project.mockLines.map((line, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div
                            className="h-2 rounded-full"
                            style={{
                                width: `${55 + i * 10}%`,
                                backgroundColor: project.accent,
                                opacity: 0.3 + i * 0.15,
                            }}
                        />
                        <span className="font-mono text-[10px] text-white/40 whitespace-nowrap">{line}</span>
                    </div>
                ))}
            </div>
            {/* fake chart blob */}
            <div className="mt-auto h-16 rounded-lg" style={{ background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}08)` }}>
                <svg className="w-full h-full" viewBox="0 0 200 64" preserveAspectRatio="none">
                    <polyline
                        points="0,50 40,30 80,42 120,18 160,28 200,10"
                        fill="none"
                        stroke={project.accent}
                        strokeWidth="2"
                        strokeOpacity="0.6"
                    />
                    <polygon
                        points="0,50 40,30 80,42 120,18 160,28 200,10 200,64 0,64"
                        fill={project.accent}
                        fillOpacity="0.08"
                    />
                </svg>
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
    return (
        <div className="shrink-0 w-[600px] flex gap-6 rounded-2xl bg-ink/[0.03] dark:bg-paper/[0.04] border border-line p-6 items-center">
            {/* Left: text */}
            <div className="w-[220px] shrink-0 flex flex-col gap-3">
                <p
                    className="font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: project.accent }}
                >
                    {project.label}
                </p>
                <h3 className="font-display text-xl font-medium leading-tight text-ink">
                    {project.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-graphite">
                    {project.description}
                </p>
            </div>
            {/* Right: mock screenshot */}
            <div className="flex-1 h-[200px]">
                <MockScreen project={project} />
            </div>
        </div>
    );
}

export default function ProjectsMarquee() {
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const CARD_WIDTH = 600;
    const GAP = 24;
    const ITEM_WIDTH = CARD_WIDTH + GAP;
    const TOTAL_WIDTH = ITEM_WIDTH * PROJECTS.length;
    const SPEED = 0.6; // px per frame

    useAnimationFrame(() => {
        let current = x.get();
        current -= SPEED;
        if (current <= -TOTAL_WIDTH) {
            current = 0;
        }
        x.set(current);
    });

    const doubled = [...PROJECTS, ...PROJECTS];

    return (
        <div ref={containerRef} className="w-full overflow-hidden cursor-default select-none">
            <motion.div
                className="flex gap-6 px-6"
                style={{ x }}
            >
                {doubled.map((project, i) => (
                    <ProjectCard key={i} project={project} />
                ))}
            </motion.div>
        </div>
    );
}
