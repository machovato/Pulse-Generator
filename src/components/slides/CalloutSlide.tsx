"use client";

import { motion } from "framer-motion";
import { LayoutSplit } from "./layouts/LayoutSplit";
import type { LooseSlide } from "@/lib/schema";

interface CalloutData {
    text: string;
    kind?: "decision" | "risk" | "quote" | "highlight";
    attribution?: string;
}

const LEFT_EYEBROW = {
    decision: "Decision",
    risk: "Risk",
    quote: "Quote",
    highlight: "Highlight",
};

// decision  = DTN Mid Blue #2255A4 — authoritative, binding
// risk       = DTN Red     #C8192B — danger signal, escalation needed
// highlight  = DTN Lime    #8DC63F — positive emphasis, good news
// quote      = DTN Teal    #007074 — neutral informational, voice
const RIGHT_ACCENT = {
    decision: "border-l-4 border-[#2255A4]",
    risk: "border-l-4 border-[#C8192B]",
    quote: "",
    highlight: "border-l-4 border-[#8DC63F]",
};

const QUOTE_MARK_COLOR: Record<string, string> = {
    decision: "#2255A4",
    risk: "#C8192B",
    highlight: "#8DC63F",
    quote: "#007074",
};

export function CalloutSlide({ slide }: { slide: LooseSlide }) {
    const data = (slide.data ?? {}) as unknown as CalloutData;
    const kind = data.kind ?? "highlight";
    const isQuote = kind === "quote";

    const left = (
        <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                {LEFT_EYEBROW[kind]}
            </p>
            <h2
                className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(24px, 3vw, 42px)" }}
            >
                {slide.title}
            </h2>
            <div className="w-8 h-0.5 bg-white/30 mt-3" />
        </div>
    );

    const right = (
        <div className={`flex flex-col justify-center h-full gap-5 ${RIGHT_ACCENT[kind]}`}>
            {isQuote && (
                <motion.div
                    className="text-[64px] leading-none font-serif select-none"
                    style={{ color: QUOTE_MARK_COLOR[kind] ?? "#007074", marginBottom: -16, lineHeight: 0.8 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    "
                </motion.div>
            )}

            {isQuote ? (
                // Quote style — large italic text, no accent border
                <div className={isQuote ? "pl-0" : "pl-6"}>
                    <motion.p
                        className="font-bold text-[#003057] italic leading-snug"
                        style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                    >
                        {data.text}
                    </motion.p>
                </div>
            ) : (
                <motion.p
                    className="font-bold text-[#003057] leading-snug pl-6"
                    style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                >
                    {data.text}
                </motion.p>
            )}

            {data.attribution && (
                <motion.p
                    className="text-sm text-[#6D6E71] font-medium pl-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                >
                    — {data.attribution}
                </motion.p>
            )}
        </div>
    );

    return <LayoutSplit leftContent={left} rightContent={right} />;
}
