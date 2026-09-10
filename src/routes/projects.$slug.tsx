import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/projects";
import { architectureStack } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.name} — Case Study | Kiya` : "Case Study | Kiya";
    const description = loaderData?.short ?? "Project case study by Endegena Abebe (Kiya).";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: ProjectPage,
});

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-background p-7 md:p-9">
      <div className="font-mono text-[10px] text-muted-foreground">{label}</div>
      <div className="mt-5 text-base leading-7">{children}</div>
    </div>
  );
}

function ProjectPage() {
  const project = Route.useLoaderData();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-2 font-mono text-xs tracking-[0.18em]">
            <ArrowLeft className="h-4 w-4" /> KIYA.DEV
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="mx-auto max-w-[1100px] px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
          {project.category.toUpperCase()}
        </div>
        <h1 className="mt-6 text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em]">
          {project.name}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{project.overview}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>

        {(project.github || project.demo) && (
          <div className="mt-8 flex flex-wrap gap-5 text-sm font-medium">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-muted-foreground">
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-muted-foreground">
                Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}

        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
          <Block label="THE PROBLEM">{project.problem}</Block>
          <Block label="THE SOLUTION">{project.solution}</Block>
          <Block label="THE RESULT">{project.results}</Block>
        </div>

        <div className="mt-px grid gap-px border border-border bg-border md:grid-cols-[1.2fr_1fr]">
          <div className="bg-background p-7 md:p-10">
            <div className="font-mono text-[10px] text-muted-foreground">SYSTEM ARCHITECTURE</div>
            <p className="mt-5 text-base leading-8">{project.architecture}</p>
            <div className="mt-9 space-y-2">
              {architectureStack.map((item, i) => (
                <div key={item.layer} className="grid grid-cols-[28px_1fr] items-center gap-3">
                  <span className="font-mono text-[9px] text-muted-foreground">0{i + 1}</span>
                  <div className="flex flex-col gap-1 border border-border bg-surface px-4 py-3 sm:flex-row sm:justify-between">
                    <span className="text-xs font-medium">{item.layer}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background p-7 md:p-10">
            <div className="font-mono text-[10px] text-muted-foreground">KEY FEATURES</div>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 py-4 text-sm">
                  <Check className="h-3.5 w-3.5" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-10 font-mono text-[10px] text-muted-foreground">ENGINEERING CHALLENGE</div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.challenges}</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to portfolio
          </Link>
          {next && (
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="flex items-center gap-2 text-sm font-medium hover:text-muted-foreground"
            >
              Next project: {next.name} <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
