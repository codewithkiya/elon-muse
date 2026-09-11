import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { posts } from "@/data/posts";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/blog")({
  head: () => {
    const title = "Blog — Notes on building software | Kiya";
    const description =
      "Essays by Endegena Abebe (Kiya) on multi-tenant SaaS, AI tutoring, fintech ledgers, accessibility and building products from Ethiopia.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
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
        <div className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">WRITING</div>
        <h1 className="mt-6 text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em]">Blog</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
          Notes on the systems I build — multi-tenant SaaS, AI products, fintech ledgers and accessible software.
        </p>

        <div className="mt-16 border-t border-border">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group grid gap-3 border-b border-border py-8 transition-colors hover:bg-surface md:grid-cols-[70px_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
              <div>
                <div className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                  {post.category.toUpperCase()} · {post.readingTime}
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{post.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
              </div>
              <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                {post.date}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
