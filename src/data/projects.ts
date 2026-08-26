export type Project = {
  slug: string;
  name: string;
  category: string;
  short: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  results: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hundafo-school",
    name: "Hundafo School",
    category: "Multi-tenant SaaS",
    short:
      "A multi-tenant school management SaaS handling students, staff, grading, attendance and finance for multiple schools from one platform.",
    overview:
      "Hundafo School is a multi-tenant school management platform where each school runs an isolated workspace with its own students, staff, academic calendar and billing.",
    problem:
      "Ethiopian schools manage registration, grading, attendance and payments across paper ledgers and disconnected spreadsheets, making reporting slow and error-prone.",
    solution:
      "A single SaaS product with tenant isolation, role-based access for admins, teachers, students and parents, plus automated grade sheets, attendance and finance reporting.",
    features: [
      "Tenant isolation per school",
      "Role-based access control",
      "Automated grade sheets and rosters",
      "Attendance tracking and analytics",
      "Fee and payment management",
      "Parent and student portals",
    ],
    architecture:
      "Django monolith with per-tenant scoping at the ORM layer, PostgreSQL as the system of record, server-rendered Bootstrap 5 UI with progressive JavaScript enhancement.",
    challenges:
      "Keeping tenant data strictly isolated while sharing one schema, and making the grading engine flexible enough for different school curricula.",
    results:
      "Schools cut registration and report-card preparation from days to minutes, with a single source of truth for academic records.",
    tech: ["Django", "PostgreSQL", "Bootstrap 5", "JavaScript"],
    featured: true,
  },
  {
    slug: "temar-lije",
    name: "Temar Lije",
    category: "Education Platform",
    short:
      "An educational platform for Ethiopian students with an AI study assistant, online exams and progress tracking.",
    overview:
      "Temar Lije brings structured curriculum content, practice exams and an AI tutor to students who lack access to quality supplementary education.",
    problem:
      "Students outside major cities have limited access to tutoring, past exams and personalised feedback.",
    solution:
      "A learning ecosystem with lessons, timed online exams, instant scoring, an AI assistant for explanations, and a dashboard tracking mastery over time.",
    features: [
      "Structured lesson library",
      "Timed online exams with instant scoring",
      "AI study assistant",
      "Progress and mastery tracking",
      "Offline-friendly lightweight UI",
    ],
    architecture:
      "Django backend exposing a REST API, React/Next.js frontend, PostgreSQL storage and an AI layer for question explanations.",
    challenges:
      "Delivering a rich experience on low-bandwidth mobile connections while keeping AI response costs predictable.",
    results:
      "Students get immediate feedback and a clear picture of weak topics instead of waiting for classroom review.",
    tech: ["Django", "React", "Next.js", "PostgreSQL", "AI"],
  },
  {
    slug: "hundaf-digital-ekub",
    name: "Hundaf Digital Ekub",
    category: "Fintech",
    short:
      "A digital rotating savings (Ekub) platform with member management, contributions, transparent draws and reporting.",
    overview:
      "Ekub is a traditional Ethiopian rotating savings group. This platform digitises the whole cycle — membership, contributions, draws and payouts.",
    problem:
      "Manual Ekub groups rely on paper records and trust, which creates disputes about who paid and who has already won.",
    solution:
      "A transparent ledger with member profiles, contribution tracking, auditable winner selection and automatic round reporting.",
    features: [
      "Member and group management",
      "Contribution tracking and reminders",
      "Auditable winner selection",
      "Round and payout reporting",
      "Role-based admin controls",
    ],
    architecture:
      "Django with PostgreSQL, an append-only transaction ledger, and scheduled jobs for round progression and reminders.",
    challenges:
      "Modelling irregular real-world contribution behaviour without breaking the fairness of the draw.",
    results:
      "Groups run cycles with a verifiable record, eliminating the most common source of disputes.",
    tech: ["Django", "PostgreSQL", "JavaScript"],
  },
  {
    slug: "geda-hospital",
    name: "Geda Hospital",
    category: "Healthcare",
    short:
      "A hospital management platform covering patient records, appointments, departments and billing.",
    overview:
      "Geda Hospital digitises the clinical and administrative workflow of a mid-sized hospital in one system.",
    problem:
      "Patient histories were scattered across departments, making follow-up care and billing slow and unreliable.",
    solution:
      "Unified patient records, appointment scheduling, department routing, prescriptions and integrated billing.",
    features: [
      "Unified patient records",
      "Appointment scheduling",
      "Department and staff management",
      "Prescription and lab tracking",
      "Billing and invoices",
    ],
    architecture:
      "Django application with PostgreSQL, strict role permissions per clinical function and audit logging on record access.",
    challenges:
      "Designing permissions that protect sensitive medical data while staying fast for front-desk staff.",
    results:
      "Front-desk and clinical staff work from one record, reducing duplicate registration and lost histories.",
    tech: ["Django", "PostgreSQL", "Bootstrap 5"],
  },
  {
    slug: "eyeta-et",
    name: "Eyeta-ET",
    category: "Accessibility",
    short:
      "A multilingual Braille translation platform converting text to Braille and back, with speech support.",
    overview:
      "Eyeta-ET makes digital content accessible for blind and low-vision users across Amharic, Afaan Oromoo and English.",
    problem:
      "Braille tooling for Ethiopian languages is scarce, so learning material rarely reaches visually impaired students.",
    solution:
      "A translation engine for text-to-Braille and Braille-to-text with speech output and downloadable Braille-ready documents.",
    features: [
      "Multilingual Braille translation",
      "Braille-to-text reverse translation",
      "Text-to-speech output",
      "Downloadable Braille documents",
      "Fully keyboard-accessible UI",
    ],
    architecture:
      "Python translation core wrapped in a web service, with a lightweight accessible frontend built for screen readers.",
    challenges:
      "Mapping Ethiopic script to Braille cells correctly, including contractions and punctuation edge cases.",
    results:
      "Teachers can turn ordinary documents into Braille-ready material without specialist software.",
    tech: ["Python", "Django", "JavaScript"],
  },
  {
    slug: "hundaf-homes",
    name: "Hundaf Homes",
    category: "Marketplace",
    short:
      "A real-estate marketplace for listings, search, agent profiles and enquiry management.",
    overview:
      "Hundaf Homes connects property owners and agents with buyers and renters through a searchable, verified listings marketplace.",
    problem:
      "Property search happens in scattered social media groups with duplicated, outdated and unverifiable listings.",
    solution:
      "A structured marketplace with verified agents, rich filters, saved searches and a managed enquiry pipeline.",
    features: [
      "Rich search and filtering",
      "Verified agent profiles",
      "Saved searches and favourites",
      "Enquiry and lead management",
      "Media-heavy listing pages",
    ],
    architecture:
      "Django REST backend with PostgreSQL full-text search, React frontend and CDN-served optimised imagery.",
    challenges:
      "Keeping listing search fast as media-heavy inventory grows.",
    results:
      "Buyers filter real inventory in seconds instead of scrolling chat groups.",
    tech: ["Django", "React", "PostgreSQL"],
  },
  {
    slug: "fetehe-ai",
    name: "Fetehe AI",
    category: "AI Platform",
    short:
      "An AI-powered legal assistance platform providing guidance, awareness and document support.",
    overview:
      "Fetehe AI helps ordinary people understand their legal position and prepare basic documents in plain language.",
    problem:
      "Legal advice is expensive and inaccessible, and public legal awareness is low.",
    solution:
      "A retrieval-backed AI assistant answering legal questions with citations, plus guided document generation.",
    features: [
      "Conversational legal assistant",
      "Citation-backed answers",
      "Guided document drafting",
      "Legal awareness library",
      "Multilingual responses",
    ],
    architecture:
      "Python service orchestrating retrieval over a curated legal corpus with an LLM layer, exposed through a Django API.",
    challenges:
      "Preventing confident but wrong answers — every response is grounded in retrieved source text.",
    results:
      "Users get an understandable first read on their situation before paying for professional counsel.",
    tech: ["Python", "Django", "AI APIs", "PostgreSQL"],
  },
  {
    slug: "smartstudy3d",
    name: "SmartStudy3D",
    category: "EdTech",
    short:
      "An interactive education technology platform using 3D visualisation to teach complex concepts.",
    overview:
      "SmartStudy3D turns abstract science topics into interactive 3D models students can explore in the browser.",
    problem:
      "Science classes lack laboratory equipment, so students memorise diagrams they never actually see in operation.",
    solution:
      "Browser-based interactive 3D lessons with guided walkthroughs and comprehension checks.",
    features: [
      "Interactive 3D models",
      "Guided lesson walkthroughs",
      "Comprehension checkpoints",
      "Works on mid-range devices",
      "Teacher classroom mode",
    ],
    architecture:
      "Web-based 3D rendering on the client, lesson content and progress served from a Django API.",
    challenges:
      "Keeping 3D scenes performant on low-end classroom hardware.",
    results:
      "Students interact with concepts they previously only saw as static textbook diagrams.",
    tech: ["JavaScript", "Django", "WebGL"],
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
