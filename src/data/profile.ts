import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Horn Vanhong",
  displayName: { en: "Horn Vanhong", km: "Horn Vanhong", ko: "헌 완홓" },
  brand: "VH//SECURITY",
  location: { en: "Phnom Penh, Cambodia", km: "ភ្នំពេញ កម្ពុជា", ko: "캄보디아 프놈펜" },
  photo: "/images/profle/vanhong_profile.jpg",
  cv: "/cv/Horn-Vanhong-CV.pdf",
  email: "vanhonghorn37@gmail.com",
  social: {
    github: "https://github.com/HornVanhong",
    linkedin: "https://www.linkedin.com/in/horn-vanhong-45366324a/",
    youtube: "https://www.youtube.com/@HornVanhong",
    telegram: "https://t.me/vanhongVH",
    facebook: "https://www.facebook.com/horn.vanhong.2025",
  },
  openToOpportunities: true,
  terminal: [
    { key: "USER", value: "HORN_VANHONG" },
    { key: "ROLE", value: "CYBERSECURITY_STUDENT" },
    { key: "FOCUS", value: "PENETRATION_TESTING" },
    { key: "INTEREST", value: "AI_SECURITY" },
    { key: "LOCATION", value: "PHNOM_PENH" },
  ],
};
