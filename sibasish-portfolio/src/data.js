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
    title: "In‑house Settlement System",
    period: "CRED",
    blurb: "High-throughput settlement unit (~$200M TPV/day peak) with resilient queues, retries, and bank payout integrations.",
    tags: ["Java","Event-driven","MySQL","SQS"],
    image: "/p1.svg"
  },
  {
    title: "RBI Tokenization & Tap‑to‑Pay",
    period: "CRED",
    blurb: "PCI-aligned tokenization service; merchant-level tokens; EMV contactless flow for Android NFC.",
    tags: ["Security","Payments","Java","Dropwizard"],
    image: "/p2.svg"
  },
  {
    title: "Platform Observability @ TWID",
    period: "TWID PAY",
    blurb: "Unified tracing with OpenTelemetry, SigNoz dashboards, Kafka event mart; latency cuts via caching & async.",
    tags: ["OpenTelemetry","Kafka","Redis","SigNoz"],
    image: "/p3.svg"
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
