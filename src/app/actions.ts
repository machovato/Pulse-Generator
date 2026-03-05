"use server";

import prisma from "@/lib/db";
import { LooseDeckSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

interface PublishResult {
    success: boolean;
    id?: string;
    error?: string;
}

export async function publishDeck(raw: unknown): Promise<PublishResult> {
    // Parse with loose schema (allows unknown slide types to pass through)
    const parsed = LooseDeckSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.errors
                .map((e) => `${e.path.join(".")}: ${e.message}`)
                .join("; "),
        };
    }

    const deck = parsed.data;
    const date = new Date(deck.meta.date);

    try {
        const record = await prisma.update.create({
            data: {
                title: deck.meta.title,
                date,
                template: deck.meta.template,
                rag: deck.meta.rag ?? null,
                content_json: JSON.stringify(deck),
                source_raw: JSON.stringify(raw, null, 2),
                schema_version: deck.schemaVersion,
            },
        });

        revalidatePath("/history");
        return { success: true, id: record.id };
    } catch (err) {
        console.error("Publish error:", err);
        return { success: false, error: "Database error. Check your connection." };
    }
}
