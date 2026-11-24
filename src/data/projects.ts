import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "reconix",
    title: "Reconix",
    category: { en: "AI-Powered Security Assessment", km: "ការវាយតម្លៃសន្តិសុខដោយ AI", ko: "AI 기반 보안 평가" },
    filters: ["security", "ai"],
    description: {
      en: "An AI-assisted security assessment platform with a terminal-based workflow for planning, approving, executing, and reporting security assessments.",
      km: "វេទិកាវាយតម្លៃសន្តិសុខដែលជួយដោយ AI មានលំហូរការងារក្នុង terminal សម្រាប់រៀបផែនការ អនុម័ត អនុវត្ត និងរាយការណ៍អំពីការវាយតម្លៃសន្តិសុខ។",
      ko: "보안 평가의 계획, 승인, 실행, 보고를 터미널 기반 워크플로로 진행하는 AI 지원 보안 평가 플랫폼입니다.",
    },
    stack: ["Python", "Textual TUI"],
    highlights: [
      { en: "Security Assessment", km: "ការវាយតម្លៃសន្តិសុខ", ko: "보안 평가" },
      { en: "AI Model Integration", km: "ការរួមបញ្ចូលម៉ូដែល AI", ko: "AI 모델 통합" },
      { en: "Findings Management", km: "ការគ្រប់គ្រងលទ្ធផលរកឃើញ", ko: "발견 사항 관리" },
      { en: "Report Generation", km: "ការបង្កើតរបាយការណ៍", ko: "보고서 생성" },
    ],
    flow: [
      { en: "Plan the assessment", km: "រៀបផែនការវាយតម្លៃ", ko: "평가 계획 수립" },
      { en: "Approve the plan", km: "អនុម័តផែនការ", ko: "계획 승인" },
      { en: "Execute from the terminal", km: "អនុវត្តពី terminal", ko: "터미널에서 실행" },
      { en: "Report the findings", km: "រាយការណ៍លទ្ធផល", ko: "결과 보고" },
    ],
    note: {
      en: "Security assessment tooling is for authorized environments only.",
      km: "ឧបករណ៍វាយតម្លៃសន្តិសុខសម្រាប់ប្រើក្នុងបរិស្ថានដែលមានការអនុញ្ញាតប៉ុណ្ណោះ។",
      ko: "보안 평가 도구는 허가된 환경에서만 사용해야 합니다.",
    },
    thumbnail: null,
    art: "recon",
    github: null,
    demo: null,
  },
  {
    slug: "cyberguard-ai",
    title: "CyberGuard AI",
    category: { en: "Telegram Malware Scanner", km: "កម្មវិធីស្កេនមេរោគលើ Telegram", ko: "텔레그램 악성코드 스캐너" },
    filters: ["security", "ai"],
    description: {
      en: "A Telegram security assistant designed to help users analyze suspicious files and receive security guidance.",
      km: "ជំនួយការសន្តិសុខលើ Telegram ដែលជួយអ្នកប្រើវិភាគឯកសារគួរឱ្យសង្ស័យ និងទទួលការណែនាំអំពីសន្តិសុខ។",
      ko: "사용자가 의심스러운 파일을 분석하고 보안 안내를 받을 수 있도록 설계된 텔레그램 보안 어시스턴트입니다.",
    },
    stack: ["Python", "Cloudflare Workers", "Gemini API", "ClamAV", "YARA"],
    highlights: [{ en: "Malware Detection", km: "ការរកឃើញមេរោគ", ko: "악성코드 탐지" }],
    flow: [
      { en: "Send a suspicious file in Telegram", km: "ផ្ញើឯកសារគួរឱ្យសង្ស័យក្នុង Telegram", ko: "텔레그램으로 의심스러운 파일 전송" },
      { en: "Analyze the file", km: "វិភាគឯកសារ", ko: "파일 분석" },
      { en: "Receive security guidance", km: "ទទួលការណែនាំអំពីសន្តិសុខ", ko: "보안 안내 수신" },
    ],
    note: {
      en: "Automated analysis supports a decision; it does not guarantee that a file is safe.",
      km: "ការវិភាគស្វ័យប្រវត្តិជួយក្នុងការសម្រេចចិត្ត ប៉ុន្តែមិនធានាថាឯកសារមានសុវត្ថិភាពទេ។",
      ko: "자동 분석은 판단을 돕는 것이며 파일의 안전을 보장하지 않습니다.",
    },
    thumbnail: null,
    art: "scanner",
    github: null,
    demo: null,
  },
  {
    slug: "edutrace",
    title: "EduTrace / HRD Room",
    category: { en: "Education Management Platform", km: "វេទិកាគ្រប់គ្រងការអប់រំ", ko: "교육 관리 플랫폼" },
    filters: ["web"],
    description: {
      en: "A modern educational platform inspired by classroom management systems, with student and teacher workflows.",
      km: "វេទិកាអប់រំទំនើបដែលបំផុសគំនិតពីប្រព័ន្ធគ្រប់គ្រងថ្នាក់រៀន មានលំហូរការងារសម្រាប់សិស្ស និងគ្រូ។",
      ko: "학급 관리 시스템에서 영감을 받아 학생과 교사의 워크플로를 갖춘 현대적인 교육 플랫폼입니다.",
    },
    stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "REST APIs"],
    highlights: [],
    flow: [
      { en: "Teacher workflow", km: "លំហូរការងាររបស់គ្រូ", ko: "교사 워크플로" },
      { en: "Student workflow", km: "លំហូរការងាររបស់សិស្ស", ko: "학생 워크플로" },
    ],
    note: null,
    thumbnail: null,
    art: "classroom",
    github: null,
    demo: null,
  },
];

/** Number of reserved slots shown after the real projects. Set to 0 to hide them. */
export const reservedProjectSlots = 1;
