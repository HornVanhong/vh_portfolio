import type { TimelineEntry } from "@/types";

const same = (value: string) => ({ en: value, km: value });

export const education: TimelineEntry[] = [
  {
    id: "kshrd-advanced",
    org: "Korea Software HRD Center (KSHRD)",
    title: { en: "Advanced Course", km: "វគ្គសិក្សាកម្រិតខ្ពស់" },
    period: null,
    points: [
      { en: "Cybersecurity and AI Engineering", km: "សន្តិសុខសាយប័រ និងវិស្វកម្ម AI" },
      { en: "Mastering Local LLMs", km: "ជំនាញ Local LLMs" },
      { en: "Security tools and hands-on learning", km: "ឧបករណ៍សន្តិសុខ និងការអនុវត្តជាក់ស្តែង" },
    ],
    skills: ["Local LLMs"],
  },
  {
    id: "kshrd-basic",
    org: "KSHRD Basic Course",
    title: { en: "Completed 810-hour training", km: "បានបញ្ចប់ការបណ្តុះបណ្តាល ៨១០ ម៉ោង" },
    period: null,
    points: [same("Java"), same("Spring Boot"), same("Next.js"), same("PostgreSQL"), same("Docker"), same("Linux")],
    skills: ["Java", "Spring Boot", "Next.js", "PostgreSQL", "Docker", "Linux"],
  },
  {
    id: "ant",
    org: "ANT Technology Training Center",
    title: { en: "Cybersecurity Training", km: "ការបណ្តុះបណ្តាលសន្តិសុខសាយប័រ" },
    period: null,
    points: [{ en: "MPTC scholarship-supported training", km: "ការបណ្តុះបណ្តាលក្រោមអាហារូបករណ៍ MPTC" }],
    skills: [],
  },
  {
    id: "rupp",
    org: "Royal University of Phnom Penh",
    title: { en: "Computer Science", km: "វិទ្យាសាស្ត្រកុំព្យូទ័រ" },
    period: null, // Add dates and graduation status from the verified CV.
    points: [],
    skills: [],
  },
];
