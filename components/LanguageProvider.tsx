"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { DEFAULT_LANG, dictionaries, LANGS, type Dictionary, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "lang";
const CHANGE_EVENT = "lang-change";

function readLang(): Lang {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
    } catch {
        // localStorage ใช้ไม่ได้ (private mode ฯลฯ) — ใช้ค่า default
    }
    return DEFAULT_LANG;
}

function subscribe(onChange: () => void) {
    // "storage" = เปลี่ยนจากแท็บอื่น, CHANGE_EVENT = เปลี่ยนในแท็บนี้
    window.addEventListener("storage", onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(CHANGE_EVENT, onChange);
    };
}

type LanguageContextValue = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Server render ใช้ EN (default) เสมอ แล้วฝั่ง client ค่อยอ่านค่าที่ผู้ใช้เคยเลือกไว้
    const lang = useSyncExternalStore(subscribe, readLang, () => DEFAULT_LANG);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = useCallback((next: Lang) => {
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore
        }
        window.dispatchEvent(new Event(CHANGE_EVENT));
    }, []);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
}
