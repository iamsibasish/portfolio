export const me = {
  name: "Sibasish Mohanty",
  title: "Software Engineer",
  email: "mohanty@sibasish.co",
  phone: "+91-9658474822",
  github: "https://github.com/iamsibasish",
  linkedin: "https://www.linkedin.com/in/iamsibasish",
  summary: "Backend & platform engineer specializing in high-scale payments, observability, and distributed systems.",
  highlights: [
    "Cut settlement time by 75% via smart queueing and scheduling",
    "Built tokenization platform per RBI; led Tap & Pay to GA",
    "Introduced OTel + SigNoz, Kafka event mart, Redis circuit breaker"
  ],
  stacks: ["Go","Java","Python","SQL","Kafka","AWS","Redis","MySQL","OpenTelemetry","SigNoz","ClickHouse"]
};

export const projects = [
  {
    id: "settlement-system",
    title: "In‑house Settlement System",
    period: "CRED",
    company: "CRED",
    blurb: "High-throughput settlement unit (~$200M TPV/day peak) with resilient queues, retries, and bank payout integrations.",
    longDescription: "Built a comprehensive settlement system handling $200M+ daily transaction volume with intelligent queuing, retry mechanisms, and seamless bank payout integrations. Reduced settlement time by 75% through smart scheduling algorithms.",
    tags: ["Java","Event-driven","MySQL","SQS"],
    image: "/p1.svg",
    featured: true,
    category: "Backend Systems",
    metrics: {
      impact: "75% reduction in settlement time",
      scale: "$200M+ daily TPV",
      performance: "99.9% uptime"
    }
  },
  {
    id: "tokenization-tap-pay",
    title: "RBI Tokenization & Tap‑to‑Pay",
    period: "CRED",
    company: "CRED",
    blurb: "PCI-aligned tokenization service; merchant-level tokens; EMV contactless flow for Android NFC.",
    longDescription: "Developed RBI-compliant tokenization platform with merchant-level token management and led Tap & Pay feature from POC to GA. Implemented EMV contactless payment flow for Android NFC with PCI DSS compliance.",
    tags: ["Security","Payments","Java","Dropwizard"],
    image: "/p2.svg",
    featured: true,
    category: "Payments",
    metrics: {
      impact: "PCI DSS compliant",
      scale: "Merchant-level tokenization",
      performance: "Sub-100ms response time"
    }
  },
  {
    id: "platform-observability",
    title: "Platform Observability @ TWID",
    period: "TWID PAY",
    company: "TWID PAY",
    blurb: "Unified tracing with OpenTelemetry, SigNoz dashboards, Kafka event mart; latency cuts via caching & async.",
    longDescription: "Implemented comprehensive observability platform using OpenTelemetry and SigNoz for distributed tracing. Built Kafka event mart for real-time analytics and introduced Redis circuit breaker patterns for improved resilience.",
    tags: ["OpenTelemetry","Kafka","Redis","SigNoz"],
    image: "/p3.svg",
    featured: true,
    category: "Platform Engineering",
    metrics: {
      impact: "50%+ latency reduction",
      scale: "Multi-service tracing",
      performance: "Real-time monitoring"
    }
  },
  {
    id: "merchant-integration-platform",
    title: "Merchant Integration Platform",
    period: "TWID PAY",
    company: "TWID PAY",
    blurb: "Extensible v2 APIs for merchant onboarding with growth features contributing to ~20% GMV increase.",
    longDescription: "Led development of merchant integration platform with v2 APIs designed for extensibility. Implemented growth features and optimization strategies that contributed to approximately 20% increase in Gross Merchandise Value.",
    tags: ["API Design","Growth","Microservices","PostgreSQL"],
    image: "/p1.svg",
    featured: false,
    category: "API Development",
    metrics: {
      impact: "20% GMV increase",
      scale: "Multi-tenant platform",
      performance: "99.95% API uptime"
    }
  },
  {
    id: "data-mart-tool",
    title: "Data Mart Analytics Tool",
    period: "Mu Sigma Inc.",
    company: "Mu Sigma Inc.",
    blurb: "Led team of 3 engineers building Data Mart tool for Fortune Top 10 client with OAuth2/OpenID SSO integration.",
    longDescription: "Architected and led development of enterprise Data Mart tool for Fortune Top 10 client. Implemented OAuth2/OpenID Connect SSO and built scalable data processing pipelines using Celery and RabbitMQ schedulers.",
    tags: ["Python","OAuth2","Celery","RabbitMQ"],
    image: "/p2.svg",
    featured: false,
    category: "Data Engineering",
    metrics: {
      impact: "Fortune Top 10 deployment",
      scale: "Enterprise-grade",
      performance: "Distributed processing"
    }
  },
  {
    id: "realtime-analytics-platform",
    title: "Realtime Analytics Platform",
    period: "Cracku",
    company: "Cracku",
    blurb: "Built REST APIs in Django with multi-PG redundancy and realtime analytics using Firebase, reducing app size by 50%.",
    longDescription: "Developed comprehensive REST API platform using Django with multi-PostgreSQL redundancy for high availability. Implemented realtime analytics using Firebase and optimized mobile app architecture, achieving 50% reduction in app size.",
    tags: ["Django","PostgreSQL","Firebase","REST API"],
    image: "/p3.svg",
    featured: false,
    category: "Full Stack",
    metrics: {
      impact: "50% app size reduction",
      scale: "Multi-database redundancy",
      performance: "Real-time analytics"
    }
  }
];

export const experience = [
  { company: "TWID PAY", role: "Lead Developer", period: "Feb 2024 – Present", bullets: [
    "Built merchant integration platform; shipped v2 APIs with extensibility",
    "Growth features contributing to ~20% GMV increase",
    "Platform Engg: OTel + SigNoz, Redis circuit breaker, Kafka event mart",
    "AI dev practices and PR automation; SonarQube in PR checks"
  ]},
  { company: "CRED", role: "Backend Engineer (Settlement & Tokenization)", period: "Jun 2019 – Jun 2023", bullets: [
    "In-house settlement unit; 75% time reduction",
    "Bank payouts; ~60% per-settlement cost reduction",
    "Tap & Pay from POC to GA; merchant tokenization re-arch",
    "Latency >50% improvements; deep perf debugging"
  ]},
  { company: "Mu Sigma Inc.", role: "Backend Developer", period: "Jan 2019 – Jun 2019", bullets: [
    "Led 3 engineers on Data Mart tool for Fortune Top 10 client",
    "OAuth2/OpenID SSO; Celery + RabbitMQ schedulers"
  ]},
  { company: "Cracku", role: "Software Developer", period: "Jun 2016 – Jan 2019", bullets: [
    "REST APIs in Django; multi-PG redundancy",
    "Realtime analytics with Firebase; reduced app size by half"
  ]},
  { company: "Infosys Limited", role: "System Engineer", period: "Sep 2015 – May 2016", bullets: [
    "Separation management tool; internal comms portals"
  ]}
];

export const education = [
  { school: "NIST", degree: "B.Tech — E&TC (CGPA 8.3)", period: "Sep 2011 – May 2015" }
];
