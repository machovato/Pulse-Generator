"use client";

import { motion } from "framer-motion";
import { LayoutWhite } from "./layouts/LayoutWhite";
import type { LooseSlide } from "@/lib/schema";

interface Milestone {
    label: string;
    date?: string;
    state: "done" | "current" | "upcoming";
    detail?: string;
}

interface TimelineData {
    milestones: Milestone[];
}

// done     = DTN Primary Green  — milestone is positively complete
// current  = DTN Primary Blue   — active, in-flight now
// upcoming = DTN Neutral Mid    — inactive, not yet reached
const STATE_DOT = {
    done: "border-[#4CB944] shadow-[0_0_0_4px_rgba(76,185,68,0.15)]",
    current: "border-[#1B8FE0] shadow-[0_0_0_4px_rgba(27,143,224,0.15)]",
    upcoming: "border-[#BCBEC0]",
};
const STATE_DOT_BG = {
    done: "#4CB944",
    current: "#1B8FE0",
    upcoming: "white",
};
const STATE_TEXT: Record<string, string> = {
    done: "#005741",   // Dark Green — positive complete
    current: "#1B8FE0",   // Primary Blue — active
    upcoming: "#BCBEC0",   // Neutral Mid — inactive
};

export function TimelineSlide({ slide }: { slide: LooseSlide }) {
    const data = (slide.data ?? { milestones: [] }) as unknown as TimelineData;
    const milestones = data.milestones ?? [];

    // Card width scales with milestone count — fewer milestones = more room per card
    // Using clamp to ensure they don't get too cramped on small screens but grow large on projectors
    const cardW = milestones.length <= 3 ? "clamp(180px, 18vw, 260px)" : milestones.length === 4 ? "clamp(148px, 14vw, 200px)" : "clamp(120px, 11vw, 160px)";
    // Stem height: give cards more breathing room at the scale of the slide
    const stemH = "clamp(48px, 5vw, 80px)";

    return (
        <LayoutWhite center={false}>
            {/* Eyebrow + title */}
            <div className="text-center pt-10 pb-4 shrink-0">
                <motion.p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1B8FE0] mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    Timeline
                </motion.p>
                <motion.h2
                    className="font-bold text-[#003057]"
                    style={{ fontSize: "clamp(28px, 3.2vw, 48px)" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.06 }}
                >
                    {slide.title}
                </motion.h2>
            </div>

            {/* Timeline track — centered in remaining vertical space */}
            <div className="flex-1 flex flex-col justify-center w-full px-10">
                <div className="relative mx-auto" style={{ width: "85%" }}>

                    {/* Gradient bar — thicker for visibility at presentation scale */}
                    <motion.div
                        className="rounded-full"
                        style={{
                            height: "clamp(6px, 0.8vw, 12px)",
                            background: "linear-gradient(90deg, #1B8FE0 0%, #4CB944 100%)",
                            transformOrigin: "left center",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    />

                    {/* Milestone nodes + label cards */}
                    {milestones.map((m, i) => {
                        const pct = milestones.length === 1
                            ? 50
                            : (i / (milestones.length - 1)) * 100;
                        const isAbove = i % 2 === 0;

                        return (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{ left: `${pct}%`, top: 0, transform: "translateX(-50%)" }}
                                initial={{ opacity: 0, y: isAbove ? -12 : 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.35 + i * 0.1 }}
                            >
                                {/* Dot — larger for projection clarity and matching Pipeline scale */}
                                <div
                                    className={`rounded-full border-[4px] shadow-md mx-auto ${STATE_DOT[m.state]}`}
                                    style={{
                                        background: STATE_DOT_BG[m.state],
                                        width: "clamp(32px, 4vw, 64px)",
                                        height: "clamp(32px, 4vw, 64px)",
                                        marginTop: "clamp(-16px, -2vw, -32px)", // Half height to perfectly center on bar
                                    }}
                                />

                                {/* Label card — alternates above/below the bar */}
                                <div
                                    className={`absolute left-1/2 -translate-x-1/2 text-center flex flex-col items-center justify-center`}
                                    style={{
                                        width: cardW,
                                        [isAbove ? "bottom" : "top"]: `calc(${stemH} + clamp(8px, 1vw, 24px))`,
                                    }}
                                >
                                    {/* Label — main milestone name, must be readable projected */}
                                    <p
                                        className="font-bold text-[#003057] leading-tight"
                                        style={{ fontSize: "clamp(16px, 1.8vw, 26px)" }}
                                    >
                                        {m.label}
                                    </p>

                                    {/* Date — state-colored, slightly smaller */}
                                    {m.date && (
                                        <p
                                            className="font-bold mt-1.5"
                                            style={{
                                                fontSize: "clamp(12px, 1.2vw, 18px)",
                                                color: STATE_TEXT[m.state],
                                            }}
                                        >
                                            {m.date}
                                        </p>
                                    )}

                                    {/* Detail — supporting copy, muted */}
                                    {m.detail && (
                                        <p
                                            className="text-[#6D6E71] mt-1.5 leading-snug font-medium"
                                            style={{ fontSize: "clamp(11px, 1vw, 15px)" }}
                                        >
                                            {m.detail}
                                        </p>
                                    )}
                                </div>

                                {/* Stem connecting dot to card */}
                                <div
                                    className="bg-[#E6E7E8] mx-auto"
                                    style={{
                                        width: "clamp(2px, 0.2vw, 4px)",
                                        height: stemH,
                                        [isAbove ? "marginBottom" : "marginTop"]: 0,
                                        position: "absolute",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        [isAbove ? "bottom" : "top"]: "clamp(12px, 1.5vw, 24px)",
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </LayoutWhite>
    );
}
