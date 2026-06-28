"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import ProfileImg from "@/components/ProfileImg"
import SkillsSection from "@/components/SkillsSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  // 1. สร้าง Reference สำหรับส่งต่อและผูกกับจุดเลื่อนหน้าจอ
  const mainRef = useRef<HTMLElement>(null);

  return (
    <>
      <Navbar containerRef={mainRef} />
      
      {/* // 1. เพิ่ม snap-y snap-mandatory h-screen overflow-y-auto ที่ตัวครอบนอกสุด (Parent) */}
      <main className="h-screen overflow-y-auto snap-y snap-mandatory relative bg-paper">

        {/* Background Dot Grid (ขยับมาไว้ด้านนอกสุด เพื่อให้คลุมทุกหน้า หรือจะแยกไว้ในแต่ละเซกชันก็ได้) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* --- SECTION 1: Hero / Profile --- */}
        {/* 2. เพิ่ม snap-start min-h-screen และ flex justify-center เพื่อจัดกึ่งกลางแต่ละหน้า */}
        <section className="relative h-screen min-h-screen snap-start flex flex-col justify-center items-center mx-auto max-w-6xl px-6 z-10">
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <ProfileImg src="/img/profile.jpg" alt="profile" size={180} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 max-w-3xl font-display text-center text-3xl font-medium leading-[1.1] text-ink md:text-4xl"
          >
            Hi, I&apos;m Prajak Udomsup <br />
            a Full-Stack Developer from Thailand.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 font-body text-xl text-graphite text-center"
          >
            now I&apos;m still working in Frontend Developer role, but I have Backend experience
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-graphite"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
            </span>
            Available for freelance work
          </motion.div>
        </section>

        {/* --- SECTION 2: Empty Section (or Portfolio) --- */}
        <section className="relative h-screen min-h-screen snap-start flex flex-col justify-center items-center mx-auto max-w-6xl px-6 z-10">
          <h2 className="text-2xl font-bold">My Projects</h2>
          <p className="text-graphite">Coming soon...</p>
        </section>

        {/* --- SECTION 3: Skills --- */}
        <section className="relative h-screen min-h-screen snap-start flex flex-col justify-center items-center mx-auto max-w-6xl px-6 z-10">
          <SkillsSection />
        </section>

      </main>
    </>
  );
}