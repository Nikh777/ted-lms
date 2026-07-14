import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa"
import {
  SiJavascript,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si"

// Full-stack layer order used to render the architecture position diagram.
// Every track's `architectureLayer` must be one of these keys.
export const ARCHITECTURE_LAYERS = [
  { key: "markup", label: "Markup Layer" },
  { key: "styling", label: "Styling Layer" },
  { key: "language", label: "Language Layer" },
  { key: "ui", label: "UI / Frontend Layer" },
  { key: "state", label: "State Management Layer" },
  { key: "meta-framework", label: "Meta-Framework Layer" },
  { key: "runtime", label: "Server Runtime Layer" },
  { key: "api", label: "API / Server Layer" },
  { key: "database", label: "Database Layer" },
  { key: "tooling", label: "Tooling / Version Control" },
]

export const TECH_TRACKS = [
  {
    id: "html5",
    name: "HTML5",
    icon: FaHtml5,
    accent: { from: "#f97316", to: "#fb923c" },
    architectureLayer: "markup",
    description:
      "The markup language that structures every web page — headings, forms, media, and semantic sections.",
    purpose:
      "Gives content meaning and structure so browsers, assistive tech, and search engines can all understand a page the same way.",
    realWorldUsage:
      "Every website you've ever visited starts with an HTML document — from static landing pages to the shell that React or Next.js renders into.",
    prerequisites: ["None — this is the starting point"],
    careerRoles: ["Frontend Developer", "Web Developer", "UI Engineer"],
    projects: ["Personal portfolio page", "Semantic blog layout", "Accessible signup form"],
    industryDemand: "Very High",
    difficulty: "Beginner",
    estimatedTime: "1–2 weeks",
    expectedOutcome:
      "You can structure any web page with clean, semantic, accessible markup.",
    skillsYouWillLearn: [
      "Semantic tags & document structure",
      "Forms & input validation",
      "Accessibility (ARIA basics)",
      "SEO-friendly markup",
    ],
    relatedTech: ["CSS3", "JavaScript"],
    interviewQuestions: [
      "What's the difference between <div> and semantic tags like <section>?",
      "How does the browser build the DOM from HTML?",
      "Why does accessibility matter in markup?",
    ],
  },
  {
    id: "css3",
    name: "CSS3",
    icon: FaCss3Alt,
    accent: { from: "#3b82f6", to: "#60a5fa" },
    architectureLayer: "styling",
    description:
      "The styling language that controls layout, color, motion, and responsiveness across every screen size.",
    purpose:
      "Turns raw structure into a visually coherent, responsive interface — the difference between a document and a product.",
    realWorldUsage:
      "Powers layout systems (Flexbox/Grid), animations, and responsive design on virtually every production website.",
    prerequisites: ["HTML5"],
    careerRoles: ["Frontend Developer", "UI/UX Engineer"],
    projects: ["Responsive pricing grid", "Animated landing page", "Dark/light theme system"],
    industryDemand: "Very High",
    difficulty: "Beginner",
    estimatedTime: "2–3 weeks",
    expectedOutcome:
      "You can build fully responsive, animated layouts without relying on a framework.",
    skillsYouWillLearn: [
      "Flexbox & CSS Grid",
      "Responsive design & media queries",
      "Transitions & keyframe animation",
      "CSS variables & theming",
    ],
    relatedTech: ["HTML5", "Tailwind CSS"],
    interviewQuestions: [
      "When would you use Grid over Flexbox?",
      "What is the CSS box model?",
      "How does specificity get calculated?",
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: SiJavascript,
    accent: { from: "#facc15", to: "#fde047" },
    architectureLayer: "language",
    description:
      "The programming language of the web — it makes pages interactive and powers both browser and server code.",
    purpose:
      "Adds logic, interactivity, and data handling to otherwise static markup and styling.",
    realWorldUsage:
      "Runs in every browser tab, and via Node.js also powers backend APIs, CLIs, and build tooling.",
    prerequisites: ["HTML5", "CSS3"],
    careerRoles: ["Frontend Developer", "Full-Stack Developer", "Software Engineer"],
    projects: ["Interactive to-do app", "Weather dashboard (API fetch)", "Form validation engine"],
    industryDemand: "Very High",
    difficulty: "Intermediate",
    estimatedTime: "4–6 weeks",
    expectedOutcome:
      "You can build dynamic, data-driven interfaces and understand the language every JS framework is built on.",
    skillsYouWillLearn: [
      "Variables, functions & scope",
      "DOM manipulation & events",
      "Async/await & Promises",
      "Array/object methods & closures",
    ],
    relatedTech: ["React", "Node.js", "TypeScript"],
    interviewQuestions: [
      "What's the difference between var, let, and const?",
      "Explain the event loop and how async code executes.",
      "What is a closure, and where would you use one?",
    ],
  },
  {
    id: "react",
    name: "React",
    icon: FaReact,
    accent: { from: "#22d3ee", to: "#67e8f9" },
    architectureLayer: "ui",
    description:
      "A component-based JavaScript library for building fast, interactive user interfaces.",
    purpose:
      "Lets you build UIs as reusable, composable components with predictable state-driven rendering.",
    realWorldUsage:
      "Used by Meta, Netflix, Airbnb, and most modern SaaS frontends — including this platform's own dashboard.",
    prerequisites: ["JavaScript"],
    careerRoles: ["React Developer", "Frontend Engineer", "Full-Stack Developer"],
    projects: ["Movie search app (API + hooks)", "E-commerce product catalog", "Kanban task board"],
    industryDemand: "Very High",
    difficulty: "Intermediate",
    estimatedTime: "4–6 weeks",
    expectedOutcome:
      "You can build production-grade single-page applications with reusable components and hooks.",
    skillsYouWillLearn: [
      "Components, props & state",
      "Hooks (useState, useEffect, custom hooks)",
      "Component composition patterns",
      "Client-side routing",
    ],
    relatedTech: ["JavaScript", "Redux", "Next.js"],
    interviewQuestions: [
      "What problem does the virtual DOM solve?",
      "When would you reach for useMemo or useCallback?",
      "How do you lift state up between sibling components?",
    ],
  },
  {
    id: "redux",
    name: "Redux",
    icon: SiRedux,
    accent: { from: "#a78bfa", to: "#c4b5fd" },
    architectureLayer: "state",
    description:
      "A predictable state container for managing application state outside individual components.",
    purpose:
      "Centralizes shared state so large apps stay predictable, debuggable, and easy to reason about as they grow.",
    realWorldUsage:
      "Used in large-scale React apps where many components need to read and update the same data — carts, auth, dashboards.",
    prerequisites: ["JavaScript", "React"],
    careerRoles: ["React Developer", "Frontend Architect"],
    projects: ["Shopping cart with global state", "Multi-step auth flow", "Real-time notification store"],
    industryDemand: "High",
    difficulty: "Intermediate",
    estimatedTime: "2–3 weeks",
    expectedOutcome:
      "You can design and manage centralized, predictable state for complex applications.",
    skillsYouWillLearn: [
      "Store, actions & reducers",
      "Redux Toolkit & slices",
      "Async thunks for API calls",
      "Selectors & state normalization",
    ],
    relatedTech: ["React", "JavaScript"],
    interviewQuestions: [
      "Why use Redux instead of just React context?",
      "What does a reducer do, and why must it be pure?",
      "How do async thunks fit into the Redux data flow?",
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
    accent: { from: "#e5e7eb", to: "#f9fafb" },
    architectureLayer: "meta-framework",
    description:
      "A React meta-framework that adds routing, server rendering, and full-stack capabilities on top of React.",
    purpose:
      "Solves SEO, performance, and routing problems that plain React apps have to hand-roll themselves.",
    realWorldUsage:
      "Powers production sites at TikTok, Twitch, and Hulu — the default choice for SEO-sensitive, performance-critical React apps.",
    prerequisites: ["React", "JavaScript"],
    careerRoles: ["Full-Stack Developer", "React/Next.js Engineer"],
    projects: ["Server-rendered blog with dynamic routes", "SEO-optimized marketing site", "Full-stack app with API routes"],
    industryDemand: "High",
    difficulty: "Intermediate",
    estimatedTime: "3–4 weeks",
    expectedOutcome:
      "You can ship SEO-friendly, server-rendered React applications with built-in routing and API endpoints.",
    skillsYouWillLearn: [
      "File-based routing",
      "Server vs. client components",
      "Static & server-side rendering",
      "API routes",
    ],
    relatedTech: ["React", "TypeScript"],
    interviewQuestions: [
      "What's the difference between SSR, SSG, and CSR?",
      "When would you use a server component vs. a client component?",
      "How does file-based routing work in Next.js?",
    ],
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: FaNodeJs,
    accent: { from: "#4ade80", to: "#86efac" },
    architectureLayer: "runtime",
    description:
      "A JavaScript runtime that lets you run JS outside the browser — most commonly to build servers.",
    purpose:
      "Lets frontend developers use one language, JavaScript, across the entire stack for backend logic too.",
    realWorldUsage:
      "Powers APIs, real-time services, and CLIs at companies like Netflix, PayPal, and LinkedIn.",
    prerequisites: ["JavaScript"],
    careerRoles: ["Backend Developer", "Full-Stack Developer"],
    projects: ["REST API with file uploads", "Real-time chat server (WebSockets)", "CLI automation tool"],
    industryDemand: "Very High",
    difficulty: "Intermediate",
    estimatedTime: "3–4 weeks",
    expectedOutcome:
      "You can build and run server-side JavaScript applications and understand the event-driven runtime model.",
    skillsYouWillLearn: [
      "Event loop & non-blocking I/O",
      "File system & streams",
      "npm & module system",
      "Building CLI/server processes",
    ],
    relatedTech: ["Express", "MongoDB", "JavaScript"],
    interviewQuestions: [
      "Why is Node.js non-blocking, and what does that solve?",
      "What's the difference between require and import in Node?",
      "How would you handle a CPU-heavy task without blocking the event loop?",
    ],
  },
  {
    id: "express",
    name: "Express",
    icon: SiExpress,
    accent: { from: "#f1f5f9", to: "#cbd5e1" },
    architectureLayer: "api",
    description:
      "A minimal, unopinionated web framework for Node.js used to build REST APIs and web servers.",
    purpose:
      "Gives structure to routing, middleware, and request/response handling so you're not writing raw HTTP logic by hand.",
    realWorldUsage:
      "This platform's own backend API — including auth, courses, and payments — is built with Express.",
    prerequisites: ["Node.js", "JavaScript"],
    careerRoles: ["Backend Developer", "API Engineer"],
    projects: ["Authenticated REST API", "File upload service", "Middleware-based rate limiter"],
    industryDemand: "High",
    difficulty: "Intermediate",
    estimatedTime: "2–3 weeks",
    expectedOutcome:
      "You can design and ship REST APIs with routing, middleware, and error handling.",
    skillsYouWillLearn: [
      "Routing & route params",
      "Middleware pipelines",
      "Request validation & error handling",
      "Connecting to a database layer",
    ],
    relatedTech: ["Node.js", "MongoDB"],
    interviewQuestions: [
      "What is middleware, and how does the request/response cycle flow through it?",
      "How would you structure error handling across an Express app?",
      "How do you secure an Express route with authentication?",
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: SiMongodb,
    accent: { from: "#4ade80", to: "#22c55e" },
    architectureLayer: "database",
    description:
      "A NoSQL, document-oriented database that stores data as flexible, JSON-like documents.",
    purpose:
      "Gives fast-moving applications a flexible schema that can evolve without rigid migrations.",
    realWorldUsage:
      "Backs this platform's own user, course, and payment records — a common pairing with Node.js/Express APIs.",
    prerequisites: ["JavaScript basics", "Node.js (helpful)"],
    careerRoles: ["Backend Developer", "Database Engineer", "Full-Stack Developer"],
    projects: ["User management schema with Mongoose", "Product catalog with aggregation queries", "Order history with relationships"],
    industryDemand: "High",
    difficulty: "Intermediate",
    estimatedTime: "2–3 weeks",
    expectedOutcome:
      "You can design document schemas and query a NoSQL database confidently from a Node.js backend.",
    skillsYouWillLearn: [
      "Documents & collections",
      "Mongoose schemas & models",
      "CRUD operations & queries",
      "Aggregation pipelines",
    ],
    relatedTech: ["Express", "Node.js"],
    interviewQuestions: [
      "When would you choose MongoDB over a relational database?",
      "How do you model relationships in a document database?",
      "What does an aggregation pipeline let you do?",
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
    accent: { from: "#3b82f6", to: "#60a5fa" },
    architectureLayer: "language",
    description:
      "A typed superset of JavaScript that catches errors at compile time instead of runtime.",
    purpose:
      "Makes large codebases safer and easier to refactor by describing the shape of your data up front.",
    realWorldUsage:
      "The default choice for most production frontend and backend codebases at scale-ups and enterprises alike.",
    prerequisites: ["JavaScript"],
    careerRoles: ["Frontend Developer", "Backend Developer", "Full-Stack Engineer"],
    projects: ["Typed REST API client", "Strictly-typed React component library", "Migrating a JS project to TS"],
    industryDemand: "Very High",
    difficulty: "Intermediate",
    estimatedTime: "2–3 weeks",
    expectedOutcome:
      "You can write type-safe JavaScript and catch entire classes of bugs before they ship.",
    skillsYouWillLearn: [
      "Types, interfaces & generics",
      "Type inference & narrowing",
      "Typing React components & hooks",
      "Configuring tsconfig for a project",
    ],
    relatedTech: ["JavaScript", "React", "Next.js"],
    interviewQuestions: [
      "What's the difference between an interface and a type alias?",
      "What is a generic, and when would you reach for one?",
      "How does TypeScript's structural typing differ from nominal typing?",
    ],
  },
  {
    id: "git",
    name: "Git",
    icon: FaGitAlt,
    accent: { from: "#fb923c", to: "#f97316" },
    architectureLayer: "tooling",
    description:
      "A distributed version control system used to track and collaborate on code changes.",
    purpose:
      "Lets teams work on the same codebase in parallel without overwriting each other's work, with a full history of every change.",
    realWorldUsage:
      "Used on essentially every professional software project, solo or team, via platforms like GitHub and GitLab.",
    prerequisites: ["Basic command line comfort"],
    careerRoles: ["Every software role uses this"],
    projects: ["Branch & PR workflow simulation", "Resolving a real merge conflict", "Setting up CI on a Git repo"],
    industryDemand: "Very High",
    difficulty: "Beginner",
    estimatedTime: "1 week",
    expectedOutcome:
      "You can confidently branch, commit, merge, and collaborate on shared codebases.",
    skillsYouWillLearn: [
      "Commits, branches & merges",
      "Resolving merge conflicts",
      "Pull request workflows",
      "Rebasing & history management",
    ],
    relatedTech: ["Every track on this platform"],
    interviewQuestions: [
      "What's the difference between merge and rebase?",
      "How would you undo a commit that's already been pushed?",
      "Walk through resolving a merge conflict.",
    ],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    accent: { from: "#22d3ee", to: "#0ea5e9" },
    architectureLayer: "styling",
    description:
      "A utility-first CSS framework for building custom designs directly in your markup, without writing separate CSS files.",
    purpose:
      "Speeds up styling by composing small utility classes instead of context-switching between markup and stylesheets.",
    realWorldUsage:
      "This very platform's UI is built with Tailwind — used widely across modern SaaS and startup frontends.",
    prerequisites: ["HTML5", "CSS3"],
    careerRoles: ["Frontend Developer", "UI Engineer"],
    projects: ["Fully responsive dashboard UI", "Component library with variants", "Dark-mode design system"],
    industryDemand: "High",
    difficulty: "Beginner",
    estimatedTime: "1–2 weeks",
    expectedOutcome:
      "You can rapidly build consistent, responsive interfaces using a utility-first workflow.",
    skillsYouWillLearn: [
      "Utility-first styling workflow",
      "Responsive & state variants",
      "Custom theme configuration",
      "Component extraction patterns",
    ],
    relatedTech: ["CSS3", "React"],
    interviewQuestions: [
      "What are the trade-offs of utility-first CSS vs. traditional CSS?",
      "How do you keep a Tailwind codebase from feeling repetitive?",
      "How would you extend Tailwind's default theme for a brand?",
    ],
  },
]
