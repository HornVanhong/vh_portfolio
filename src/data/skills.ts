import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "cybersecurity",
    title: { en: "Cybersecurity", km: "សន្តិសុខសាយប័រ", ko: "사이버보안" },
    skills: ["Penetration Testing", "Vulnerability Assessment", "Web Application Security", "OWASP Top 10", "Security Testing", "Security Research"],
  },
  {
    id: "tools",
    title: { en: "Security Tools", km: "ឧបករណ៍សន្តិសុខ", ko: "보안 도구" },
    skills: ["Kali Linux", "Burp Suite", "Wireshark", "Nmap", "Splunk", "OWASP ZAP", "SQLMap", "Nuclei"],
  },
  {
    id: "ai",
    title: { en: "AI & Machine Learning", km: "AI និង Machine Learning", ko: "AI 및 머신러닝" },
    skills: ["Local LLMs", "Ollama", "vLLM", "Retrieval-Augmented Generation (RAG)", "Vector Databases", "AI Agents"],
  },
  {
    id: "frontend",
    title: { en: "Frontend Development", km: "ការអភិវឌ្ឍ Frontend", ko: "프론트엔드 개발" },
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: { en: "Backend Development", km: "ការអភិវឌ្ឍ Backend", ko: "백엔드 개발" },
    skills: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "SQL"],
  },
  {
    id: "infrastructure",
    title: { en: "Infrastructure", km: "ហេដ្ឋារចនាសម្ព័ន្ធ", ko: "인프라" },
    skills: ["Linux", "Docker", "Git", "GitHub", "Networking Fundamentals"],
  },
];
