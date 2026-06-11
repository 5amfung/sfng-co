import { BlueprintPreset } from "./types";

export const PRESET_BLUEPRINTS: BlueprintPreset[] = [
  {
    id: "agentic-intel-router",
    name: "Agentic Ingest & Routing Matrix",
    subtitle: "SYS_ARCH_01 // AGENTIC_ROUTING",
    tag: "A.I.R.M.",
    description: "Orchestrates high-throughput enterprise event streams, ground-truth context injection, and reactive model routing using parallel Gemini micro-agents with automatic failovers.",
    estimatedTotalLatency: "840ms",
    reliabilityScore: "99.98%",
    useCase: "Enterprise CRM & Multi-Agent Customer Support Escalation",
    nodes: [
      {
        id: "ingest-01",
        label: "Secure API Ingest Gateway",
        category: "ingest",
        status: "active",
        metrics: "45k req/min",
        description: "Standardizes inbound client sessions, authorizes signatures, and sanitizes payload content using secure rate-limits."
      },
      {
        id: "ground-02",
        label: "Grounding Synthesizer",
        category: "process",
        modelName: "gemini-2.5-flash",
        status: "active",
        latency: "120ms",
        description: "Queries high-dimensional vector DBs and context stores to inject target client metadata and operational parameters directly into LLM prompts."
      },
      {
        id: "router-03",
        label: "Semantic Prompt Router",
        category: "agent",
        modelName: "gemini-2.5-pro",
        status: "active",
        latency: "340ms",
        description: "Analyzes system intent and urgency to dynamically partition active workloads to specialized domain sub-agents (billing, compliance, product)."
      },
      {
        id: "dispatch-04",
        label: "Synthesized Event Dispatcher",
        category: "output",
        status: "complete",
        metrics: "Webhook Push",
        description: "Constructs clean JSON payloads, registers transactional logs, and fires secured OAuth callbacks to integrated downstream services."
      }
    ],
    edges: [
      { from: "ingest-01", to: "ground-02", label: "Payload Grounding", type: "sync" },
      { from: "ground-02", to: "router-03", label: "Enriched Context", type: "secure" },
      { from: "router-03", to: "dispatch-04", label: "Orchestrated Out", type: "async" }
    ],
    yamlTemplate: `version: "sfng.v4b"
metadata:
  blueprint_id: "agentic-intel-router"
  arch_type: "asymmetric_agent_mesh"
  designed_by: "SFNG Core Division"

pipeline:
  ingest:
    id: "secure-api-gateway"
    type: "http_ingress"
    rate_limit: "1000/sec"
    security: "hmac_sha256"

  context_injection:
    id: "grounding-synthesizer"
    engine: "vector_index_direct"
    model: "gemini-2.5-flash"
    temperature: 0.1
    top_k: 5

  decision_core:
    id: "semantic-prompt-router"
    engine: "multi_agent_router"
    model: "gemini-2.5-pro"
    max_tokens: 1024
    sub_agents:
      - id: "billing_agent"
      - id: "technical_agent"
      - id: "onboarding_agent"

  egress:
    id: "synthesized-event-dispatcher"
    delivery: "guaranteed_atomic_webhook"
    retry_protocol: "exponential_backoff_max_3"
`
  },
  {
    id: "cognitive-compliance-engine",
    name: "Cognitive Document Compliance Ledger",
    subtitle: "SYS_ARCH_02 // REGULATORY_VERIFY",
    tag: "C.D.C.L.",
    description: "Processes structured and unstructured multi-format document packages, verifying regulatory compliance across financial and industrial guidelines via secure dual-pass evaluations.",
    estimatedTotalLatency: "1.45s",
    reliabilityScore: "99.991%",
    useCase: "Fintech Disclosures, Legal Asset Scanning, and ISO Auditing",
    nodes: [
      {
        id: "ingest-01",
        label: "Multi-Source Document Parser",
        category: "ingest",
        status: "idle",
        metrics: "PDF/OFT/DOCX",
        description: "Extracts raw text schemas, layout nodes, and embedded tabular data from rich complex documents."
      },
      {
        id: "verify-02",
        label: "Dual-Pass Auditor Core",
        category: "process",
        modelName: "gemini-2.5-pro",
        status: "idle",
        latency: "850ms",
        description: "Executes rule-checking prompts and guidelines matching, running automated self-correction cycles to eliminate halluncinations."
      },
      {
        id: "ledger-03",
        label: "Immutable Ledger Signer",
        category: "output",
        status: "idle",
        metrics: "SHA-256 Sign",
        description: "Signs verified checklists with cryptographic hashes, archiving output packages to secure storage nodes."
      }
    ],
    edges: [
      { from: "ingest-01", to: "verify-02", label: "Text Elements Flow", type: "sync" },
      { from: "verify-02", to: "ledger-03", label: "Signed Ledger Data", type: "secure" }
    ],
    yamlTemplate: `version: "sfng.v4b"
metadata:
  blueprint_id: "regulatory-compliance-matrix"
  arch_type: "cognitive_evaluation_pipeline"
  designed_by: "SFNG Auditing Division"

pipeline:
  ingest:
    source: "authenticated_cloud_storage"
    poll_frequency: "10s"
    formats: ["pdf", "docx", "xlsx"]

  audit_sequence:
    engine: "dual_pass_consensus"
    agent_primary: "gemini-2.5-pro"
    agent_verifier: "gemini-2.5-flash"
    guideline_ruleset: "SEC_DISCLOSURES_2026_V12"
    consensus_threshold: 0.95

  ledger:
    format: "immutable_yaml_report"
    hash: "sha256"
    dispatch: "corporate_auditing_queue"
`
  },
  {
    id: "realtime-synthesizer-core",
    name: "Real-time Sentiment Correlation Engine",
    subtitle: "SYS_ARCH_03 // SENTIMENT_CORRELATOR",
    tag: "R.T.S.C.",
    description: "Infects parallel data streams and news feeds, evaluates temporal market sentiment trends, and aggregates correlations instantly to automate risk-sensitive positions.",
    estimatedTotalLatency: "310ms",
    reliabilityScore: "99.95%",
    useCase: "Algorithmic Risk Management & Public Communications Indexing",
    nodes: [
      {
        id: "ingest-01",
        label: "News & Price Streaming Feed",
        category: "ingest",
        status: "idle",
        metrics: "Websocket / SSE",
        description: "Establishes low-latency TCP sockets with news sources, trading logs, and financial ticker webhooks."
      },
      {
        id: "correlation-02",
        label: "Vector Sentiment Evaluator",
        category: "process",
        modelName: "gemini-2.5-flash",
        status: "idle",
        latency: "180ms",
        description: "Executes semantic text-classification and maps sentiment weights dynamically down to active target assets."
      },
      {
        id: "action-03",
        label: "Automated Position Dispatch",
        category: "output",
        status: "idle",
        metrics: "Rest API Hook",
        description: "Triggers safety breakers and releases API orders to clear transactional positions based on sentiment thresholds."
      }
    ],
    edges: [
      { from: "ingest-01", to: "correlation-02", label: "Streaming Signals", type: "async" },
      { from: "correlation-02", to: "action-03", label: "Risk Assessments", type: "secure" }
    ],
    yamlTemplate: `version: "sfng.v4b"
metadata:
  blueprint_id: "sentiment-correlation-engine"
  arch_type: "realtime_streaming_matrix"
  designed_by: "SFNG Quantitative Division"

pipeline:
  feed_listener:
    type: "websocket_streaming"
    channels: ["financial_news_stream", "market_ticker_feed"]
    ping_interval: "2500ms"

  cognitive_scorer:
    engine: "realtime_vector_evalutor"
    model: "gemini-2.5-flash"
    max_history_buffer: "5m"
    dimensions: ["bullish", "bearish", "regulatory_panic", "innovation"]

  execution_gateway:
    id: "safety_breaker_broker"
    max_drawdown_limit: "0.02"
    alert_dispatch: "pageduty"
`
  }
];
