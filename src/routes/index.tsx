import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Endegena Abebe (Kiya) — Full Stack Developer & Founder" },
      { name: "description", content: "Full Stack Developer, Frontend Engineer, and Founder of Hundaf Digital Solution. Building software that transforms communities across Ethiopia." },
      { property: "og:title", content: "Endegena Abebe (Kiya) — Full Stack Developer & Founder" },
      { property: "og:description", content: "Full Stack Developer, Frontend Engineer, and Founder of Hundaf Digital Solution." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
