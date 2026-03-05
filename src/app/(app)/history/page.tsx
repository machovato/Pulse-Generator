import { redirect } from "next/navigation";

// /history is merged into the homepage. Redirect all traffic.
export default function HistoryPage() {
    redirect("/");
}
