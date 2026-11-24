import type { TimelineEntry } from "@/types";

const same = (value: string) => ({ en: value, km: value, ko: value });

export const education: TimelineEntry[] = [
  {
    id: "kshrd-advanced",
    org: "Korea Software HRD Center (KSHRD)",
    logo: "/images/logos/KSHRD.webp",
    title: { en: "Advanced Course", km: "វគ្គសិក្សាកម្រិតខ្ពស់", ko: "심화 과정" },
    period: null,
    points: [
      { en: "Cybersecurity and AI Engineering", km: "សន្តិសុខសាយប័រ និងវិស្វកម្ម AI", ko: "사이버보안 및 AI 엔지니어링" },
      { en: "Mastering Local LLMs", km: "ជំនាញ Local LLMs", ko: "로컬 LLM 마스터하기" },
      { en: "Security tools and hands-on learning", km: "ឧបករណ៍សន្តិសុខ និងការអនុវត្តជាក់ស្តែង", ko: "보안 도구 및 실습 교육" },
    ],
    skills: ["Local LLMs"],
  },
  {
    id: "kshrd-basic",
    org: "KSHRD Basic Course",
    logo: "/images/logos/KSHRD.webp",
    title: { en: "Completed 810-hour training", km: "បានបញ្ចប់ការបណ្តុះបណ្តាល ៨១០ ម៉ោង", ko: "810시간 교육 수료" },
    period: { en: "February 2026 – July 2026", km: "កុម្ភៈ ២០២៦ – កក្កដា ២០២៦", ko: "2026년 2월 – 2026년 7월" },
    points: [same("Java"), same("Spring Boot"), same("Next.js"), same("PostgreSQL"), same("Docker"), same("Linux")],
    skills: ["Java", "Spring Boot", "Next.js", "PostgreSQL", "Docker", "Linux"],
  },
  {
    id: "ant",
    org: "ANT Technology Training Center",
    logo: "/images/logos/ANT.png",
    title: { en: "Cybersecurity Training", km: "ការបណ្តុះបណ្តាលសន្តិសុខសាយប័រ", ko: "사이버보안 교육" },
    period: null,
    points: [{ en: "MPTC scholarship-supported training", km: "ការបណ្តុះបណ្តាលក្រោមអាហារូបករណ៍ MPTC", ko: "MPTC 장학금 지원 교육" }],
    skills: [],
  },
  {
    id: "rupp",
    org: "Royal University of Phnom Penh",
    logo: "/images/logos/Rupp_logo.webp",
    title: { en: "Computer Science", km: "វិទ្យាសាស្ត្រកុំព្យូទ័រ", ko: "컴퓨터과학" },
    period: null, // Add dates and graduation status from the verified CV.
    points: [],
    skills: [],
  },
];
