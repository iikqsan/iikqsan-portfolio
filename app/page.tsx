"use client";

import { motion } from "framer-motion";
import ProfileImg from "@/components/ProfileImg"

export default function Home() {
  return (
    <main className="relative overflow-hidden pb-24 pt-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative flex flex-col items-center mx-auto max-w-6xl px-6">
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ProfileImg src="/img/profile.jpg" alt="profile" size={180} />
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-graphite"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
          </span>
          Available for new projects
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl font-display text-center text-3xl font-medium leading-[1.1] text-ink md:text-4xl"
        >
          Hi, I&apos;m Prajak Udomsup <br/>
          a Full-Stack Developer from Thailand.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 font-body text-xl text-graphite"
        >
          now I&apos;m still working in Frontend Developer role, but I have Backend experian
        </motion.p>

        {/* — */}

        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >

          <a
            href="/contact"
            className="rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:bg-accent"
          >
            Start a project
          </a>

          <a
            href="/resume"
            className="rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-ink"
          >
            View resume
          </a>
        </motion.div> */}

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 grid grid-cols-2 gap-8 border-t border-line pt-8 font-mono text-xs uppercase tracking-widest text-graphite md:grid-cols-4"
        >
          <div>
            <p className="text-[10px] text-accent">Based in</p>
            <p className="mt-1 text-ink">Your City</p>
          </div>
          <div>
            <p className="text-[10px] text-accent">Focus</p>
            <p className="mt-1 text-ink">Product Design</p>
          </div>
          <div>
            <p className="text-[10px] text-accent">Experience</p>
            <p className="mt-1 text-ink">X+ Years</p>
          </div>
          <div>
            <p className="text-[10px] text-accent">Status</p>
            <p className="mt-1 text-ink">Freelance</p>
          </div>
        </motion.div> */}
      </div>
    </main>
  );
}