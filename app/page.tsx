"use client";

import { motion } from "framer-motion";
import ProfileImg from "@/components/ProfileImg";
import SkillsSection from "@/components/SkillsSection";
import ProjectsMarquee from "@/components/ProjectsMarquee";
import CertificatesMarquee from "@/components/CertificatesMarquee";
import EmploymentTimeline from "@/components/EmploymentTimeline";

export default function Home() {
  return (
    <>
      {/* SECTION 1: Hero / Profile */}
      <section className="relative min-h-full flex flex-col justify-center items-center mx-auto max-w-6xl px-6 z-10">
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ProfileImg src="/img/profile/profile.jpg" alt="profile" size={222} />
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

        {/* <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-graphite"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-75"/>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
          </span>
          <span className="font-body">Available for freelance project</span>
        </motion.div> */}
      </section>

      {/* SECTION 2: Projects */}
      <section className="relative min-h-full flex flex-col z-10 overflow-hidden">
        <ProjectsMarquee />
      </section>

      {/* SECTION 3: Certificates */}
      <section className="relative min-h-full flex flex-col justify-center z-10 overflow-hidden">
        <CertificatesMarquee />
      </section>

      {/* SECTION 4: Employment */}
      <section className="relative min-h-full flex flex-col justify-center z-10">
        <EmploymentTimeline />
      </section>

      {/* SECTION 5: Skills */}
      <section className="relative min-h-full flex flex-col justify-center z-10">
        <SkillsSection />
      </section>
    </>
  );
}
