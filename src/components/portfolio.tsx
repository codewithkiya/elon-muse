import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Code2,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Star,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logo from "@/assets/kiya-logo.jpg";
import portrait from "@/assets/kiya-portrait.png";
import { achievements, experience } from "@/data/experience";
import { profile, socials, stats, technologies } from "@/data/profile";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

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
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Proof", "#proof"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 md:px-8" aria-label="Main navigation">
        <a href="#home" className="flex items-center gap-3" aria-label="Kiya portfolio home">
          <img src={logo} alt="" width="30" height="30" fetchPriority="high" className="h-[30px] w-[30px] rounded object-cover" />
          <span className="font-display text-sm font-bold">EA.</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</a>
          ))}
          <Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Blog</Link>
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-md"><a href={`mailto:${socials.email}`}>Let&apos;s talk <ArrowUpRight /></a></Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button size="icon" variant="ghost" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></Button>
        </div>
      </nav>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex min-h-screen flex-col bg-background p-5 md:hidden">
          <div className="flex items-center justify-between"><span className="font-display text-sm font-bold">EA.</span><Button size="icon" variant="ghost" onClick={() => setOpen(false)} aria-label="Close menu"><X /></Button></div>
          <div className="flex flex-1 flex-col justify-center">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-border py-4 text-4xl font-semibold">{label}</a>)}
            <Link to="/blog" onClick={() => setOpen(false)} className="border-b border-border py-4 text-4xl font-semibold">Blog</Link>
          </div>
          <a href={`mailto:${socials.email}`} className="flex items-center justify-between border-t border-border py-5 text-sm">Start a conversation <ArrowUpRight className="h-4 w-4" /></a>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const certificates = achievements.filter((item) => item.org === "Certified");
  return (
    <section id="home" className="mx-auto max-w-[1180px] px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div className="grid gap-6 lg:grid-cols-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="flex min-h-[430px] flex-col justify-between rounded-lg border border-border bg-card p-7 md:p-10 lg:col-span-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-2 w-2 animate-pulse rounded-full bg-foreground" /> Available for selected projects</div>
          <div>
            <p className="mb-5 text-sm text-muted-foreground">Founder · Full-Stack Developer · Digital Manager</p>
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] sm:text-6xl md:text-7xl">Endegena<br /><span className="text-muted-foreground">Abebe.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">I turn complex ideas into useful digital products—clear interfaces, dependable systems, and software built to grow.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-md"><a href="#work">View work <ArrowRight /></a></Button>
            <Button asChild size="lg" variant="outline" className="rounded-md bg-transparent"><a href="#contact">Contact me</a></Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.1 }} className="relative min-h-[430px] overflow-hidden rounded-lg border border-border bg-card lg:col-span-4">
          <img src={portrait} alt="Endegena Abebe, founder and full-stack developer" className="h-full min-h-[430px] w-full object-cover object-top grayscale" />
          <div className="absolute inset-x-0 bottom-0 border-t border-border bg-background/80 p-5 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4"><span className="text-sm font-medium">Kiya</span><span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Ethiopia</span></div>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Reveal className="group flex min-h-52 flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent">
          <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Featured work</span><ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
          <div><p className="text-2xl font-semibold">{projects[0]?.name}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{projects[0]?.category} built for real operational scale.</p></div>
          {projects[0] && <Link to="/projects/$slug" params={{ slug: projects[0].slug }} className="text-sm font-medium">Open case study →</Link>}
        </Reveal>
        <Reveal className="flex min-h-52 flex-col justify-between rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Proof of momentum</span><Award className="h-4 w-4" /></div>
          <div className="space-y-3">
            {certificates.slice(0, 2).map((item) => <div key={item.title} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"><span className="text-sm leading-5">{item.title.replace("Ethiopian 5 Million Coders — ", "")}</span><span className="text-xs text-muted-foreground">{item.year}</span></div>)}
          </div>
          <a href="#proof" className="text-sm font-medium">View credentials →</a>
        </Reveal>
        <Reveal className="flex min-h-52 flex-col justify-between rounded-lg border border-border bg-card p-6">
          <div className="text-xs text-muted-foreground">At a glance</div>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => <div key={stat.label}><div className="text-2xl font-semibold">{stat.value}{stat.suffix}</div><div className="mt-1 text-xs leading-4 text-muted-foreground">{stat.label}</div></div>)}
          </div>
          <a href={socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium">GitHub profile <ArrowUpRight className="h-4 w-4" /></a>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="mb-10 grid gap-4 md:grid-cols-[180px_1fr]"><p className="text-xs text-muted-foreground">{eyebrow}</p><div><h2 className="max-w-3xl font-display text-3xl font-semibold md:text-5xl">{title}</h2>{copy && <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{copy}</p>}</div></div>;
}

function Work() {
  return (
    <section id="work" className="border-y border-border bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <SectionHeading eyebrow="01 / Selected work" title="Built for people, not portfolios." copy="A focused selection of education, finance, healthcare, accessibility, and business systems." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <Link to="/projects/$slug" params={{ slug: project.slug }} className={cn("group flex min-h-72 flex-col justify-between rounded-lg border border-border bg-background p-6 transition-colors hover:bg-accent", index === 0 && "md:col-span-2")}>
                <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">0{index + 1} · {project.category}</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" /></div>
                <div><h3 className="font-display text-2xl font-semibold md:text-3xl">{project.name}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{project.short}</p></div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
      <SectionHeading eyebrow="02 / About" title="One builder. Many useful systems." />
      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="flex min-h-72 flex-col justify-between rounded-lg border border-border bg-card p-7 lg:col-span-7">
          <p className="font-display text-2xl font-medium leading-snug md:text-4xl">I build from the first sketch to production—balancing product thinking, accessible design, and dependable engineering.</p>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">At Hundaf Digital Solution, I lead product direction and build platforms across education, fintech, healthcare, and digital services.</p>
        </Reveal>
        <Reveal className="rounded-lg border border-border bg-card p-7 lg:col-span-5">
          <p className="text-xs text-muted-foreground">What I build</p>
          <div className="mt-8 divide-y divide-border">{services.slice(0, 4).map((service) => <div key={service.n} className="flex items-center justify-between gap-4 py-4 first:pt-0"><span className="text-sm font-medium">{service.title}</span><span className="text-xs text-muted-foreground">{service.n}</span></div>)}</div>
        </Reveal>
        <Reveal className="rounded-lg border border-border bg-card p-7 lg:col-span-12">
          <div className="flex flex-wrap gap-x-6 gap-y-3">{technologies.map((tech) => <span key={tech} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{tech}</span>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Proof() {
  const awards = achievements.filter((item) => item.org !== "Certified");
  const certificates = achievements.filter((item) => item.org === "Certified");
  return (
    <section id="proof" className="border-y border-border bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <SectionHeading eyebrow="03 / Journey & proof" title="Progress you can verify." />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-lg border border-border bg-background p-7">
            <p className="text-xs text-muted-foreground">Experience</p>
            <div className="mt-7 divide-y divide-border">{experience.map((item) => <div key={`${item.year}-${item.role}`} className="py-5 first:pt-0"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-medium">{item.role}</h3><span className="text-xs text-muted-foreground">{item.year}</span></div><p className="mt-1 text-sm text-muted-foreground">{item.org}</p></div>)}</div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.map((item) => <Reveal key={item.title} className="flex min-h-40 flex-col justify-between rounded-lg border border-border bg-background p-5"><Award className="h-5 w-5 text-muted-foreground" /><p className="mt-6 text-sm font-medium leading-6">{item.title}</p><span className="mt-3 text-xs text-muted-foreground">{item.year}</span></Reveal>)}
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">{awards.map((item) => <Reveal key={item.title} className="rounded-lg border border-border bg-background p-5"><div className="text-xs text-muted-foreground">{item.year}</div><h3 className="mt-5 text-sm font-medium leading-6">{item.title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{item.org}</p></Reveal>)}</div>
      </div>
    </section>
  );
}

function CodeInPublic() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [shown, setShown] = useState(6);
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cached = localStorage.getItem("kiya:repos:v2");
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { at: number; data: Repo[] };
        if (Date.now() - parsed.at < 3_600_000) setRepos(parsed.data);
      } catch { /* Ignore an invalid cache entry. */ }
    }
    fetch("https://api.github.com/users/kiyaab/repos?per_page=100&sort=updated")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub unavailable")))
      .then((data: Repo[]) => {
        const clean = data.filter((repo) => !repo.fork);
        setRepos(clean);
        localStorage.setItem("kiya:repos:v2", JSON.stringify({ at: Date.now(), data: clean }));
      })
      .catch(() => undefined);
  }, []);
  const sorted = useMemo(() => [...repos].sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at)), [repos]);
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setShown((value) => Math.min(value + 4, sorted.length)); }, { rootMargin: "160px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [sorted.length]);

  return (
    <section className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
      <SectionHeading eyebrow="04 / Open source" title="The work continues in public." />
      <div className="divide-y divide-border border-y border-border">
        {sorted.slice(0, shown).map((repo) => <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group grid gap-2 py-5 md:grid-cols-[1fr_1.4fr_120px] md:items-center"><span className="flex items-center gap-2 text-sm font-medium"><Code2 className="h-4 w-4 text-muted-foreground" />{repo.name}</span><span className="line-clamp-1 text-sm text-muted-foreground">{repo.description || "Open-source project by Kiya."}</span><span className="flex items-center justify-between text-xs text-muted-foreground"><span>{repo.language || "Code"}</span><span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{repo.stargazers_count}<ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></span></a>)}
      </div>
      <div ref={sentinel} className="h-1" />
      <Button asChild variant="outline" className="mt-6 rounded-md bg-transparent"><a href={socials.github} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight /></a></Button>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1180px] px-5 py-20 md:px-8 md:py-28">
        <Reveal className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div><p className="text-xs text-muted-foreground">05 / Contact</p><h2 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-none md:text-7xl">Have an idea?<br /><span className="text-muted-foreground">Let&apos;s build it.</span></h2></div>
          <Button asChild size="lg" className="rounded-md"><a href={`mailto:${socials.email}`}>Start a conversation <Mail /></a></Button>
        </Reveal>
        <div className="mt-14 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-7 text-sm text-muted-foreground">
          <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={socials.telegram} target="_blank" rel="noreferrer" className="hover:text-foreground">Telegram</a>
          <a href={`mailto:${socials.email}`} className="hover:text-foreground">{socials.email}</a>
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main><Hero /><Work /><About /><Proof /><CodeInPublic /><Contact /></main>
      <footer className="border-t border-border"><div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8"><span>KIYA.DEV © 2026</span><span>Built with curiosity and code.</span></div></footer>
    </div>
  );
}
