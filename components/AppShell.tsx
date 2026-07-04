"use client";

import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = mainRef.current;
        if (!el) return;

        let locked = false;
        let touchStartY = 0;

        const getSections = () =>
            Array.from(el.querySelectorAll<HTMLElement>("section"));

        const getTop = (section: HTMLElement) =>
            section.getBoundingClientRect().top -
            el.getBoundingClientRect().top +
            el.scrollTop;

        const getCurrentIndex = (list: HTMLElement[]) => {
            const mid = el.scrollTop + el.clientHeight / 2;
            return list.reduce((best, s, i, arr) => {
                const sMid = getTop(s) + s.clientHeight / 2;
                const bMid = getTop(arr[best]) + arr[best].clientHeight / 2;
                return Math.abs(sMid - mid) < Math.abs(bMid - mid) ? i : best;
            }, 0);
        };

        const goTo = (idx: number, list: HTMLElement[]) => {
            if (locked || idx < 0 || idx >= list.length) return;
            locked = true;
            el.scrollTo({ top: getTop(list[idx]), behavior: "smooth" });
            setTimeout(() => { locked = false; }, 900);
        };

        const isDesktop = () => window.innerWidth >= 768;

        const onWheel = (e: WheelEvent) => {
            if (!isDesktop()) return;
            const list = getSections();
            if (list.length <= 1) return;
            e.preventDefault();
            goTo(getCurrentIndex(list) + (e.deltaY > 0 ? 1 : -1), list);
        };

        const onTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (!isDesktop()) return;
            const list = getSections();
            if (list.length <= 1) return;
            const delta = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(delta) < 50) return;
            goTo(getCurrentIndex(list) + (delta > 0 ? 1 : -1), list);
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (!isDesktop()) return;
            const list = getSections();
            if (list.length <= 1) return;
            if (["ArrowDown", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
                goTo(getCurrentIndex(list) + 1, list);
            } else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
                e.preventDefault();
                goTo(getCurrentIndex(list) - 1, list);
            }
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        window.addEventListener("keydown", onKeyDown);

        return () => {
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <>
            <div
                className="pointer-events-none fixed inset-0 opacity-40 z-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div className="relative z-10 flex h-screen flex-col">
                <Navbar containerRef={mainRef} />
                <main
                    ref={mainRef}
                    className="h-0 flex-1 overflow-y-auto bg-paper"
                >
                    {children}
                </main>
            </div>
        </>
    );
}
