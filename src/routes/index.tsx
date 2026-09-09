import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kiya — Full-Stack Developer & Software Builder" },
      { name: "description", content: "Personal portfolio of Kiya, a full-stack developer building modern web applications, SaaS platforms, AI systems, and digital products." },
      { property: "og:title", content: "Kiya — Full-Stack Developer & Software Builder" },
      { property: "og:description", content: "Full-stack developer building modern web applications, SaaS platforms, AI systems, and digital products." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://elon-muse.lovable.app/" },
      { property: "profile:first_name", content: "Endegena" },
      { property: "profile:last_name", content: "Abebe" },
      { property: "profile:username", content: "kiyaab" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Kiya — Full-Stack Developer & Software Builder" },
      { name: "twitter:description", content: "Full-stack developer building web applications, SaaS platforms, AI systems, and digital products." },
    ],
    links: [{ rel: "canonical", href: "https://elon-muse.lovable.app/" }],
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
          url: "https://elon-muse.lovable.app/",
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
