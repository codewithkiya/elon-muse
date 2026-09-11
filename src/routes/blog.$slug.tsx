import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { posts, postBySlug } from "@/data/posts";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} | Kiya` : "Article | Kiya";
    const description = loaderData?.excerpt ?? "Writing by Endegena Abebe (Kiya).";
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
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const next = posts[(index + 1) % posts.length];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-[820px] items-center justify-between px-5 md:px-8">
          <Link to="/blog" className="flex items-center gap-2 font-mono text-xs tracking-[0.18em]">
            <ArrowLeft className="h-4 w-4" /> BLOG
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="mx-auto max-w-[820px] px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <div className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
          {post.category.toUpperCase()} · {post.date} · {post.readingTime}
        </div>
        <h1 className="mt-6 text-[clamp(2.2rem,5.5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.04em]">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>

        <article className="mt-12 space-y-7 border-t border-border pt-10 text-base leading-8">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </article>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            ← All posts
          </Link>
          {next && (
            <Link
              to="/blog/$slug"
              params={{ slug: next.slug }}
              className="flex items-center gap-2 text-sm font-medium hover:text-muted-foreground"
            >
              Next: {next.title} <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
