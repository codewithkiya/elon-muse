import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Mail,
  Send,
  Code2,
  Cpu,
  Database,
  Layout,
  Sparkles,
  Terminal,
  Server,
  Wrench,
  GraduationCap,
  Briefcase,
  Scale,
  Accessibility,
  Sprout,
  Hotel,
  School,
  Search,
  CircleDot,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import portrait from "@/assets/portrait.jpg";

/* Brand icons (not in lucide) */
const brandIcon = (path: React.ReactNode) =>
  function BrandIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        {path}
      </svg>
    );
  };
const Github = brandIcon(
  <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.96 3.22 9.16 7.69 10.65.56.1.77-.24.77-.54v-2c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.55 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.31-2.63 5.27-5.14 5.54.4.35.76 1.04.76 2.1v3.11c0 .3.21.65.78.54 4.46-1.49 7.68-5.69 7.68-10.65C23.25 5.48 18.27.5 12 .5Z" />,
);
const Linkedin = brandIcon(
  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.49 1c1.37 0 2.49 1.12 2.49 2.5ZM.24 8h4.5v14H.24V8Zm7.43 0h4.31v1.92h.06c.6-1.13 2.07-2.32 4.26-2.32 4.55 0 5.39 3 5.39 6.9V22h-4.49v-6.6c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.67V8Z" />,
);
const Facebook = brandIcon(
  <path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v6.98A10 10 0 0 0 22 12Z" />,
);
const Youtube = brandIcon(
  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6v-7.2L15.8 12l-6.2 3.6Z" />,
);

/* ----------------------------- data ----------------------------- */

const TITLES = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Django Developer",
  "Software Architect",
  "Tech Entrepreneur",
];

const STATS = [
  { value: 9, suffix: "+", label: "Major Projects" },
  { value: 14, suffix: "+", label: "Certificates" },
  { value: 5, suffix: "+", label: "Years Coding" },
  { value: 1000, suffix: "+", label: "Dev Hours" },
];

const SKILLS: { group: string; icon: typeof Code2; items: string[] }[] = [
  {
    group: "Frontend",
    icon: Layout,
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap 5", "Redux", "Framer Motion", "HTML5", "CSS3", "Responsive Design"],
  },
  {
    group: "Backend",
    icon: Server,
    items: ["Python", "Django", "DRF", "Node.js", "Express.js", "REST APIs", "JWT Auth", "Payments", "Auth Systems"],
  },
  {
    group: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "DB Optimization"],
  },
  {
    group: "Design",
    icon: Sparkles,
    items: ["UI/UX", "Figma", "Adobe XD", "Accessibility", "PWA"],
  },
  {
    group: "DevOps & Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "Linux", "Docker", "Vercel", "Netlify", "Nginx", "VS Code"],
  },
  {
    group: "AI & Emerging",
    icon: Cpu,
    items: ["Prompt Engineering", "AI Integration", "Chatbots", "ML Basics", "Automation"],
  },
];

const PROJECTS = [
  {
    id: "01",
    icon: GraduationCap,
    name: "Temar Lije",
    tag: "E-Learning",
    desc: "A modern learning ecosystem for Ethiopian students with AI assistant, online exams, and progress tracking.",
    stack: ["Django", "PostgreSQL", "Bootstrap 5", "JavaScript"],
    sector: "Education",
  },
  {
    id: "02",
    icon: Briefcase,
    name: "Hundaf Digital Solution",
    tag: "Company Platform",
    desc: "Technology company website and internal management platform with client dashboard and portfolio showcase.",
    stack: ["React", "TypeScript", "Django"],
    sector: "Business",
  },
  {
    id: "03",
    icon: CircleDot,
    name: "Hundaf Digital Equb",
    tag: "Fintech",
    desc: "A modern digital Equb platform — member management, payments, winner selection, and reports.",
    stack: ["Django", "PostgreSQL"],
    sector: "Finance",
  },
  {
    id: "04",
    icon: Scale,
    name: "Fetehe AI",
    tag: "Legal AI",
    desc: "AI-powered justice assistant providing legal guidance, awareness, and document support.",
    stack: ["Python", "Django", "AI APIs"],
    sector: "Legal",
  },
  {
    id: "05",
    icon: Briefcase,
    name: "Giligi Hub",
    tag: "Jobs Platform",
    desc: "Employment and recruitment platform with employer dashboard, resume builder, and tracking.",
    stack: ["React", "TypeScript", "Django"],
    sector: "Careers",
  },
  {
    id: "06",
    icon: Accessibility,
    name: "Braille Translator",
    tag: "Accessibility",
    desc: "Text-to-Braille and Braille-to-Text translation with speech integration and learning resources.",
    stack: ["Python", "JavaScript"],
    sector: "Accessibility",
  },
  {
    id: "07",
    icon: Sprout,
    name: "Kand Agri",
    tag: "AgriTech",
    desc: "Agricultural technology platform with crop information, market prices, and farmer dashboard.",
    stack: ["Django", "PostgreSQL"],
    sector: "Agriculture",
  },
  {
    id: "08",
    icon: Hotel,
    name: "Metaferia Deneke HMS",
    tag: "Hospitality",
    desc: "Hotel management — reservations, guest profiles, billing, occupancy tracking and analytics.",
    stack: ["Django", "PostgreSQL", "Chart.js"],
    sector: "Hospitality",
  },
  {
    id: "09",
    icon: School,
    name: "Student Information System",
    tag: "EdTech",
    desc: "School administration platform — student profiles, attendance, grades, and teacher dashboard.",
    stack: ["Django", "PostgreSQL"],
    sector: "Education",
  },
];

const SERVICES = [
  { n: "01", title: "Full Stack Development", desc: "Custom web applications and enterprise software, end to end." },
  { n: "02", title: "Frontend Engineering", desc: "Modern, responsive, accessible interfaces with measurable performance." },
  { n: "03", title: "Backend Development", desc: "Secure, scalable server-side architecture and APIs." },
  { n: "04", title: "UI / UX Design", desc: "Beautiful, user-centered digital experiences with clear hierarchy." },
  { n: "05", title: "AI Solutions", desc: "AI-powered applications, chat assistants, and intelligent automation." },
  { n: "06", title: "Digital Transformation", desc: "Technology strategy for organizations adopting modern tooling." },
];

const CERTIFICATES = [
  "Full Stack Development",
  "Django Development",
  "Python Programming",
  "Frontend Engineering",
  "TypeScript Development",
  "React Development",
  "UI/UX Design",
  "Git & GitHub",
  "REST APIs",
  "Database Design",
  "Software Engineering",
  "Web Performance",
  "Responsive Design",
  "Linux Essentials",
];

const EXPERIENCE = [
  {
    when: "2024 — Now",
    role: "Founder & CEO",
    org: "Hundaf Digital Solution",
    body: "Leading software development projects, consulting businesses, and shipping digital products that serve thousands of users.",
  },
  {
    when: "2022 — Now",
    role: "Full Stack Developer",
    org: "Independent / Client work",
    body: "Building educational, business, legal, agricultural, hospitality, and accessibility platforms used across Ethiopia.",
  },
  {
    when: "2021 — 2022",
    role: "Frontend Engineer",
    org: "Freelance",
    body: "Crafting responsive, accessible interfaces with React, TypeScript, and modern design systems.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Kiya combines engineering rigor with real product taste. He shipped our platform faster than any team we'd worked with.",
    name: "Selamawit T.",
    role: "Operations Lead, Hospitality Group",
  },
  {
    quote:
      "Rare to find a founder who can also write production code at this level. The Equb system just works.",
    name: "Daniel M.",
    role: "Community Organizer",
  },
  {
    quote:
      "Thoughtful, fast, and obsessed with the details. Our learners feel the difference every day.",
    name: "Hanna G.",
    role: "Director, Temar Lije",
  },
];

const NAV = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

/* ----------------------------- helpers ----------------------------- */

function useTypewriter(words: string[], speed = 80, hold = 1400) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[i % words.length];
    if (!del && text === w) {
      const t = setTimeout(() => setDel(true), hold);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI((p) => p + 1);
      return;
    }
    const t = setTimeout(
      () => setText(del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1)),
      del ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, hold]);

  return text;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="tape px-1.5 py-0.5">{n}</span>
      <span className="h-px flex-1 bg-border" />
      <span>{children}</span>
    </div>
  );
}

/* ----------------------------- main ----------------------------- */

export function Portfolio() {
  const typed = useTypewriter(TITLES);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  const sectors = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.sector)))],
    [],
  );
  const filtered = PROJECTS.filter(
    (p) =>
      (filter === "All" || p.sector === filter) &&
      (query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase()) ||
        p.stack.join(" ").toLowerCase().includes(query.toLowerCase())),
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroP, [0, 1], [0, 80]);
  const heroFade = useTransform(heroP, [0, 1], [1, 0.2]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="inline-block animate-pulse">initializing</span>
              <span className="animate-caret ml-1">_</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-foreground"
      />

      {/* Dot-grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10 dot-grid opacity-70" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-background/60 to-background" />

      <Header />

      <main className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* HERO */}
        <section ref={heroRef} id="top" className="relative min-h-[100svh] pt-28 pb-20">
          <motion.div style={{ y: heroY, opacity: heroFade }} className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>~/endegena-abebe</span>
                <span className="animate-caret">|</span>
              </motion.div>

              <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="block text-muted-foreground italic"
                >
                  Hi, I'm
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="block"
                >
                  Endegena Abebe
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15 }}
                  className="block text-muted-foreground italic"
                >
                  — also known as <span className="not-italic text-foreground underline decoration-1 underline-offset-8">Kiya.</span>
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Founder of <span className="text-foreground">Hundaf Digital Solution</span>. Full Stack
                Developer and Frontend Engineer building software that transforms education, business,
                agriculture, accessibility, hospitality, and digital communities across Ethiopia.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.45 }}
                className="mt-8 flex flex-wrap items-center gap-2 font-mono text-sm"
              >
                <span className="text-muted-foreground">$ role —</span>
                <span className="min-h-[1.5em] text-foreground">{typed}</span>
                <span className="animate-caret -ml-1">_</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90">
                  View my work
                  <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-foreground hover:text-background">
                  <Mail className="h-4 w-4" /> Contact me
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:bg-foreground hover:text-background">
                  <Download className="h-4 w-4" /> Resume
                </a>
              </motion.div>
            </div>

            {/* Portrait card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="lg:col-span-4"
            >
              <div className="relative">
                <div className="absolute -inset-3 -z-10 dot-grid-fine rounded-md opacity-60" />
                <div className="relative overflow-hidden rounded-md border border-border bg-card">
                  <img
                    src={portrait}
                    alt="Portrait of Endegena Abebe"
                    width={896}
                    height={1152}
                    className="aspect-[3/4] w-full object-cover grayscale"
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-background mix-blend-difference">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> available for work
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-background mix-blend-difference">
                    et · addis ababa
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <span>endegena_abebe.jpg</span>
                  <span>2026 ↗</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* marquee */}
          <div className="relative mt-20 overflow-hidden border-y border-border py-4">
            <div className="flex w-max animate-marquee gap-12 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {Array.from({ length: 2 }).flatMap((_, k) =>
                ["React", "TypeScript", "Django", "Python", "Next.js", "PostgreSQL", "Node.js", "Tailwind", "Framer Motion", "Docker", "AI Integration", "Figma"].map(
                  (t) => (
                    <span key={`${k}-${t}`} className="flex items-center gap-12">
                      <span>{t}</span>
                      <span aria-hidden>✦</span>
                    </span>
                  ),
                ),
              )}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-28">
          <SectionLabel n="01">About</SectionLabel>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
                Technology has always been more than a passion for me — it is a tool for solving
                <span className="italic text-muted-foreground"> real-world problems.</span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  I specialize in scalable web applications, educational platforms, AI-powered systems,
                  business tooling, and digital transformation. My mission is to build technology that
                  positively impacts communities across Ethiopia and Africa.
                </p>
                <p>
                  As the founder of <span className="text-foreground">Hundaf Digital Solution</span>, I
                  ship projects that improve education, accessibility, legal awareness, hospitality,
                  agriculture, and digital business operations.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-md border border-border bg-card/50 p-6 backdrop-blur">
                    <div className="font-display text-5xl leading-none tracking-tight">
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="py-28">
          <SectionLabel n="02">Experience</SectionLabel>
          <div className="relative">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-border sm:block" />
            <div className="space-y-10">
              {EXPERIENCE.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.05 }}
                  className="relative grid gap-4 sm:grid-cols-[8rem_1fr] sm:pl-12"
                >
                  <div className="absolute left-2 top-2 hidden h-3 w-3 rounded-full border-2 border-background bg-foreground sm:block" />
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {e.when}
                  </div>
                  <div>
                    <div className="font-display text-2xl tracking-tight">
                      {e.role} <span className="text-muted-foreground italic">— {e.org}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{e.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="py-28">
          <SectionLabel n="03">Selected Work</SectionLabel>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Featured projects.</h2>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-2 backdrop-blur">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, stacks…"
                className="w-56 bg-transparent font-mono text-xs uppercase tracking-widest outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition ${
                  filter === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="group relative flex flex-col gap-6 bg-background p-7 transition hover:bg-card"
                  >
                    <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      <span>{p.id} / {p.sector}</span>
                      <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45 group-hover:text-foreground" />
                    </div>
                    <div className="flex h-32 items-center justify-center rounded border border-border bg-card/50 dot-grid-fine">
                      <Icon className="h-10 w-10 opacity-70 transition group-hover:scale-110" strokeWidth={1.2} />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{p.tag}</div>
                      <h3 className="mt-1 font-display text-2xl tracking-tight">{p.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-28">
          <SectionLabel n="04">Toolbox</SectionLabel>
          <h2 className="mb-12 max-w-3xl font-display text-4xl tracking-tight sm:text-5xl">
            A modern stack tuned for shipping <span className="italic text-muted-foreground">products that matter.</span>
          </h2>
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.group} className="bg-background p-7">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" strokeWidth={1.4} />
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em]">{s.group}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span key={it} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition hover:border-foreground hover:text-foreground">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-28">
          <SectionLabel n="05">Services</SectionLabel>
          <h2 className="mb-12 max-w-3xl font-display text-4xl tracking-tight sm:text-5xl">
            Engagements I take on.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.n} className="group relative bg-background p-7 transition hover:bg-card">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  / {s.n}
                </div>
                <h3 className="mt-3 font-display text-2xl tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATES */}
        <section className="py-28">
          <SectionLabel n="06">Certificates</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATES.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group flex items-center gap-3 rounded-md border border-border bg-card/50 px-4 py-3 backdrop-blur transition hover:border-foreground"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm">{c}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-28">
          <SectionLabel n="07">Voices</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-md border border-border bg-card/50 p-7 backdrop-blur"
              >
                <div className="font-display text-3xl leading-none text-muted-foreground">"</div>
                <blockquote className="mt-2 text-base leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  — {t.name} · {t.role}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* GITHUB */}
        <section className="py-28">
          <SectionLabel n="08">Open Source</SectionLabel>
          <div className="grid gap-4 overflow-hidden rounded-md border border-border md:grid-cols-3">
            <div className="border-b border-border p-7 md:border-b-0 md:border-r">
              <Github className="h-5 w-5" />
              <div className="mt-6 font-display text-5xl tracking-tight"><Counter to={120} suffix="+" /></div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Repositories</div>
            </div>
            <div className="border-b border-border p-7 md:border-b-0 md:border-r">
              <div className="font-display text-5xl tracking-tight"><Counter to={2400} suffix="+" /></div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Contributions (last year)</div>
              <div className="mt-6 grid grid-cols-26 gap-[3px]">
                {Array.from({ length: 26 * 7 }).map((_, i) => {
                  const v = Math.floor((Math.sin(i * 0.6) + 1) * 2 + (i % 5 === 0 ? 2 : 0));
                  const op = [0.08, 0.22, 0.38, 0.55, 0.78, 1][Math.min(5, v)];
                  return <div key={i} style={{ opacity: op }} className="aspect-square w-full rounded-[1px] bg-foreground" />;
                })}
              </div>
            </div>
            <div className="p-7">
              <div className="font-display text-5xl tracking-tight"><Counter to={37} /></div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Stars across projects</div>
              <a href="#" className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground">
                Visit github <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section className="py-28">
          <SectionLabel n="09">Writing</SectionLabel>
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
            {[
              { t: "Designing Django APIs that scale", k: "Backend", d: "Patterns I lean on when shipping fast, secure REST APIs." },
              { t: "Frontend craft: composition over configuration", k: "Frontend", d: "Building a UI system that the whole team can extend without friction." },
              { t: "AI as a product layer, not a feature", k: "AI", d: "When and how to wire LLMs into real workflows that ship value." },
              { t: "Lessons from founding Hundaf", k: "Founder", d: "What I learned shipping nine products to thousands of users." },
            ].map((p) => (
              <a key={p.t} href="#" className="group flex flex-col gap-5 bg-background p-7 transition hover:bg-card">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <span>{p.k}</span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45 group-hover:text-foreground" />
                </div>
                <h3 className="font-display text-2xl leading-tight tracking-tight">{p.t}</h3>
                <p className="text-sm text-muted-foreground">{p.d}</p>
              </a>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* ----------------------------- header ----------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span className="grid h-7 w-7 place-items-center rounded-sm border border-foreground font-display text-base leading-none">
            K
          </span>
          <span className="hidden sm:inline">endegena<span className="text-muted-foreground">.dev</span></span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className="group flex items-center gap-2 rounded-full px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
            >
              <span className="text-foreground/40">0{i + 1}</span>
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90 sm:inline-flex"
          >
            Let's talk <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

/* ----------------------------- contact ----------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-28">
      <SectionLabel n="10">Contact</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            Let's build something <span className="italic text-muted-foreground">that matters.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Open to founder collaborations, product engineering roles, and ambitious client projects.
            Reach out — I reply within a day.
          </p>
          <div className="mt-10 space-y-3 font-mono text-sm">
            <a href="mailto:hello@endegena.dev" className="group flex items-center justify-between border-b border-border py-3 transition hover:text-foreground">
              <span className="text-muted-foreground">email</span>
              <span className="flex items-center gap-2">hello@endegena.dev <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></span>
            </a>
            <a href="#" className="group flex items-center justify-between border-b border-border py-3 transition hover:text-foreground">
              <span className="text-muted-foreground">location</span>
              <span>Addis Ababa, Ethiopia</span>
            </a>
            <a href="#" className="group flex items-center justify-between border-b border-border py-3 transition hover:text-foreground">
              <span className="text-muted-foreground">availability</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open · Q1 2026</span>
            </a>
          </div>
          <div className="mt-8 flex items-center gap-2">
            {[
              { Icon: Github, label: "GitHub" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Send, label: "Telegram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Youtube, label: "YouTube" },
              { Icon: Mail, label: "Email" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-foreground hover:text-background"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 3500);
          }}
          className="lg:col-span-7"
        >
          <div className="rounded-md border border-border bg-card/40 p-6 backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" /> compose-message.tsx
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your full name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" placeholder="What's this about?" />
            </div>
            <div className="mt-5">
              <label className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about the project, timeline, and goals…"
                className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground/60 focus:border-foreground"
              />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                encrypted · private
              </span>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                {sent ? "Sent — thank you" : "Send message"}
                <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        required
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground/60 focus:border-foreground"
      />
    </div>
  );
}

/* ----------------------------- footer ----------------------------- */

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-tight">
              Endegena<br />
              <span className="italic text-muted-foreground">Abebe — Kiya.</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:grid-cols-3">
            <FooterCol title="Sitemap" links={["About", "Work", "Skills", "Services", "Contact"]} />
            <FooterCol title="Elsewhere" links={["GitHub", "LinkedIn", "Telegram", "YouTube", "Facebook"]} />
            <FooterCol title="Office" links={["Addis Ababa", "Ethiopia", "hello@endegena.dev", "Hundaf Digital"]} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:items-center">
          <span>© 2026 Endegena Abebe — Hundaf Digital Solution. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Building from Addis Ababa
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="story-link inline-block">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}