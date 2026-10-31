"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
    const { lang, setLang, t } = useLanguage();

    return (
        <button
            onClick={() => setLang(lang === "en" ? "th" : "en")}
            aria-label={t.nav.toggleLang}
            className="flex h-8 items-center gap-1 rounded-full border border-line px-3 font-mono text-[11px] uppercase tracking-widest text-graphite transition-colors hover:border-ink hover:text-ink"
        >
            <span className={lang === "en" ? "text-ink" : "text-graphite/50"}>EN</span>
            <span className="text-graphite/50">/</span>
            <span className={lang === "th" ? "text-ink" : "text-graphite/50"}>TH</span>
        </button>
    );
}
