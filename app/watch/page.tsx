import type { Metadata } from "next";
import { TOPICS } from "@/lib/server/content";
import { WatchHub } from "@/components/WatchHub";

export const metadata: Metadata = {
  title: "Watch — ¡Qué Caos! sitcom",
  description: "Animated Claude sitcom episodes for every Year 8 Spanish topic, with pause challenges.",
};

export default function WatchPage() {
  const items = TOPICS.map((t, idx) => ({
    id: t.id,
    num: idx + 1,
    title: t.title,
    icon: t.icon,
    strand: t.strand,
    summary: t.summary,
  }));
  return <WatchHub topics={items} />;
}
