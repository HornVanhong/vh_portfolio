import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "reconix",
    title: "Reconix",
    category: { en: "AI-Powered Security Assessment", km: "ការវាយតម្លៃសន្តិសុខដោយ AI" },
    filters: ["security", "ai"],
    description: {
      en: "An AI-assisted security assessment platform with a terminal-based workflow for planning, approving, executing, and reporting security assessments.",
      km: "វេទិកាវាយតម្លៃសន្តិសុខដែលជួយដោយ AI មានលំហូរការងារក្នុង terminal សម្រាប់រៀបផែនការ អនុម័ត អនុវត្ត និងរាយការណ៍អំពីការវាយតម្លៃសន្តិសុខ។",
    },
    stack: ["Python", "Textual TUI"],
    highlights: [
      { en: "Security Assessment", km: "ការវាយតម្លៃសន្តិសុខ" },
      { en: "AI Model Integration", km: "ការរួមបញ្ចូលម៉ូដែល AI" },
      { en: "Findings Management", km: "ការគ្រប់គ្រងលទ្ធផលរកឃើញ" },
      { en: "Report Generation", km: "ការបង្កើតរបាយការណ៍" },
    ],
    flow: [
      { en: "Plan the assessment", km: "រៀបផែនការវាយតម្លៃ" },
      { en: "Approve the plan", km: "អនុម័តផែនការ" },
      { en: "Execute from the terminal", km: "អនុវត្តពី terminal" },
      { en: "Report the findings", km: "រាយការណ៍លទ្ធផល" },
    ],
    note: {
      en: "Security assessment tooling is for authorized environments only.",
      km: "ឧបករណ៍វាយតម្លៃសន្តិសុខសម្រាប់ប្រើក្នុងបរិស្ថានដែលមានការអនុញ្ញាតប៉ុណ្ណោះ។",
    },
    thumbnail: null,
    art: "recon",
    github: null,
    demo: null,
  },
  {
    slug: "cyberguard-ai",
    title: "CyberGuard AI",
    category: { en: "Telegram Malware Scanner", km: "កម្មវិធីស្កេនមេរោគលើ Telegram" },
    filters: ["security", "ai"],
    description: {
      en: "A Telegram security assistant designed to help users analyze suspicious files and receive security guidance.",
      km: "ជំនួយការសន្តិសុខលើ Telegram ដែលជួយអ្នកប្រើវិភាគឯកសារគួរឱ្យសង្ស័យ និងទទួលការណែនាំអំពីសន្តិសុខ។",
    },
    stack: ["Python", "Cloudflare Workers", "Gemini API", "ClamAV", "YARA"],
    highlights: [{ en: "Malware Detection", km: "ការរកឃើញមេរោគ" }],
    flow: [
      { en: "Send a suspicious file in Telegram", km: "ផ្ញើឯកសារគួរឱ្យសង្ស័យក្នុង Telegram" },
      { en: "Analyze the file", km: "វិភាគឯកសារ" },
      { en: "Receive security guidance", km: "ទទួលការណែនាំអំពីសន្តិសុខ" },
    ],
    note: {
      en: "Automated analysis supports a decision; it does not guarantee that a file is safe.",
      km: "ការវិភាគស្វ័យប្រវត្តិជួយក្នុងការសម្រេចចិត្ត ប៉ុន្តែមិនធានាថាឯកសារមានសុវត្ថិភាពទេ។",
    },
    thumbnail: null,
    art: "scanner",
    github: null,
    demo: null,
  },
  {
    slug: "edutrace",
    title: "EduTrace / HRD Room",
    category: { en: "Education Management Platform", km: "វេទិកាគ្រប់គ្រងការអប់រំ" },
    filters: ["web"],
    description: {
      en: "A modern educational platform inspired by classroom management systems, with student and teacher workflows.",
      km: "វេទិកាអប់រំទំនើបដែលបំផុសគំនិតពីប្រព័ន្ធគ្រប់គ្រងថ្នាក់រៀន មានលំហូរការងារសម្រាប់សិស្ស និងគ្រូ។",
    },
    stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "REST APIs"],
    highlights: [],
    flow: [
      { en: "Teacher workflow", km: "លំហូរការងាររបស់គ្រូ" },
      { en: "Student workflow", km: "លំហូរការងាររបស់សិស្ស" },
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
