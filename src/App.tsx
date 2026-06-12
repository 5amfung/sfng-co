/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Layers, 
  Activity, 
  FileCode, 
  Sparkles, 
  Check, 
  Copy, 
  Plus, 
  ArrowUpRight, 
  Compass, 
  ChevronRight, 
  X, 
  Globe, 
  MapPin, 
  Terminal,
  Grid,
  Zap,
  RefreshCw,
  Sliders,
  HelpCircle
} from "lucide-react";
import { PRESET_BLUEPRINTS } from "./presetData";
import { AppNode, NodeEdge, BlueprintPreset } from "./types";

function DailyLanding() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="daily-page">
      <div className="daily-shell">
        <header className="daily-header">
          <a className="daily-home-link" href="/">
            SFNG
          </a>
          <nav className="daily-nav" aria-label="Daily links">
            <a href="#why">why</a>
            <a href="/daily/privacy.html">privacy</a>
            <a href="/daily/terms.html">terms</a>
          </nav>
        </header>

        <main>
          <section className="daily-hero" aria-labelledby="daily-title">
            <p className="daily-kicker">/daily/index.html</p>
            <h1 id="daily-title">Daily</h1>
            <p className="daily-tagline">
              A quiet study app for saving the words, phrases, and tiny pieces
              of knowledge you want to remember.
            </p>
            <div className="daily-rule" aria-hidden="true">
              ------------------------------------------------------------
            </div>
            <p className="daily-intro">
              Daily keeps decks, entries, search, and review in one small
              local-first place. Add what you are learning, review it when it is
              due, and keep moving.
            </p>
          </section>

          <section className="daily-panel" id="why" aria-labelledby="why-title">
            <p className="daily-section-label">01 // why it exists</p>
            <h2 id="why-title">Most study apps feel like chores.</h2>
            <p>
              Daily is built for the smaller, more personal habit: capture a
              thing worth remembering, give it enough context to matter, and let
              the review queue bring it back before it fades.
            </p>
          </section>

          <section className="daily-grid" aria-label="Daily feature list">
            <article>
              <p className="daily-section-label">deck</p>
              <h3>Organize what belongs together.</h3>
              <p>
                Keep vocab, examples, notes, and prompts in focused decks.
              </p>
            </article>
            <article>
              <p className="daily-section-label">review</p>
              <h3>Practice from memory.</h3>
              <p>
                Prompt first, answer second, then score the card and advance.
              </p>
            </article>
            <article>
              <p className="daily-section-label">search</p>
              <h3>Find the thing again.</h3>
              <p>
                Search across entries when you remember the shape but not the
                deck.
              </p>
            </article>
          </section>

        </main>

        <footer className="daily-footer">
          <p>Daily is made by SFNG LLC.</p>
          <p>(c) {currentYear} SFNG LLC</p>
        </footer>
      </div>
    </div>
  );
}

function BlueprintLanding() {
  // Navigation & UI State
  const [activePreset, setActivePreset] = useState<BlueprintPreset>(PRESET_BLUEPRINTS[0]);
  const [labOpen, setLabOpen] = useState(false);
  const [gridLinesEnabled, setGridLinesEnabled] = useState(true);
  
  // Custom Dynamic Blueprint Builder State
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customBps, setCustomBps] = useState<BlueprintPreset[]>([]);
  
  // Detailed Inspector Card selection
  const [selectedNode, setSelectedNode] = useState<AppNode | null>(PRESET_BLUEPRINTS[0].nodes[0]);
  const [copiarSuccess, setCopiarSuccess] = useState(false);
  
  // Local coordinate / time tracking
  const [currentTime, setCurrentTime] = useState("");
  const [latitude, setLatitude] = useState("40.7128");
  const [longitude, setLongitude] = useState("-74.0060");
  const [locationName, setLocationName] = useState("NEW YORK // AMER");
  const [statusPulse, setStatusPulse] = useState(true);
  const [customMetricPulse, setCustomMetricPulse] = useState(0);

  // Set active node whenever preset changes
  useEffect(() => {
    if (activePreset && activePreset.nodes.length > 0) {
      setSelectedNode(activePreset.nodes[0]);
    }
  }, [activePreset]);

  // Clock Update Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", "  ").substring(0, 21) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Soft numeric fluctuations for dynamic blueprint monitoring feeling
  useEffect(() => {
    const interval = setInterval(() => {
      setCustomMetricPulse((prev) => (prev + 1) % 100);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Update Location Coordinates dynamically using user input or Browser APIs
  const requestLocation = () => {
    if (navigator.geolocation) {
      setLocationName("SYNC_LOCATING...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(4));
          setLongitude(position.coords.longitude.toFixed(4));
          setLocationName("LOC_SECURED // SYNC_COORD");
        },
        () => {
          setLocationName("COORD_REFUSED // BACK_NYC");
          // Reset to default
          setLatitude("40.7128");
          setLongitude("-74.0060");
        }
      );
    }
  };

  // Clipboard Copiar helper
  const handleCopyYAML = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiarSuccess(true);
    setTimeout(() => setCopiarSuccess(false), 2000);
  };

  // Parsing engine - Construct custom high-end systems mapping instantly based on key vocabularies
  const handleGenerateCustomBlueprint = (e: FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGeneratingCustom(true);
    
    setTimeout(() => {
      const promptLower = customPrompt.toLowerCase();
      
      // Determine pipeline content based on prompt analysis
      const nodes: AppNode[] = [];
      const edges: NodeEdge[] = [];
      
      // Node 1: Ingest
      let ingestLabel = "Smart Stream Gateway";
      let ingestDesc = "Captures external signals, validates structure, and queues payloads.";
      let ingestMetrics = "Active SSE Feed";
      
      if (promptLower.includes("file") || promptLower.includes("pdf") || promptLower.includes("document")) {
        ingestLabel = "Unified Document Scan Gateway";
        ingestDesc = "Ingests multi-page documents, parses layout grids, and extracts layout schemas.";
        ingestMetrics = "Payload Scanner";
      } else if (promptLower.includes("slack") || promptLower.includes("discord") || promptLower.includes("api") || promptLower.includes("webhook")) {
        ingestLabel = "Asynchronous Gateway Event Log";
        ingestDesc = "Funnels live webhook sockets, ensures payload signature safety, and verifies HMAC keys.";
        ingestMetrics = "HTTP Proxy v2";
      } else if (promptLower.includes("scrape") || promptLower.includes("crawler") || promptLower.includes("web") || promptLower.includes("search")) {
        ingestLabel = "Search Crawling Array";
        ingestDesc = "Spins headless scrape workers to collect raw text feeds and filter site headers.";
        ingestMetrics = "Dynamic Crawler IP";
      }
      
      nodes.push({
        id: "cus-ingest-01",
        label: ingestLabel,
        category: "ingest",
        status: "complete",
        metrics: ingestMetrics,
        description: ingestDesc
      });

      // Node 2: Analysis/Process
      let processLabel = "Semantic Context Synthesizer";
      let processModel = "gemini-2.5-flash";
      let processLatency = "140ms";
      let processDesc = "Pulls auxiliary variables, embeds content vectors, and structures model queries.";
      
      if (promptLower.includes("translate") || promptLower.includes("language") || promptLower.includes("multilingual")) {
        processLabel = "Multi-Lingual Token Mapping Matrix";
        processModel = "gemini-2.5-flash";
        processLatency = "280ms";
        processDesc = "Identifies linguistic bounds, parses vocabulary vectors, and aligns translation context tables.";
      } else if (promptLower.includes("code") || promptLower.includes("developer") || promptLower.includes("database") || promptLower.includes("postgres") || promptLower.includes("sql")) {
        processLabel = "Data Relational Embedding Router";
        processModel = "gemini-2.5-pro";
        processLatency = "410ms";
        processDesc = "Examines target database variables, compiles schema bounds, and structures compliant relational mappings.";
      } else if (promptLower.includes("image") || promptLower.includes("visual") || promptLower.includes("photo") || promptLower.includes("chart")) {
        processLabel = "Vision Transformer Matrix";
        processModel = "gemini-2.5-flash";
        processLatency = "380ms";
        processDesc = "Segments graphic channels, generates coordinate captions, and extracts functional visual tokens.";
      }

      nodes.push({
        id: "cus-process-02",
        label: processLabel,
        category: "process",
        modelName: processModel,
        status: "active",
        latency: processLatency,
        description: processDesc
      });

      // Node 3: Router / Strategic Prompt agent
      let agentLabel = "Orchestrated Cognitive Agent Core";
      let agentModel = "gemini-2.5-pro";
      let agentLatency = "490ms";
      let agentDesc = "Coordinates step-by-step logic routing, verifies accuracy criteria, and formats execution plans.";
      
      if (promptLower.includes("summarize") || promptLower.includes("summary") || promptLower.includes("digest")) {
        agentLabel = "Salience Distiller Core";
        agentModel = "gemini-2.5-flash";
        agentLatency = "220ms";
        agentDesc = "Condenses lengthy text, highlights key findings, and extracts functional action items.";
      } else if (promptLower.includes("security") || promptLower.includes("filter") || promptLower.includes("guard") || promptLower.includes("audit")) {
        agentLabel = "Dual-Pass Compliance Auditor";
        agentModel = "gemini-2.5-pro";
        agentLatency = "620ms";
        agentDesc = "Subjects processing logs to safety firewalls, checks regulatory checklists, and logs exceptions.";
      }

      nodes.push({
        id: "cus-agent-03",
        label: agentLabel,
        category: "agent",
        modelName: agentModel,
        status: "active",
        latency: agentLatency,
        description: agentDesc
      });

      // Node 4: Output Egress
      let outputLabel = "Secured Dispatch Gateway";
      let outputMetrics = "Rest API Stream";
      let outputDesc = "Translates cognitive findings into clean transactional code, and triggers external OAuth webhooks.";
      
      if (promptLower.includes("slack") || promptLower.includes("discord")) {
        outputLabel = "Slack Socket Event Dispatcher";
        outputMetrics = "Bearer OAuth";
        outputDesc = "Transfers nicely formatted rich markdown panels directly into Slack team channels.";
      } else if (promptLower.includes("email") || promptLower.includes("gmail") || promptLower.includes("sendgrid")) {
        outputLabel = "Authenticated SMTP Relay Core";
        outputMetrics = "Secure TLS Mail";
        outputDesc = "Renders responsive corporate email templates, registers digital signatures, and transfers messages.";
      } else if (promptLower.includes("database") || promptLower.includes("postgres") || promptLower.includes("save") || promptLower.includes("sql")) {
        outputLabel = "Transactional Commit Gateway";
        outputMetrics = "UPSERT Binary";
        outputDesc = "Runs safe sql transactions, synchronizes index records, and notifies analytical hubs.";
      }

      nodes.push({
        id: "cus-output-04",
        label: outputLabel,
        category: "output",
        status: "complete",
        metrics: outputMetrics,
        description: outputDesc
      });

      // Connect nodes sequentially with edges
      edges.push({ from: "cus-ingest-01", to: "cus-process-02", label: "Payload Dispatch", type: "sync" });
      edges.push({ from: "cus-process-02", to: "cus-agent-03", label: "Grounding Inject", type: "secure" });
      edges.push({ from: "cus-agent-03", to: "cus-output-04", label: "Execute Callback", type: "async" });

      // Generate customized YAML design specs dynamically
      const cleanTagName = customPrompt.substring(0, 15).toUpperCase().replace(/[^A-Z]/g, "") || "CUST";
      const bpId = `cus-${cleanTagName.toLowerCase()}-${Math.floor(Math.random() * 900 + 100)}`;
      
      const newBp: BlueprintPreset = {
        id: bpId,
        name: `Dynamic System: "${customPrompt.length > 30 ? customPrompt.substring(0, 30) + "..." : customPrompt}"`,
        subtitle: `DYNAMIC_BLUE_GEN // ${cleanTagName}_CORE`,
        tag: cleanTagName,
        description: `Bespoke workflow generated to orchestrate: "${customPrompt}". Built with extreme integrity matching specialized multi-layered pipelines.`,
        estimatedTotalLatency: `${(parseFloat(processLatency) + parseFloat(agentLatency)).toFixed(0)}ms`,
        reliabilityScore: "99.96%",
        useCase: `Enterprise deployment for: ${customPrompt}`,
        nodes,
        edges,
        yamlTemplate: `version: "sfng.v4b"
metadata:
  blueprint_id: "${bpId}"
  arch_type: "dynamic_prompt_synthesis"
  designed_by: "SFNG Dynamic Engine v1.0"
  system_objective: "${customPrompt}"

pipeline:
  ingestion_channel:
    id: "${nodes[0].id}"
    label: "${nodes[0].label}"
    protocols: ["${nodes[0].metrics}"]

  analytical_engine:
    id: "${nodes[1].id}"
    model: "${nodes[1].modelName}"
    target_role: "contextual_grounding"
    processing_latency: "${nodes[1].latency}"

  autonomous_agent:
    id: "${nodes[2].id}"
    model: "${nodes[2].modelName}"
    target_role: "autonomous_evaluation_routing"
    processing_latency: "${nodes[2].latency}"

  egress_delivery:
    id: "${nodes[3].id}"
    destination_metrics: "${nodes[3].metrics}"
    delivery_guarantee: "at_least_once_deterministic"
`
      };

      setCustomBps(prev => [newBp, ...prev]);
      setActivePreset(newBp);
      setIsGeneratingCustom(false);
      setCustomPrompt("");
    }, 1200);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-void-charcoal text-architectural-white font-sans overflow-x-hidden selection:bg-primary-cobalt selection:text-white noise-bg">
      
      {/* Structural Architectural Blueprint Lines Overlay */}
      {gridLinesEnabled && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Subtle grid squares background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
          
          {/* Major axes lines mimicking professional blueprints */}
          <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-white/10" />
          <div className="absolute top-0 bottom-0 left-[35%] w-[1px] bg-white/5" />
          <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-white/5" />
          <div className="absolute top-0 bottom-0 left-[90%] w-[1px] bg-white/10" />
          
          <div className="absolute top-[80px] left-0 right-0 h-[1px] bg-white/10" />
          <div className="absolute top-[680px] left-0 right-0 h-[1px] bg-white/5" />
          <div className="absolute top-[1380px] left-0 right-0 h-[1px] bg-white/5" />
        </div>
      )}

      {/* Floating System Status HUD (Top Margin) */}
      <div className="sticky top-0 z-40 bg-void-charcoal/90 backdrop-blur-md border-b border-white/10 h-16 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="#" className="font-serif text-xl tracking-tight font-bold hover:opacity-80 transition-opacity">
            SFNG
          </a>
          <span className="hidden md:inline text-[9px] font-mono text-white/40 tracking-wider">
            // SECURE_CANVAS_V4.0
          </span>
        </div>

        {/* Live System Diagnostics */}
        <div className="flex items-center space-x-6 md:space-x-12">
          {/* Active node state */}
          <div 
            className="flex items-center space-x-2 font-mono text-[10px] cursor-pointer"
            onClick={() => setStatusPulse(!statusPulse)}
            title="Click to toggle telemetry cycle"
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${statusPulse ? "animate-ping" : ""}`} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="hidden sm:inline uppercase tracking-widest text-white/80 font-bold">
              [STATUS_ACTIVE]
            </span>
          </div>
        </div>
      </div>

      <main className="relative z-25 max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24">
        
        {/* HERO SECTION */}
        <section id="hero-section" className="relative min-h-[640px] flex flex-col justify-between pt-8 lg:pt-16 pb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left title sequence section */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center space-x-3 text-white/50 font-mono text-xs tracking-widest">
                <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-[1px] font-mono text-[10px] tracking-wider">
                  [INITIATE_SEQUENCE]
                </span>
                <span className="h-[1px] w-24 bg-white/30" />
              </div>

              {/* Master Header (Expressive Typography) */}
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[100px] font-bold leading-[1.05] tracking-tight text-architectural-white max-w-4xl pt-4">
                Architecting <br />
                <span className="font-serif italic font-normal text-white/90">AI-Driven</span> Workflows <br />
                <span className="font-serif italic font-normal text-white/70">&amp; Smart</span> Applications.
              </h1>
            </div>

            {/* Right system metadata (Matches layout composition) */}
            <div className="lg:col-span-4 lg:pt-16 space-y-6 lg:text-right font-mono text-xs text-white/50 border-t border-white/5 lg:border-t-0 pt-6">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/30">SYS.VERSION</p>
                <p className="text-white font-semibold">SYS.VER // 4.0.2-beta</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/30">LUMINANCE_TIER</p>
                <p className="text-white/80">TIER_01 // GLASS_RESONANCE</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/30">ENGINEERING_LOCUS</p>
                <p className="text-white/70">SECURED_SANDBOX_CONTAINER</p>
              </div>
            </div>

          </div>

          {/* Lower Hero (Asymmetric split paragraph and scroll anchor) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-16 lg:pt-36 items-end">
            
            {/* Scroll Indicator Hanging on axis */}
            <div className="lg:col-span-3 flex items-center space-x-4">
              <div className="h-20 w-[1px] bg-gradient-to-b from-white/40 to-transparent relative">
                <motion.div 
                  className="absolute top-0 left-[-1.5px] w-1 h-1 bg-primary-cobalt rounded-full shadow-[0_0_8px_#0047FF]"
                  animate={{ y: [0, 60, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                />
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-white/40 transform rotate-90 origin-left ml-2 whitespace-nowrap">
                SCROLL_TO_ENGINEER
              </div>
            </div>

            {/* Empty Center */}
            <div className="hidden lg:col-span-4" />

            {/* Introductory copy and Call to action */}
            <div className="lg:col-span-5 space-y-6">
              <p className="font-sans text-base lg:text-[17px] leading-relaxed text-white/70 font-light max-w-md">
                We define the architecture of thought. Precision engineering meets strategic foresight to build robust, scalable intelligence systems that operate at the vanguard of digital transformation.
              </p>


            </div>

          </div>

        </section>

        {/* CONTROLLER SECTION: THE ARCHITECTURE */}
        <section id="architecture-section" className="relative pt-24 pb-12 border-t border-white/10 mt-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Axis Label */}
            <div className="lg:col-span-3 font-mono text-[11px] text-white/40 flex items-center space-x-2">
              <span className="font-bold text-white/80">02</span>
              <span className="h-[1px] w-6 bg-white/20" />
              <span className="uppercase tracking-widest">SYSTEM_TAXONOMY</span>
            </div>

            {/* Headline */}
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-architectural-white lg:text-center">
                The Architecture
              </h2>
            </div>

            {/* Classification Node */}
            <div className="lg:col-span-4 lg:text-right">
              <span className="inline-block border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white/50 bg-white/2">
                CORE_SYSTEM
              </span>
            </div>

          </div>

          {/* Sequential Timeline System Nodes (Strategic Advisory, Intelligent Engineering, Applied Productization) */}
          <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-12 relative">
            
            {/* System Node 01: Strategic Advisory */}
            <div className="group relative border-l lg:border-l-0 lg:border-t border-white/10 pt-6 pl-6 lg:pl-0 lg:pt-8 space-y-4">
              
              {/* Dot decorator strictly following blueprint styling */}
              <div className="absolute top-0 left-[-4.5px] lg:top-[-4.5px] lg:left-0 h-2 w-2 rounded-full border border-primary-cobalt bg-void-charcoal z-20 group-hover:bg-primary-cobalt transition-colors duration-300" />
              
              <div className="space-y-1">
                <p className="font-mono text-[10px] text-primary-cobalt font-bold tracking-widest flex items-center space-x-1.5">
                  <span className="bg-primary-cobalt/10 text-primary-cobalt px-1 py-0.5 rounded-[1px] text-[8px]">01</span>
                  <span>[SYSTEM_01]</span>
                </p>
                <h3 className="font-serif text-xl lg:text-2xl font-bold text-architectural-white group-hover:text-primary-cobalt transition-colors duration-300">
                  Strategic Advisory
                </h3>
              </div>

              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Aligning executive vision with technological reality. We map the terrain of AI integration, defining precise roadmaps that mitigate risk while maximizing asymmetric upside in operational efficiency.
              </p>
              
              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                  <span>DEPLOYMENT_PHASE</span>
                  <ChevronRight className="w-2.5 h-2.5" />
                  <span className="text-white/60">DISCOVERY</span>
                </span>
              </div>
            </div>

            {/* System Node 02: Intelligent Engineering */}
            <div className="group relative border-l lg:border-l-0 lg:border-t border-white/10 pt-6 pl-6 lg:pl-0 lg:pt-8 space-y-4">
              
              {/* Dot decorator */}
              <div className="absolute top-0 left-[-4.5px] lg:top-[-4.5px] lg:left-0 h-2 w-2 rounded-full border border-white/30 bg-void-charcoal z-20 group-hover:border-primary-cobalt group-hover:bg-primary-cobalt transition-colors duration-300" />
              
              <div className="space-y-1">
                <p className="font-mono text-[10px] text-white/40 font-bold tracking-widest flex items-center space-x-1.5">
                  <span className="bg-white/5 text-white/40 px-1 py-0.5 rounded-[1px] text-[8px]">02</span>
                  <span>[SYSTEM_02]</span>
                </p>
                <h3 className="font-serif text-xl lg:text-2xl font-bold text-architectural-white group-hover:text-primary-cobalt transition-colors duration-300">
                  Intelligent Engineering
                </h3>
              </div>

              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Constructing the foundation. From bespoke data pipelines to custom model fine-tuning, our engineering practices are rooted in robust architectural principles ensuring zero-downtime intelligence.
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                  <span>PIPELINE_ORCHESTRATOR</span>
                  <ChevronRight className="w-2.5 h-2.5" />
                  <span className="text-white/60">DEEP_STACK</span>
                </span>
              </div>
            </div>

            {/* System Node 03: Applied Productization */}
            <div className="group relative border-l lg:border-l-0 lg:border-t border-white/10 pt-6 pl-6 lg:pl-0 lg:pt-8 space-y-4">
              
              {/* Dot decorator */}
              <div className="absolute top-0 left-[-4.5px] lg:top-[-4.5px] lg:left-0 h-2 w-2 rounded-full border border-white/30 bg-void-charcoal z-20 group-hover:border-primary-cobalt group-hover:bg-primary-cobalt transition-colors duration-300" />
              
              <div className="space-y-1">
                <p className="font-mono text-[10px] text-white/40 font-bold tracking-widest flex items-center space-x-1.5">
                  <span className="bg-white/5 text-white/40 px-1 py-0.5 rounded-[1px] text-[8px]">03</span>
                  <span>[SYSTEM_03]</span>
                </p>
                <h3 className="font-serif text-xl lg:text-2xl font-bold text-architectural-white group-hover:text-primary-cobalt transition-colors duration-300">
                  Applied Productization
                </h3>
              </div>

              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                Translating raw computational power into elegant, utilitarian interfaces. We design high-end enterprise tools that obscure underlying complexity, delivering pure, actionable insight to the end-user.
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                  <span>INTERFACE_HUMAN</span>
                  <ChevronRight className="w-2.5 h-2.5" />
                  <span className="text-white/60">PRODUCTIVITY</span>
                </span>
              </div>
            </div>

          </div>



        </section>

        {/* LABORATORY CONTAINER PANEL */}
        <AnimatePresence>
          {labOpen && (
            <motion.section 
              id="blueprint-laboratory-overlay"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative mt-12 bg-zinc-950/90 border border-white/10 glow-cobalt z-30 p-6 lg:p-10"
            >
              
              {/* Header inside of Lab */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/15 pb-6 mb-8 gap-4">
                <div>
                  <div className="flex items-center space-x-2 font-mono text-[10px] text-primary-cobalt">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary-cobalt opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-cobalt" />
                    </span>
                    <span>ACTIVE_ENVIRONMENT // WORKFLOW_SYNTHS</span>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3.5xl font-bold text-architectural-white mt-1">
                    Blueprint Laboratory Workspace
                  </h3>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Documentation indicator or guidelines */}
                  <span className="hidden sm:inline font-mono text-[9px] text-white/40 tracking-wider">
                    CLICK_NODES_TO_AUDIT
                  </span>
                  
                  {/* Close button */}
                  <button 
                    id="close-lab-button"
                    onClick={() => setLabOpen(false)}
                    className="p-2 border border-white/10 hover:border-red-400/50 hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-all rounded-[1px] cursor-pointer"
                    title="Close Laboratory Panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Prompter (AI Model Generator Interface) */}
              <div className="bg-white/5 border border-white/10 p-5 mb-8">
                <form id="dynamic-blueprint-form" onSubmit={handleGenerateCustomBlueprint} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <label className="font-mono text-xs text-white/75 tracking-wider uppercase font-bold flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5 text-primary-cobalt" />
                      <span>Dynamic Custom Generation Core</span>
                    </label>
                    <span className="text-[10px] font-mono text-white/40">Powered by Local Prompt Parsing Rules</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-stretch">
                    <div className="relative flex-1">
                      <input 
                        id="custom-blueprint-prompt-input"
                        type="text"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="e.g. A processing pipeline to translate incoming multi-lingual legal files & post summaries to slack"
                        className="w-full bg-zinc-900 border border-white/15 hover:border-white/30 focus:border-primary-cobalt focus:outline-none px-4 py-3.5 font-mono text-xs text-architectural-white rounded-[1px] placeholder:text-white/20 transition-colors"
                      />
                      {customPrompt && (
                        <button
                          type="button"
                          onClick={() => setCustomPrompt("")}
                          className="absolute right-3 top-3.5 text-white/40 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isGeneratingCustom || !customPrompt.trim()}
                      className="group flex items-center justify-center space-x-2 px-6 py-3.5 bg-primary-cobalt hover:bg-blue-600 disabled:bg-white/10 disabled:text-white/30 text-white font-mono text-xs tracking-widest uppercase font-bold transition-all duration-200 cursor-pointer"
                    >
                      {isGeneratingCustom ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>SYNTHESIZING_...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>SYNTHESIZE_WORKFLOW</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Central laboratory Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Panel: PRESET SYSTEMS SELECTOR */}
                <div className="lg:col-span-3 space-y-4">
                  <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase font-bold pb-1 border-b border-white/5">
                    Select Blueprints ID
                  </p>
                  
                  <div className="space-y-2 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
                    {PRESET_BLUEPRINTS.map((bp) => (
                      <button
                        id={`select-preset-${bp.id}`}
                        key={bp.id}
                        onClick={() => setActivePreset(bp)}
                        className={`w-full text-left p-4 rounded-[1px] border transition-all cursor-pointer block group ${
                          activePreset.id === bp.id
                            ? "border-primary-cobalt bg-primary-cobalt/5"
                            : "border-white/10 bg-white/[0.01] hover:border-white/35 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-15">
                          <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            activePreset.id === bp.id
                              ? "bg-primary-cobalt text-white"
                              : "bg-white/10 text-white/60"
                          }`}>
                            {bp.tag}
                          </span>
                          <span className="font-mono text-[8px] text-white/30 tracking-wider">
                            {bp.estimatedTotalLatency}
                          </span>
                        </div>
                        <p className="font-serif text-sm font-bold text-architectural-white leading-tight group-hover:text-primary-cobalt transition-colors">
                          {bp.name}
                        </p>
                        <p className="font-mono text-[9px] text-white/40 mt-1 uppercase tracking-widest truncate">
                          {bp.subtitle}
                        </p>
                      </button>
                    ))}

                    {/* Dynamically Created Custom Blueprints List */}
                    {customBps.length > 0 && (
                      <div className="pt-3 border-t border-white/10 space-y-2">
                        <p className="font-mono text-[9px] text-amber-400-dim text-white/40 tracking-wider uppercase">
                          Dynamic Blueprints ({customBps.length})
                        </p>
                        {customBps.map((bp) => (
                          <button
                            id={`select-custom-${bp.id}`}
                            key={bp.id}
                            onClick={() => setActivePreset(bp)}
                            className={`w-full text-left p-4 rounded-[1px] border transition-all cursor-pointer block group ${
                              activePreset.id === bp.id
                                ? "border-amber-500 bg-amber-500/5"
                                : "border-amber-500/20 bg-amber-500/1"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                {bp.tag}
                              </span>
                              <span className="font-mono text-[8px] text-white/40">
                                {bp.estimatedTotalLatency}
                              </span>
                            </div>
                            <p className="font-serif text-sm font-bold text-architectural-white leading-tight">
                              {bp.name}
                            </p>
                            <p className="font-mono text-[9px] text-white/40 mt-1 uppercase tracking-widest truncate">
                              Generated System
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* System Load Telemetry info card */}
                  <div className="bg-white/2 border border-white/5 p-4 space-y-3 font-mono text-[10px] text-white/50">
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                      <span className="text-white/30 uppercase">Telemetry state</span>
                      <span className="text-emerald-400">CONNECT_SECURE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>STRE_CAPACITY</span>
                      <span className="text-white">94.5% BUFFER</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>RELIABILITY</span>
                      <span className="text-white">{activePreset.reliabilityScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SIM_PING</span>
                      <span className="text-white">{(customMetricPulse * 0.4 + 12).toFixed(1)}ms</span>
                    </div>
                  </div>
                </div>

                {/* Center Canvas: INTERACTIVE BLOCK INTERCONNECT DIAGRAM */}
                <div className="lg:col-span-5 bg-zinc-900/50 border border-white/10 p-4 relative flex flex-col justify-between min-h-[420px]">
                  
                  {/* Grid decoration */}
                  <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
                  
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 relative z-10">
                    <span className="font-mono text-[9px] text-white/30 uppercase">
                      SYSTEM INTERCONNECT_MAP
                    </span>
                    <span className="font-mono text-[9px] text-white/50 bg-white/5 px-2 py-0.5 font-bold uppercase tracking-widest">
                      {activePreset.yamlTemplate.includes("dynamic") ? "DYNAMIC_GEN" : "SPEC_V4_CORE"}
                    </span>
                  </div>

                  {/* Nodes & Edges Render Stage */}
                  <div className="relative flex-1 flex flex-col justify-around py-8 z-10">
                    
                    {/* SVG Connections Canvas Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <svg className="w-full h-full">
                        {activePreset.edges.map((edge, idx) => {
                          const fromId = edge.from;
                          const toId = edge.to;
                          // In-app we render sequential boxes, so let's draw simplified beautiful connecting lines
                          return (
                            <g key={idx}>
                              {/* Horizontal pulsing flow path */}
                              <line 
                                x1="50%" 
                                y1={`${23 + idx * 26}%`} 
                                x2="50%" 
                                y2={`${23 + (idx + 1) * 26}%`} 
                                stroke={selectedNode?.id === fromId || selectedNode?.id === toId ? "#0047FF" : "rgba(255,255,255,0.15)"} 
                                strokeWidth={selectedNode?.id === fromId || selectedNode?.id === toId ? "1.5" : "1"}
                                strokeDasharray={edge.type === "async" ? "4,4" : undefined}
                                className="transition-all duration-300"
                              />
                              {/* Glowing pulse core */}
                              <circle 
                                r="2.5" 
                                fill="#0047FF"
                                cy={`${23 + idx * 26 + 13}%`}
                                cx="50%"
                                className="animate-bounce"
                              />
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    {/* Nodes Loop */}
                    {activePreset.nodes.map((node, index) => {
                      const isSelected = selectedNode?.id === node.id;
                      
                      return (
                        <div key={node.id} className="relative z-10 w-full flex justify-center">
                          <button
                            id={`node-select-${node.id}`}
                            onClick={() => setSelectedNode(node)}
                            className={`w-11/12 max-w-sm text-left p-3 border transition-all duration-300 relative group flex items-center justify-between ${
                              isSelected
                                ? "border-primary-cobalt bg-primary-cobalt/10 glow-cobalt"
                                : "border-white/10 bg-void-charcoal/80 hover:border-white/30"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {/* Category specific symbol */}
                              <span className={`p-1.5 rounded transition-colors ${
                                isSelected ? "bg-primary-cobalt/20 text-primary-cobalt" : "bg-white/5 text-white/50"
                              }`}>
                                {node.category === "ingest" && <Globe className="w-3.5 h-3.5" />}
                                {node.category === "process" && <Cpu className="w-3.5 h-3.5" />}
                                {node.category === "agent" && <Sparkles className="w-3.5 h-3.5" />}
                                {node.category === "output" && <Layers className="w-3.5 h-3.5" />}
                              </span>

                              <div>
                                <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest leading-none">
                                  {node.category} {node.modelName ? `// ${node.modelName}` : ""}
                                </p>
                                <p className="font-sans text-xs font-bold text-architectural-white group-hover:text-primary-cobalt transition-colors leading-tight mt-1">
                                  {node.label}
                                </p>
                              </div>
                            </div>

                            <div className="text-right font-mono text-[9px] text-white/60">
                              {node.latency && <span className="text-primary-cobalt">{node.latency}</span>}
                              {node.metrics && <span className="text-white/40">{node.metrics}</span>}
                            </div>

                            {/* Active connection pulse dot inside selected */}
                            {isSelected && (
                              <span className="absolute top-[-2px] right-3 h-1.5 w-1.5 rounded-full bg-primary-cobalt" />
                            )}
                          </button>
                        </div>
                      );
                    })}

                  </div>

                  <div className="border-t border-white/5 pt-2 flex items-center justify-between text-white/40 font-mono text-[8px]">
                    <span>SECURE_COMPLIANCE_PROTOCOL_V4B</span>
                    <span>100% SECURE SANDBOX RUNTIME</span>
                  </div>
                </div>

                {/* Right Panel: DETAIL INSPECTOR & CONFIG EXPORT */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  
                  {/* Section A: Selected Node Details */}
                  {selectedNode && (
                    <div className="bg-white/2 border border-white/10 p-5 space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[8px] text-primary-cobalt tracking-widest uppercase font-bold bg-primary-cobalt/10 px-1.5 py-0.5 rounded-[1px]">
                            {selectedNode.category} inspect_
                          </span>
                          {selectedNode.latency && (
                            <span className="font-mono text-[9px] text-white/40">
                              LATENCY // {selectedNode.latency}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-lg font-bold text-architectural-white mt-2">
                          {selectedNode.label}
                        </h4>
                      </div>

                      <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                        {selectedNode.description}
                      </p>

                      {selectedNode.modelName && (
                        <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                          <span className="font-mono text-[9px] text-white/30 uppercase">Orchestrated Model</span>
                          <span className="font-mono text-[10px] text-architectural-white font-bold flex items-center space-x-1">
                            <span className="h-1.5 w-1.5 bg-primary-cobalt rounded-full inline-block animate-pulse" />
                            <span>{selectedNode.modelName}</span>
                          </span>
                        </div>
                      )}

                      {selectedNode.metrics && (
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-white/30 uppercase">Data metrics</span>
                          <span className="font-mono text-[10px] text-primary-cobalt">{selectedNode.metrics}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Section B: YAML Source Manifest & Copy Action */}
                  <div className="bg-zinc-90 w-full bg-void-charcoal border border-white/10 p-4 flex-1 flex flex-col justify-between min-h-[220px]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                      <span className="font-mono text-[9px] text-white/40 uppercase flex items-center space-x-1">
                        <FileCode className="w-3 h-3 text-primary-cobalt" />
                        <span>YAML CONFIG_SPEC</span>
                      </span>
                      
                      <button
                        onClick={() => handleCopyYAML(activePreset.yamlTemplate)}
                        className="group flex items-center space-x-1.5 px-2.5 py-1 border border-white/10 hover:border-primary-cobalt/50 bg-white/2 hover:bg-primary-cobalt/5 font-mono text-[9px] text-white/60 hover:text-white transition-all cursor-pointer rounded-[1px]"
                        title="Copy configuration text code"
                      >
                        {copiarSuccess ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 group-hover:text-primary-cobalt transition-colors" />
                            <span>COPY_CODE</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex-1 overflow-auto custom-scrollbar max-h-[170px]">
                      <pre className="font-mono text-[9px] text-white/50 leading-relaxed overflow-x-auto whitespace-pre">
                        {activePreset.yamlTemplate}
                      </pre>
                    </div>
                  </div>

                </div>

              </div>

            </motion.section>
          )}
        </AnimatePresence>



      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 py-16 bg-zinc-950 mt-16 px-6 lg:px-12 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-12 font-mono text-xs">
          
          {/* Logo block */}
          <div className="space-y-4">
            <p className="font-serif text-2xl font-bold tracking-tight text-architectural-white">SFNG</p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest">
              © {currentYear} SFNG LLC. ALL RIGHTS RESERVED.
            </p>
          </div>





        </div>
      </footer>

    </div>
  );
}

export default function App() {
  if (window.location.pathname === "/daily" || window.location.pathname === "/daily/") {
    return <DailyLanding />;
  }

  return <BlueprintLanding />;
}
