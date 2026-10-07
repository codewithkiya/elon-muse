import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import portrait from "@/assets/kiya-portrait.png";
import { projects } from "@/data/projects";
import { socials } from "@/data/profile";

const Mark = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href} target="_blank" rel="noreferrer" className="bg-foreground px-1.5 py-0.5 text-background hover:opacity-80">{children}</a>
);

export function Workbench() {
  const tags = useMemo(() => Array.from(new Set(projects.flatMap((p) => [p.category, ...p.tech]))), []);
  const [active, setActive] = useState<string | null>(null);
  const list = active ? projects.filter((p) => p.category === active || p.tech.includes(active)) : projects;

  return (
    <section id="workbench" className="px-5 pb-4 pt-12 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="brutal-card">
            <div className="flex items-center gap-5 border-b border-foreground p-5">
              <img src={portrait} alt="Endegena Abebe (Kiya)" loading="lazy" className="h-20 w-20 shrink-0 rounded-full border border-foreground object-cover grayscale" />
              <p className="text-xl leading-snug md:text-3xl">Hi, I'm <b>Endegena</b> or <b>kiya</b> on the internet.</p>
            </div>
            <div className="flex flex-wrap gap-4 border-b border-foreground p-5 text-sm">
              <a href={socials.github} target="_blank" rel="noreferrer" className="underline underline-offset-4">github</a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-4">linkedin</a>
              <a href={socials.telegram} target="_blank" rel="noreferrer" className="underline underline-offset-4">telegram</a>
              <a href={`mailto:${socials.email}`} className="underline underline-offset-4">@email</a>
            </div>
            <p className="border-b border-foreground p-5 text-sm">I build at <Mark href={socials.linkedin}>Hundaf Digital Solution</Mark> and write on the <a href="/blog" className="bg-foreground px-1.5 py-0.5 text-background">blog</a>.</p>
            <p className="p-5 text-sm">Need help with a product? <a href="#book" className="bg-foreground px-1.5 py-0.5 text-background">book a call</a>.</p>
          </div>
          <div className="border border-foreground bg-foreground p-6 text-background shadow-[5px_5px_0_0_var(--muted-foreground)]">
            <h3 className="text-2xl font-bold">About Me</h3>
            <p className="mt-4 leading-relaxed">Founder, full-stack developer and digital manager from Ethiopia. I turn messy real-world problems — schools, savings groups, learning — into calm, reliable software people actually use.</p>
          </div>
        </div>

        <p className="mt-16 text-xs uppercase text-muted-foreground">01 / Selected work</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">Projects</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          <button onClick={() => setActive(null)} className={`border border-foreground px-2 py-0.5 text-xs ${!active ? "bg-foreground text-background" : "bg-background"}`}>All</button>
          {tags.map((t) => (
            <button key={t} onClick={() => setActive(active === t ? null : t)} className={`border border-foreground px-2 py-0.5 text-xs transition-colors ${active === t ? "bg-foreground text-background" : "bg-background hover:bg-muted"}`}>{t}</button>
          ))}
        </div>
        <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article key={p.slug} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="brutal-card brutal-lift flex flex-col p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="font-bold hover:underline">{p.name}</Link>
                  <span className="flex gap-3 text-xs">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="underline">Source</a>}
                    {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="underline">Site</a>}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{p.short}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.slice(0, 4).map((t) => <span key={t} className="border border-foreground px-1.5 text-[10px]">{t}</span>)}</div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        <a href={socials.github} target="_blank" rel="noreferrer" className="mt-8 inline-block underline underline-offset-4">See more on GitHub</a>
      </div>
    </section>
  );
}
