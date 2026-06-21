"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GitHubStarsButton from '@/components/GitHubStarsButton'

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
            <nav className="mx-auto grid max-w-6xl grid-cols-3 items-center px-6 py-5">
                {/* Left: logo */}
                <div className="col-start-1 justify-self-start">
                    <Link href="/" className="font-mono text-xl tracking-tight text-ink">
                        iikQsan<span className="text-accent">.</span>
                    </Link>
                </div>

                {/* Center: nav links */}
                <ul className="col-start-2 hidden items-center justify-self-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group relative font-mono text-md uppercase tracking-widest text-graphite transition-colors hover:text-ink"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right: github badge + mobile menu */}
                <div className="col-start-3 flex items-center justify-self-end gap-4">
                    <GitHubStarsButton repo="iikqsan/iikqsan-portfolio" />

                    <button
                        onClick={() => setOpen(!open)}
                        className="text-ink md:hidden"
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-line bg-paper md:hidden"
                    >
                        {NAV_LINKS.map((link) => (
                            <li
                                key={link.href}
                                className="border-b border-line last:border-none"
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="block px-6 py-4 font-mono text-sm uppercase tracking-widest text-ink"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </header>
    );
}
