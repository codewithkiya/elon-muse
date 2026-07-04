import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/offline")({
  head: () => ({
    meta: [
      { title: "Offline — Kiya" },
      { name: "description", content: "You're offline. Cached pages of Kiya's portfolio may still be available." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OfflinePage,
});

function OfflinePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 dot-grid opacity-70" />
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          status · offline
        </div>
        <h1 className="mt-6 font-display text-5xl leading-tight tracking-tight sm:text-6xl">
          You're <span className="italic text-muted-foreground">offline.</span>
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The network's unavailable right now. Previously visited pages of this portfolio
          may still work — try again when you're back online.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => location.reload()}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-foreground hover:text-background"
          >
            Go home
          </Link>
        </div>
      </main>
    </div>
  );
}