import type { Metadata } from "next";
import { Suspense } from "react";
import { EditorClient } from "./EditorClient";

export const metadata: Metadata = {
    title: "Editor — DTN Project Pulse",
    description: "Create and publish presentation decks",
};

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-400 text-sm">Loading editor…</div>}>
            <EditorClient />
        </Suspense>
    );
}
