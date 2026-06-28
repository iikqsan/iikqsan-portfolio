"use client";

import { useEffect, useState } from "react";

interface GitHubStarsButtonProps {
    repo: string; // e.g. "vercel/next.js"
}

//GithubIcon
function GithubIcon({ size = 16 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.27 7.77 10.77.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.18-1.26-5.18-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.56.23 2.71.11 3 .73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.21.65.79.54A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
        </svg>
    );
}

//Eye
// function EyeIcon({ size = 16 }: { size?: number }) {
//     return (
//         <svg
//             width={size}
//             height={size}
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
//             <circle cx="12" cy="12" r="3" />
//         </svg>
//     );
// }

export default function GitHubStarsButton({ repo }: GitHubStarsButtonProps) {
    const [stars, setStars] = useState<number | null>(null);
    const [watchers, setWatchers] = useState<number | null>(null);

    //count star
    // useEffect(() => {
    //     fetch(`https://api.github.com/repos/${repo}`)
    //         .then((res) => res.json())
    //         .then((data) => setStars(data.stargazers_count ?? null))
    //         .catch(() => setStars(null));
    // }, [repo]);

    //count watcher
    useEffect(() => {
        fetch(`https://api.github.com/repos/${repo}`)
            .then((res) => res.json())
            .then((data) => setWatchers(data.subscribers_count ?? null))
            .catch(() => setWatchers(null));
    }, [repo]);

    const formatStars = (count: number) => {
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };

    return (

        <a href={`https://github.com/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center overflow-hidden rounded-full border border-line font-mono text-sm text-ink transition-colors hover:border-accent"
        >
            <span className="flex items-center gap-1.5 px-3 py-1.5 ">
                <GithubIcon size={16} />
            </span>
            {/* <span className="flex items-center gap-1 border-l border-line px-3 py-1.5 text-graphite bg-ink/5"> */}
                {/* {stars !== null ? formatStars(stars) : "—"} */}
                {/* {watchers !== null ? formatStars(watchers) : "—"} */}
            {/* </span> */}
        </a>
    );
}