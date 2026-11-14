import { ReelData, Project } from "@/lib/types";

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "project-adaptlearn",
    title: "AdaptLearn — Adaptive Learning System",
    slug: "adaptlearn-adaptive-system",
    summary:
      "An adaptive-learning web prototype exploring multi-format educational content presentation for students with disabilities, built for HI-03 (Adaptive Learning for Students with Disabilities).",
    year: "2026",
    role: "Full-Stack Developer",
    tags: ["FastAPI", "Python", "JavaScript", "Web Speech API", "Bayesian Tracing"],
    links: [
      {
        label: "Live Demo",
        url: "https://adaptlearn-1mcc.onrender.com",
      },
      {
        label: "GitHub Repository",
        url: "https://github.com/luthfan-tech/Adaptlearn.git",
      },
    ],
    processNotes: {
      challenge:
        "Standard educational platforms offer rigid linear paths that fail to accommodate varying student velocity or accessibility requirements, causing cognitive overload or disengagement.",
      architecture:
        "Built with FastAPI and JavaScript, featuring Epsilon-greedy selection across presentation formats, Bayesian Knowledge Tracing for mastery estimation, text-to-speech with synchronized highlighting, dictation, and local storage tracking.",
      takeaway:
        "Connecting real browser assistive APIs with adaptive backend logic demonstrates how accessible design directly enhances educational outcomes.",
      rawNotes:
        "Live Demo: https://adaptlearn-1mcc.onrender.com | Repository: https://github.com/luthfan-tech/Adaptlearn.git",
    },
  },
  {
    id: "project-fullstack-30",
    title: "30-Day Full-Stack Foundations Challenge",
    slug: "30-day-fullstack-challenge",
    summary:
      "A systematic 30-day engineering sprint exploring the end-to-end modern web architecture: from semantic HTML/CSS and DOM manipulation to React, backend APIs, databases, and secure-development habits.",
    year: "2026",
    role: "Full-Stack Engineering",
    tags: ["React", "JavaScript", "Node.js", "Express", "REST APIs", "OWASP Security"],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/luthfan-tech/30-day-fullstack-challenge.git",
      },
    ],
    processNotes: {
      challenge:
        "Bridging isolated frontend exercises into cohesive client-server systems while cultivating security awareness (authentication, authorization, and input validation).",
      architecture:
        "Documented progressive milestones covering component lifecycle & hooks (useState, useEffect), HTTP request-response cycles, database modeling (MongoDB vs PostgreSQL), session/JWT auth, and OWASP-inspired defense practices.",
      takeaway:
        "Understanding architectural decisions behind state lifting, API contracts, and secret management is vital before building large-scale production applications.",
      rawNotes:
        "Repository: https://github.com/luthfan-tech/30-day-fullstack-challenge.git",
    },
  },
  {
    id: "project-python-libs",
    title: "Python Libraries Sprint — Numerical, Data & ML",
    slug: "python-libs",
    summary:
      "A hands-on learning sprint covering essential Python libraries for numerical computing (NumPy), tabular data analysis (Pandas), visual charts (Matplotlib), and introductory deep learning (PyTorch).",
    year: "2026",
    role: "Data & Systems Developer",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib", "PyTorch", "Autograd"],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/luthfan-tech/python-libs.git",
      },
    ],
    processNotes: {
      challenge:
        "Transitioning from basic scripts to high-performance vector operations, structured dataframe transformations, and gradient-based optimization workflows.",
      architecture:
        "Implemented hands-on exercises including student marks array filtering with broadcasting, sales dataset cleaning and split-apply-combine aggregations, multi-type chart visualizations, and a linear regression training loop using PyTorch Autograd.",
      takeaway:
        "Real practice over passive watching: writing small, verifiable data routines cements understanding of the fundamental training loop (Data → Model → Prediction → Loss → Gradient → Optimizer).",
      rawNotes:
        "Repository: https://github.com/luthfan-tech/python-libs.git",
    },
  },
  {
    id: "project-100-python",
    title: "100 Python Programs — Algorithmic Suite",
    slug: "100-python-programs",
    summary:
      "A foundational 100-problem programming curriculum covering computational logic, recursion, searching, sorting, file I/O, OOP, decorators, generators, regex, and data structures.",
    year: "2026",
    role: "Algorithmic Foundations",
    tags: ["Python", "Algorithms", "Data Structures", "OOP", "Decorators", "Recursion"],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/luthfan-tech/100-python-programs.git",
      },
    ],
    processNotes: {
      challenge:
        "Building instinctive fluency in Python by solving and documenting 100 varied algorithmic and systems exercises with clean code quality.",
      architecture:
        "Structured curriculum spanning foundational control flow, mathematical logic, recursive backtracking, object-oriented design, custom generators, and exception handling.",
      takeaway:
        "Consistent daily problem-solving builds the core computational discipline required to design robust full-stack and backend systems.",
      rawNotes:
        "Repository: https://github.com/luthfan-tech/100-python-programs.git",
    },
  },
];

export const CYBERPUNK_REEL: ReelData = {
  id: "reel-cyberpunk",
  title: "Reel 01: Featured Systems",
  genre: "cyberpunk",
  accentColor: "#5DD62C",
  durationSeconds: 60,
  description:
    "Curated systems, adaptive platforms, and foundational algorithmic engineering curricula by Lutfan.",
  themeTokens: {
    accentColor: "#5DD62C",
    glowColor: "#5DD62C",
    fogColor: "#0F0F0F",
    fogNear: 2.5,
    fogFar: 14.0,
    ambientColor: "#202020",
    keyLightColor: "#F8F8F8",
    keyLightIntensity: 2.4,
    beamColor: "#5DD62C",
    groundColor: "#0F0F0F",
  },
  commentary: [
    {
      id: "comm-1",
      timestamp: "00:00:05:00",
      title: "FOUNDATIONAL ENGINEERING",
      tag: "CORE PHILOSOPHY",
      style: "sticky",
      author: "Lutfan",
      content:
        "Before building complex high-level abstractions, mastering systems programming in C and algorithmic rigor in Python forms the rock-solid substrate of all software craftsmanship.",
    },
    {
      id: "comm-2",
      timestamp: "00:00:25:12",
      title: "ADAPTIVE FEEDBACK LOOPS",
      tag: "DESIGN DIRECTIVE",
      style: "redline",
      author: "Lutfan",
      content:
        "In AdaptLearn, every student interaction is treated as a real-time signal. Static curricula are obsolete; software must shape itself around the human learner.",
    },
  ],
  projects: FEATURED_PROJECTS,
};
