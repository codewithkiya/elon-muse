import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Endegena Abebe (Kiya) — Full Stack Developer & Digital Manager" },
      { name: "description", content: "Full Stack Developer, Frontend Engineer, and Digital Manager at Hundaf Digital Solution. Building software that transforms communities across Ethiopia." },
      { property: "og:title", content: "Endegena Abebe (Kiya) — Full Stack Developer & Digital Manager" },
      { property: "og:description", content: "Full Stack Developer, Frontend Engineer, and Digital Manager at Hundaf Digital Solution." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "profile:first_name", content: "Endegena" },
      { property: "profile:last_name", content: "Abebe" },
      { property: "profile:username", content: "kiyaab" },
      { name: "twitter:title", content: "Endegena Abebe (Kiya) — Full Stack Developer & Digital Manager" },
      { name: "twitter:description", content: "Full Stack Developer, Frontend Engineer, and Digital Manager at Hundaf Digital Solution." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Endegena Abebe",
          alternateName: "Kiya",
          jobTitle: "Full Stack Developer & Digital Manager",
          worksFor: { "@type": "Organization", name: "Hundaf Digital Solution" },
          url: "/",
          sameAs: [
            "https://github.com/kiyaab",
            "https://www.linkedin.com/in/endegenaabedev",
            "https://t.me/itz_kiyaaa",
          ],
          email: "mailto:codewithkiya@gmail.com",
          address: { "@type": "PostalAddress", addressLocality: "Bale Robe", addressCountry: "ET" },
          knowsAbout: ["React", "TypeScript", "Django", "Python", "Next.js", "PostgreSQL", "AI Integration"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
