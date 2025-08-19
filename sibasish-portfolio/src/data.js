export const me = {
  name: "Sibasish Mohanty",
  title: "Software Engineer",
  email: "mohanty@sibasish.co",
  phone: "+91-9658474822",
  github: "https://github.com/iamsibasish",
  linkedin: "https://www.linkedin.com/in/iamsibasish",
  summary: "Backend and platform engineer specializing in high-scale payments, observability, and distributed systems architecture.",
  highlights: [
    "Reduced settlement time by 75% through smart queuing and scheduling algorithms",
    "Built RBI-compliant tokenization platform and led Tap & Pay from POC to GA",
    "Introduced OpenTelemetry + SigNoz observability, Kafka event mart, and Redis circuit breaker patterns"
  ],
  stacks: ["Go","Java","Python","SQL","Kafka","AWS","Redis","MySQL","OpenTelemetry","SigNoz","ClickHouse"]
};

export const projects = [
  {
    id: "settlement-system",
    title: "In‑house Settlement System",
    period: "CRED",
    company: "CRED",
    blurb: "High-throughput settlement system processing ~$200M TPV/day with resilient queues, intelligent retries, and seamless bank payout integrations.",
    longDescription: "Architected and built a comprehensive settlement system handling $200M+ daily transaction volume with intelligent queuing mechanisms, exponential backoff retry strategies, and seamless bank payout integrations. Implemented smart scheduling algorithms that reduced settlement time by 75% while maintaining 99.9% uptime. The system features event-driven architecture with MySQL for transactional consistency and SQS for reliable message processing.",
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
    blurb: "PCI DSS-compliant tokenization service with merchant-level token management and EMV contactless payment flow for Android NFC.",
    longDescription: "Developed RBI-compliant tokenization platform with merchant-level token management, ensuring PCI DSS compliance and regulatory adherence. Led Tap & Pay feature development from proof-of-concept to general availability, implementing EMV contactless payment flow for Android NFC with sub-100ms response times. The platform handles secure token lifecycle management and seamless payment processing.",
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
    title: "Platform Observability Infrastructure",
    period: "TWID PAY",
    company: "TWID PAY",
    blurb: "Comprehensive observability platform with OpenTelemetry tracing, SigNoz dashboards, Kafka event mart, and Redis circuit breaker patterns.",
    longDescription: "Implemented end-to-end observability platform using OpenTelemetry for distributed tracing across microservices and SigNoz for real-time monitoring dashboards. Built Kafka-based event mart for analytics and introduced Redis circuit breaker patterns for improved system resilience. Achieved 50%+ latency reduction through performance optimization and proactive monitoring.",
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
    blurb: "Extensible v2 API platform for merchant onboarding with growth optimization features contributing to ~20% GMV increase.",
    longDescription: "Led development of next-generation merchant integration platform with v2 APIs designed for extensibility and scalability. Implemented growth optimization features, A/B testing frameworks, and merchant analytics that contributed to approximately 20% increase in Gross Merchandise Value. The platform maintains 99.95% API uptime with multi-tenant architecture supporting diverse merchant requirements.",
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
    title: "Enterprise Data Mart Analytics Tool",
    period: "Mu Sigma Inc.",
    company: "Mu Sigma Inc.",
    blurb: "Enterprise-grade data mart tool for Fortune Top 10 client with OAuth2/OpenID Connect SSO and distributed processing capabilities.",
    longDescription: "Architected and led a team of 3 engineers in developing an enterprise Data Mart tool for a Fortune Top 10 client. Implemented OAuth2/OpenID Connect single sign-on integration and built scalable data processing pipelines using Celery task queues and RabbitMQ message brokers. The solution handles large-scale data analytics with distributed processing capabilities and enterprise-grade security.",
    tags: ["Python","OAuth2","Celery","RabbitMQ"],
    image: "/p2.svg",
    featured: false,
    category: "Data Engineering",
    metrics: {
      impact: "Fortune Top 10 deployment",
      scale: "Enterprise-grade security",
      performance: "Distributed processing"
    }
  },
  {
    id: "realtime-analytics-platform",
    title: "Real-time Analytics Platform",
    period: "Cracku",
    company: "Cracku",
    blurb: "Scalable REST API platform with Django, multi-PostgreSQL redundancy, and Firebase real-time analytics, achieving 50% mobile app size reduction.",
    longDescription: "Developed comprehensive REST API platform using Django with multi-PostgreSQL database redundancy for high availability and disaster recovery. Implemented real-time analytics using Firebase for live user engagement tracking and optimized mobile app architecture through efficient API design, achieving 50% reduction in mobile app size while maintaining full functionality.",
    tags: ["Django","PostgreSQL","Firebase","REST API"],
    image: "/p3.svg",
    featured: false,
    category: "Full Stack",
    metrics: {
      impact: "50% app size reduction",
      scale: "Multi-database redundancy",
      performance: "Real-time analytics"
    }
  },
  {
    id: "distributed-cache-system",
    title: "Distributed Caching System",
    period: "CRED",
    company: "CRED",
    blurb: "High-performance distributed caching layer with Redis Cluster, achieving 95% cache hit rate and sub-5ms response times for payment processing.",
    longDescription: "Designed and implemented a distributed caching system using Redis Cluster to optimize payment processing workflows. Built intelligent cache warming strategies, implemented cache-aside patterns with automatic failover, and developed monitoring dashboards for cache performance. Achieved 95% cache hit rate with sub-5ms response times, significantly reducing database load during peak traffic periods.",
    tags: ["Redis","Distributed Systems","Performance","Monitoring"],
    image: "/p1.svg",
    featured: true,
    category: "Performance Engineering",
    metrics: {
      impact: "95% cache hit rate",
      scale: "Multi-node cluster",
      performance: "Sub-5ms response time"
    }
  },
  {
    id: "event-streaming-pipeline",
    title: "Event Streaming Data Pipeline",
    period: "TWID PAY",
    company: "TWID PAY",
    blurb: "Real-time event streaming pipeline processing 1M+ events/day with Kafka, ClickHouse, and automated data quality monitoring.",
    longDescription: "Built a robust event streaming pipeline using Apache Kafka for real-time data ingestion and ClickHouse for analytical workloads. Implemented schema registry for data governance, automated data quality checks, and real-time alerting for pipeline health. The system processes over 1 million events daily with 99.99% data accuracy and enables real-time business intelligence dashboards.",
    tags: ["Kafka","ClickHouse","Data Pipeline","Real-time"],
    image: "/p2.svg",
    featured: true,
    category: "Data Engineering",
    metrics: {
      impact: "1M+ events/day processed",
      scale: "Real-time processing",
      performance: "99.99% data accuracy"
    }
  },
  {
    id: "microservices-orchestration",
    title: "Microservices Orchestration Platform",
    period: "CRED",
    company: "CRED",
    blurb: "Service mesh architecture with Kubernetes, Istio, and automated deployment pipelines supporting 50+ microservices in production.",
    longDescription: "Architected and implemented a comprehensive microservices orchestration platform using Kubernetes and Istio service mesh. Built automated CI/CD pipelines with GitOps workflows, implemented blue-green deployments, and established comprehensive monitoring with Prometheus and Grafana. The platform supports 50+ microservices in production with zero-downtime deployments and automatic scaling based on traffic patterns.",
    tags: ["Kubernetes","Istio","CI/CD","Microservices"],
    image: "/p3.svg",
    featured: true,
    category: "DevOps & Infrastructure",
    metrics: {
      impact: "Zero-downtime deployments",
      scale: "50+ microservices",
      performance: "Auto-scaling enabled"
    }
  },
  {
    id: "fraud-detection-engine",
    title: "ML-Powered Fraud Detection Engine",
    period: "CRED",
    company: "CRED",
    blurb: "Machine learning-based fraud detection system with real-time scoring, reducing fraudulent transactions by 85% while maintaining low false positive rates.",
    longDescription: "Developed a sophisticated fraud detection engine using machine learning algorithms for real-time transaction scoring. Implemented feature engineering pipelines, model training workflows with MLflow, and real-time inference APIs with sub-50ms latency. The system reduced fraudulent transactions by 85% while maintaining false positive rates below 2%, protecting millions in transaction value daily.",
    tags: ["Machine Learning","Python","MLflow","Real-time"],
    image: "/p1.svg",
    featured: true,
    category: "Machine Learning",
    metrics: {
      impact: "85% fraud reduction",
      scale: "Real-time scoring",
      performance: "Sub-50ms inference"
    }
  }
];

export const experience = [
  { company: "TWID PAY", role: "Lead Developer", period: "Feb 2024 – Present", bullets: [
    "Built merchant integration platform and shipped v2 APIs with extensible architecture",
    "Implemented growth optimization features contributing to ~20% GMV increase",
    "Platform Engineering: OpenTelemetry + SigNoz observability, Redis circuit breaker patterns, Kafka event mart",
    "Introduced AI development practices and PR automation with SonarQube integration in CI/CD pipeline"
  ]},
  { company: "CRED", role: "Backend Engineer (Settlement & Tokenization)", period: "Jun 2019 – Jun 2023", bullets: [
    "Developed in-house settlement system achieving 75% reduction in processing time",
    "Implemented bank payout integrations with ~60% per-settlement cost reduction",
    "Led Tap & Pay feature from POC to GA and re-architected merchant tokenization platform",
    "Achieved >50% latency improvements through deep performance debugging and optimization"
  ]},
  { company: "Mu Sigma Inc.", role: "Backend Developer", period: "Jan 2019 – Jun 2019", bullets: [
    "Led team of 3 engineers developing Data Mart analytics tool for Fortune Top 10 client",
    "Implemented OAuth2/OpenID Connect SSO and built Celery + RabbitMQ task schedulers"
  ]},
  { company: "Cracku", role: "Software Developer", period: "Jun 2016 – Jan 2019", bullets: [
    "Developed REST APIs using Django with multi-PostgreSQL database redundancy",
    "Built real-time analytics platform with Firebase and reduced mobile app size by 50%"
  ]},
  { company: "Infosys Limited", role: "System Engineer", period: "Sep 2015 – May 2016", bullets: [
    "Developed employee separation management tools and internal communication portals"
  ]}
];

export const education = [
  { school: "NIST", degree: "B.Tech — E&TC (CGPA 8.3)", period: "Sep 2011 – May 2015" }
];
