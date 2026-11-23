import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "cybersecurity",
    title: { en: "Cybersecurity", km: "សន្តិសុខសាយប័រ" },
    skills: ["Penetration Testing", "Vulnerability Assessment", "Web Application Security", "OWASP Top 10", "Security Testing", "Security Research"],
  },
  {
    id: "tools",
    title: { en: "Security Tools", km: "ឧបករណ៍សន្តិសុខ" },
    skills: ["Kali Linux", "Burp Suite", "Wireshark", "Nmap", "Splunk", "OWASP ZAP", "SQLMap", "Nuclei"],
  },
  {
    id: "ai",
    title: { en: "AI & Machine Learning", km: "AI និង Machine Learning" },
    skills: ["Local LLMs", "Ollama", "vLLM", "Retrieval-Augmented Generation (RAG)", "Vector Databases", "AI Agents"],
  },
  {
    id: "frontend",
    title: { en: "Frontend Development", km: "ការអភិវឌ្ឍ Frontend" },
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: { en: "Backend Development", km: "ការអភិវឌ្ឍ Backend" },
    skills: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "SQL"],
  },
  {
    id: "infrastructure",
    title: { en: "Infrastructure", km: "ហេដ្ឋារចនាសម្ព័ន្ធ" },
    skills: ["Linux", "Docker", "Git", "GitHub", "Networking Fundamentals"],
  },
];
