// Mock data for when APIs fail - ensures demo always works

export const mockIncidents = [
  // Recent incidents (2024) - showing increased frequency
  {
    id: "24",
    title: "AI Chatbot Spreads Disinformation About Elections",
    date: "2024-12-15",
    tags: ["disinformation", "elections", "chatbots", "democracy"],
    reports: [
      { title: "Election Security Report", url: "#" },
      { title: "Disinformation Analysis", url: "#" }
    ]
  },
  {
    id: "23",
    title: "Medical AI Misdiagnoses Rare Disease",
    date: "2024-12-10",
    tags: ["healthcare", "misdiagnosis", "medical AI", "patient safety"],
    reports: [
      { title: "Medical Journal Study", url: "#" },
      { title: "Hospital Investigation", url: "#" }
    ]
  },
  {
    id: "22",
    title: "Autonomous Drone Causes Airport Disruption",
    date: "2024-11-28",
    tags: ["drones", "aviation", "safety", "disruption"],
    reports: [
      { title: "FAA Incident Report", url: "#" },
      { title: "Aviation Week Coverage", url: "#" }
    ]
  },
  {
    id: "21",
    title: "AI Trading Algorithm Causes Market Flash Crash",
    date: "2024-11-20",
    tags: ["trading", "finance", "market manipulation", "algorithms"],
    reports: [
      { title: "SEC Investigation", url: "#" },
      { title: "Financial Times Analysis", url: "#" }
    ]
  },
  {
    id: "20",
    title: "Facial Recognition System Misidentifies Innocent Person",
    date: "2024-11-15",
    tags: ["facial recognition", "misidentification", "criminal justice", "bias"],
    reports: [
      { title: "ACLU Report", url: "#" },
      { title: "Court Documents", url: "#" }
    ]
  },
  {
    id: "19",
    title: "AI Content Moderation Removes Legitimate News",
    date: "2024-11-08",
    tags: ["content moderation", "censorship", "free speech", "social media"],
    reports: [
      { title: "Press Freedom Report", url: "#" },
      { title: "Platform Response", url: "#" }
    ]
  },
  {
    id: "18",
    title: "Deepfake Audio Used in CEO Fraud",
    date: "2024-10-25",
    tags: ["deepfakes", "fraud", "voice cloning", "corporate"],
    reports: [
      { title: "FBI Warning", url: "#" },
      { title: "Cybersecurity Alert", url: "#" }
    ]
  },
  {
    id: "17",
    title: "AI Recruitment Tool Discriminates Against Minorities",
    date: "2024-10-18",
    tags: ["recruitment", "bias", "discrimination", "employment"],
    reports: [
      { title: "EEOC Investigation", url: "#" },
      { title: "Company Settlement", url: "#" }
    ]
  },
  {
    id: "16",
    title: "Smart City Surveillance System Privacy Breach",
    date: "2024-10-12",
    tags: ["surveillance", "privacy", "smart cities", "data breach"],
    reports: [
      { title: "Privacy Watchdog Report", url: "#" },
      { title: "Government Response", url: "#" }
    ]
  },
  {
    id: "15",
    title: "AI-Generated Fake Research Paper Published",
    date: "2024-09-30",
    tags: ["academic integrity", "fake research", "scientific fraud", "publications"],
    reports: [
      { title: "Journal Retraction Notice", url: "#" },
      { title: "Academic Ethics Review", url: "#" }
    ]
  },
  {
    id: "14",
    title: "Autonomous Vehicle Fails to Detect Pedestrian",
    date: "2024-09-22",
    tags: ["autonomous vehicles", "pedestrian safety", "sensors", "accidents"],
    reports: [
      { title: "NHTSA Investigation", url: "#" },
      { title: "Safety Recall Notice", url: "#" }
    ]
  },
  {
    id: "13",
    title: "AI Loan Approval System Shows Racial Bias",
    date: "2024-09-15",
    tags: ["lending", "racial bias", "financial services", "discrimination"],
    reports: [
      { title: "Consumer Protection Report", url: "#" },
      { title: "Class Action Lawsuit", url: "#" }
    ]
  },
  {
    id: "12",
    title: "Chatbot Provides Dangerous Medical Advice",
    date: "2024-08-28",
    tags: ["healthcare", "misinformation", "chatbots", "patient harm"],
    reports: [
      { title: "Medical Board Warning", url: "#" },
      { title: "Patient Safety Alert", url: "#" }
    ]
  },
  {
    id: "11",
    title: "AI Weapon System Engages Wrong Target",
    date: "2024-08-20",
    tags: ["autonomous weapons", "military", "targeting errors", "civilian harm"],
    reports: [
      { title: "UN Investigation", url: "#" },
      { title: "Human Rights Report", url: "#" }
    ]
  },
  {
    id: "10",
    title: "Predictive Policing Algorithm Amplifies Bias",
    date: "2024-08-10",
    tags: ["predictive policing", "bias", "criminal justice", "fairness"],
    reports: [
      { title: "Civil Rights Audit", url: "#" },
      { title: "Policy Reform Proposal", url: "#" }
    ]
  },
  {
    id: "9",
    title: "AI Translation Tool Causes Diplomatic Incident",
    date: "2024-07-25",
    tags: ["translation", "diplomacy", "international relations", "miscommunication"],
    reports: [
      { title: "Foreign Ministry Statement", url: "#" },
      { title: "Diplomatic Analysis", url: "#" }
    ]
  },
  {
    id: "8",
    title: "Social Media Algorithm Promotes Self-Harm Content",
    date: "2024-07-15",
    tags: ["social media", "mental health", "self-harm", "content promotion"],
    reports: [
      { title: "Mental Health Study", url: "#" },
      { title: "Congressional Hearing", url: "#" }
    ]
  },
  {
    id: "7",
    title: "AI Image Generator Creates Non-Consensual Content",
    date: "2024-06-30",
    tags: ["image generation", "non-consensual", "privacy", "harassment"],
    reports: [
      { title: "Legal Action Notice", url: "#" },
      { title: "Platform Policy Update", url: "#" }
    ]
  },
  {
    id: "6",
    title: "Autonomous Delivery Robot Blocks Emergency Vehicle",
    date: "2024-05-20",
    tags: ["delivery robots", "emergency services", "public safety", "navigation"],
    reports: [
      { title: "Emergency Services Report", url: "#" },
      { title: "City Council Review", url: "#" }
    ]
  },
  {
    id: "5",
    title: "AI Grading System Penalizes Non-Native Speakers",
    date: "2024-04-15",
    tags: ["education", "grading bias", "language discrimination", "assessment"],
    reports: [
      { title: "Education Department Review", url: "#" },
      { title: "Student Rights Investigation", url: "#" }
    ]
  },
  {
    id: "4",
    title: "Recommendation Algorithm Radicalizes Users",
    date: "2024-03-10",
    tags: ["radicalization", "recommendations", "extremism", "social media"],
    reports: [
      { title: "Counter-Terrorism Report", url: "#" },
      { title: "Algorithm Audit", url: "#" }
    ]
  },
  {
    id: "3",
    title: "Deepfake Used in Financial Fraud",
    date: "2024-01-05",
    tags: ["deepfakes", "fraud", "financial"],
    reports: [
      { title: "FBI Report", url: "#" }
    ]
  },
  {
    id: "2", 
    title: "AI Hiring Tool Shows Gender Bias",
    date: "2024-01-10",
    tags: ["bias", "hiring", "discrimination"],
    reports: [
      { title: "Research Study", url: "#" },
      { title: "Company Response", url: "#" }
    ]
  },
  {
    id: "1",
    title: "Autonomous Vehicle Crashes into Barrier",
    date: "2024-01-15",
    tags: ["autonomous vehicles", "safety", "crashes"],
    reports: [
      { title: "Investigation Report", url: "#" },
      { title: "News Coverage", url: "#" }
    ]
  }
]

export const mockBenchmarks = [
  { model: "GPT-4o", avg: 0.85, mmlu: 0.86, arc: 0.84, hellaswag: 0.87, gsm8k: 0.92, size_params_b: 175 },
  { model: "Claude-3.5-Sonnet", avg: 0.83, mmlu: 0.84, arc: 0.82, hellaswag: 0.85, gsm8k: 0.90, size_params_b: 150 },
  { model: "Gemini-1.5-Pro", avg: 0.81, mmlu: 0.82, arc: 0.80, hellaswag: 0.83, gsm8k: 0.88, size_params_b: 120 },
  { model: "Llama-3.1-70B", avg: 0.78, mmlu: 0.79, arc: 0.77, hellaswag: 0.80, gsm8k: 0.75, size_params_b: 70 },
  { model: "Llama-3.1-8B", avg: 0.69, mmlu: 0.71, arc: 0.68, hellaswag: 0.72, gsm8k: 0.64, size_params_b: 8 },
  { model: "Llama-3.2-3B", avg: 0.59, mmlu: 0.61, arc: 0.58, hellaswag: 0.62, gsm8k: 0.54, size_params_b: 3 },
  { model: "Llama-3.2-1B", avg: 0.304, mmlu: 0.113, arc: 0.304, hellaswag: 0.308, gsm8k: 0.001, size_params_b: 1 },
  { model: "Mistral-7B-v0.3", avg: 0.72, mmlu: 0.73, arc: 0.71, hellaswag: 0.74, gsm8k: 0.68, size_params_b: 7 },
  { model: "Phi-3.5-mini", avg: 0.65, mmlu: 0.67, arc: 0.64, hellaswag: 0.66, gsm8k: 0.62, size_params_b: 4 },
  { model: "Qwen2.5-7B", avg: 0.74, mmlu: 0.76, arc: 0.73, hellaswag: 0.75, gsm8k: 0.71, size_params_b: 7 },
  { model: "Qwen2.5-14B", avg: 0.79, mmlu: 0.81, arc: 0.78, hellaswag: 0.82, gsm8k: 0.76, size_params_b: 14 },
  { model: "DeepSeek-V2", avg: 0.79, mmlu: 0.80, arc: 0.78, hellaswag: 0.81, gsm8k: 0.76, size_params_b: 21 },
  { model: "Command-R+", avg: 0.77, mmlu: 0.78, arc: 0.76, hellaswag: 0.79, gsm8k: 0.74, size_params_b: 104 },
  { model: "Yi-34B", avg: 0.75, mmlu: 0.76, arc: 0.74, hellaswag: 0.77, gsm8k: 0.72, size_params_b: 34 },
  { model: "Mixtral-8x7B", avg: 0.73, mmlu: 0.74, arc: 0.72, hellaswag: 0.75, gsm8k: 0.70, size_params_b: 47 }
]

export const mockPolicies = [
  {
    policy: "https://example.com/eu-ai-act",
    policyLabel: "EU AI Act",
    country: "https://wikidata.org/entity/Q458",
    countryLabel: "European Union", 
    inception: "2024-02-01"
  },
  {
    policy: "https://example.com/uk-ai-regulation",
    policyLabel: "UK AI Regulation Framework",
    country: "https://wikidata.org/entity/Q145",
    countryLabel: "United Kingdom",
    inception: "2023-12-15"
  },
  {
    policy: "https://example.com/us-ai-executive-order",
    policyLabel: "US AI Executive Order",
    country: "https://wikidata.org/entity/Q30", 
    countryLabel: "United States",
    inception: "2023-10-30"
  }
]

export const mockPublications = [
  { year: 2020, count: 145 },
  { year: 2021, count: 198 },
  { year: 2022, count: 267 },
  { year: 2023, count: 389 },
  { year: 2024, count: 445 }
]

export function createMockIncidentsByMonth() {
  const months = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = date.toISOString().slice(0, 7)
    const count = Math.floor(Math.random() * 15) + 5
    months.push([month, count])
  }
  return months
}
