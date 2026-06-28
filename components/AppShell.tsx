"use client";

import { useRef } from "react";
import Navbar from "@/components/Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const mainRef = useRef<HTMLElement>(null);

    return (
        <>
            <Navbar containerRef={mainRef} />
            <main
                ref={mainRef}
                className="h-screen overflow-y-auto snap-y snap-mandatory relative bg-paper"
            >
                {children}
            </main>
        </>
    );
}
