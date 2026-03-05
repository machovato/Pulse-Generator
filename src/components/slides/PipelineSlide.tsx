"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, ChevronRight, AlertTriangle } from "lucide-react";
import { LayoutWhite } from "./layouts/LayoutWhite";
import type { LooseSlide } from "@/lib/schema";

interface Step {
    label: string;
    status?: "done" | "current" | "next";
    badges?: string[];
    blockers?: string[];
}

interface PipelineData {
    steps: Step[];
}

const STATUS_CONFIG = {
    done: {
        icon: CheckCircle2,
        // Done = DTN Primary Green — positive, complete
        dotClass: "border-[#4CB944]",
        dotBg: "#4CB944",
        labelClass: "text-[#005741] font-semibold", // Dark Green text for readability
        statusText: "Done",
        statusColor: "text-[#005741]",
    },
    current: {
        icon: Circle,
        // In Progress = DTN Primary Blue — brand active state
        dotClass: "border-[#1B8FE0]",
        dotBg: "#1B8FE0",
        labelClass: "text-[#003057] font-bold",
        statusText: "In Progress",
        statusColor: "text-[#1B8FE0]",
    },
    next: {
        icon: Circle,
        // Upcoming = DTN Neutral Mid — inactive, not yet
        dotClass: "border-[#BCBEC0]",
        dotBg: "transparent",
        labelClass: "text-[#6D6E71] font-medium",
        statusText: "Up Next",
        statusColor: "text-[#BCBEC0]",
    },
} as const;

export function PipelineSlide({ slide }: { slide: LooseSlide }) {
    const data = (slide.data ?? { steps: [] }) as unknown as PipelineData;
    const steps = data.steps ?? [];

    return (
        <LayoutWhite center={false}>
            {/* Eyebrow title */}
            <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1B8FE0] pt-10 pb-0 text-center w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                Pipeline
            </motion.p>

            <motion.h2
                className="font-bold text-[#003057] text-center mb-0 mt-2"
                style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 }}
            >
                {slide.title}
            </motion.h2>

            {/* Pipeline flow — full width, heavy scaling */}
            <div className="flex-1 flex items-center justify-center w-full px-12">
                <div className="flex items-start justify-center gap-0 w-full" style={{ maxWidth: "88%" }}>
                    {steps.map((step, i) => {
                        const status = step.status ?? "next";
                        const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.next;
                        const Icon = cfg.icon;
                        const isLast = i === steps.length - 1;

                        return (
                            <div key={i} className="flex items-start flex-1 min-w-0">
                                {/* Node + content */}
                                <motion.div
                                    className="flex flex-col items-center gap-4 flex-1 px-4"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
                                >
                                    {/* Status icon — scaled massively */}
                                    <div
                                        className={`rounded-full flex items-center justify-center shadow-md ${cfg.dotClass}`}
                                        style={{
                                            background: cfg.dotBg,
                                            width: "clamp(64px, 7vw, 110px)",
                                            height: "clamp(64px, 7vw, 110px)",
                                            borderWidth: "clamp(4px, 0.4vw, 8px)"
                                        }}
                                    >
                                        {status === "done" ? (
                                            <CheckCircle2 className="text-white" style={{ width: "50%", height: "50%" }} fill="currentColor" />
                                        ) : status === "current" ? (
                                            <div className="rounded-full bg-white" style={{ width: "35%", height: "35%" }} />
                                        ) : (
                                            <span
                                                className="font-bold text-[#BCBEC0]"
                                                style={{ fontSize: "clamp(20px, 2.5vw, 36px)" }}
                                            >
                                                {i + 1}
                                            </span>
                                        )}
                                    </div>

                                    {/* Label */}
                                    <span
                                        className={`text-center leading-tight ${cfg.labelClass}`}
                                        style={{ fontSize: "clamp(16px, 1.8vw, 28px)" }}
                                    >
                                        {step.label}
                                    </span>

                                    {/* Status text */}
                                    <span
                                        className={`font-bold uppercase tracking-wider ${cfg.statusColor}`}
                                        style={{ fontSize: "clamp(12px, 1.1vw, 18px)" }}
                                    >
                                        {cfg.statusText}
                                    </span>

                                    {/* Badges */}
                                    {step.badges && step.badges.length > 0 && (
                                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                                            {step.badges.map((b, bi) => (
                                                <span
                                                    key={bi}
                                                    className="bg-blue-50 text-[#1B8FE0] border border-blue-100 font-semibold"
                                                    style={{
                                                        fontSize: "clamp(12px, 1.1vw, 16px)",
                                                        padding: "clamp(4px, 0.4vw, 8px) clamp(8px, 0.8vw, 16px)",
                                                        borderRadius: "clamp(4px, 0.4vw, 8px)"
                                                    }}
                                                >
                                                    {b}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Blockers */}
                                    {step.blockers && step.blockers.length > 0 && (
                                        <div className="flex flex-col gap-2 w-full mt-3">
                                            {step.blockers.map((bl, bli) => (
                                                <div
                                                    key={bli}
                                                    className="flex items-start gap-2"
                                                    style={{
                                                        background: "#FDEAEC",
                                                        border: "1px solid #F0A0A8",
                                                        padding: "clamp(6px, 0.6vw, 12px)",
                                                        borderRadius: "clamp(4px, 0.4vw, 8px)"
                                                    }}
                                                >
                                                    <AlertTriangle className="shrink-0 mt-0.5" style={{ color: "#C8192B", width: "clamp(16px, 1.4vw, 24px)", height: "clamp(16px, 1.4vw, 24px)" }} />
                                                    <span
                                                        className="leading-tight font-medium"
                                                        style={{ color: "#8B0F1A", fontSize: "clamp(13px, 1.2vw, 18px)" }}
                                                    >
                                                        {bl}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>

                                {/* Connector arrow — scaled explicitly */}
                                {!isLast && (
                                    <div
                                        className="flex items-center shrink-0"
                                        style={{
                                            paddingTop: "clamp(32px, 3.5vw, 55px)", // Matches half the dot height
                                        }}
                                    >
                                        <div
                                            className="bg-gray-200"
                                            style={{
                                                width: "clamp(24px, 4vw, 70px)",
                                                height: "clamp(2px, 0.2vw, 4px)"
                                            }}
                                        />
                                        <ChevronRight
                                            className="text-gray-300 -ml-1.5"
                                            style={{
                                                width: "clamp(20px, 2vw, 36px)",
                                                height: "clamp(20px, 2vw, 36px)"
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </LayoutWhite>
    );
}
