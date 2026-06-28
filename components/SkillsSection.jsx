"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SKILL_GROUPS = [
    {
        category: "Languages",
        skills: [
            {
                name: "HTML",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            },
            {
                name: "CSS",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            },
            {
                name: "JavaScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            },
            {
                name: "TypeScript",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            },
            {
                name: "C#",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
            },
        ],
    },
    {
        category: "Frameworks",
        skills: [
            {
                name: "React",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            },
            {
                name: "Next.js",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
            },
            {
                name: "Tailwind CSS",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
            },
            {
                name: "NodeJs",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
            },
            {
                name: ".NET Core",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg"
            },
            {
                name: "EF Core",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/entityframeworkcore/entityframeworkcore-original.svg"
            }
        ],
    },
    {
        category: "Database",
        skills: [
            {
                name: "PostgreSQL",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
            },
            {
                name: "MySQL",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
            },
            {
                name: "MSSQL",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
            },
        ],
    },
    {
        category: "Tools",
        skills: [
            {
                name: "PowerShell",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg",
            },
            {
                name: "Docker",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
            },
            {
                name: "Azure DevOps",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg",
            },
            {
                name: "Git",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
            },
            {
                name: "PostMan",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
            },
            {
                name: "RabbitMQ",
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
            },
        ],
    },
];

export default function SkillsSection() {
    return (
        <div className="mx-auto w-full max-w-6xl px-6">
            {/* Header */}
            <div className="mb-2">
                {/* <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                        Stack
                    </p> */}
                <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                    Tools I work with.
                </h2>
            </div>

            {/* Groups */}
            <div className="flex flex-col divide-y divide-line">
                {SKILL_GROUPS.map((group, groupIndex) => (
                    <div
                        key={group.category}
                        className="grid grid-cols-[160px_1fr] gap-x-12 py-10 md:grid-cols-[200px_1fr]"
                    >
                        {/* Category Label */}
                        <motion.p
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: groupIndex * 0.1 }}
                            className="self-start font-body text-lg uppercase tracking-widest text-accent"
                        >
                            {group.category}
                        </motion.p>

                        {/* Skills Grid */}
                        <div className="flex flex-wrap gap-3">
                            {group.skills.map((skill, i) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.35,
                                        delay: groupIndex * 0.1 + i * 0.05,
                                    }}
                                    className="group flex w-28 flex-col items-center justify-center gap-2 rounded-xl border border-line bg-paper py-4 transition-all duration-200 hover:border-accent hover:shadow-md"
                                >
                                    <div className="relative h-10 w-10">
                                        <Image
                                            src={skill.icon}
                                            alt={skill.name}
                                            fill
                                            className="object-contain transition-transform duration-200 group-hover:scale-110"
                                            unoptimized
                                        />
                                    </div>
                                    <p className="w-full text-center font-body text-[10px] uppercase tracking-widest text-graphite group-hover:text-ink">
                                        {skill.name}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}