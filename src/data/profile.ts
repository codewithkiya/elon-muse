export const profile = {
  name: "Endegena Abebe",
  brand: "KIYA",
  role: "Full-Stack Developer & Software Engineer",
  location: "Ethiopia — Remote Worldwide",
  headline: "Hi, I'm Endegena Abebe",
  subheadline: "Full-Stack Developer building scalable digital products.",
  description:
    "I design and engineer modern web applications, mobile platforms, APIs, and intelligent digital products that turn complex problems into simple experiences.",
  positioning:
    "I build scalable digital products, modern web applications, mobile experiences, and intelligent software systems that solve real-world problems.",
  tagline: "Building digital products that matter.",
  available: true,
} as const;

export const stats = [
  { value: 3, suffix: "+", label: "Years Building" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 17, suffix: "+", label: "Technologies" },
] as const;

export const socials = {
  github: "https://github.com/kiyaab",
  linkedin: "https://www.linkedin.com/in/endegenaabedev",
  telegram: "https://t.me/itz_kiyaaa",
  email: "codewithkiya@gmail.com",
  phone: "+251980612356",
  phoneDisplay: "0980612356",
} as const;

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export const technologies = [
  "Python",
  "Django",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Bootstrap",
  "Tailwind CSS",
  "Flutter",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Docker",
  "Git",
  "GitHub",
  "Linux",
] as const;

export const principles = [
  {
    title: "Architecture",
    body: "Design systems that remain maintainable as they grow.",
  },
  {
    title: "Performance",
    body: "Build fast interfaces and efficient backend systems.",
  },
  {
    title: "User Experience",
    body: "Technology should feel simple to the person using it.",
  },
  {
    title: "Reliability",
    body: "Production software must be secure, stable and observable.",
  },
] as const;

export const architectureStack = [
  { layer: "Frontend", detail: "React · Next.js · Tailwind · Flutter" },
  { layer: "API / Backend", detail: "Django REST · Node.js · JWT Auth" },
  { layer: "Business Logic", detail: "Domain services · Validation · Jobs" },
  { layer: "Database", detail: "PostgreSQL · MySQL · MongoDB" },
  { layer: "Infrastructure", detail: "Docker · Linux · Nginx" },
  { layer: "Deployment", detail: "Vercel · CI/CD · Monitoring" },
] as const;
