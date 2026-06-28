"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormValues = {
    email: string;
    subject: string;
    message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const body = await res.json();
                throw new Error(body.error ?? "Failed to send.");
            }

            setStatus("success");
            reset();
        } catch (err) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
        }
    };

    const inputClass =
        "w-full rounded-xl border border-line bg-paper px-4 py-3 font-mono text-sm text-ink placeholder:text-graphite/50 outline-none transition-colors duration-150 focus:border-accent";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs uppercase tracking-widest text-graphite">
                    Your Email
                </label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    {...register("email", {
                        required: "Email is required.",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address." },
                    })}
                />
                {errors.email && (
                    <p className="font-body text-[10px] text-red-500">{errors.email.message}</p>
                )}
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs uppercase tracking-widest text-graphite">
                    Subject
                </label>
                <input
                    type="text"
                    placeholder="What's this about?"
                    className={inputClass}
                    {...register("subject", { required: "Subject is required." })}
                />
                {errors.subject && (
                    <p className="font-body text-[10px] text-red-500">{errors.subject.message}</p>
                )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs uppercase tracking-widest text-graphite">
                    Message
                </label>
                <textarea
                    rows={6}
                    placeholder="Tell me something..."
                    className={`${inputClass} resize-none`}
                    {...register("message", {
                        required: "Message is required.",
                        minLength: { value: 10, message: "Message must be at least 10 characters." },
                    })}
                />
                {errors.message && (
                    <p className="font-body text-[10px] text-red-500">{errors.message.message}</p>
                )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="group mt-2 inline-flex items-center justify-center gap-2.5 rounded-full border border-accent bg-accent px-8 py-3 font-mono text-sm uppercase tracking-widest text-white transition-all duration-200 hover:bg-accent/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
                <Send size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {/* Feedback */}
            {status === "success" && (
                <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
                    <CheckCircle size={15} className="shrink-0 text-green-500" />
                    <p className="font-body text-xs text-green-600 dark:text-green-400">
                        Message sent! I&apos;ll get back to you soon.
                    </p>
                </div>
            )}
            {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <AlertCircle size={15} className="shrink-0 text-red-500" />
                    <p className="font-body text-xs text-red-600 dark:text-red-400">{errorMsg}</p>
                </div>
            )}
        </form>
    );
}
