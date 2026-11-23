# MASTER IMPLEMENTATION PROMPT
# Horn Vanhong — Cybersecurity Portfolio

## 1. ROLE

Act as a Senior Frontend Engineer, Creative Developer, UI/UX Designer, Motion Designer, and Technical SEO Specialist.

Your mission is to design and implement a premium, production-ready personal portfolio website for Horn Vanhong.

Do not create a generic developer portfolio. Build a distinctive cybersecurity-themed digital experience inspired by elite security research labs, hacker terminals, cyberpunk interfaces, and futuristic command centers.

The website must communicate technical competence, creativity, professionalism, and real-world project experience.

## 2. PROJECT OBJECTIVES

Build a portfolio that:

- Positions Horn Vanhong as a cybersecurity-focused software developer.
- Highlights Penetration Testing as the primary career direction.
- Highlights SOC Analysis as a secondary career direction.
- Demonstrates practical software engineering experience.
- Showcases cybersecurity and AI engineering projects.
- Attracts recruiters, internship opportunities, and junior-level job opportunities.
- Provides an excellent experience on desktop, tablet, and mobile.
- Supports English and Khmer languages.

## 3. TECHNOLOGY STACK

Use:

- Next.js with App Router
- TypeScript with strict mode
- React
- Tailwind CSS
- Framer Motion for animations
- React Three Fiber / Three.js only where useful
- Lucide React for icons
- React Hook Form + Zod for contact validation
- EmailJS or a secure server-side email integration for contact submissions
- next/font for typography

Use the latest stable compatible versions when implementing. Do not unnecessarily install packages or introduce complex dependencies.

Architecture should be modular, reusable, maintainable, and easy to extend.

## 4. VISUAL DESIGN SYSTEM

### Theme

Cyberpunk Hacker / Elite Security Research Lab.

### Color palette

- Background: #050807
- Surface: #0A100D
- Surface elevated: #101A14
- Primary neon: #00FF88
- Secondary green: #00CC66
- Muted green: #174B34
- Cyan accent: #00F0FF
- Main text: #E8F5ED
- Muted text: #8A9C90
- Border: rgba(0,255,136,0.16)
- Danger accent: #FF4D6D

Use neon green as the dominant accent. Cyan and red should only communicate secondary states.

### Typography

Use:
- Space Grotesk for headings.
- JetBrains Mono for terminal elements, code, labels, and technical metadata.
- Inter for general body text if needed.

### Visual effects

Implement:
- Subtle animated background grid.
- Matrix-style falling code as an optional lightweight canvas effect.
- Neon border glow on selected interactive components.
- Terminal cursor blinking.
- Subtle text reveal animations.
- Smooth scrolling.
- Glassmorphism for selected cards.
- Hover transitions.
- Scroll-triggered section animations.
- Minimal glitch effects for selected headings.
- Custom cybersecurity-inspired visual elements.

Avoid excessive glow, visual clutter, and constant animation.

The result must remain readable and professional.

## 5. WEBSITE STRUCTURE

### A. Navigation

Create a sticky, responsive navigation bar.

Brand:
`VH//SECURITY`

Navigation:
- Home
- About
- Skills
- Projects
- Experience
- Education
- Contact

Include:
- Active section indicator.
- Mobile navigation drawer.
- Language selector (EN / KH).
- Download CV button.
- Availability indicator.

### B. Hero Section

Create an immersive terminal-inspired hero.

Main introduction:

`HELLO, WORLD. I'M`

`HORN VANHONG`

Professional title:

`CYBERSECURITY STUDENT`
`SOFTWARE DEVELOPER`

Headline:

"Securing Digital Systems. Building Intelligent Solutions."

Supporting description:

"I'm a cybersecurity-focused software developer passionate about penetration testing, security research, AI engineering, and building modern digital experiences."

Add:
- Terminal-style introduction.
- Animated typing effect.
- Online status indicator (do not falsely claim live availability).
- Profile image placeholder.
- CTA: Explore My Work.
- CTA: Download CV.
- CTA: Contact Me.
- GitHub and LinkedIn links.
- Animated scroll indicator.

Display terminal metadata:

USER: HORN_VANHONG
ROLE: CYBERSECURITY_STUDENT
FOCUS: PENETRATION_TESTING
INTEREST: AI_SECURITY
LOCATION: PHNOM_PENH

### C. About Me

Section title:

`01 // ABOUT ME`

Heading:

"Curious Mind. Security-Driven Engineer."

Content:

"I'm Horn Vanhong, a Cambodian cybersecurity student and software developer with a strong interest in offensive security, security operations, and artificial intelligence.

My background combines software development experience with practical cybersecurity training. I enjoy understanding how systems work, identifying security weaknesses in authorized environments, and building technology that solves real problems.

My long-term goal is to become a skilled Penetration Tester while developing strong capabilities in Security Operations and AI-driven security solutions."

Include:
- Profile photograph.
- Personal introduction.
- Technical interests.
- Career goals.
- Education and training highlights.
- Small terminal-style profile card.

Do not invent achievements, certifications, or employment history.

### D. Technical Skills

Section title:

`02 // ARSENAL`

Organize skills into interactive categories.

1. Cybersecurity:
   - Penetration Testing
   - Vulnerability Assessment
   - Web Application Security
   - OWASP Top 10
   - Security Testing
   - Security Research

2. Security Tools:
   - Kali Linux
   - Burp Suite
   - Wireshark
   - Nmap
   - Splunk
   - OWASP ZAP
   - SQLMap
   - Nuclei

3. AI & Machine Learning:
   - Local LLMs
   - Ollama
   - vLLM
   - Retrieval-Augmented Generation (RAG)
   - Vector Databases
   - AI Agents

4. Frontend Development:
   - HTML
   - CSS
   - JavaScript
   - TypeScript
   - React
   - Next.js
   - Tailwind CSS

5. Backend Development:
   - Java
   - Spring Boot
   - REST APIs
   - PostgreSQL
   - SQL

6. Infrastructure:
   - Linux
   - Docker
   - Git
   - GitHub
   - Networking Fundamentals

Present skills using elegant interactive cards and technology tags.

Do not invent percentage-based proficiency levels.

### E. Featured Projects

Section title:

`03 // PROJECTS`

Create a premium project showcase with large visual cards.

PROJECT 01 — Reconix

Category: AI-Powered Security Assessment

Description:
"An AI-assisted security assessment platform with a terminal-based workflow for planning, approving, executing, and reporting security assessments."

Highlight:
- Python
- Textual TUI
- Security Assessment
- AI Model Integration
- Findings Management
- Report Generation

PROJECT 02 — CyberGuard AI

Category: Telegram Malware Scanner

Description:
"A Telegram security assistant designed to help users analyze suspicious files and receive security guidance."

Highlight:
- Python
- Cloudflare Workers
- Gemini API
- ClamAV
- YARA
- Malware Detection

PROJECT 03 — EduTrace / HRD Room

Category: Education Management Platform

Description:
"A modern educational platform inspired by classroom management systems, with student and teacher workflows."

Highlight:
- Next.js
- TypeScript
- Spring Boot
- PostgreSQL
- REST APIs

Add placeholders for additional projects.

Every project card should support:
- Project thumbnail.
- Category badge.
- Description.
- Technology stack.
- GitHub link.
- Live demo link.
- View Details action.

Do not invent repository URLs or demo URLs. Use configurable placeholders until verified.

### F. Professional Experience

Section title:

`04 // EXPERIENCE`

Create a modern timeline.

1. RHB Cambodia
   Position: Front-End Developer Intern
   Focus:
   - Software Engineering.
   - Digital Banking.
   - Frontend mobile application development.
   - React Native.
   - Code reviews.

2. Golden Bridge International School
   Position: ICT Teacher
   Period: September 2025 – January 2026
   Focus:
   - Teaching ICT lessons.
   - Preparing educational materials.
   - Evaluating students.
   - Supporting technology education.

Display actual employment periods only where confirmed.

### G. Education & Training

Section title:

`05 // EDUCATION`

Include:

Korea Software HRD Center (KSHRD)
- Advanced Course.
- Cybersecurity and AI Engineering.
- Mastering Local LLMs.
- Security tools and hands-on learning.

KSHRD Basic Course
- Completed 810-hour training.
- Java.
- Spring Boot.
- Next.js.
- PostgreSQL.
- Docker.
- Linux.

ANT Technology Training Center
- Cybersecurity Training.
- MPTC scholarship-supported training.

Royal University of Phnom Penh
- Computer Science.
- Present accurate graduation status and dates from the verified CV.

Use a timeline or education cards.

### H. Security Focus

Section title:

`06 // SECURITY FOCUS`

Create three visually impressive cards:

OFFENSIVE SECURITY
- Penetration Testing.
- Web Application Security.
- Vulnerability Discovery.
- Security Assessment.

DEFENSIVE SECURITY
- SOC Fundamentals.
- Network Monitoring.
- Log Analysis.
- Incident Response.

AI SECURITY
- Local LLM Security.
- AI-Assisted Security Analysis.
- RAG Systems.
- Intelligent Security Automation.

Clearly distinguish learning interests from professional qualifications.

### I. Contact Section

Section title:

`07 // ESTABLISH CONNECTION`

Headline:

"Have a Security Challenge or Opportunity?"

Description:

"I'm open to cybersecurity internships, junior software development opportunities, security research collaborations, and meaningful technology projects."

Include:
- Email contact.
- LinkedIn.
- GitHub.
- Contact form.
- Download CV.

Form fields:
- Name.
- Email.
- Subject.
- Message.

Implement proper client-side validation, server-side validation, loading state, success state, and error state.

Protect the form against spam and never expose email-service credentials in frontend code.

### J. Footer

Design a futuristic terminal-inspired footer.

Display:

`VH//SECURITY`

"Building. Learning. Securing."

Include social links, copyright year, navigation shortcuts, and a back-to-top button.

## 6. INTERACTIVE FEATURES

Implement:

1. Animated terminal introduction.
2. Responsive navigation.
3. Language selector.
4. Dark cyberpunk theme.
5. Interactive project filtering.
6. Animated skills categories.
7. Scroll progress indicator.
8. Smooth page navigation.
9. Contact form.
10. Downloadable CV.
11. Accessible mobile menu.
12. Subtle matrix background animation.
13. Keyboard accessibility.
14. Reduced-motion support.

All controls must work. Never create decorative buttons that do nothing.

## 7. COMPONENT ARCHITECTURE

Suggested structure:

src/
  app/
    layout.tsx
    page.tsx
    globals.css
    projects/
      [slug]/
        page.tsx
    api/
      contact/
        route.ts

  components/
    layout/
      Navbar.tsx
      Footer.tsx
      MobileMenu.tsx

    sections/
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Education.tsx
      SecurityFocus.tsx
      Contact.tsx

    ui/
      Terminal.tsx
      GlowingCard.tsx
      SectionHeading.tsx
      SkillBadge.tsx
      ProjectCard.tsx
      Timeline.tsx
      MatrixBackground.tsx
      ScrollProgress.tsx

  data/
    profile.ts
    skills.ts
    projects.ts
    experience.ts
    education.ts
    navigation.ts

  hooks/
    useActiveSection.ts
    useReducedMotion.ts

  lib/
    utils.ts
    validation.ts

  types/
    index.ts

public/
  images/
  icons/
  cv/
    Horn-Vanhong-CV.pdf

Adapt the architecture when needed, but maintain separation between content, UI, and application logic.

## 8. RESPONSIVE DESIGN

Desktop:
- Immersive hero.
- Asymmetric layouts.
- Multi-column project showcase.
- Generous spacing.

Tablet:
- Adaptive grid.
- Simplified effects.
- Comfortable typography.

Mobile:
- Single-column layouts.
- Mobile navigation.
- Touch-friendly controls.
- Optimized animations.
- No horizontal overflow.
- Fast initial loading.

Test at common viewport sizes.

## 9. SEO AND PERFORMANCE

Implement:
- Metadata and Open Graph.
- Semantic HTML.
- Sitemap.
- Robots.txt.
- Descriptive image alt text.
- Proper heading hierarchy.
- Optimized image formats.
- Lazy loading.
- Dynamic imports for heavy 3D effects.
- Accessible contrast.
- Lighthouse optimization.

Target strong Core Web Vitals and accessibility.

## 10. SECURITY REQUIREMENTS

Because this is a cybersecurity portfolio, security must be part of the implementation itself.

- Validate all user input.
- Sanitize rendered user-controlled content.
- Protect contact API routes.
- Implement rate limiting.
- Store secrets in environment variables.
- Never expose API keys.
- Avoid unsafe HTML rendering.
- Use secure HTTP headers.
- Avoid unnecessary tracking.
- Do not store contact form messages without a defined privacy policy.
- Do not introduce vulnerable or unnecessary dependencies.

## 11. CONTENT MANAGEMENT

Keep portfolio information in structured TypeScript data files.

The owner must be able to update:
- Profile details.
- About content.
- Skills.
- Projects.
- Employment.
- Education.
- Social links.
- CV file.

without editing every UI component.

Provide English and Khmer translation dictionaries.

## 12. DEVELOPMENT WORKFLOW

Follow these steps:

PHASE 1 — REPOSITORY INSPECTION
- Inspect the existing repository.
- Understand its structure and current dependencies.
- Identify existing features that must be preserved.
- Do not overwrite existing working functionality without a reason.

PHASE 2 — DESIGN FOUNDATION
- Configure fonts.
- Define design tokens.
- Configure Tailwind.
- Build shared UI components.
- Establish responsive layout.

PHASE 3 — MAIN SECTIONS
- Implement navigation.
- Implement hero.
- Implement about.
- Implement skills.
- Implement projects.
- Implement experience.
- Implement education.
- Implement security focus.
- Implement contact.
- Implement footer.

PHASE 4 — INTERACTIONS
- Add animations.
- Add terminal effects.
- Add project filtering.
- Add bilingual support.
- Add form functionality.

PHASE 5 — QUALITY ASSURANCE
- Run TypeScript checks.
- Run ESLint.
- Run production build.
- Test navigation.
- Test responsive behavior.
- Test contact form validation.
- Fix runtime errors.
- Fix accessibility issues.

PHASE 6 — FINAL DELIVERY
Provide:
- Complete source code.
- Installation instructions.
- Environment variable example.
- Development commands.
- Production build instructions.
- Vercel deployment instructions.
- A list of any remaining configuration placeholders.

## 13. ACCEPTANCE CRITERIA

The project is complete only when:

- The portfolio works as a complete website.
- All major sections are implemented.
- The cyberpunk green visual identity is consistent.
- Responsive layouts work.
- All navigation and interactive controls function.
- Projects use configurable, accurate data.
- English and Khmer language switching works.
- Contact validation works.
- No fabricated credentials or achievements are displayed.
- No broken images or links remain.
- TypeScript checks pass.
- Production build succeeds.
- No critical console errors remain.

## 14. IMPORTANT INSTRUCTIONS

Do not stop after creating a design mockup.

Do not create a generic template.

Do not use fake skill percentages.

Do not invent certifications, URLs, dates, or achievements.

Do not put all content into one giant component.

Do not sacrifice performance for visual effects.

First inspect the repository, then implement the complete application incrementally.

Make reasonable engineering decisions independently and explain any assumptions.

Your final result should feel like a premium cybersecurity engineer's personal digital command center.

BEGIN IMPLEMENTATION.