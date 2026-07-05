import { Download } from "lucide-react";

// วาง Google Drive direct-download link ตรงนี้
const RESUME_URL = "https://drive.usercontent.google.com/uc?id=11CoAk2pgZii7FJBuP_g8bn7w5L1QcJH3&authuser=0&export=download";

export default function ResumePage() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
            <div className="flex flex-col items-center gap-3">
                {/* <p className="font-body text-md uppercase tracking-widest text-accent">
                    My Resume
                </p> */}
                <h1 className="font-display text-4xl font-medium text-ink md:text-5xl">
                    My Resume
                </h1>
                {/* <p className="font-body text-lg text-graphite">
                    Full-Stack Developer
                </p> */}
            </div>

            <a
                href={RESUME_URL}
                download
                className="group inline-flex items-center gap-3 rounded-full border border-accent bg-accent px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-white transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 active:scale-95"
            >
                <Download
                    size={16}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0"
                />
                Download
            </a>

            <p className="font-body text-xs text-graphite/50">
                PDF · Updated 2024
            </p>
        </div>
    );
}
