import { TechStack } from "@/components/tech-stack";
import { Workbench } from "@/components/workbench";
import { BookCall } from "@/components/book-call";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Code2, Mail, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logo from "@/assets/kiya-logo.jpg";
import { achievements, experience } from "@/data/experience";
import { posts } from "@/data/posts";
import { socials, stats } from "@/data/profile";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 34, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-foreground" style={{ scaleX }} />;
}

const navItems = [
  ["Projects", "#workbench"],
  ["Stack", "#stack"],
  ["Journey", "#journey"],
  ["Notes", "#notes"],
  ["Book a call", "#book"],
  ["Contact", "#contact"],
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-foreground bg-background/95 backdrop-blur-md">
      <nav className="flex h-16 items-center justify-between px-5 md:px-10" aria-label="Main navigation">
        <a href="#home" className="flex items-center gap-3" aria-label="Kiya portfolio home">
          <img src={logo} alt="Kiya logo" width="30" height="30" className="h-[30px] w-[30px] object-cover grayscale" fetchPriority="high" />
          <span className="font-display text-sm font-bold uppercase">EA / Kiya</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, href]) => <a key={href} href={href} className="font-display text-[11px] font-semibold uppercase text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}
          <Link to="/blog" className="font-display text-[11px] font-semibold uppercase text-muted-foreground transition-colors hover:text-foreground">Blog</Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></Button>
        </div>
      </nav>
      <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-50 flex min-h-screen flex-col bg-background p-5 md:hidden">
          <div className="flex items-center justify-between border-b border-border pb-4"><span className="font-display text-sm font-bold uppercase">EA / Kiya</span><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu"><X /></Button></div>
          <div className="flex flex-1 flex-col justify-center">
            {navItems.map(([label, href], index) => <motion.a key={href} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + index * 0.06 }} className="border-b border-border py-4 font-display text-3xl font-bold uppercase">{label}</motion.a>)}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.42 }}><Link to="/blog" onClick={() => setOpen(false)} className="block border-b border-border py-4 font-display text-3xl font-bold uppercase">Blog</Link></motion.div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}

const H = ({ n, t }: { n: string; t: string }) => (<><p className="text-xs uppercase text-muted-foreground">{n}</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">{t}</h2></>);
const Wrap = ({ id, children }: { id?: string; children: React.ReactNode }) => <section id={id} className="px-5 py-16 md:px-10"><div className="mx-auto max-w-6xl">{children}</div></section>;

function Snapshot() {
  return (
    <Wrap>
      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="brutal-card brutal-lift flex items-end justify-between p-5">
            <span className="text-5xl font-bold">{stat.value}{stat.suffix}</span><span className="text-right text-xs uppercase text-muted-foreground">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </Wrap>
  );
}

function Journey() {
  const certificates = achievements.filter((item) => item.org === "Certified");
  const awards = achievements.filter((item) => item.org !== "Certified");
  return (
    <Wrap id="journey">
      <H n="03 / Journey" t="Experience & proof" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="brutal-card divide-y divide-foreground">
          {experience.map((item) => <Reveal key={`${item.year}-${item.org}`} className="grid gap-2 p-5 md:grid-cols-[110px_1fr]"><span className="text-xs text-muted-foreground">{item.year}</span><div><h3 className="font-bold">{item.role}</h3><p className="mt-1 text-sm"><span className="bg-foreground px-1 text-background">{item.org}</span></p><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p></div></Reveal>)}
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {certificates.map((item, i) => <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="brutal-card brutal-lift p-4"><span className="text-[10px] text-muted-foreground">{item.year} · Certified</span><p className="mt-6 text-sm font-bold leading-5">{item.title.replace("Ethiopian 5 Million Coders — ", "")}</p><p className="mt-2 text-[10px] uppercase text-muted-foreground">5 Million Coders</p></motion.div>)}
          </div>
          <div className="border border-foreground bg-foreground p-5 text-background shadow-[5px_5px_0_0_var(--muted-foreground)]"><p className="mb-3 font-bold">Awards</p>{awards.map((item) => <div key={item.title} className="grid grid-cols-[56px_1fr] border-t border-background/30 py-2 text-sm"><span className="opacity-60">{item.year}</span><span>{item.title}</span></div>)}</div>
        </div>
      </div>
    </Wrap>
  );
}

function PublicCode() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [shown, setShown] = useState(6);
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cached = localStorage.getItem("kiya:repos:v2");
    if (cached) {
      try { const parsed = JSON.parse(cached) as { at: number; data: Repo[] }; if (Date.now() - parsed.at < 3_600_000) setRepos(parsed.data); } catch { /* Ignore invalid cache. */ }
    }
    fetch("https://api.github.com/users/kiyaab/repos?per_page=100&sort=updated").then((r) => r.ok ? r.json() : Promise.reject(new Error("GitHub unavailable"))).then((data: Repo[]) => { const clean = data.filter((repo) => !repo.fork); setRepos(clean); localStorage.setItem("kiya:repos:v2", JSON.stringify({ at: Date.now(), data: clean })); }).catch(() => undefined);
  }, []);
  const sorted = useMemo(() => [...repos].sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at)), [repos]);
  useEffect(() => { const node = sentinel.current; if (!node) return; const o = new IntersectionObserver(([e]) => { if (e?.isIntersecting) setShown((v) => Math.min(v + 6, sorted.length)); }, { rootMargin: "140px" }); o.observe(node); return () => o.disconnect(); }, [sorted.length]);
  return (
    <Wrap id="code">
      <div className="flex items-end justify-between gap-4"><div><H n="04 / Open source" t="Code in public" /></div><a href={socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">GitHub <Code2 className="h-4 w-4" /></a></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{sorted.slice(0, shown).map((repo) => <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="brutal-card brutal-lift flex flex-col p-4"><div className="flex justify-between gap-2"><h3 className="truncate font-bold">{repo.name}</h3><span className="text-xs underline">Source</span></div><p className="mt-2 line-clamp-2 flex-1 text-xs text-muted-foreground">{repo.description || "Open-source project by Kiya."}</p><div className="mt-4 flex gap-2 text-[10px]"><span className="border border-foreground px-1.5">{repo.language || "Code"}</span><span className="border border-foreground px-1.5">★ {repo.stargazers_count}</span></div></a>)}</div>
      <div ref={sentinel} className="h-1" />
    </Wrap>
  );
}

function Notes() {
  return (
    <Wrap id="notes">
      <div className="flex items-end justify-between"><div><H n="05 / Writing" t="Notes from the work" /></div><Link to="/blog" className="text-sm underline underline-offset-4">All posts</Link></div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.map((post, i) => <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}><Link to="/blog/$slug" params={{ slug: post.slug }} className="brutal-card brutal-lift flex h-full flex-col p-5"><span className="text-[10px] text-muted-foreground">{post.date} · {post.readingTime}</span><h3 className="mt-4 flex-1 font-bold leading-6">{post.title}</h3><span className="mt-5 w-fit bg-foreground px-1.5 text-[10px] text-background">{post.category}</span></Link></motion.div>)}</div>
    </Wrap>
  );
}

function Contact() {
  return (
    <Wrap id="contact">
      <Reveal className="border border-foreground bg-foreground p-8 text-background shadow-[8px_8px_0_0_var(--muted-foreground)] md:p-14">
        <p className="text-xs uppercase opacity-60">07 / Contact</p>
        <h2 className="mt-4 text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.95]">Have a problem<br />worth solving?</h2>
        <div className="mt-10 flex flex-col gap-6 border-t border-background/30 pt-6 md:flex-row md:items-center md:justify-between">
          <a href={`mailto:${socials.email}`} className="group flex items-center gap-3 text-lg font-semibold">{socials.email} <Mail className="h-5 w-5 transition-transform group-hover:translate-x-1" /></a>
          <div className="flex flex-wrap gap-3 text-sm">{([["GitHub", socials.github], ["LinkedIn", socials.linkedin], ["Telegram", socials.telegram]] as const).map(([l, h]) => <a key={l} href={h} target="_blank" rel="noreferrer" className="border border-background px-3 py-1 transition-colors hover:bg-background hover:text-foreground">{l}</a>)}</div>
        </div>
      </Reveal>
    </Wrap>
  );
}

export function Portfolio() {
  return <div className="dot-paper min-h-screen bg-background font-display text-foreground"><ScrollProgress /><Navbar /><main><Workbench /><Snapshot /><TechStack /><Journey /><PublicCode /><Notes /><BookCall /><Contact /></main><footer className="flex flex-col gap-3 border-t border-foreground bg-background px-5 py-6 font-display text-[10px] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10"><span>Endegena Abebe © 2026</span><span>Founder · Full-Stack Developer · Digital Manager</span></footer></div>;
}