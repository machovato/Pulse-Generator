"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CircleDot } from "lucide-react";
import { staggerContainer, slideUpItem } from "@/lib/motion";
import { LayoutWhite } from "./layouts/LayoutWhite";
import type { LooseSlide } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useTemplate } from "@/components/TemplateContext";
import { Typography } from "../ui/Typography";

interface FrameworkLane {
    title: string;
    body: string;
    icon?: string;
    type: "control" | "influence" | "concern";
    rank: number;
}

interface FrameworkData {
    lanes: FrameworkLane[];
}

function getLucideIcon(name?: string, className?: string) {
    if (!name) return <CircleDot className={className || "w-5 h-5"} />;
    const key = name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    // @ts-expect-error - Dynamic lookup
    const IconComponent = LucideIcons[key] || LucideIcons[name.charAt(0).toUpperCase() + name.slice(1)];
    if (!IconComponent) return <CircleDot className={className || "w-5 h-5"} />;
    return <IconComponent className={className || "w-5 h-5"} />;
}

export function FrameworkSlide({ slide, disableAnimation = false }: { slide: LooseSlide, disableAnimation?: boolean }) {
    const { template } = useTemplate();
    const data = (slide.data ?? { lanes: [] }) as unknown as FrameworkData;
    const lanes = data.lanes ?? [];
    const isStrategy = template === "strategy";

    // Sort lanes by rank ascending so Control is 1, Influence 2, Concern 3
    const sortedLanes = [...lanes].sort((a, b) => a.rank - b.rank);

    return (
        <motion.div className="w-full h-full" variants={staggerContainer(disableAnimation)} initial="hidden" animate="visible">
            <LayoutWhite center={false}>
                <div className="w-full flex-1 flex flex-col pt-0 pb-6">
                    <motion.div className="mb-2 shrink-0" variants={slideUpItem(disableAnimation)}>
                        <Typography variant="eyebrow" className="text-accent-info opacity-60 mb-1">
                            Framework
                        </Typography>
                        <Typography
                            as="h2"
                            variant="h1"
                        >
                            {slide.title}
                        </Typography>
                    </motion.div>

                    <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto my-auto justify-center">
                        {sortedLanes.map((lane, i) => {
                            let fillProps = "";
                            let borderProps = "";
                            let widthProps = "w-full";
                            let opacityProps = 1;

                            if (lane.type === "control") {
                                fillProps = "bg-[#0F2942]/[0.05] text-[#0F2942]";
                                borderProps = "border-[4px] border-[#0F2942] shadow-md";
                                widthProps = "w-full";
                                opacityProps = 1;
                            } else if (lane.type === "influence") {
                                fillProps = "bg-[#007074]/5 text-[#007074]";
                                borderProps = cn("border-[3px] shadow-[0_4px_12px_rgba(0,112,116,0.08)]", isStrategy ? "border-dashed border-[#007074]/70" : "border-solid border-[#007074]");
                                widthProps = "w-[90%] mx-auto";
                                opacityProps = 0.95;
                            } else if (lane.type === "concern") {
                                fillProps = "bg-surface-page text-text-secondary";
                                borderProps = cn("border-[2px]", isStrategy ? "border-dotted border-border-muted" : "border-solid border-border-muted");
                                widthProps = "w-[80%] mx-auto";
                                opacityProps = 0.9;
                            }

                            // Animate down one by one
                            const delay = 0.1 + i * 0.15;

                            return (
                                <motion.div
                                    key={i}
                                    className={`flex flex-col md:flex-row items-start md:items-center gap-6 p-4 md:px-8 md:py-6 rounded-2xl ${fillProps} ${borderProps} ${widthProps} transition-opacity duration-300`}
                                    style={{
                                        opacity: opacityProps,
                                    }}
                                    variants={slideUpItem(disableAnimation)}
                                >
                                    <div className="shrink-0 flex flex-row items-center gap-4 md:w-56">
                                        <div className={lane.type === 'control' ? 'text-[#0F2942]' : lane.type === 'influence' ? 'text-[#007074]' : 'text-text-muted'}>
                                            {getLucideIcon(lane.icon, "w-8 h-8 sm:w-10 sm:h-10")}
                                        </div>
                                        <Typography variant="badge" className={`px-3 py-1.5 rounded-md inline-flex shadow-sm uppercase tracking-wider font-bold ${lane.type === 'control' ? 'bg-[#0F2942] text-white border-transparent' : lane.type === 'influence' ? 'bg-[#007074]/10 text-[#007074] border border-[#007074]/20' : 'bg-surface-muted text-text-primary border border-border-default/80'}`}>
                                            {lane.type}
                                        </Typography>
                                    </div>
                                    <div className={cn("flex-1 border-l-4 pl-6 md:pl-8 rounded-l-sm py-1", lane.type === 'control' ? 'border-[#0F2942]/20' : lane.type === 'influence' ? 'border-[#007074]/20' : 'border-border-default/40')}>
                                        <Typography as="h3" variant="h2" className={cn("mb-1 leading-tight", lane.type === 'control' ? 'text-[#0F2942] font-black' : lane.type === 'influence' ? 'text-[#007074] font-bold' : 'text-text-primary mb-1')}>
                                            {lane.title}
                                        </Typography>
                                        <Typography as="p" variant="body" className={cn("leading-relaxed max-w-4xl", lane.type === 'concern' ? 'text-text-secondary' : 'text-text-primary/90 leading-relaxed font-medium')}>
                                            {lane.body}
                                        </Typography>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </LayoutWhite>
        </motion.div>
    );
}
