import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deck1 = {
    schemaVersion: 1 as const,
    meta: {
        title: "Q1 2026 Sprint Status",
        subtitle: "Engineering — Platform Team",
        date: "2026-03-04",
        audience: "exec" as const,
        template: "status" as const,
        rag: "green" as const,
        headline: "Sprint 9 velocity up 18% from baseline. Zero P1 incidents. API migration 80% complete.",
    },
    slides: [
        {
            type: "hero",
            title: "Q1 2026 Sprint Status",
            notes: "Open with the RAG status. Emphasize that the team is ahead of schedule.",
            data: {
                subtitle: "Week 9 of 13 · Engineering All Hands",
                rag: "green",
                headline: "Sprint 9 velocity up 18% from baseline. Zero P1 incidents.",
                kpis: [
                    { label: "Velocity", value: "52 pts", icon: "Zap", trend: "up" },
                    { label: "Open Tickets", value: "4", icon: "Bug", trend: "down" },
                    { label: "Uptime", value: "99.97%", icon: "Activity", trend: "flat" },
                ],
            },
        },
        {
            type: "kpis",
            title: "Platform KPIs",
            notes: "Latency is flat — discuss the caching proposal if time permits.",
            data: {
                items: [
                    { label: "API Latency (p95)", value: "84ms", icon: "Gauge", trend: "flat", note: "30-day rolling avg" },
                    { label: "Uptime SLA", value: "99.97%", icon: "ShieldCheck", trend: "up", note: "Target: 99.9%" },
                    { label: "Deploy Frequency", value: "3.2/day", icon: "Rocket", trend: "up" },
                    { label: "MTTR", value: "14 min", icon: "Timer", trend: "down", note: "Industry avg: 22 min" },
                ],
            },
        },
        {
            type: "pipeline",
            title: "API Migration Pipeline",
            data: {
                steps: [
                    { label: "Discovery", status: "done", badges: ["v1 deprecated"] },
                    { label: "Schema Design", status: "done", badges: ["RFC approved"] },
                    { label: "Development", status: "current", badges: ["v2.1-beta"], blockers: ["Pending security review"] },
                    { label: "QA & Load Testing", status: "next", badges: ["Starts Mar 11"] },
                ],
            },
        },
        {
            type: "timeline",
            title: "Q1 Milestones",
            data: {
                milestones: [
                    { label: "Sprint 7", date: "2026-02-17", state: "done", detail: "Auth refactor shipped" },
                    { label: "Sprint 8", date: "2026-03-01", state: "done", detail: "DB migration complete" },
                    { label: "Sprint 9", date: "2026-03-15", state: "current", detail: "API v2 beta" },
                    { label: "Sprint 10", date: "2026-03-29", state: "upcoming", detail: "GA release" },
                ],
            },
        },
        {
            type: "grid",
            title: "Engineering Highlights",
            data: {
                cards: [
                    { title: "Zero Downtime Deploy", body: "Implemented blue-green deployment pipeline. All services now deploy without user impact.", icon: "Rocket" },
                    { title: "Caching Layer", body: "Redis caching reduced database load by 43%. P95 latency on read endpoints dropped from 210ms to 84ms.", icon: "Zap" },
                    { title: "Security Hardening", body: "Completed OWASP audit. Resolved 3 medium-severity findings. Penetration test scheduled for April.", icon: "ShieldCheck" },
                    { title: "Observability", body: "Full distributed tracing now live across all services. MTTR improved from 22 to 14 minutes.", icon: "Eye" },
                ],
            },
        },
        {
            type: "blockers",
            title: "Blockers & Risks",
            notes: "The security review is the critical path item. Escalate to CISO if not resolved by Friday.",
            data: {
                items: [
                    { text: "Security sign-off needed for API v2 deployment gate", severity: "approval", owner: "CISO Office", due: "2026-03-07" },
                    { text: "Third-party vendor SDK not updated for new auth flow", severity: "action", owner: "Platform Team", due: "2026-03-10" },
                ],
            },
        },
    ],
};

const deck2 = {
    schemaVersion: 1 as const,
    meta: {
        title: "CX All Hands — March 2026",
        subtitle: "Customer Experience Team",
        date: "2026-03-04",
        audience: "team" as const,
        template: "allHands" as const,
        rag: "yellow" as const,
        headline: "Q1 retention holding. NPS up 6 points. Headcount decision needed by month-end.",
    },
    slides: [
        {
            type: "hero",
            title: "CX All Hands — March 2026",
            notes: "Set a positive tone. Q1 is tracking well but we have decisions to make.",
            data: {
                rag: "yellow",
                headline: "Q1 retention holding. NPS up 6 points. Headcount decision needed by month-end.",
            },
        },
        {
            type: "agenda",
            title: "Today's Agenda",
            data: {
                items: [
                    { topic: "Q1 Performance Snapshot", time: "10 min", owner: "VP CX" },
                    { topic: "Customer Feedback Themes", time: "15 min", owner: "Insights Lead" },
                    { topic: "Support Escalation Process v2", time: "15 min", owner: "Support Manager" },
                    { topic: "H1 Headcount Proposal", time: "10 min", owner: "VP CX" },
                    { topic: "Open Q&A", time: "10 min" },
                ],
            },
        },
        {
            type: "kpis",
            title: "Q1 CX Snapshot",
            data: {
                items: [
                    { label: "NPS Score", value: "61", icon: "Heart", trend: "up", note: "Up 6 pts from Q4" },
                    { label: "Retention Rate", value: "94.2%", icon: "Users", trend: "flat", note: "Target: 95%" },
                    { label: "CSAT", value: "4.6/5", icon: "Star", trend: "up" },
                    { label: "Avg Resolution Time", value: "4.1 hrs", icon: "Clock", trend: "down", note: "Target: <4 hrs" },
                ],
            },
        },
        {
            type: "callout",
            title: "Voice of the Customer",
            notes: "This is a real verbatim from our largest enterprise account.",
            data: {
                text: "The support team's responsiveness during the March outage turned what could have been a churn event into a renewal conversation.",
                kind: "quote",
                attribution: "Director of Operations, Fortune 500 Agriculture Company",
            },
        },
        {
            type: "grid",
            title: "Top Customer Feedback Themes",
            data: {
                cards: [
                    { title: "API Documentation Gaps", body: "12 customers in Q1 cited unclear API docs as a support driver. Engineering and CX to co-own a documentation sprint in April.", icon: "FileText" },
                    { title: "Onboarding Friction", body: "New customers averaging 18 days to first value. Target is 10 days. Revised onboarding flow in design review.", icon: "UserPlus" },
                    { title: "Mobile Experience", body: "NPS from mobile users 14 points lower than desktop. Mobile app roadmap fast-tracked to Q2.", icon: "Smartphone" },
                    { title: "Billing Clarity", body: "8% of support tickets relate to invoice questions. Finance partnering on improved invoicing UX.", icon: "Receipt" },
                ],
            },
        },
        {
            type: "blockers",
            title: "Open Items",
            data: {
                items: [
                    { text: "Headcount approval for 2 senior support engineers needed by March 31", severity: "approval", owner: "VP CX", due: "2026-03-31" },
                    { text: "Escalation runbook v2 review — needs sign-off from Legal", severity: "approval", owner: "Legal Team", due: "2026-03-15" },
                    { text: "CSAT survey vendor contract renewal — $12K/yr, same terms", severity: "fyi", owner: "Finance" },
                ],
            },
        },
    ],
};

async function main() {
    console.log("🌱 Seeding database with 2 example decks…");

    await prisma.update.create({
        data: {
            title: deck1.meta.title,
            date: new Date(deck1.meta.date),
            template: deck1.meta.template,
            rag: deck1.meta.rag,
            content_json: JSON.stringify(deck1),
            source_raw: JSON.stringify(deck1, null, 2),
            schema_version: 1,
        },
    });
    console.log("✅ Seeded: Q1 2026 Sprint Status (status template)");

    await prisma.update.create({
        data: {
            title: deck2.meta.title,
            date: new Date(deck2.meta.date),
            template: deck2.meta.template,
            rag: deck2.meta.rag,
            content_json: JSON.stringify(deck2),
            source_raw: JSON.stringify(deck2, null, 2),
            schema_version: 1,
        },
    });
    console.log("✅ Seeded: CX All Hands — March 2026 (allHands template)");

    console.log("🎉 Seed complete. Visit /history to see your decks.");
}

main()
    .catch((e) => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
