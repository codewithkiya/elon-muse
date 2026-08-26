export type ExperienceItem = {
  year: string;
  role: string;
  org: string;
  location: string;
  body: string;
  achievements: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    year: "2026 — Now",
    role: "Developer & Digital Manager",
    org: "Hundaf Digital Solution",
    location: "Bale Robe, Ethiopia",
    body: "Building software products and managing digital delivery for clients across education, finance, healthcare and real estate.",
    achievements: [
      "Shipped multi-tenant school SaaS to production",
      "Led digital delivery for multiple client platforms",
      "Standardised the team's Django + React stack",
    ],
    tech: ["Django", "React", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    year: "2025 — Now",
    role: "Assistant Lecturer",
    org: "STEM Entrepreneurship Club",
    location: "Ethiopia",
    body: "Graduated from the STEM Entrepreneurship Club in 2025 and now mentor the next cohort of student founders on product and engineering.",
    achievements: [
      "Graduated from the 2025 cohort",
      "Mentors student teams on product engineering",
      "2nd place — STEM Entrepreneurship Club competition",
    ],
    tech: ["Product", "Mentoring", "Prototyping"],
  },
  {
    year: "2024 — Now",
    role: "Scholarship Student",
    org: "AASTU — Addis Ababa Science & Technology University",
    location: "Addis Ababa, Ethiopia",
    body: "Earned a full scholarship after taking 1st place at the National Science and Engineering Fair.",
    achievements: [
      "Full scholarship awarded on national competition results",
      "Focus on software engineering and systems",
    ],
    tech: ["Algorithms", "Systems", "Databases"],
  },
  {
    year: "2023 — Now",
    role: "Full-Stack Developer",
    org: "Independent / Client Work",
    location: "Remote",
    body: "Designing and shipping platforms across education, business, legal, agriculture, hospitality and accessibility.",
    achievements: [
      "20+ projects designed, built and deployed",
      "Accessibility platform for Ethiopic Braille translation",
      "AI-assisted legal guidance platform",
    ],
    tech: ["Python", "Django", "React", "Next.js", "PostgreSQL"],
  },
];

export const achievements = [
  { year: "2025/26", title: "Winner of the Year — MWU", org: "Madda Walabu University" },
  { year: "2025", title: "1st Place — National Science & Engineering Fair", org: "Scholarship to AASTU" },
  { year: "2025", title: "1st Place — MinT Startup Training & Competition", org: "Ministry of Innovation & Technology" },
  { year: "2025", title: "2nd Place — FAWF & STEM Power Ethiopic Web App Competition", org: "STEM Power / FAWF" },
  { year: "2025", title: "2nd Place — Oromia Job Creation Competition", org: "Oromia Region" },
  { year: "2025", title: "2nd Place — STEM Entrepreneurship Club Competition", org: "STEM Club" },
  { year: "2024/25", title: "Ethiopian 5 Million Coders — Programming Fundamentals", org: "Certified" },
  { year: "2024/25", title: "Ethiopian 5 Million Coders — Android Development", org: "Certified" },
  { year: "2024/25", title: "Ethiopian 5 Million Coders — Data Science", org: "Certified" },
  { year: "2024/25", title: "Ethiopian 5 Million Coders — AI Fundamentals", org: "Certified" },
] as const;
