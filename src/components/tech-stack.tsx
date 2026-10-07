import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNuxt, SiBootstrap, SiTailwindcss, SiVite,
  SiPython, SiDjango, SiNodedotjs, SiExpress, SiNestjs, SiFastapi, SiGo, SiLaravel,
  SiPostgresql, SiMysql, SiSqlite, SiMongodb, SiFirebase, SiPrisma,
  SiGit, SiGithub, SiVercel, SiDocker, SiLinux, SiPostman, SiNpm,
} from "react-icons/si";
import { Accessibility, Bot, Brain, Cloud, Code2, Cpu, MessageSquareText, Sparkles, Terminal, Webhook, Zap, type LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/skills";

const icons: Record<string, IconType | LucideIcon> = {
  HTML5: SiHtml5, CSS3: SiCss, JavaScript: SiJavascript, TypeScript: SiTypescript, React: SiReact, "Next.js": SiNextdotjs,
  "Nuxt.js": SiNuxt, "Bootstrap 5": SiBootstrap, "Tailwind CSS": SiTailwindcss, Vite: SiVite,
  Python: SiPython, Django: SiDjango, "Node.js": SiNodedotjs, "Express.js": SiExpress, NestJS: SiNestjs, FastAPI: SiFastapi,
  Go: SiGo, Fiber: Zap, Laravel: SiLaravel, "REST APIs": Webhook,
  PostgreSQL: SiPostgresql, MySQL: SiMysql, SQLite: SiSqlite, MongoDB: SiMongodb, Firebase: SiFirebase, "Prisma ORM": SiPrisma,
  "Artificial Intelligence": Brain, "AI Integration": Sparkles, "AI-powered Applications": Bot,
  "Machine Learning Fundamentals": Cpu, "Natural Language Processing": MessageSquareText, "Accessibility Technology": Accessibility,
  Git: SiGit, GitHub: SiGithub, Vercel: SiVercel, AWS: Cloud, Docker: SiDocker, Linux: SiLinux, "VS Code": Code2,
  Postman: SiPostman, npm: SiNpm, "CMD / PowerShell": Terminal,
};

const marquee = ["React", "Next.js", "TypeScript", "Django", "Python", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker", "Go", "FastAPI", "MongoDB", "Vercel", "Laravel", "Firebase", "NestJS"];

export function TechStack() {
  return (
    <section id="stack" className="px-5 py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase text-muted-foreground">02 / Tech stack</p>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">Tools I build with</h2>

        <div className="brutal-card mt-8 overflow-hidden py-4">
          <motion.div className="flex w-max gap-10" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, ease: "linear", repeat: Infinity }}>
            {[...marquee, ...marquee].map((name, i) => {
              const Icon = icons[name];
              return <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm"><Icon className="h-6 w-6" aria-hidden />{name}</span>;
            })}
          </motion.div>
        </div>

        <div className="mt-8 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <motion.div key={g.group} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: gi * 0.07, type: "spring", stiffness: 140, damping: 20 }} className={`brutal-card p-5 ${gi === 0 ? "lg:col-span-2" : ""}`}>
              <div className="flex items-baseline justify-between border-b border-foreground pb-3">
                <h3 className="font-bold">{g.group}</h3><span className="text-xs text-muted-foreground">0{gi + 1}</span>
              </div>
              <ul className={`mt-4 grid gap-2 ${gi === 0 ? "grid-cols-2 sm:grid-cols-5" : "grid-cols-2"}`}>
                {g.items.map((item) => {
                  const Icon = icons[item] ?? Code2;
                  return (
                    <li key={item} className="group flex flex-col items-center gap-2 border border-border p-3 text-center text-[11px] leading-tight transition-colors hover:border-foreground hover:bg-foreground hover:text-background">
                      <Icon className="h-7 w-7 transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" aria-hidden />
                      {item}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
