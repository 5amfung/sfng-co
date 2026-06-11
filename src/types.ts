export interface AppNode {
  id: string;
  label: string;
  category: "ingest" | "process" | "output" | "agent";
  modelName?: string;
  status: "idle" | "active" | "error" | "complete";
  latency?: string;
  description: string;
  metrics?: string;
}

export interface NodeEdge {
  from: string;
  to: string;
  label?: string;
  type?: "sync" | "async" | "secure";
}

export interface BlueprintPreset {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  description: string;
  estimatedTotalLatency: string;
  reliabilityScore: string;
  nodes: AppNode[];
  edges: NodeEdge[];
  yamlTemplate: string;
  useCase: string;
}
