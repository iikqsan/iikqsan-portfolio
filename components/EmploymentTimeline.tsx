"use client";

import { motion } from "framer-motion";

const EMPLOYMENT = [
    {
        period: "2024 — Present",
        company: "Articulus Co.,Ltd.",
        location: "Bangkok, Thailand",
        role: "Frontend Developer",
        description:
            "Developed and maintained responsive web applications using React and Next.js. Collaborated closely with design and backend teams to deliver features on schedule.",
        tags: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
        current: true,
    },
    {
        period: "2017 — 2024",
        company: "DXC Technology",
        location: "Bangkok, Thailand",
        role: "Datacenter Operation (Printing Support)",
        description: "Technical support",
        tags: ["SAP"],
        current: false,
    },
];

export default function EmploymentTimeline() {
    return (
        <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-18">
                <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                    Where I&apos;ve worked.
                </h2>
            </div>

            <div className="flex flex-col gap-8 md:gap-0">
                {/* Desktop: vertical line */}
                <div className="relative hidden md:block">
                    <div className="absolute left-[188px] top-0 h-full w-px bg-line" />
                </div>

                {EMPLOYMENT.map((job, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.45, delay: i * 0.1 }}
                        className="flex flex-col gap-3 md:grid md:grid-cols-[188px_1fr] md:gap-x-10 md:pb-10 md:last:pb-0"
                    >
                        {/* Period + badges */}
                        <div className="relative flex flex-row items-center gap-3 md:flex-col md:items-end md:gap-1 md:pt-0.5">
                            <div className="flex items-center gap-2 md:flex-col md:items-end md:gap-1">
                                <span className="font-body text-[13px] uppercase tracking-widest text-graphite">
                                    {job.period}
                                </span>
                                {job.current && (
                                    <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-green-600">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-600" />
                                        </span>
                                        Now
                                    </span>
                                )}
                            </div>
                            {/* dot on timeline — desktop only */}
                            <div className="absolute -right-[51px] top-2 hidden h-3 w-3 rounded-full border-2 border-accent bg-paper md:block" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-2 ms-5">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                                <h3 className="font-display text-xl font-medium text-ink md:text-2xl">
                                    {job.role}
                                </h3>
                                <span className="font-body text-sm text-graphite md:text-md">
                                    @ {job.company}
                                </span>
                                <span className="font-body text-xs text-graphite/60 md:text-sm">
                                    {job.location}
                                </span>
                            </div>

                            <p className="font-body text-sm leading-relaxed text-graphite md:text-ms">
                                {job.description}
                            </p>

                            <div className="mt-1 flex flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-graphite"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
