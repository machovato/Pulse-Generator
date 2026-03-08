import * as React from "react";
import { cn } from "@/lib/utils";

export type CardAccent =
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral"
    | "none";

export interface CardBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    accent?: CardAccent;
}

const accentColors: Record<CardAccent, string | null> = {
    success: "var(--accent-success)",
    warning: "var(--accent-warning)",
    danger: "var(--accent-danger)",
    info: "var(--accent-info)",
    neutral: "var(--border-muted)",
    none: null,
};

export const CardBase = React.forwardRef<HTMLDivElement, CardBaseProps>(
    ({ children, accent = "none", className, style, ...props }, ref) => {
        const accentColor = accentColors[accent];

        return (
            <div
                ref={ref}
                className={cn(className)}
                style={{
                    background: "var(--surface-secondary)",
                    border: "var(--border-width-card) solid var(--border-default)",
                    borderTop: accentColor
                        ? `var(--border-width-accent) solid ${accentColor}`
                        : undefined,
                    borderRadius: "var(--border-radius-card)",
                    padding: "var(--spacing-card-padding)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    ...style,
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);
CardBase.displayName = "CardBase";
