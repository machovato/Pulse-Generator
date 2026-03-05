"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LayoutSplit } from "./layouts/LayoutSplit";
import type { LooseSlide } from "@/lib/schema";

interface BlockerItem {
    text: string;
    severity: "action" | "approval" | "fyi";
    owner?: string;
    due?: string;
}

interface BlockersData {
    items: BlockerItem[];
}

// action   = DTN Red    #C8192B — needs immediate action (highest urgency)
// approval  = DTN Orange #F5A400 — pending decision, not yet unblocked
// fyi       = DTN Teal   #007074 — informational only, no action required
const SEVERITY_CONFIG = {
    action: {
        border: "border-l-[#C8192B]",
        badgeBg: "#FDEAEC",
        badgeText: "#8B0F1A",
        badgeBorder: "#F0A0A8",
        label: "Action",
        chipBg: "rgba(200,25,43,0.15)",
        chipText: "rgba(255,255,255,0.95)",
    },
    approval: {
        border: "border-l-[#F5A400]",
        badgeBg: "#FFF4D6",
        badgeText: "#7A5000",
        badgeBorder: "#F5A400",
        label: "Approval",
        chipBg: "rgba(245,164,0,0.2)",
        chipText: "rgba(255,255,255,0.95)",
    },
    fyi: {
        border: "border-l-[#007074]",
        badgeBg: "#E0F4F5",
        badgeText: "#004A4D",
        badgeBorder: "#007074",
        label: "FYI",
        chipBg: "rgba(0,112,116,0.2)",
        chipText: "rgba(255,255,255,0.90)",
    },
};

export function BlockersSlide({ slide }: { slide: LooseSlide }) {
    const data = (slide.data ?? { items: [] }) as unknown as BlockersData;
    const items = data.items ?? [];

    const actions = items.filter((i) => i.severity === "action").length;
    const approvals = items.filter((i) => i.severity === "approval").length;
    const fyis = items.filter((i) => i.severity === "fyi").length;

    const allFyi = items.length > 0 && items.every((i) => i.severity === "fyi");
    const panelTitle = allFyi ? "Updates & Notes" : "Blockers & Asks";
    const leftBg = allFyi ? "navy" : "blue";

    const allClear = items.length === 0;

    const left = (
        <div className="flex flex-col gap-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                {slide.title}
            </p>
            <h2
                className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}
            >
                {panelTitle}
            </h2>

            {/* Severity stat chips — color = severity level */}
            {!allClear && (
                <div className="flex flex-col gap-2 mt-2">
                    {[
                        { label: "Actions", count: actions, cfg: SEVERITY_CONFIG.action },
                        { label: "Approvals", count: approvals, cfg: SEVERITY_CONFIG.approval },
                        { label: "FYIs", count: fyis, cfg: SEVERITY_CONFIG.fyi },
                    ].map(({ label, count, cfg }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between rounded-lg px-3 py-2"
                            style={{ background: cfg.chipBg, border: "1px solid rgba(255,255,255,0.12)" }}
                        >
                            <span
                                className="font-medium"
                                style={{ color: cfg.chipText, fontSize: "clamp(12px, 1.1vw, 16px)" }}
                            >
                                {label}
                            </span>
                            <span
                                className="font-bold"
                                style={{ color: cfg.chipText, fontSize: "clamp(14px, 1.3vw, 20px)" }}
                            >
                                {count}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const right = allClear ? (
        <motion.div
            className="flex flex-col items-center justify-center gap-4 h-full text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
        >
            {/* DTN Primary Green = positively unblocked */}
            <CheckCircle2 className="w-14 h-14" style={{ color: "#4CB944" }} />
            <p className="text-xl font-semibold" style={{ color: "#005741" }}>No blockers. All clear.</p>
            <p className="text-sm text-[#6D6E71]">The team is unblocked and moving forward.</p>
        </motion.div>
    ) : (
        <div className="flex flex-col gap-3 w-full overflow-auto @container pb-2">
            {items.map((item, i) => {
                const cfg = SEVERITY_CONFIG[item.severity] ?? SEVERITY_CONFIG.fyi;
                return (
                    <motion.div
                        key={i}
                        className={`bg-white rounded-r-xl shadow-sm`}
                        style={{
                            borderLeft: `clamp(4px, 1cqi, 8px) solid ${cfg.border.replace('border-l-[', '').replace(']', '')}`,
                            padding: "clamp(16px, 3cqi, 24px)"
                        }}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                    >
                        <div className="flex items-start" style={{ gap: "clamp(12px, 2.5cqi, 20px)" }}>
                            {/* Badge: color = severity meaning */}
                            <span
                                className="font-bold uppercase tracking-wider border rounded shrink-0 mt-0.5"
                                style={{
                                    background: cfg.badgeBg,
                                    color: cfg.badgeText,
                                    borderColor: cfg.badgeBorder,
                                    fontSize: "clamp(11px, 1.8cqi, 15px)",
                                    padding: "clamp(2px, 0.6cqi, 6px) clamp(6px, 1.5cqi, 12px)",
                                }}
                            >
                                {cfg.label}
                            </span>
                            <p
                                className="text-[#003057] leading-snug flex-1 font-semibold"
                                style={{ fontSize: "clamp(15px, 2.8cqi, 24px)" }}
                            >
                                {item.text}
                            </p>
                        </div>
                        {(item.owner || item.due) && (
                            <div className="flex gap-4 mt-3" style={{ paddingLeft: "clamp(48px, 10cqi, 80px)" }}>
                                {item.owner && (
                                    <span
                                        className="text-gray-500 font-semibold"
                                        style={{ fontSize: "clamp(12px, 1.8cqi, 16px)" }}
                                    >
                                        Owner: {item.owner}
                                    </span>
                                )}
                                {item.due && (
                                    <span
                                        className="text-gray-500 font-semibold"
                                        style={{ fontSize: "clamp(12px, 1.8cqi, 16px)" }}
                                    >
                                        Due: {item.due}
                                    </span>
                                )}
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );

    return (
        <LayoutSplit
            leftContent={left}
            rightContent={right}
            leftBackground={leftBg}
        />
    );
}
