"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Placeholder entries until real certificate images are added.
const CERTIFICATES = [
    // { label: "AWS", src: "/img/certificates/mockupcert.jpg" },
];

// Placeholder entries until real badge images are added.
const BADGES = [
    { label: "Postman API Fundamentals Student Expert", src: "/img/certificates/Postman-badge.png" },
];

// Independent preview-popup config per marquee — tweak either without affecting the other.
const CERT_PREVIEW_CONFIG = {
    maxWidth: 560,
    cursorOffset: 20,
    edgeMargin: 340,
};

const BADGE_PREVIEW_CONFIG = {
    maxWidth: 320,
    cursorOffset: 16,
    edgeMargin: 260,
};

const PREVIEW_CONFIG = {
    default: CERT_PREVIEW_CONFIG,
    badge: BADGE_PREVIEW_CONFIG,
};

// Independent scroll-speed base (seconds per 2 sets) per marquee — tweak either without affecting the other.
const CERT_DURATION_BASE = 30;
const BADGE_DURATION_BASE = 15;

const DURATION_CONFIG = {
    default: CERT_DURATION_BASE,
    badge: BADGE_DURATION_BASE,
};

type CertItem = { label: string; src: string };

function CertificateCard({ cert, size = "default" }: { cert: CertItem; size?: "default" | "badge" }) {
    const [hovered, setHovered] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const trackCursor = (e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
    };

    const { maxWidth: previewMaxWidth, cursorOffset: previewCursorOffset, edgeMargin: previewEdgeMargin } = PREVIEW_CONFIG[size];

    const previewWidth = mounted ? Math.min(previewMaxWidth, window.innerWidth - previewEdgeMargin * 2) : previewMaxWidth;
    const previewHeight = previewWidth * 0.75;
    const left = mounted
        ? Math.min(pos.x + previewCursorOffset, window.innerWidth - previewWidth - previewEdgeMargin)
        : 0;
    const top = mounted
        ? Math.min(pos.y + previewCursorOffset, window.innerHeight - previewHeight - previewEdgeMargin)
        : 0;

    const isBadge = size === "badge";

    return (
        <div
            className={
                isBadge
                    ? "relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 shrink-0 mr-4 md:mr-6 overflow-hidden rounded-xl border border-dashed border-line bg-ink/[0.02] p-3 dark:bg-paper/[0.03]"
                    : "relative w-48 h-32 md:w-72 md:h-48 lg:w-80 lg:h-52 xl:w-96 xl:h-60 shrink-0 mr-6 md:mr-8 overflow-hidden rounded-xl border border-dashed border-line bg-ink/[0.02] dark:bg-paper/[0.03]"
            }
            onMouseEnter={(e) => { trackCursor(e); setHovered(true); }}
            onMouseMove={trackCursor}
            onMouseLeave={() => setHovered(false)}
        >
            <Image
                src={cert.src}
                alt={cert.label}
                fill
                sizes={
                    isBadge
                        ? "(min-width: 1024px) 112px, (min-width: 768px) 96px, 80px"
                        : "(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 768px) 288px, 192px"
                }
                className={isBadge ? "object-contain" : "object-cover"}
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
                                    sizes={`${previewMaxWidth}px`}
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

function MarqueeRow({
    items,
    size = "default",
    direction = "left",
}: {
    items: CertItem[];
    size?: "default" | "badge";
    direction?: "left" | "right";
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [setCount, setSetCount] = useState(2);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const recalculate = () => {
            const groupWidth = track.scrollWidth / (setCount * 2);
            if (groupWidth <= 0) return;
            const needed = Math.ceil(window.innerWidth / groupWidth) + 1;
            setSetCount((prev) => (needed > prev ? needed : prev));
        };

        recalculate();
        window.addEventListener("resize", recalculate);
        return () => window.removeEventListener("resize", recalculate);
    }, [setCount]);

    const sets = Array.from({ length: setCount * 2 });

    return (
        <div
            className="w-full overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                ref={trackRef}
                className={direction === "left" ? "flex w-max animate-marquee-left" : "flex w-max animate-marquee-right"}
                style={{
                    animationDuration: `${(setCount / 2) * DURATION_CONFIG[size]}s`,
                    animationPlayState: paused ? "paused" : "running",
                }}
            >
                {sets.map((_, setIndex) =>
                    items.map((cert, i) => (
                        <CertificateCard key={`${setIndex}-${i}`} cert={cert} size={size} />
                    ))
                )}
            </div>
        </div>
    );
}

export default function CertificatesMarquee() {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="mb-12 px-6 md:mb-16">
                <h2 className="font-display text-4xl font-medium text-ink text-center md:text-5xl">
                    Certificates
                </h2>
            </div>
            <MarqueeRow items={CERTIFICATES} size="default" direction="left" />
            <div className="h-6 md:h-8" />
            <MarqueeRow items={BADGES} size="badge" direction="right" />
        </div>
    );
}
