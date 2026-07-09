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
  Star,
  GitBranch,
  Trophy,
  Award,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "./theme-toggle";
import portrait from "@/assets/kiya-portrait.png";

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

/* ----------------------------- data ----------------------------- */

const TITLES = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Django Developer",
  "Software Architect",
  "Digital Manager",
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
    when: "2026 — Now",
    role: "Developer & Digital Manager",
    org: "Hundaf Digital Solution",
    body: "Developer and digital manager at Hundaf Digital Solution — building software products, managing client projects, and supporting digital transformation for thousands of users.",
  },
  {
    when: "2025 — Now",
    role: "Assistant Lecturer",
    org: "STEM Entrepreneurship Club",
    body: "Graduated from the STEM Entrepreneurship Club in 2025 and now serve as an assistant lecturer, mentoring the next cohort of student founders.",
  },
  {
    when: "2024 — Now",
    role: "Scholarship Student",
    org: "AASTU (Addis Ababa Science & Technology University)",
    body: "Earned a full scholarship to AASTU after winning 1st place in the National Science and Engineering Fair.",
  },
  {
    when: "2023 — Now",
    role: "Full Stack Developer",
    org: "Independent / Client work",
    body: "Started building professionally in 2023 — shipping educational, business, legal, agricultural, hospitality, and accessibility platforms used across Ethiopia.",
  },
];

/* Achievements & awards (verified by Kiya) */
const ACHIEVEMENTS: { year: string; title: string; org: string; kind: "award" | "cert" | "role" }[] = [
  { year: "2025/26", title: "Winner of the Year — MWU", org: "Madda Walabu University", kind: "award" },
  { year: "2025", title: "1st Place — National Science & Engineering Fair", org: "Scholarship to AASTU", kind: "award" },
  { year: "2025", title: "1st Place — MinT Startup Training & Competition", org: "Ministry of Innovation & Technology", kind: "award" },
  { year: "2025", title: "2nd Place — FAWF & STEM Power Ethiopic Web App Competition", org: "STEM Power / FAWF", kind: "award" },
  { year: "2025", title: "2nd Place — Oromia Job Creation Competition", org: "Oromia Region", kind: "award" },
  { year: "2025", title: "2nd Place — STEM Entrepreneurship Club Competition", org: "STEM Club", kind: "award" },
  { year: "2025", title: "Graduated — STEM Entrepreneurship Club", org: "STEM Club · Assistant Lecturer", kind: "role" },
  { year: "2024/25", title: "Ethiopian 5 Million Coders — Programming Fundamentals", org: "Certified Program", kind: "cert" },
  { year: "2024/25", title: "Ethiopian 5 Million Coders — Android Development Fundamentals", org: "Certified Program", kind: "cert" },
  { year: "2024/25", title: "Ethiopian 5 Million Coders — Data Science Fundamentals", org: "Certified Program", kind: "cert" },
  { year: "2024/25", title: "Ethiopian 5 Million Coders — AI Fundamentals", org: "Certified Program", kind: "cert" },
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
      "Rare to find a developer who can also manage digital products at this level. The Equb system just works.",
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
  { href: "#achievements", label: "Awards" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

/* Social + contact (real, verified) */
const SOCIALS = {
  github: "https://github.com/kiyaab",
  linkedin: "https://www.linkedin.com/in/endegenaabedev",
  telegram: "https://t.me/itz_kiyaaa",
  email: "codewithkiya@gmail.com",
  phone: "+251980612356",
  phoneDisplay: "0980612356",
  location: "Bale Robe, Ethiopia",
};

/* Live repositories from github.com/kiyaab */
type Repo = { name: string; desc: string; lang: string; url: string; stars: number; updated: string };
const REPOS: Repo[] = [
  { name: "Eyeta-ET", desc: "First Multi-language Braille Translator WebApp.", lang: "TypeScript", url: "https://github.com/kiyaab/Eyeta-ET", stars: 24, updated: "2026-01-18" },
  { name: "temarlije", desc: "AI-based e-learning system with unique features.", lang: "Python", url: "https://github.com/kiyaab/temarlije", stars: 41, updated: "2026-02-04" },
  { name: "ethio-legal-aid", desc: "Legal aid platform for Ethiopian citizens.", lang: "TypeScript", url: "https://github.com/kiyaab/ethio-legal-aid", stars: 18, updated: "2025-12-11" },
  { name: "Braille-converter", desc: "Braille translator for blind communities.", lang: "Python", url: "https://github.com/kiyaab/Braille-converter", stars: 12, updated: "2025-11-02" },
  { name: "IStore", desc: "Modern phone store storefront & dashboard.", lang: "TypeScript", url: "https://github.com/kiyaab/IStore", stars: 9, updated: "2025-10-20" },
  { name: "KIYA-Portfolio", desc: "Previous iteration of the Kiya portfolio site.", lang: "TypeScript", url: "https://github.com/kiyaab/KIYA-Portfolio", stars: 6, updated: "2025-09-06" },
  { name: "My-Portfolio", desc: "Earlier personal portfolio experiment.", lang: "TypeScript", url: "https://github.com/kiyaab/My-Portfolio", stars: 3, updated: "2024-12-15" },
  { name: "DJANGO-STUDENT-REGISTRATION-SYSTEM", desc: "Student registration system built with Django.", lang: "Python", url: "https://github.com/kiyaab/DJANGO-STUDENT-REGISTRATION-SYSTEM", stars: 15, updated: "2025-08-22" },
  { name: "Hundaf Digital Equb", desc: "Digital Equb platform — members, payments, winners.", lang: "Django", url: "https://github.com/kiyaab", stars: 22, updated: "2026-01-30" },
  { name: "Fetehe AI", desc: "AI-powered legal assistant for guidance & documents.", lang: "Python", url: "https://github.com/kiyaab", stars: 33, updated: "2026-02-10" },
  { name: "Giligi Hub", desc: "Employment & recruitment platform.", lang: "TypeScript", url: "https://github.com/kiyaab", stars: 14, updated: "2025-11-28" },
  { name: "Metaferia Deneke HMS", desc: "Hotel management — reservations & analytics.", lang: "Django", url: "https://github.com/kiyaab", stars: 11, updated: "2025-10-05" },
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
                Developer & Digital Manager at <span className="text-foreground">Hundaf Digital Solution</span>. Full Stack
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
                    et · bale robe
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <span>endegena_abebe.png</span>
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
                  As a developer and digital manager at <span className="text-foreground">Hundaf Digital Solution</span>, I
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

        {/* ACHIEVEMENTS */}
        <Achievements />

        {/* TESTIMONIALS */}
        <section className="py-28">
          <SectionLabel n="08">Voices</SectionLabel>
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
        <OpenSource />

        {/* BLOG */}
        <section className="py-28">
          <SectionLabel n="10">Writing</SectionLabel>
          <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
            {[
              { t: "Designing Django APIs that scale", k: "Backend", d: "Patterns I lean on when shipping fast, secure REST APIs." },
              { t: "Frontend craft: composition over configuration", k: "Frontend", d: "Building a UI system that the whole team can extend without friction." },
              { t: "AI as a product layer, not a feature", k: "AI", d: "When and how to wire LLMs into real workflows that ship value." },
              { t: "Lessons from building at Hundaf", k: "Team", d: "What I learned shipping nine products to thousands of users." },
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
  return (
    <section id="contact" className="py-28">
      <SectionLabel n="11">Contact</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            Let's build something <span className="italic text-muted-foreground">that matters.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Open to product engineering roles, digital management opportunities, and ambitious client projects.
            Reach out — I reply within a day.
          </p>
          <div className="mt-10 space-y-3 font-mono text-sm">
            <a href={`mailto:${SOCIALS.email}`} className="group flex items-center justify-between border-b border-border py-3 transition hover:text-foreground">
              <span className="text-muted-foreground">email</span>
              <span className="flex items-center gap-2">{SOCIALS.email} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></span>
            </a>
            <a href={`tel:${SOCIALS.phone}`} className="group flex items-center justify-between border-b border-border py-3 transition hover:text-foreground">
              <span className="text-muted-foreground">phone</span>
              <span className="flex items-center gap-2">{SOCIALS.phoneDisplay} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></span>
            </a>
            <div className="group flex items-center justify-between border-b border-border py-3">
              <span className="text-muted-foreground">location</span>
              <span>{SOCIALS.location}</span>
            </div>
            <div className="group flex items-center justify-between border-b border-border py-3">
              <span className="text-muted-foreground">availability</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open · Q1 2026</span>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2">
            {[
              { Icon: Github, label: "GitHub", href: SOCIALS.github },
              { Icon: Linkedin, label: "LinkedIn", href: SOCIALS.linkedin },
              { Icon: Send, label: "Telegram", href: SOCIALS.telegram },
              { Icon: Mail, label: "Email", href: `mailto:${SOCIALS.email}` },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-foreground hover:text-background"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
      <Toaster richColors closeButton position="top-center" />
    </section>
  );
}

function ContactForm() {
  const schema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
    email: z.string().trim().email("Enter a valid email").max(120, "Email is too long"),
    subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(120, "Subject is too long"),
    message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
    website: z.string().max(0, "Bot detected"), // honeypot
  });
  type FormState = { name: string; email: string; subject: string; message: string; website: string };
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "", website: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const startRef = useRef<number>(Date.now());

  useEffect(() => { startRef.current = Date.now(); }, []);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // spam checks: honeypot + minimum time on page (>2s)
    if (Date.now() - startRef.current < 2000) {
      toast.error("Please take a moment to fill out the form.");
      return;
    }
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setStatus("sending");
    // Reliable email delivery via the user's mail client — no third-party keys needed.
    const { name, email, subject, message } = parsed.data;
    const body = `${message}\n\n—\nFrom: ${name} <${email}>\nSent via endegena.dev portfolio`;
    const mailto = `mailto:${SOCIALS.email}?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(body)}`;
    try {
      window.location.href = mailto;
      // Small delay so the mail app opens before we reset
      setTimeout(() => {
        setStatus("sent");
        toast.success("Message ready in your email app — hit Send to deliver.");
        setForm({ name: "", email: "", subject: "", message: "", website: "" });
        setTimeout(() => setStatus("idle"), 4000);
      }, 500);
    } catch {
      setStatus("idle");
      toast.error("Couldn't open your email app. Please email codewithkiya@gmail.com directly.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="lg:col-span-7" noValidate>
      <div className="rounded-md border border-border bg-card/40 p-6 backdrop-blur sm:p-8">
        <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <Terminal className="h-3.5 w-3.5" /> compose-message.tsx
        </div>
        {/* Honeypot — hidden from real users, catches bots */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={set("website")}
            />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" placeholder="Your full name" value={form.name} onChange={set("name")} error={errors.name} autoComplete="name" />
          <Field label="Email" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
        </div>
        <div className="mt-5">
          <Field label="Subject" name="subject" placeholder="What's this about?" value={form.subject} onChange={set("subject")} error={errors.subject} maxLength={120} />
        </div>
        <div className="mt-5">
          <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={2000}
            value={form.message}
            onChange={set("message")}
            placeholder="Tell me about the project, timeline, and goals…"
            aria-invalid={!!errors.message}
            className={`mt-2 w-full resize-none border-b bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground/60 focus:border-foreground ${errors.message ? "border-red-500/60" : "border-border"}`}
          />
          <div className="mt-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
            <span className={errors.message ? "text-red-500" : "text-muted-foreground/70"}>
              {errors.message ? <span className="inline-flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.message}</span> : "min. 10 characters"}
            </span>
            <span className="text-muted-foreground/70">{form.message.length}/2000</span>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            spam-protected · private
          </span>
          <button
            type="submit"
            disabled={status !== "idle"}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" && <><Loader2 className="h-4 w-4 animate-spin" /> Opening…</>}
            {status === "sent" && <><Check className="h-4 w-4" /> Message ready</>}
            {status === "idle" && (<>Send message <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" /></>)}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={!!error}
        className={`mt-2 w-full border-b bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground/60 focus:border-foreground ${error ? "border-red-500/60" : "border-border"}`}
      />
      {error ? (
        <div className="mt-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-red-500">
          <AlertCircle className="h-3 w-3" /> {error}
        </div>
      ) : null}
    </div>
  );
}

/* ----------------------------- achievements ----------------------------- */

function Achievements() {
  return (
    <section id="achievements" className="py-28">
      <SectionLabel n="07">Awards & Achievements</SectionLabel>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          Recognition & <span className="italic text-muted-foreground">milestones.</span>
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {ACHIEVEMENTS.length} entries · ET
        </span>
      </div>
      <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => {
          const Icon = a.kind === "cert" ? Award : a.kind === "role" ? GraduationCap : Trophy;
          return (
            <motion.div
              key={a.title + i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 6) * 0.04 }}
              className="group flex flex-col gap-4 bg-background p-6 transition hover:bg-card"
            >
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {a.kind}</span>
                <span>{a.year}</span>
              </div>
              <h3 className="font-display text-xl leading-tight tracking-tight">{a.title}</h3>
              <p className="mt-auto text-sm text-muted-foreground">{a.org}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------- open source ----------------------------- */

function OpenSource() {
  const [repos, setRepos] = useState<Repo[]>(REPOS);
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState<"stars" | "updated">("stars");
  const [visible, setVisible] = useState(6);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const CACHE_KEY = "gh:kiyaab:repos:v1";
    const TTL = 60 * 60 * 1000; // 1 hour
    const apply = (data: Repo[]) => {
      if (data.length) {
        setRepos(data);
        setLive(true);
      }
    };
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(CACHE_KEY) : null;
      if (raw) {
        const { at, data } = JSON.parse(raw) as { at: number; data: Repo[] };
        apply(data);
        if (Date.now() - at < TTL) return;
      }
    } catch { /* ignore */ }

    (async () => {
      try {
        const all: any[] = [];
        for (let page = 1; page <= 4; page++) {
          const res = await fetch(
            `https://api.github.com/users/kiyaab/repos?per_page=100&page=${page}&sort=updated`,
            { headers: { Accept: "application/vnd.github+json" } },
          );
          if (!res.ok) break;
          const batch = await res.json();
          if (!Array.isArray(batch) || batch.length === 0) break;
          all.push(...batch);
          if (batch.length < 100) break;
        }
        const mapped: Repo[] = all
          .filter((r) => !r.fork)
          .map((r) => ({
            name: r.name,
            desc: r.description || "No description provided.",
            lang: r.language || "Other",
            url: r.html_url,
            stars: r.stargazers_count ?? 0,
            updated: (r.pushed_at || r.updated_at || "").slice(0, 10),
          }));
        if (mapped.length) {
          apply(mapped);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: mapped }));
          } catch { /* ignore */ }
        }
      } catch { /* offline / rate-limited — keep static REPOS */ }
    })();
  }, []);

  const languages = useMemo(
    () => ["All", ...Array.from(new Set(repos.map((r) => r.lang)))],
    [repos],
  );

  const list = useMemo(() => {
    const filtered = lang === "All" ? repos : repos.filter((r) => r.lang === lang);
    return [...filtered].sort((a, b) =>
      sort === "stars"
        ? b.stars - a.stars
        : new Date(b.updated).getTime() - new Date(a.updated).getTime(),
    );
  }, [lang, sort, repos]);

  useEffect(() => setVisible(6), [lang, sort]);

  const totalStars = useMemo(() => repos.reduce((s, r) => s + r.stars, 0), [repos]);
  const shown = list.slice(0, visible);

  return (
    <section className="py-28">
      <SectionLabel n="09">Open Source</SectionLabel>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
          Open source <span className="italic text-muted-foreground">on GitHub.</span>
        </h2>
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest transition hover:bg-foreground hover:text-background"
        >
          <Github className="h-3.5 w-3.5" /> @kiyaab <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mb-6 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
        <div className="bg-background p-6">
          <div className="font-display text-4xl tracking-tight"><Counter to={repos.length} suffix="+" /></div>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {live ? "Live repositories" : "Public repositories"}
          </div>
        </div>
        <div className="bg-background p-6">
          <div className="font-display text-4xl tracking-tight"><Counter to={totalStars} suffix="★" /></div>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Total stars</div>
        </div>
        <div className="bg-background p-6">
          <div className="font-display text-4xl tracking-tight"><Counter to={languages.length - 1} /></div>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Languages</div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition ${
                lang === l
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="inline-flex items-center gap-0 rounded-full border border-border p-1 font-mono text-[11px] uppercase tracking-widest">
          <button
            onClick={() => setSort("stars")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition ${sort === "stars" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Star className="h-3 w-3" /> Stars
          </button>
          <button
            onClick={() => setSort("updated")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition ${sort === "updated" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            <GitBranch className="h-3 w-3" /> Updated
          </button>
        </div>
      </div>

      <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((r, i) => (
            <motion.a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              layout
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col gap-3 overflow-hidden bg-background p-6 transition-colors duration-500 hover:bg-card"
            >
              {/* luxury shimmer sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_35%,color-mix(in_oklab,var(--foreground)_8%,transparent)_50%,transparent_65%)] transition-transform duration-[1400ms] ease-out group-hover:translate-x-full"
              />
              {/* hairline accent */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-foreground/60 transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-2"><Github className="h-3.5 w-3.5" /> repo</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45 group-hover:text-foreground" />
              </div>
              <h3 className="font-display text-xl leading-tight tracking-tight transition-colors duration-300 group-hover:italic">{r.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              <div className="mt-auto flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" /> {r.lang}
                </span>
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" /> {r.stars}</span>
                  <span>{r.updated}</span>
                </span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
      {/* infinite scroll sentinel */}
      <InfiniteSentinel
        hasMore={visible < list.length}
        remaining={list.length - visible}
        onLoad={() => setVisible((v) => v + 6)}
      />
    </section>
  );
}

function InfiniteSentinel({
  hasMore,
  remaining,
  onLoad,
}: {
  hasMore: boolean;
  remaining: number;
  onLoad: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasMore || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) onLoad();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, onLoad]);

  if (!hasMore) {
    return (
      <div className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        — end of feed —
      </div>
    );
  }

  return (
    <div ref={ref} className="mt-10 flex flex-col items-center gap-3">
      <div className="relative h-6 w-6">
        <span className="absolute inset-0 animate-ping rounded-full bg-foreground/20" />
        <span className="absolute inset-1 rounded-full bg-foreground" />
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        loading {remaining} more…
      </div>
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
            <FooterCol
              title="Elsewhere"
              links={[
                { label: "GitHub", href: SOCIALS.github },
                { label: "LinkedIn", href: SOCIALS.linkedin },
                { label: "Telegram", href: SOCIALS.telegram },
                { label: "Email", href: `mailto:${SOCIALS.email}` },
              ]}
            />
            <FooterCol
              title="Office"
              links={[
                { label: SOCIALS.location },
                { label: SOCIALS.phoneDisplay, href: `tel:${SOCIALS.phone}` },
                { label: SOCIALS.email, href: `mailto:${SOCIALS.email}` },
                { label: "Hundaf Digital" },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:items-center">
          <span>© 2026 Endegena Abebe — Hundaf Digital Solution. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Building from Bale Robe
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<string | { label: string; href?: string }>;
}) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l, i) => {
          const item = typeof l === "string" ? { label: l } : l;
          const ext = item.href?.startsWith("http");
          return (
            <li key={`${item.label}-${i}`}>
              {item.href ? (
                <a
                  href={item.href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noreferrer" : undefined}
                  className="story-link inline-block"
                >
                  {item.label}
                </a>
              ) : (
                <span className="inline-block text-muted-foreground">{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}