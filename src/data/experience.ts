import type { TimelineEntry } from "@/types";

export const experience: TimelineEntry[] = [
  {
    id: "rhb",
    org: "RHB Cambodia",
    logo: "/images/logos/RHB.webp",
    title: { en: "Front-End Developer Intern", km: "កម្មសិក្សាការីអ្នកអភិវឌ្ឍ Front-End", ko: "프론트엔드 개발 인턴" },
    period: null, // Fill in from the verified CV.
    points: [
      { en: "Software engineering", km: "វិស្វកម្មកម្មវិធី", ko: "소프트웨어 엔지니어링" },
      { en: "Digital banking", km: "ធនាគារឌីជីថល", ko: "디지털 뱅킹" },
      { en: "Frontend mobile application development", km: "ការអភិវឌ្ឍ Frontend កម្មវិធីទូរស័ព្ទ", ko: "모바일 앱 프론트엔드 개발" },
      { en: "React Native", km: "React Native", ko: "React Native" },
      { en: "Code reviews", km: "ការពិនិត្យកូដ", ko: "코드 리뷰" },
    ],
    skills: [],
  },
  {
    id: "golden-bridge",
    org: "Golden Bridge International School",
    logo: "/images/logos/golden-bridge.png",
    title: { en: "ICT Teacher", km: "គ្រូបង្រៀន ICT", ko: "ICT 교사" },
    period: { en: "September 2025 – January 2026", km: "កញ្ញា ២០២៥ – មករា ២០២៦", ko: "2025년 9월 – 2026년 1월" },
    points: [
      { en: "Teaching ICT lessons", km: "បង្រៀនមេរៀន ICT", ko: "ICT 수업 진행" },
      { en: "Preparing educational materials", km: "រៀបចំឯកសារបង្រៀន", ko: "교육 자료 준비" },
      { en: "Evaluating students", km: "វាយតម្លៃសិស្ស", ko: "학생 평가" },
      { en: "Supporting technology education", km: "គាំទ្រការអប់រំបច្ចេកវិទ្យា", ko: "기술 교육 지원" },
    ],
    skills: [],
  },
];
