import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Code2, Mail, MapPin, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logo from "@/assets/kiya-logo.jpg";
import portrait from "@/assets/kiya-portrait.png";
import { achievements, experience } from "@/data/experience";
import { posts } from "@/data/posts";
import { profile, socials, stats } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

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

function AnimatedWords({ children }: { children: string }) {
  const reduce = useReducedMotion();
  return (
    <span aria-label={children} className="block overflow-hidden">
      <span aria-hidden="true" className="flex flex-wrap gap-x-[0.22em]">
        {children.split(" ").map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            initial={reduce ? false : { y: "115%", rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.85, delay: 0.14 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

const navItems = [
  ["Work", "#work"],
  ["Expertise", "#expertise"],
  ["Journey", "#journey"],
  ["Notes", "#notes"],
  ["Contact", "#contact"],
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
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

function Hero() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const portraitX = useSpring(useTransform(pointerX, [-1, 1], [-9, 9]), { stiffness: 90, damping: 24 });
  const portraitY = useSpring(useTransform(pointerY, [-1, 1], [-7, 7]), { stiffness: 90, damping: 24 });
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };
  return (
    <section id="home" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} className="relative grid min-h-[78svh] overflow-hidden border-b border-border lg:grid-cols-[1.35fr_0.65fr]">
      <div aria-hidden="true" className="motion-grid absolute inset-0 pointer-events-none" />
      <div className="relative z-10 flex flex-col justify-between px-5 py-10 md:px-10 md:py-14">
        <motion.div initial={reduce ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="flex flex-wrap items-center justify-between gap-4 font-display text-[11px] font-semibold uppercase text-muted-foreground">
          <span>{profile.role}</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-foreground" /> Available worldwide</span>
        </motion.div>
        <div className="mt-20">
          <h1 className="font-display text-[clamp(3.2rem,10vw,9.5rem)] font-bold uppercase leading-[0.84]"><AnimatedWords>Endegena</AnimatedWords><AnimatedWords>Abebe</AnimatedWords></h1>
          <motion.div initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62, duration: 0.7 }} className="mt-10 flex flex-col gap-8 border-t border-border pt-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-lg leading-8 md:text-2xl md:leading-9">I build performant, accessible, and AI-powered digital systems—from interface to infrastructure.</p>
            <a href="#work" className="group flex shrink-0 items-center gap-3 font-display text-xs font-semibold uppercase">Explore work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
          </motion.div>
        </div>
      </div>
      <motion.div initial={reduce ? false : { opacity: 0, clipPath: "inset(100% 0 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }} transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative min-h-[420px] overflow-hidden border-t border-border bg-surface lg:border-l lg:border-t-0">
        <motion.img src={portrait} alt="Endegena Abebe, founder and full-stack developer" className="absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] object-cover object-top grayscale" style={reduce ? undefined : { x: portraitX, y: portraitY }} fetchPriority="high" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-background/90 p-5 backdrop-blur-md">
          <span className="font-display text-xs uppercase">Founder / Builder</span><span className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Ethiopia</span>
        </div>
      </motion.div>
    </section>
  );
}

function Snapshot() {
  return (
    <section className="grid border-b border-border sm:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.09 }} whileHover={{ backgroundColor: "var(--color-accent)" }} className="flex items-end justify-between border-b border-border p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:p-8">
          <motion.span initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 + index * 0.09, type: "spring" }} className="font-display text-4xl font-bold md:text-6xl">{stat.value}{stat.suffix}</motion.span><span className="max-w-24 text-right text-xs uppercase text-muted-foreground">{index === 2 ? "Core technologies" : stat.label}</span>
        </motion.div>
      ))}
    </section>
  );
}

function Work() {
  return (
    <section id="work">
      <div className="flex items-end justify-between border-b border-border px-5 py-10 md:px-10 md:py-14"><div><p className="font-display text-xs uppercase text-muted-foreground">01 / Selected work</p><h2 className="mt-4 font-display text-4xl font-bold uppercase md:text-6xl">Built systems</h2></div><span className="hidden text-xs uppercase text-muted-foreground md:block">Case studies / {String(projects.length).padStart(2, "0")}</span></div>
      {projects.map((project, index) => (
        <Reveal key={project.slug}>
          <Link to="/projects/$slug" params={{ slug: project.slug }} className="project-row group relative grid overflow-hidden border-b border-border px-5 py-10 transition-colors hover:bg-foreground hover:text-background md:grid-cols-[90px_1fr_400px_30px] md:items-center md:px-10 md:py-14">
            <span className="font-display text-sm text-muted-foreground group-hover:text-background/60">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 font-display text-3xl font-bold uppercase md:mt-0 md:text-5xl">{project.name}</h3>
            <div className="mt-6 md:mt-0"><p className="text-xs uppercase opacity-60">{project.category}</p><p className="mt-2 max-w-sm text-sm leading-6 opacity-80">{project.short}</p></div>
            <ArrowUpRight className="mt-6 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:mt-0" />
          </Link>
        </Reveal>
      ))}
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="border-b border-border bg-surface">
      <div className="border-b border-border px-5 py-10 md:px-10 md:py-14"><p className="font-display text-xs uppercase text-muted-foreground">02 / Expertise index</p><h2 className="mt-4 max-w-5xl font-display text-4xl font-bold uppercase md:text-6xl">Full-stack depth.<br />Product-level thinking.</h2></div>
      <div className="grid md:grid-cols-2 xl:grid-cols-5">
        {skillGroups.map((group, index) => (
          <Reveal key={group.group} className="border-b border-border p-6 md:border-r md:p-8 xl:border-b-0 xl:last:border-r-0">
            <div className="flex items-baseline justify-between gap-4"><h3 className="font-display text-sm font-bold uppercase">{group.group}</h3><span className="font-display text-xs text-muted-foreground">0{index + 1}</span></div>
            <ul className="mt-10 space-y-0">
              {group.items.map((skill) => <li key={skill} className="border-t border-border py-3 text-sm">{skill}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  const certificates = achievements.filter((item) => item.org === "Certified");
  const awards = achievements.filter((item) => item.org !== "Certified");
  return (
    <section id="journey" className="border-b border-border">
      <div className="grid lg:grid-cols-2">
        <div className="border-b border-border p-5 md:p-10 lg:border-b-0 lg:border-r">
          <p className="font-display text-xs uppercase text-muted-foreground">03 / Experience</p>
          <div className="mt-10 divide-y divide-border">
            {experience.map((item) => <Reveal key={`${item.year}-${item.org}`} className="grid gap-3 py-7 md:grid-cols-[120px_1fr]"><span className="font-display text-xs text-muted-foreground">{item.year}</span><div><h3 className="font-display text-lg font-bold uppercase">{item.role}</h3><p className="mt-1 text-sm font-medium">{item.org}</p><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{item.body}</p></div></Reveal>)}
          </div>
        </div>
        <div>
          <div className="border-b border-border p-5 md:p-10"><p className="font-display text-xs uppercase text-muted-foreground">04 / Proof of momentum</p><h2 className="mt-4 font-display text-3xl font-bold uppercase md:text-5xl">Certified learning.<br />Recognized work.</h2></div>
          <div className="grid sm:grid-cols-2">
            {certificates.map((item, index) => <motion.div key={item.title} initial={{ opacity: 0, rotateX: 8, y: 20 }} whileInView={{ opacity: 1, rotateX: 0, y: 0 }} whileHover={{ y: -4 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="min-h-48 border-b border-border p-6 odd:sm:border-r"><span className="font-display text-xs text-muted-foreground">{item.year}</span><p className="mt-12 text-sm font-semibold leading-6">{item.title.replace("Ethiopian 5 Million Coders — ", "")}</p><p className="mt-2 text-xs uppercase text-muted-foreground">Ethiopian 5 Million Coders</p></motion.div>)}
          </div>
          <div className="p-5 md:p-10"><p className="mb-5 font-display text-xs uppercase text-muted-foreground">Awards</p>{awards.map((item) => <div key={item.title} className="grid grid-cols-[70px_1fr] border-t border-border py-4 text-sm"><span className="text-muted-foreground">{item.year}</span><span>{item.title}</span></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function PublicCode() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [shown, setShown] = useState(5);
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cached = localStorage.getItem("kiya:repos:v2");
    if (cached) {
      try { const parsed = JSON.parse(cached) as { at: number; data: Repo[] }; if (Date.now() - parsed.at < 3_600_000) setRepos(parsed.data); } catch { /* Ignore invalid cache. */ }
    }
    fetch("https://api.github.com/users/kiyaab/repos?per_page=100&sort=updated").then((response) => response.ok ? response.json() : Promise.reject(new Error("GitHub unavailable"))).then((data: Repo[]) => { const clean = data.filter((repo) => !repo.fork); setRepos(clean); localStorage.setItem("kiya:repos:v2", JSON.stringify({ at: Date.now(), data: clean })); }).catch(() => undefined);
  }, []);
  const sorted = useMemo(() => [...repos].sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at)), [repos]);
  useEffect(() => { const node = sentinel.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setShown((value) => Math.min(value + 5, sorted.length)); }, { rootMargin: "140px" }); observer.observe(node); return () => observer.disconnect(); }, [sorted.length]);
  return (
    <section className="grid border-b border-border lg:grid-cols-2">
      <div className="border-b border-border p-5 md:p-10 lg:border-b-0 lg:border-r"><p className="font-display text-xs uppercase text-muted-foreground">05 / Code in public</p><h2 className="mt-4 font-display text-4xl font-bold uppercase md:text-6xl">Latest<br />repositories.</h2><a href={socials.github} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 text-sm font-semibold">GitHub profile <Code2 className="h-4 w-4" /></a></div>
      <div className="divide-y divide-border">{sorted.slice(0, shown).map((repo) => <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group grid gap-3 p-5 transition-colors hover:bg-accent md:grid-cols-[1fr_auto] md:p-7"><div><h3 className="font-display text-sm font-bold uppercase">{repo.name}</h3><p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{repo.description || "Open-source project by Kiya."}</p></div><span className="text-xs text-muted-foreground">{repo.language || "Code"} · ★ {repo.stargazers_count}</span></a>)}<div ref={sentinel} className="h-1" /></div>
    </section>
  );
}

function Notes() {
  return (
    <section id="notes" className="border-b border-border bg-surface">
      <div className="border-b border-border px-5 py-10 md:px-10"><p className="font-display text-xs uppercase text-muted-foreground">06 / Technical notes</p><h2 className="mt-4 font-display text-4xl font-bold uppercase md:text-6xl">Writing from the work.</h2></div>
      <div className="grid md:grid-cols-2 xl:grid-cols-5">{posts.map((post, index) => <motion.div key={post.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -5 }} className="border-b border-border md:border-r xl:border-b-0"><Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full p-6 transition-colors hover:bg-foreground hover:text-background"><span className="font-display text-xs opacity-50">{post.date}</span><h3 className="mt-10 text-xl font-semibold leading-7 group-hover:underline">{post.title}</h3><p className="mt-5 text-sm opacity-60">{post.category} · {post.readingTime}</p></Link></motion.div>)}</div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="dot-field px-5 py-20 md:px-10 md:py-28">
      <Reveal><p className="font-display text-xs uppercase text-muted-foreground">07 / Contact</p><h2 className="mt-6 max-w-6xl font-display text-[clamp(3rem,9vw,8.5rem)] font-bold uppercase leading-[0.88]">Have a problem<br />worth solving?</h2><div className="mt-12 flex flex-col gap-8 border-t border-border pt-7 md:flex-row md:items-center md:justify-between"><a href={`mailto:${socials.email}`} className="group flex items-center gap-3 text-lg font-semibold">Start a conversation <Mail className="h-5 w-5 transition-transform group-hover:translate-x-1" /></a><div className="flex flex-wrap gap-6 text-sm"><a href={socials.github} target="_blank" rel="noreferrer">GitHub</a><a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={socials.telegram} target="_blank" rel="noreferrer">Telegram</a></div></div></Reveal>
    </section>
  );
}

export function Portfolio() {
  return <div className="min-h-screen bg-background text-foreground"><ScrollProgress /><Navbar /><main><Hero /><Snapshot /><Work /><Expertise /><Journey /><PublicCode /><Notes /><Contact /></main><footer className="flex flex-col gap-3 border-t border-border px-5 py-6 font-display text-[10px] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10"><span>Endegena Abebe © 2026</span><span>Founder · Full-Stack Developer · Digital Manager</span></footer></div>;
}