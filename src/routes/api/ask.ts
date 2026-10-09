import { createFileRoute } from "@tanstack/react-router";
import { profile, socials, technologies, principles } from "@/data/profile";
import { experience, achievements } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { services } from "@/data/services";

const MODEL = "openai/gpt-6-astra";

function buildInstructions() {
  const knowledge = JSON.stringify({
    profile, socials, technologies, principles, skillGroups, services, experience,
    certificatesAndAchievements: achievements,
    projects: projects.map((p) => ({ ...p })),
  });
  return `You are the portfolio assistant for ${profile.name} (Kiya). Recruiters ask you about his skills, experience, projects and certificates.
Rules:
- Answer ONLY using the PORTFOLIO DATA below. Never invent employers, dates, numbers, clients or technologies.
- If the data does not contain the answer, say so plainly and suggest contacting him at ${socials.email} or booking a call.
- Be concise (under 150 words), warm, professional. Use short bullet lists when helpful. Refer to him in third person.
- Mention specific project names, roles and certificates from the data as evidence.
PORTFOLIO DATA:
${knowledge}`;
}

type Msg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return Response.json({ error: "AI is not configured." }, { status: 500 });
        let messages: Msg[];
        try {
          const body = (await request.json()) as { messages?: Msg[] };
          messages = (body.messages ?? [])
            .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
            .slice(-12)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
        if (!messages.length || messages[messages.length - 1].role !== "user")
          return Response.json({ error: "Ask a question first." }, { status: 400 });

        try {
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            signal: request.signal,
            headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
            body: JSON.stringify({
              model: MODEL,
              instructions: buildInstructions(),
              input: messages,
              stream: true,
              store: false,
              reasoning: { effort: "low", summary: "auto" },
              include: ["reasoning.encrypted_content"],
            }),
          });
          if (!upstream.ok) {
            const text = await upstream.text();
            let message = "The assistant is unavailable right now.";
            try { message = JSON.parse(text)?.error?.message ?? JSON.parse(text)?.message ?? message; } catch { /* keep default */ }
            if (upstream.status === 429) message = "Too many questions right now — please try again in a moment.";
            if (upstream.status === 402) message = "The assistant is temporarily paused. Please email instead.";
            return Response.json({ error: message }, { status: upstream.status });
          }
          const headers = new Headers({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform" });
          upstream.headers.forEach((v, k) => { if (k.toLowerCase().startsWith("x-lovable-aig-")) headers.set(k, v); });
          return new Response(upstream.body, { status: 200, headers });
        } catch (error) {
          if (request.signal.aborted) return new Response(null, { status: 499 });
          throw error;
        }
      },
    },
  },
});
