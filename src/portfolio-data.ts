export interface ExperienceItem {
  company: string
  role: string
  period: string
  highlights: string[]
}

export interface SkillCategory {
  title: string
  icon: string
  items: string[]
}

export interface ProjectData {
  title: string
  shortDescription: string
  fullDescription: string
  features: string[]
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
}

export const experience: ExperienceItem[] = [
  {
    company: 'Tata Consultancy Services',
    role: 'Software Engineer',
    period: '2023 - Present',
    highlights: [
      'Delivered new features for a healthcare logistics platform, building Angular/TypeScript front-end modules and .NET/C# REST services on the backend.',
      'Built a Postman automated test suite improving API reliability and reducing production issues by 60%.',
      'Enhanced application performance and stability, resolving user issues within SLA and ensuring continuous deployment of features and bug fixes every sprint.',
    ],
  },
  {
    company: 'Unosquare',
    role: 'Software Engineer',
    period: '2022 - 2023',
    highlights: [
      'Supported and enhanced ASP.NET Core Web APIs for a large-scale banking platform serving thousands of daily users.',
      'Designed and implemented solutions for the retail system, improving transaction reliability and system scalability.',
      'Applied proactive system monitoring, analyzing logs/metrics to prevent downtime and ensuring high availability.',
    ],
  },
  {
    company: 'Softtek',
    role: 'Software Engineer',
    period: '2021 - 2022',
    highlights: [
      'Identified and resolved critical bugs and security vulnerabilities in ASP.NET REST banking services, enhancing compliance with industry standards.',
      'Maintained and modernized legacy applications (WebForms & WCF), extending their lifecycle and reducing operational risks.',
      'Collaborated in code reviews, driving higher code quality and reducing bug reoccurrence by 25%.',
    ],
  },
  {
    company: 'Fortia Technology',
    role: 'Software Engineer (Lead Developer)',
    period: '2021 - 2021',
    highlights: [
      'Designed and developed a modular ASP.NET REST web service integrating biometric devices from multiple vendors, enabling real-time employee attendance tracking.',
      'Applied design patterns to build a scalable and testable service, supporting easy integration of new biometric providers.',
      'Engineered the database schema and stored procedures, improving enrollment efficiency and data accuracy.',
    ],
  },
  {
    company: 'Checadores',
    role: 'Junior Fullstack Engineer (Lead Developer)',
    period: '2019 - 2020',
    highlights: [
      'Led the development of a .NET Core solution for biometric device integration, boosting product compatibility and expanding company sales opportunities by 40%.',
      'Developed a Windows service automating employee attendance management, reducing manual workload for HR departments.',
    ],
  },
]

export const skills: SkillCategory[] = [
  {
    title: 'Languages & Frameworks',
    icon: '🧑🏾‍💻',
    items: ['C#', 'Javascript/Typescript', 'Python', 'HTML & CSS', 'SQL', 'T-SQL', '.NET Core', 'React', 'Angular', 'Astro'],
  },
  {
    title: 'DevOps & Tools',
    icon: '🛠️',
    items: ['Git', 'GitHub', 'Azure', 'Azure Devops', 'Docker', 'Github Actions', 'Postman', 'LLMS', 'Github Copilot', 'Claude Code / Open Code'],
  },
  {
    title: 'Soft Skills',
    icon: '💡',
    items: ['Technical Leadership', 'Collaboration', 'Mentorship', 'Ownership & Accountability', 'Conflict Resolution'],
  },
]

export const projects: ProjectData[] = [
  {
    title: 'Dev Portfolio',
    shortDescription: 'Personal developer portfolio built with Astro, Vue 3, and UnoCSS.',
    fullDescription: 'A fast, accessible portfolio site showcasing projects, blog posts, and professional experience. Built on the Vitesse theme for Astro with full dark mode support.',
    features: [
      'Static site generation with Astro 5',
      'Vue 3 interactive components with islands architecture',
      'Dark/light mode toggle',
      'RSS feed and sitemap generation',
    ],
    techStack: ['Astro', 'Vue 3', 'TypeScript', 'UnoCSS'],
    githubUrl: 'https://github.com/osempu/dev-portfolio',
  },
]
