import type { FocusArea } from "@/types";

export const focusAreas: FocusArea[] = [
  {
    id: "offensive",
    title: { en: "Offensive Security", km: "សន្តិសុខវាយប្រហារ", ko: "공격 보안" },
    points: [
      { en: "Penetration Testing", km: "ការធ្វើតេស្តជ្រៀតចូល", ko: "모의해킹" },
      { en: "Web Application Security", km: "សន្តិសុខកម្មវិធីវេប", ko: "웹 애플리케이션 보안" },
      { en: "Vulnerability Discovery", km: "ការស្វែងរកភាពងាយរងគ្រោះ", ko: "취약점 발견" },
      { en: "Security Assessment", km: "ការវាយតម្លៃសន្តិសុខ", ko: "보안 평가" },
    ],
  },
  {
    id: "defensive",
    title: { en: "Defensive Security", km: "សន្តិសុខការពារ", ko: "방어 보안" },
    points: [
      { en: "SOC Fundamentals", km: "មូលដ្ឋានគ្រឹះ SOC", ko: "SOC 기초" },
      { en: "Network Monitoring", km: "ការត្រួតពិនិត្យបណ្តាញ", ko: "네트워크 모니터링" },
      { en: "Log Analysis", km: "ការវិភាគ Log", ko: "로그 분석" },
      { en: "Incident Response", km: "ការឆ្លើយតបឧប្បត្តិហេតុ", ko: "침해사고 대응" },
    ],
  },
  {
    id: "ai",
    title: { en: "AI Security", km: "សន្តិសុខ AI", ko: "AI 보안" },
    points: [
      { en: "Local LLM Security", km: "សន្តិសុខ Local LLM", ko: "로컬 LLM 보안" },
      { en: "AI-Assisted Security Analysis", km: "ការវិភាគសន្តិសុខដោយជំនួយ AI", ko: "AI 활용 보안 분석" },
      { en: "RAG Systems", km: "ប្រព័ន្ធ RAG", ko: "RAG 시스템" },
      { en: "Intelligent Security Automation", km: "ស្វ័យប្រវត្តិកម្មសន្តិសុខឆ្លាតវៃ", ko: "지능형 보안 자동화" },
    ],
  },
];
