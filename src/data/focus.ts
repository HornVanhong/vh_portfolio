import type { FocusArea } from "@/types";

export const focusAreas: FocusArea[] = [
  {
    id: "offensive",
    title: { en: "Offensive Security", km: "សន្តិសុខវាយប្រហារ" },
    points: [
      { en: "Penetration Testing", km: "ការធ្វើតេស្តជ្រៀតចូល" },
      { en: "Web Application Security", km: "សន្តិសុខកម្មវិធីវេប" },
      { en: "Vulnerability Discovery", km: "ការស្វែងរកភាពងាយរងគ្រោះ" },
      { en: "Security Assessment", km: "ការវាយតម្លៃសន្តិសុខ" },
    ],
  },
  {
    id: "defensive",
    title: { en: "Defensive Security", km: "សន្តិសុខការពារ" },
    points: [
      { en: "SOC Fundamentals", km: "មូលដ្ឋានគ្រឹះ SOC" },
      { en: "Network Monitoring", km: "ការត្រួតពិនិត្យបណ្តាញ" },
      { en: "Log Analysis", km: "ការវិភាគ Log" },
      { en: "Incident Response", km: "ការឆ្លើយតបឧប្បត្តិហេតុ" },
    ],
  },
  {
    id: "ai",
    title: { en: "AI Security", km: "សន្តិសុខ AI" },
    points: [
      { en: "Local LLM Security", km: "សន្តិសុខ Local LLM" },
      { en: "AI-Assisted Security Analysis", km: "ការវិភាគសន្តិសុខដោយជំនួយ AI" },
      { en: "RAG Systems", km: "ប្រព័ន្ធ RAG" },
      { en: "Intelligent Security Automation", km: "ស្វ័យប្រវត្តិកម្មសន្តិសុខឆ្លាតវៃ" },
    ],
  },
];
