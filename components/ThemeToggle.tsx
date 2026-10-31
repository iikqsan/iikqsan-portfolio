"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="h-8 w-8" />;

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={t.nav.toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:border-ink hover:text-ink"
        >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
    );
}
