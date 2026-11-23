import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Horn Vanhong",
  brand: "VH//SECURITY",
  location: { en: "Phnom Penh, Cambodia", km: "ភ្នំពេញ កម្ពុជា" },
  photo: "/images/profle/vanhong_profile.jpg",
  cv: "/cv/Horn-Vanhong-CV.pdf",
  email: null,
  social: { github: null, linkedin: null },
  openToOpportunities: true,
  terminal: [
    { key: "USER", value: "HORN_VANHONG" },
    { key: "ROLE", value: "CYBERSECURITY_STUDENT" },
    { key: "FOCUS", value: "PENETRATION_TESTING" },
    { key: "INTEREST", value: "AI_SECURITY" },
    { key: "LOCATION", value: "PHNOM_PENH" },
  ],
};
