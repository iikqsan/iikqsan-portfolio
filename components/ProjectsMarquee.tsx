"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Localized } from "@/lib/i18n";

/**
 * รูปของแต่ละโปรเจกต์อยู่ที่ public/img/projects/<folder>/
 * เพิ่มรูปได้โดยวางไฟล์ในโฟลเดอร์นั้น แล้วใส่ชื่อไฟล์ใน `images` (เรียงตามลำดับที่ต้องการแสดง)
 */
type Project = {
    label: string;
    title: string;
    description: Localized;
    accent: string;
    /** สีที่ใช้ในโหมดมืด (ใส่เฉพาะเมื่อ accent มืดเกินจนมองไม่เห็นบนพื้นดำ) */
    accentDark?: string;
    folder: string;
    images: string[];
};

const PROJECTS: Project[] = [
    {
        label: "Backend API",
        title: "NRCA Web Application",
        description: {
            en: "Develop Login & Register API, SSO function with ThaID for this website",
            th: "พัฒนา API สำหรับ Login & Register และระบบ SSO ด้วย ThaID ให้กับเว็บไซต์นี้",
        },
        accent: "#3D5AFE",
        folder: "nrca-web",
        images: ["01.png"],
    }
];

/** เวลาเปลี่ยนโปรเจกต์อัตโนมัติ (ms) — นับใหม่ทุกครั้งที่ผู้ใช้กดเลื่อน */
const SLIDE_INTERVAL = 6000;
/** ระยะลากขั้นต่ำ (px) ที่นับว่าเป็นการ swipe เปลี่ยนภาพ */
const SWIPE_THRESHOLD = 60;

/** ส่งสี accent เป็น CSS variable เพื่อให้สลับสีตามธีม (คลาส .dark ของ next-themes) ได้ */
const accentVars = (project: Project) =>
    ({ "--accent": project.accent, "--accent-dark": project.accentDark ?? project.accent }) as React.CSSProperties;

const imageSrc = (project: Project, file: string) => `/img/projects/${project.folder}/${file}`;

function ImageGallery({ project, onInteract }: { project: Project; onInteract: () => void }) {
    const { t } = useLanguage();
    const [imgIndex, setImgIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const total = project.images.length;
    const hasMany = total > 1;

    const go = (step: number) => {
        if (!hasMany) return;
        setDirection(step);
        setImgIndex((i) => (i + step + total) % total);
        onInteract();
    };

    const onDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.x < -SWIPE_THRESHOLD) go(1);
        else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
    };

    const arrowClass =
        "flex h-8 w-8 items-center justify-center rounded-full text-graphite transition-colors hover:bg-ink/10 hover:text-ink active:scale-95";

    return (
        <div className="relative w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-ink/[0.03] dark:bg-paper/[0.03]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={imgIndex}
                        custom={direction}
                        variants={{
                            enter: (d: number) => ({ x: `${d * 100}%`, opacity: 0 }),
                            center: { x: 0, opacity: 1 },
                            exit: (d: number) => ({ x: `${d * -100}%`, opacity: 0 }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        drag={hasMany ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={onDragEnd}
                        className="absolute inset-0"
                    >
                        <Image
                            src={imageSrc(project, project.images[imgIndex])}
                            alt={`${project.title} ${imgIndex + 1}`}
                            fill
                            sizes="(min-width: 1024px) 896px, 100vw"
                            className="pointer-events-none select-none object-contain"
                            draggable={false}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* ตัวควบคุมภาพ: <- 1 / 3 -> */}
                {hasMany && (
                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-0.5 rounded-full border border-line bg-paper/85 p-1 text-ink shadow-sm backdrop-blur">
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label={t.projects.prevImage}
                            className={arrowClass}
                        >
                            <ArrowLeft size={14} />
                        </button>
                        <span className="min-w-[3.25rem] text-center font-mono text-[11px] tabular-nums tracking-widest md:text-xs">
                            {imgIndex + 1} / {total}
                        </span>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label={t.projects.nextImage}
                            className={arrowClass}
                        >
                            <ArrowRight size={14} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProjectInfo({ project }: { project: Project }) {
    const { lang } = useLanguage();

    return (
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-1.5 text-center md:gap-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] md:text-xs [.dark_&]:text-[var(--accent-dark)]" style={accentVars(project)}>
                {project.label}
            </p>
            <h3 className="font-display text-2xl font-medium leading-tight text-ink md:text-3xl">
                {project.title}
            </h3>
            <p className="line-clamp-3 font-body text-sm leading-relaxed text-graphite md:line-clamp-2 md:text-base">
                {project.description[lang]}
            </p>
        </div>
    );
}

export default function ProjectsMarquee() {
    const { t } = useLanguage();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    // เพิ่มค่าเมื่อผู้ใช้กดเลื่อนภาพ เพื่อเริ่มนับเวลาเปลี่ยนโปรเจกต์ใหม่
    const [interaction, setInteraction] = useState(0);

    useEffect(() => {
        if (paused) return;
        const id = setTimeout(() => {
            setIndex((i) => (i + 1) % PROJECTS.length);
        }, SLIDE_INTERVAL);
        return () => clearTimeout(id);
    }, [paused, index, interaction]);

    const project = PROJECTS[index];
    const goProject = (step: number) => setIndex((i) => (i + step + PROJECTS.length) % PROJECTS.length);

    const projectArrowClass =
        "pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper/80 text-ink shadow-sm backdrop-blur transition-colors hover:border-ink active:scale-95 md:h-11 md:w-11";

    return (
        <div
            className="flex flex-1 flex-col items-center px-6"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* หัวข้อ — ตำแหน่งเดิม */}
            <div className="mt-10">
                <h2 className="font-display text-4xl font-medium text-ink md:text-5xl">
                    {t.projects.heading}
                </h2>
            </div>

            {/* ภาพ + ชื่อ/คำอธิบาย อยู่กึ่งกลางพื้นที่ที่เหลือ */}
            <div className="flex w-full flex-1 flex-col justify-center py-6 md:py-8">
                {/* ขนาดภาพ: กว้างเต็มที่ 56rem และจำกัดความสูงให้พอดีกับจอ (เหลือที่ให้หัวข้อ, คำอธิบาย, แถบเลือกโปรเจกต์) */}
                <div className="relative mx-auto w-full max-w-[min(56rem,max(18rem,calc((100svh_-_26rem)*16/9)))]">
                {/* ลูกศรเปลี่ยนโปรเจกต์ — กล่องนี้มีขนาดเท่ากรอบภาพ (16:9) ลูกศรจึงอยู่กึ่งกลางความสูงของภาพ
                    จอใหญ่: อยู่นอกภาพ / จอเล็ก: ซ้อนบนขอบภาพ */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex aspect-video items-center justify-between px-2 lg:-mx-16 lg:px-0">
                    <button
                        type="button"
                        onClick={() => goProject(-1)}
                        aria-label={t.projects.prevProject}
                        className={projectArrowClass}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => goProject(1)}
                        aria-label={t.projects.nextProject}
                        className={projectArrowClass}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="flex flex-col gap-5 md:gap-7"
                    >
                        {/* key ทำให้ภาพกลับไปเริ่มที่ภาพแรกทุกครั้งที่เปลี่ยนโปรเจกต์ */}
                        <ImageGallery
                            key={project.folder}
                            project={project}
                            onInteract={() => setInteraction((n) => n + 1)}
                        />
                        <ProjectInfo project={project} />
                    </motion.div>
                </AnimatePresence>
                </div>
            </div>

            {/* แถบเลือกโปรเจกต์ — ล่างสุดของจอ */}
            <div className="flex items-center gap-2 pb-8 md:pb-10">
                {PROJECTS.map((p, i) => (
                    <button
                        key={p.folder}
                        type="button"
                        aria-label={`${t.projects.goToSlide} ${i + 1}: ${p.title}`}
                        aria-current={i === index}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === index ? "bg-[var(--accent)] [.dark_&]:bg-[var(--accent-dark)]" : "bg-line"}`}
                        style={{ width: i === index ? 28 : 8, ...accentVars(p) }}
                    />
                ))}
            </div>
        </div>
    );
}
