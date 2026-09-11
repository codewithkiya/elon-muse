export type Post = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  category: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "building-multi-tenant-school-saas",
    title: "Building a multi-tenant school SaaS in Ethiopia",
    date: "2026-07-12",
    readingTime: "6 min read",
    category: "Engineering",
    excerpt:
      "What I learned shipping Hundafo School: tenant isolation, flexible grading engines and reporting that actually gets used.",
    body: [
      "Hundafo School started with one school and a spreadsheet. The moment a second school asked for the same system, the real question appeared: do you clone the codebase, or do you build a product?",
      "I chose the product route. Every query in the application is scoped to a tenant at the ORM layer, so a missing filter fails loudly in development instead of quietly leaking data in production. One schema, one deployment, strict isolation.",
      "The hardest part was not isolation — it was grading. Ethiopian schools use different scales, different weightings and different report-card formats. Instead of hardcoding a curriculum, the grading engine is configuration: components, weights and thresholds that each school defines once.",
      "The lesson I keep coming back to: build for the second customer, not the first. The second customer is the one who tells you which assumptions were actually product decisions.",
    ],
  },
  {
    slug: "ai-tutor-low-bandwidth",
    title: "Designing an AI tutor for low-bandwidth classrooms",
    date: "2026-05-28",
    readingTime: "5 min read",
    category: "AI",
    excerpt:
      "Temar Lije had to work on 3G phones with unpredictable connections. Here's how the AI layer stayed useful and affordable.",
    body: [
      "Most AI study tools assume fast internet and unlimited tokens. Temar Lije could assume neither. Students open it on mid-range Android phones, often outside major cities.",
      "So the interface ships small: server-rendered content first, no heavy client bundles, and lessons cached aggressively for offline reading. The AI assistant is the only part that requires a live connection.",
      "On cost, every question passes through a cache keyed by topic and question shape. Common questions — and in exam preparation, most questions are common — get answered from previous, reviewed responses. Only genuinely new questions reach the model.",
      "The result is a tutor that responds in a second on a slow connection and costs a fraction of a naive implementation.",
    ],
  },
  {
    slug: "digital-equb-trust-ledger",
    title: "Digitising Equb without breaking the trust",
    date: "2026-04-09",
    readingTime: "4 min read",
    category: "Fintech",
    excerpt:
      "Equb is a social contract before it is a financial product. Software has to respect that, not replace it.",
    body: [
      "Equb — the Ethiopian rotating savings group — runs on trust and a notebook. Disputes come from the same two questions: who paid, and who has already won?",
      "Hundaf Digital Ekub answers both with an append-only ledger. Contributions are recorded, never edited. Winner selection is auditable, and every round produces a report every member can read.",
      "What I deliberately did not do was automate the social side. The group still decides its rules, its amounts, and who joins. The software is the record, not the authority.",
      "Financial software for informal systems works when it makes existing behaviour verifiable, not when it replaces it with a new one.",
    ],
  },
  {
    slug: "developer-and-digital-manager",
    title: "Being a developer and a digital manager at once",
    date: "2026-02-18",
    readingTime: "4 min read",
    category: "Career",
    excerpt:
      "Writing the code and owning the digital direction changes how you make technical decisions — usually for the better.",
    body: [
      "At Hundaf Digital Solution I write the code and I am responsible for the digital direction of the products. Those two roles argue with each other constantly, and that argument is useful.",
      "As a developer I want the elegant abstraction. As the person answerable for delivery, I want the version that ships this month and can be replaced later without a rewrite.",
      "The compromise I have settled on is boring infrastructure and interesting product. Django, PostgreSQL, Docker — nothing surprising underneath — so all the creative risk goes into what the user actually touches.",
      "Owning both sides also kills a lot of meetings. When the person estimating the work is the person doing it, scope conversations get honest fast.",
    ],
  },
  {
    slug: "accessibility-is-engineering",
    title: "Accessibility is an engineering problem, not a checkbox",
    date: "2025-11-30",
    readingTime: "5 min read",
    category: "Accessibility",
    excerpt:
      "Building Eyeta-ET, a Braille translation platform for Ethiopian languages, taught me how much tooling simply does not exist.",
    body: [
      "Braille support for Amharic and Afaan Oromoo is thin. There is no mature library you can install and move on with your day, which means the mapping work is genuinely yours to get right.",
      "Ethiopic script is syllabic, so a naive character-by-character mapping produces Braille that is technically valid and practically unreadable. Contractions and punctuation edge cases needed real linguistic input, not just code.",
      "The frontend was the easier half, but only because it was treated as a requirement from the first commit: full keyboard operation, screen-reader-first markup, no interaction that depends on sight.",
      "Accessibility built in at the start costs almost nothing. Retrofitted, it costs a rewrite.",
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((post) => post.slug === slug);
