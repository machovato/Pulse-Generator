"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { LayoutSplit } from "./layouts/LayoutSplit";
import type { LooseSlide } from "@/lib/schema";

interface Card {
    title: string;
    body: string;
    icon?: string;
}

interface GridData {
    cards: Card[];
}

function getIcon(name?: string) {
    if (!name) return null;
    const key = name.charAt(0).toUpperCase() + name.slice(1);
    const Icon = (LucideIcons as Record<string, unknown>)[key] as React.ComponentType<{ className?: string }>;
    return Icon ? <Icon className="w-5 h-5 text-[#1B8FE0]" /> : null;
}

export function GridSlide({ slide }: { slide: LooseSlide }) {
    const data = (slide.data ?? { cards: [] }) as unknown as GridData;
    const cards = data.cards ?? [];
    const cols = cards.length <= 2 ? 1 : cards.length <= 4 ? 2 : 3;

    const left = (
        <div className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Grid
            </p>
            <h2
                className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(24px, 3vw, 42px)" }}
            >
                {slide.title}
            </h2>
            <div className="w-8 h-0.5 bg-white/30 mt-2" />
        </div>
    );

    const right = (
        <div
            className="grid w-full h-full"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${Math.ceil(cards.length / cols)}, 1fr)`,
                gap: "clamp(16px, 2vw, 32px)"
            }}
        >
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    className="border border-gray-100 p-6 bg-white shadow-sm hover:shadow-md transition-shadow @container flex flex-col justify-center h-full"
                    style={{ borderRadius: "clamp(12px, 1.5vw, 24px)" }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                >
                    {card.icon && (
                        <div
                            className="bg-blue-50 flex items-center justify-center mb-4 shrink-0"
                            style={{
                                width: "clamp(40px, 12cqi, 72px)",
                                height: "clamp(40px, 12cqi, 72px)",
                                borderRadius: "clamp(8px, 2.5cqi, 16px)"
                            }}
                        >
                            {getIcon(card.icon)}
                        </div>
                    )}
                    <p
                        className="font-bold text-[#003057] mb-2 leading-tight"
                        style={{ fontSize: "clamp(16px, 6.5cqi, 32px)" }}
                    >
                        {card.title}
                    </p>
                    <p
                        className="text-[#6D6E71] leading-relaxed"
                        style={{ fontSize: "clamp(13px, 4.5cqi, 20px)" }}
                    >
                        {card.body}
                    </p>
                </motion.div>
            ))}
        </div>
    );

    return <LayoutSplit leftContent={left} rightContent={right} />;
}
