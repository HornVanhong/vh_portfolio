import type { Certificate } from "@/types";

/*
 * Titles, issuers and dates are copied from the documents. Official titles stay untranslated.
 * The first entries are shown before "Show all". Previews live in public/images/certificates.
 */
export const certificates: Certificate[] = [
  { id: "ant-penetration-testing", title: "Penetration Testing", issuer: "ANT Technology Training Center", date: "2026-08-22", kind: "completion", category: "security", width: 1170, height: 826, skills: ["Penetration Testing"] },
  { id: "thinkcyber-zx301", title: "Penetration Testing (ZX301)", issuer: "ThinkCyber India", date: "2026-05-04", kind: "completion", category: "security", width: 1400, height: 990, skills: ["Penetration Testing"] },
  { id: "cisco-junior-cybersecurity-analyst", title: "Junior Cybersecurity Analyst Career Path", issuer: "Cisco Networking Academy", date: "2025-09-29", kind: "completion", category: "security", width: 1400, height: 1083, skills: ["Vulnerability Assessment"] },
  { id: "kshrd-coding-challenge-excellence", title: "Coding Challenge 2026: Top 1 Award (team)", issuer: "Korea Software HRD Center (KSHRD)", date: "2026-05-12", kind: "award", category: "software", width: 1280, height: 905, skills: [] },
  { id: "kshrd-basic-course", title: "14th Basic Course, Software Experts Training Program (810 hours)", issuer: "Korea Software HRD Center (KSHRD)", date: "2026-07-09", kind: "completion", category: "software", width: 1400, height: 965, skills: [] },
  { id: "cisco-ccna-ensa", title: "CCNAv7: Enterprise Networking, Security, and Automation", issuer: "Cisco Networking Academy", date: "2024-08-06", kind: "completion", category: "networking", width: 1400, height: 949, skills: ["Networking Fundamentals"] },
  { id: "thinkcyber-nx201", title: "Network Research (NX201)", issuer: "ThinkCyber India", date: "2026-02-19", kind: "completion", category: "security", width: 1400, height: 990, skills: [] },
  { id: "thinkcyber-xe105", title: "Python Fundamentals (XE105)", issuer: "ThinkCyber India", date: "2026-01-08", kind: "completion", category: "security", width: 1400, height: 990, skills: [] },
  { id: "thinkcyber-xe103", title: "Linux Fundamentals (XE103)", issuer: "ThinkCyber India", date: "2025-12-16", kind: "completion", category: "security", width: 1400, height: 990, skills: ["Linux"] },
  { id: "thinkcyber-xe101", title: "Intro to Cyber (XE101)", issuer: "ThinkCyber India", date: "2025-11-25", kind: "completion", category: "security", width: 1400, height: 990, skills: [] },
  { id: "cisco-cybersecurity-essentials", title: "Cybersecurity Essentials", issuer: "Dragon ICT Institute, Cisco Networking Academy", date: "2025-09-29", kind: "completion", category: "security", width: 1400, height: 949, skills: [] },
  { id: "cisco-learn-a-thon", title: "Learn-A-Thon 2025", issuer: "Cisco Networking Academy", date: "2025-10-24", kind: "award", category: "networking", width: 1400, height: 949, skills: [] },
  { id: "cisco-ccna-itn", title: "CCNAv7: Introduction to Networks", issuer: "Cisco Networking Academy", date: "2023-08-31", kind: "completion", category: "networking", width: 1400, height: 949, skills: ["Networking Fundamentals"] },
  { id: "kshrd-coding-challenge-participation", title: "Coding Challenge 2026: HRD Community Platform", issuer: "Korea Software HRD Center (KSHRD)", date: "2026-05-12", kind: "participation", category: "software", width: 1280, height: 911, skills: [] },
  { id: "instinct-flutter", title: "Flutter 2", issuer: "Instinct Institute", date: "2023-05-21", kind: "completion", category: "software", width: 989, height: 1400, skills: [] },
  { id: "hallym-video-editing", title: "ICT – Video Editing Course (18 hours)", issuer: "IGSR at Hallym University and World Together", date: "2025-08-03", kind: "completion", category: "other", width: 1024, height: 716, skills: [] },
];
