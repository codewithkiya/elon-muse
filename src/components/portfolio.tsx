import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Mail,
  Menu,
  Send,
  Star,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logo from "@/assets/kiya-logo.jpg";
import portrait from "@/assets/kiya-portrait.png";
import { achievements, experience } from "@/data/experience";
import { architectureStack, nav, principles, profile, socials, stats, technologies } from "@/data/profile";
import { featuredProject, projects } from "@/data/projects";
import { services } from "@/data/services";
import { skillGroups } from "@/data/skills";
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

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fade}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({ index, label, title, copy }: { index: string; label: string; title: string; copy?: string }) {
  return (
    <Reveal className="mb-14 grid gap-6 border-t border-border pt-6 md:grid-cols-[1fr_3fr] md:mb-20">
      <div className="font-mono text-xs text-muted-foreground">{index} / {label}</div>
      <div>
        <h2 className="h-section max-w-4xl text-foreground">{title}</h2>
        {copy && <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{copy}</p>}
      </div>
    </Reveal>
  );
}

function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const move = (event: MouseEvent) => {
      dot.current?.style.setProperty("transform", `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const project = target.closest("[data-cursor='view']");
      const interactive = target.closest("a,button,input,textarea,select");
      dot.current?.classList.toggle("h-16", Boolean(project));
      dot.current?.classList.toggle("w-16", Boolean(project));
      dot.current?.classList.toggle("h-8", Boolean(interactive && !project));
      dot.current?.classList.toggle("w-8", Boolean(interactive && !project));
      if (label.current) label.current.textContent = project ? "VIEW" : "";
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);
  return (
    <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-[8px] font-bold text-background mix-blend-difference transition-[width,height] duration-200 lg:flex">
      <span ref={label} />
    </div>
  );
}

function LoadingIntro() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduce ? 250 : 1350);
    return () => window.clearTimeout(timer);
  }, [reduce]);
  if (!visible) return null;
  return (
    <motion.div
      className="fixed inset-0 z-[120] grid place-items-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <img src={logo} alt="Kiya.dev" className="mx-auto h-40 w-40 object-cover sm:h-52 sm:w-52" />
        <div className="mx-auto mt-7 h-px w-36 overflow-hidden bg-border">
          <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1, ease: "easeInOut" }} className="h-full w-full bg-foreground" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled && "border-b border-border bg-background/80 backdrop-blur-xl")}>
        <nav className="mx-auto flex h-16 max-w-[1520px] items-center justify-between px-5 md:px-8" aria-label="Main navigation">
          <a href="#home" className="font-mono text-xs font-semibold tracking-[0.18em]" aria-label="Kiya.dev home">
            KIYA.DEV
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {nav.filter((item) => item.label !== "Services").map((item) => (
              <a key={item.href} href={item.href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{item.label}</a>
            ))}
            <Link to="/blog" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Blog</Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
              <a href={`mailto:${socials.email}`}>Let's Talk <ArrowUpRight /></a>
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></Button>
          </div>
        </nav>
      </header>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[70] flex flex-col bg-background p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs tracking-[0.18em]">KIYA.DEV</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu"><X /></Button>
          </div>
          <div className="flex flex-1 flex-col justify-center">
            {nav.map((item, index) => (
              <motion.a key={item.href} href={item.href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} className="border-b border-border py-4 text-4xl font-semibold">{item.label}</motion.a>
            ))}
            <Link to="/blog" onClick={() => setOpen(false)} className="border-b border-border py-4 text-4xl font-semibold">Blog</Link>
          </div>
          <a href={`mailto:${socials.email}`} className="flex items-center justify-between border-t border-border py-5 text-sm">Start a conversation <ArrowUpRight className="h-4 w-4" /></a>
        </motion.div>
      )}
    </>
  );
}

function Hero() {
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = hero.current;
    if (!node || !window.matchMedia("(pointer:fine)").matches) return;
    const move = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      node.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    node.addEventListener("mousemove", move);
    return () => node.removeEventListener("mousemove", move);
  }, []);
  return (
    <section ref={hero} id="home" className="relative flex min-h-[720px] h-[min(92svh,980px)] items-center overflow-hidden border-b border-border pt-24 [background:radial-gradient(700px_circle_at_var(--mx,72%)_var(--my,38%),var(--glow),transparent_42%)]">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <div className="pointer-events-none absolute left-[8%] top-[18%] h-px w-24 bg-foreground/20" />
      <div className="pointer-events-none absolute right-[12%] top-[22%] h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/50" />
      <div className="relative mx-auto grid w-full max-w-[1520px] items-center gap-10 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[1fr_340px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-muted-foreground sm:text-xs">
            <span>SOFTWARE DEVELOPER</span><span>·</span><span>BUILDER</span><span>·</span><span>CREATOR</span>
          </div>
          <h1 className="max-w-6xl text-[clamp(3.2rem,8vw,8rem)] font-bold leading-[0.92] tracking-[-0.055em]">
            Building digital products <span className="text-muted-foreground">that actually matter.</span>
          </h1>
          <div className="mt-8 flex max-w-4xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              I'm a full-stack developer focused on scalable web applications, intelligent systems, and digital products that solve real-world problems.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full"><a href="#projects">View Projects <ArrowDown /></a></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent"><a href="#contact">Get in Touch <ArrowRight /></a></Button>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="hidden lg:block">
          <div className="relative mx-auto aspect-[4/5] max-w-[320px] overflow-hidden border border-border bg-surface">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,var(--glow),transparent_45%)]" />
            <img src={portrait} alt="Endegena Abebe, full-stack developer" className="relative h-full w-full object-cover object-top brightness-125 grayscale contrast-110" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent p-5 pt-20">
              <span className="font-mono text-[10px] tracking-[0.18em]">ENDGENA ABEBE / KIYA</span>
            </div>
          </div>
        </motion.div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-2">
          <span className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Available for selected projects</span>
          <a href={socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">GitHub <ArrowUpRight className="h-3 w-3" /></a>
          <span className="text-xs text-muted-foreground">{profile.location}</span>
        </div>
      </div>
    </section>
  );
}

function TechMarquee() {
  const row = [...technologies, ...technologies];
  return (
    <div className="overflow-hidden border-b border-border py-5">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap font-mono text-xs text-muted-foreground">
        {row.map((tech, index) => <span key={`${tech}-${index}`} className="flex items-center gap-8"><span>{tech}</span><span className="text-border">✦</span></span>)}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1520px] px-5 py-24 md:px-8 md:py-36">
      <SectionIntro index="01" label="ABOUT" title="A developer who likes building things from zero." />
      <div className="grid gap-14 md:grid-cols-[1fr_2fr]">
        <Reveal>
          <div className="max-w-xs text-sm leading-7 text-muted-foreground">My approach is simple: understand the real problem, choose the right architecture, then obsess over the details people feel.</div>
        </Reveal>
        <Reveal className="space-y-10">
          <p className="max-w-4xl text-2xl font-medium leading-snug tracking-[-0.02em] md:text-4xl">
            I build scalable digital products, modern web applications, mobile experiences, and intelligent software systems that solve real-world problems.
          </p>
          <div className="divide-y divide-border border-y border-border">
            {[
              ["Based in", "Ethiopia 🇪🇹"],
              ["Role", "Full-Stack Developer"],
              ["Focus", "Web · SaaS · AI · Automation"],
              ["Currently", "Building digital products"],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-2"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium">{value}</span></div>
            ))}
          </div>
          <div className="grid grid-cols-3 border-y border-border">
            {stats.map((stat) => <div key={stat.label} className="border-r border-border py-7 last:border-r-0"><div className="text-3xl font-semibold md:text-5xl">{stat.value}{stat.suffix}</div><div className="mt-2 text-xs text-muted-foreground">{stat.label}</div></div>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="border-y border-border bg-surface/35 py-24 md:py-36">
      <div className="mx-auto max-w-[1520px] px-5 md:px-8">
        <SectionIntro index="02" label="SELECTED WORK" title="Products, experiments, and systems built to be used." copy="A focused selection of multi-tenant platforms, AI tools, accessibility products, and operational software." />
        <div className="divide-y divide-border border-y border-border">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                data-cursor="view"
                className="group grid gap-4 py-8 transition-colors hover:bg-surface md:grid-cols-[70px_minmax(0,1fr)_minmax(0,1.2fr)_40px] md:items-center md:px-4"
              >
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{project.name}</h3>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.14em] text-muted-foreground">{project.category.toUpperCase()}</div>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{project.short}</p>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground md:justify-self-end" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCaseStudy() {
  if (!featuredProject) return null;
  return (
    <section id={`case-${featuredProject.slug}`} className="mx-auto max-w-[1520px] px-5 py-24 md:px-8 md:py-36">
      <SectionIntro index="03" label="CASE STUDY" title={featuredProject.name} copy={featuredProject.overview} />
      <div className="grid gap-px bg-border border border-border md:grid-cols-3">
        {[["The problem", featuredProject.problem], ["The solution", featuredProject.solution], ["The result", featuredProject.results]].map(([title, body]) => (
          <Reveal key={title} className="bg-background p-7 md:p-9"><div className="font-mono text-[10px] text-muted-foreground">{title.toUpperCase()}</div><p className="mt-5 text-base leading-7">{body}</p></Reveal>
        ))}
      </div>
      <div className="mt-px grid gap-px bg-border border border-border md:grid-cols-[1.2fr_1fr]">
        <Reveal className="bg-background p-7 md:p-10">
          <div className="font-mono text-[10px] text-muted-foreground">SYSTEM ARCHITECTURE</div>
          <p className="mt-5 max-w-2xl text-lg leading-8">{featuredProject.architecture}</p>
          <div className="mt-9 space-y-2">{architectureStack.map((item, index) => <div key={item.layer} className="grid grid-cols-[28px_1fr] items-center gap-3"><span className="font-mono text-[9px] text-muted-foreground">0{index + 1}</span><div className="flex flex-col gap-1 border border-border bg-surface px-4 py-3 sm:flex-row sm:justify-between"><span className="text-xs font-medium">{item.layer}</span><span className="font-mono text-[10px] text-muted-foreground">{item.detail}</span></div></div>)}</div>
        </Reveal>
        <Reveal className="bg-background p-7 md:p-10">
          <div className="font-mono text-[10px] text-muted-foreground">KEY FEATURES</div>
          <ul className="mt-5 divide-y divide-border border-y border-border">{featuredProject.features.map((feature) => <li key={feature} className="flex items-center gap-3 py-4 text-sm"><Check className="h-3.5 w-3.5" />{feature}</li>)}</ul>
          <div className="mt-10 font-mono text-[10px] text-muted-foreground">ENGINEERING CHALLENGE</div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{featuredProject.challenges}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const shown = services.slice(0, 4);
  return (
    <section id="services" className="border-y border-border bg-surface/35 py-24 md:py-36">
      <div className="mx-auto max-w-[1520px] px-5 md:px-8">
        <SectionIntro index="04" label="WHAT I BUILD" title="Software engineered around the problem — not the trend." />
        <div className="grid border-l border-t border-border md:grid-cols-2">{shown.map((service) => <Reveal key={service.n} className="min-h-64 border-b border-r border-border p-7 transition-colors hover:bg-surface md:p-10"><div className="font-mono text-[10px] text-muted-foreground">{service.n}</div><h3 className="mt-14 text-2xl font-semibold tracking-[-0.03em]">{service.title}</h3><p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{service.desc}</p></Reveal>)}</div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1520px] px-5 py-24 md:px-8 md:py-36">
      <SectionIntro index="05" label="JOURNEY" title="Learning by building. Growing by shipping." />
      <div className="divide-y divide-border border-y border-border">{experience.map((item) => <Reveal key={`${item.year}-${item.role}`} className="grid gap-4 py-8 md:grid-cols-[180px_1fr_1.5fr]"><div className="font-mono text-xs text-muted-foreground">{item.year}</div><div><h3 className="text-lg font-semibold">{item.role}</h3><p className="mt-1 text-sm text-muted-foreground">{item.org}</p></div><div><p className="text-sm leading-7 text-muted-foreground">{item.body}</p><div className="mt-4 flex flex-wrap gap-2">{item.tech.map((tech) => <span key={tech} className="font-mono text-[9px] text-muted-foreground">{tech}</span>)}</div></div></Reveal>)}</div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface/35 py-24 md:py-36">
      <div className="mx-auto max-w-[1520px] px-5 md:px-8">
        <SectionIntro index="06" label="STACK" title="Tools I build with." copy="The stack changes with the problem. The standards do not." />
        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">{skillGroups.map((group) => <Reveal key={group.group} className="border-b border-r border-border p-6"><div className="font-mono text-[10px] text-muted-foreground">{group.group.toUpperCase()}</div><div className="mt-7 space-y-3">{group.items.map((item) => <div key={item} className="flex items-center justify-between text-sm text-muted-foreground transition-colors hover:text-foreground"><span>{item}</span><span className="h-1 w-1 rounded-full bg-current" /></div>)}</div></Reveal>)}</div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="mx-auto max-w-[1520px] px-5 py-24 md:px-8 md:py-36">
      <SectionIntro index="07" label="MILESTONES" title="Proof of momentum." />
      <div className="divide-y divide-border border-y border-border">{achievements.slice(0, 6).map((item, index) => <Reveal key={item.title} className="group grid gap-4 py-7 md:grid-cols-[120px_1fr_1fr] md:items-center"><span className="text-5xl font-semibold text-muted-foreground/40 transition-colors group-hover:text-foreground">{String(index + 1).padStart(2, "0")}</span><h3 className="text-lg font-medium">{item.title}</h3><div className="flex justify-between text-sm text-muted-foreground"><span>{item.org}</span><span className="font-mono text-[10px]">{item.year}</span></div></Reveal>)}</div>
    </section>
  );
}

function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [shown, setShown] = useState(6);
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState<"updated" | "stars">("updated");
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cached = localStorage.getItem("kiya:repos:v2");
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { at: number; data: Repo[] };
        if (Date.now() - parsed.at < 3_600_000) setRepos(parsed.data);
      } catch { /* ignore invalid cache */ }
    }
    fetch("https://api.github.com/users/kiyaab/repos?per_page=100&sort=updated")
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("GitHub unavailable")))
      .then((data: Repo[]) => {
        const clean = data.filter((repo) => !repo.fork);
        setRepos(clean);
        localStorage.setItem("kiya:repos:v2", JSON.stringify({ at: Date.now(), data: clean }));
      })
      .catch(() => undefined);
  }, []);
  const languages = useMemo(() => ["All", ...Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean) as string[]))], [repos]);
  const filtered = useMemo(() => repos.filter((repo) => language === "All" || repo.language === language).sort((a, b) => sort === "stars" ? b.stargazers_count - a.stargazers_count : +new Date(b.updated_at) - +new Date(a.updated_at)), [repos, language, sort]);
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setShown((value) => Math.min(value + 4, filtered.length)); }, { rootMargin: "180px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length]);
  const contribution = Array.from({ length: 112 }, (_, index) => ((index * 17 + 7) % 11) > 6 ? ((index * 13) % 4) + 1 : 0);
  return (
    <section className="border-y border-border bg-surface/35 py-24 md:py-36">
      <div className="mx-auto max-w-[1520px] px-5 md:px-8">
        <SectionIntro index="08" label="OPEN SOURCE & CODE" title="The work continues in public." />
        <Reveal className="border border-border bg-background p-5 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><div className="font-mono text-[10px] text-muted-foreground">GITHUB / KIYAAB</div><div className="mt-2 text-2xl font-semibold">{repos.length || "10"}+ public repositories</div></div><Button asChild variant="outline" className="rounded-full bg-transparent"><a href={socials.github} target="_blank" rel="noreferrer"><Code2 /> View profile <ArrowUpRight /></a></Button></div>
          <div className="mt-8 grid grid-flow-col grid-rows-7 gap-1 overflow-hidden" aria-label="Simulated contribution activity">{contribution.map((level, index) => <span key={index} className={cn("h-2.5 w-2.5 rounded-[2px]", level === 0 ? "bg-muted" : level === 1 ? "bg-foreground/20" : level === 2 ? "bg-foreground/40" : level === 3 ? "bg-foreground/65" : "bg-foreground")} />)}</div>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{languages.slice(0, 6).map((item) => <Button key={item} size="sm" variant={language === item ? "default" : "outline"} className="rounded-full bg-transparent" onClick={() => { setLanguage(item); setShown(6); }}>{item}</Button>)}</div><div className="flex gap-2"><Button size="sm" variant={sort === "updated" ? "default" : "outline"} onClick={() => setSort("updated")}>Updated</Button><Button size="sm" variant={sort === "stars" ? "default" : "outline"} onClick={() => setSort("stars")}>Stars</Button></div></div>
        <div className="mt-6 divide-y divide-border border-y border-border">{filtered.slice(0, shown).map((repo) => <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group grid gap-3 py-5 transition-colors hover:bg-surface md:grid-cols-[1fr_1.5fr_180px] md:items-center md:px-4"><div className="flex items-center gap-3 font-mono text-sm"><Code2 className="h-4 w-4 text-muted-foreground" />{repo.name}</div><p className="line-clamp-1 text-sm text-muted-foreground">{repo.description || "Open-source project by Kiya."}</p><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{repo.language || "Code"}</span><span className="flex items-center gap-4"><span className="flex items-center gap-1"><Star className="h-3 w-3" />{repo.stargazers_count}</span><ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></div></a>)}</div>
        <div ref={sentinel} className="h-2" />
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="mx-auto max-w-[1520px] px-5 py-28 md:px-8 md:py-44"><Reveal><div className="font-mono text-[10px] text-muted-foreground">PERSONAL PHILOSOPHY</div><blockquote className="mt-8 max-w-6xl text-[clamp(2.7rem,7vw,7rem)] font-semibold leading-[0.98] tracking-[-0.055em]">“Don't just write code. <span className="text-muted-foreground">Build something people remember.</span>”</blockquote><div className="mt-14 grid gap-px bg-border border border-border md:grid-cols-4">{principles.map((item) => <div key={item.title} className="bg-background p-6"><h3 className="font-medium">{item.title}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{item.body}</p></div>)}</div></Reveal></section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-surface/35">
      <div className="mx-auto max-w-[1520px] px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <div className="font-mono text-[10px] text-muted-foreground">HAVE AN IDEA?</div>
          <h2 className="mt-8 text-[clamp(3.7rem,10vw,10rem)] font-bold leading-[0.85] tracking-[-0.065em]">Let's build it.</h2>
          <div className="mt-12 grid gap-10 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">Whether you're building a startup, business platform, or ambitious software product, I'm always interested in meaningful problems.</p>
            <div className="flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-full"><a href={`mailto:${socials.email}`}>Start a Conversation <ArrowUpRight /></a></Button><Button asChild size="lg" variant="outline" className="rounded-full bg-transparent"><a href={`mailto:${socials.email}`}><Mail /> Email Me</a></Button></div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
            {[
              ["GitHub", socials.github, Code2], ["LinkedIn", socials.linkedin, ExternalLink], ["Telegram", socials.telegram, Send], ["Email", `mailto:${socials.email}`, Mail],
            ].map(([label, href, Icon]) => {
              const SocialIcon = Icon as typeof Code2;
              return <a key={label as string} href={href as string} target={(href as string).startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center justify-between bg-background p-5 text-sm transition-colors hover:bg-surface"><span className="flex items-center gap-2"><SocialIcon className="h-4 w-4" />{label as string}</span><ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>;
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border"><div className="mx-auto flex max-w-[1520px] flex-col gap-5 px-5 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8"><div>KIYA.DEV © 2026</div><div>Built with curiosity & code.</div><div className="flex items-center gap-5"><a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a><a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a><a href={socials.telegram} target="_blank" rel="noreferrer" className="hover:text-foreground">Telegram</a><a href="#home" className="flex items-center gap-1 hover:text-foreground">Back to top <ArrowUpRight className="h-3 w-3" /></a></div></div></footer>
  );
}

export function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LoadingIntro />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <FeaturedCaseStudy />
        <Services />
        <Experience />
        <Skills />
        <Achievements />
        <GitHubSection />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
