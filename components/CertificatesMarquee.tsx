"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Placeholder entries until real certificate images are added.
const CERTIFICATES = [
    { label: "Postman API Fundamentals Student Expert", src: "/img/certificates/Postman-badge.png" },
    { label: "AWS", src: "/img/certificates/mockupcert.jpg" },
];

const PREVIEW_MAX_WIDTH = 560;
const PREVIEW_CURSOR_OFFSET = 20;
const PREVIEW_EDGE_MARGIN = 340;

function CertificateCard({ cert }: { cert: (typeof CERTIFICATES)[number] }) {
    const [hovered, setHovered] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const trackCursor = (e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
    };

    const previewWidth = mounted ? Math.min(PREVIEW_MAX_WIDTH, window.innerWidth - PREVIEW_EDGE_MARGIN * 2) : PREVIEW_MAX_WIDTH;
    const previewHeight = previewWidth * 0.75;
    const left = mounted
        ? Math.min(pos.x + PREVIEW_CURSOR_OFFSET, window.innerWidth - previewWidth - PREVIEW_EDGE_MARGIN)
        : 0;
    const top = mounted
        ? Math.min(pos.y + PREVIEW_CURSOR_OFFSET, window.innerHeight - previewHeight - PREVIEW_EDGE_MARGIN)
        : 0;

    return (
        <div
            className="relative w-48 h-32 md:w-72 md:h-48 lg:w-80 lg:h-52 xl:w-96 xl:h-60 shrink-0 mr-6 md:mr-8 overflow-hidden rounded-xl border border-dashed border-line bg-ink/[0.02] dark:bg-paper/[0.03]"
            onMouseEnter={(e) => { trackCursor(e); setHovered(true); }}
            onMouseMove={trackCursor}
            onMouseLeave={() => setHovered(false)}
        >
            <Image
                src={cert.src}
                alt={cert.label}
                fill
                sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 768px) 288px, 192px"
                className="object-cover"
                loading="lazy"
            />

            {mounted && createPortal(
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.12 }}
                            style={{ position: "fixed", left, top, width: previewWidth }}
                            className="z-[100] pointer-events-none"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-paper shadow-2xl">
                                <Image
                                    src={cert.src}
                                    alt={cert.label}
                                    fill
                                    sizes={`${PREVIEW_MAX_WIDTH}px`}
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
}

export default function CertificatesMarquee() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [setCount, setSetCount] = useState(2);
    const [paused, setPaused] = useState(false);

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
        <div className="w-full flex flex-col items-center">
            <div className="mb-12 px-6 md:mb-16">
                <h2 className="font-display text-4xl font-medium text-ink text-center md:text-5xl">
                    Certificates
                </h2>
            </div>
            <div
                className="w-full overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div
                    ref={trackRef}
                    className="flex w-max animate-marquee-left"
                    style={{
                        animationDuration: `${(setCount / 2) * 30}s`,
                        animationPlayState: paused ? "paused" : "running",
                    }}
                >
                    {sets.map((_, setIndex) =>
                        CERTIFICATES.map((cert, i) => (
                            <CertificateCard key={`${setIndex}-${i}`} cert={cert} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
