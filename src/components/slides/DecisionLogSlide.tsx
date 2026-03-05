"use client";

import { motion } from "framer-motion";
import { LayoutSplit } from "./layouts/LayoutSplit";
import type { LooseSlide } from "@/lib/schema";

interface DecisionItem {
    decision: string;
    owner?: string;
    date?: string;
    status?: "proposed" | "approved" | "blocked" | "done";
}

interface DecisionLogData {
    items: DecisionItem[];
}

// approved  = DTN Green       #4CB944 — yes, decided, positive
// blocked    = DTN Red         #C8192B — held up, escalation needed
// proposed   = DTN Teal        #007074 — pending decision, informational
// done       = DTN Dark Green  #005741 — archived/complete (historical)
const STATUS_CONFIG: Record<string, { bg: string; text: string; border: string; label: string }> = {
    proposed: { bg: "#E0F4F5", text: "#004A4D", border: "#007074", label: "Proposed" },
    approved: { bg: "#EDFAEB", text: "#1D6B19", border: "#4CB944", label: "Approved" },
    blocked: { bg: "#FDEAEC", text: "#8B0F1A", border: "#C8192B", label: "Blocked" },
    done: { bg: "#E9F4F1", text: "#005741", border: "#005741", label: "Done" },
};

export function DecisionLogSlide({ slide }: { slide: LooseSlide }) {
    const data = (slide.data ?? { items: [] }) as unknown as DecisionLogData;
    const items = data.items ?? [];

    const left = (
        <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Decision Log
            </p>
            <h2
                className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
            >
                {slide.title}
            </h2>
            <div className="w-8 h-0.5 bg-white/30 mt-2" />
            <p className="text-white/55 text-xs mt-1">
                {items.length} decision{items.length !== 1 ? "s" : ""} recorded
            </p>
        </div>
    );

    const right = (
        <div className="w-full overflow-auto">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 pb-3 border-b border-gray-200 mb-1">
                {["Decision", "Owner", "Date", "Status"].map((h) => (
                    <span
                        key={h}
                        className="font-semibold uppercase tracking-wider text-gray-400"
                        style={{ fontSize: "clamp(11px, 0.9vw, 14px)" }}
                    >
                        {h}
                    </span>
                ))}
            </div>

            {/* Rows */}
            {items.map((item, i) => {
                const cfg = STATUS_CONFIG[item.status ?? "proposed"];
                return (
                    <motion.div
                        key={i}
                        className="grid grid-cols-[1fr_auto_auto_auto] gap-3 py-2.5 border-b border-gray-50 last:border-0 items-start"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    >
                        <p
                            className="text-[#003057] font-semibold leading-snug"
                            style={{ fontSize: "clamp(14px, 1.3vw, 20px)" }}
                        >
                            {item.decision}
                        </p>
                        <span
                            className="text-gray-500 whitespace-nowrap pt-1"
                            style={{ fontSize: "clamp(12px, 1vw, 16px)" }}
                        >
                            {item.owner ?? "—"}
                        </span>
                        <span
                            className="text-gray-400 whitespace-nowrap pt-1"
                            style={{ fontSize: "clamp(12px, 1vw, 16px)" }}
                        >
                            {item.date ?? "—"}
                        </span>
                        <span
                            className="font-bold uppercase tracking-wider px-2.5 py-1 rounded whitespace-nowrap border"
                            style={{
                                background: cfg.bg,
                                color: cfg.text,
                                borderColor: cfg.border,
                                fontSize: "clamp(10px, 0.8vw, 13px)",
                            }}
                        >
                            {cfg.label}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );

    return <LayoutSplit leftContent={left} rightContent={right} />;
}
