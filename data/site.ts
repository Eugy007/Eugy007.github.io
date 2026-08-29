// ---------------------------------------------------------------------------
// SITE CONTENT
// Every piece of copy, every link, every data point on the page comes from
// this file. Edit here, not inside components.
//
// Everything below is sourced from Eugene's actual CV and real project work.
// Nothing here is invented. Where CV data doesn't cover something (like a
// BuildMart POS screenshot), it's a plain, clearly-named placeholder asset,
// not fabricated copy.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Eugene Wambugu',
  role: 'Software Developer',
  roleSecondary: 'IT Technician',
  location: 'Nairobi, Kenya',
  email: 'eugenewambugu2003@gmail.com',
  phone: '0710942550',
  phoneHref: 'tel:+254710942550',
  github: 'https://github.com/Eugy007',
  linkedin: 'https://linkedin.com/in/eugene-wambugu-ab07a8374',
  siteUrl: 'eugy007.github.io',
  resumeHref: '/resume.pdf',
  avatar: '/images/avatar.jpg',
};

export const preloader = {
  line1: 'Welcome to my',
  line2: 'Portfolio Website',
  url: profile.siteUrl,
};

export const hero = {
  eyebrow: 'Software Developer, IT Technician',
  headline: 'Eugene Wambugu',
  subhead:
      'I build practical full stack systems across frontend, backend, APIs, and databases. My experience spans ASP.NET Core, C#, React Native, Node.js, TypeScript, PostgreSQL, and SQL Server, with a focus on real world systems, role based workflows, and reliable user experiences. Based in Nairobi, I enjoy turning real problems into software people can actually use.',
};

export const about = {
  title: 'About',
  paragraphs: [
    'I am a full-stack developer with a Bachelor of Science in Information Technology from KCA University. My main focus is ASP.NET Core and ASP.NET MVC 5 with C# and Entity Framework, building the kind of systems that need real logins, role permissions, and data that stays correct under everyday use.',
    'Most recently I worked as an Intern Software Developer at Kingdom Bank, where I helped build and maintain an admin portal used to manage API access and mobile app integrations. That meant views, controllers, dashboards, multi-step workflows, and role and permission management, backed by SQL Server through Entity Framework. I also handled IT support duties: hardware troubleshooting, software installation, OS configuration, and basic network setup.',
    'Outside of that I build my own projects to keep learning past what one stack teaches you, including a POS system in Node.js and Fastify with Prisma and PostgreSQL. I am currently looking for a full-time or contract role where I can keep building real software with a team.',
  ],
  facts: [
    { label: 'Education', value: 'BSc IT, KCA University' },
    { label: 'Based in', value: 'Nairobi, Kenya' },
    { label: 'Focus', value: 'ASP.NET Core, C#, full-stack' },
  ],
};

export type ProjectCategory = 'Full-Stack' | 'Backend';

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory[];
  summary: string;
  description: string;
  stack: string[];
  features: string[];
  liveUrl?: string;
  repoUrl?: string;
  linkNote?: string;
  image: string;
}

export const projects: Project[] = [
  {
    slug: 'internlinkke',
    name: 'InternLinkKE',
    category: ['Full-Stack'],
    summary: 'Connecting Kenyan students with internship and attachment opportunities.',
    description:
        'A multi-role web platform that connects Kenyan students with internship and attachment opportunities. Students, host companies, and administrators each get a dashboard built around what they actually need to do: post an opportunity, apply for one, or manage the platform.',
    stack: ['ASP.NET MVC', 'C#', 'SQL Server', 'Bootstrap'],
    features: [
      'Role-based dashboards for students, companies, and administrators',
      'Opportunity posting and application tracking',
      'User management across all three roles',
      'Structured workflows built around the real internship process',
    ],
    liveUrl: 'https://internlinkke-mvc.fly.dev/',
    image: '/images/internlinkke.jpg',
  },
  {
    slug: 'buildmart-pos',
    name: 'BuildMart POS',
    category: ['Full-Stack'],
    summary: 'A point-of-sale system for hardware retail, still in active development.',
    description:
        'A point-of-sale system built for hardware retail: sales and checkout, inventory tracking, and role-specific access for different staff. Built with a Node.js and Fastify backend, Prisma over PostgreSQL, and JWT-based authentication with role-based access control.',
    stack: ['Node.js', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL', 'Docker'],
    features: [
      'Sales and checkout workflows with stock-safe transactions',
      'Inventory management tied directly to the database schema',
      'JWT authentication with role-based access control',
      'REST APIs with backend validation on every write',
    ],
    linkNote: 'In active development, no public link yet.',
    image: '/images/buildmart-pos.jpg',
  },
  {
    slug: 'cafe-management-system',
    name: 'Cafe Management System',
    category: ['Backend'],
    summary: 'Orders, menu, and inventory for daily cafe operations.',
    description:
        'A full-stack cafe management system handling daily operations: orders, the product menu, and inventory. Built to streamline the day-to-day workflow of running a small cafe.',
    stack: ['Node.js', 'MySQL', 'Express', 'REST API'],
    features: [
      'Order processing and management',
      'Product and menu management',
      'Inventory tracking and updates',
      'REST API integration with a MySQL backend',
    ],
    repoUrl: 'https://github.com/Eugy007/Cafe-Mngt-System',
    image: '/images/cafe-management.jpg',
  },
];

export const projectFilters: Array<'All' | ProjectCategory> = ['All', 'Full-Stack', 'Backend'];

export interface SkillGroup {
  label: string;
  note: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages & Frameworks',
    note: 'What most of my code is written in',
    skills: ['C#', 'ASP.NET Core MVC', 'ASP.NET MVC 5', 'Entity Framework Core', 'Node.js', 'TypeScript', 'Fastify'],
  },
  {
    label: 'Frontend',
    note: 'Interfaces that stay out of the way',
    skills: ['HTML', 'CSS', 'Bootstrap', 'Razor Views', 'React Native'],
  },
  {
    label: 'Databases',
    note: 'Schema-first, always',
    skills: ['SQL Server', 'SSMS', 'PostgreSQL', 'Supabase', 'Prisma'],
  },
  {
    label: 'Backend & Architecture',
    note: 'How the pieces fit together',
    skills: ['REST APIs', 'JWT Authentication', 'Role-Based Access Control', 'Database Design'],
  },
  {
    label: 'Tools',
    note: 'Day-to-day workflow',
    skills: ['Git', 'GitHub', 'Visual Studio', 'Rider', 'VS Code', 'Docker'],
  },
  {
    label: 'IT & Support',
    note: 'Where I started before development',
    skills: ['Hardware Troubleshooting', 'OS Installation & Configuration', 'Network Setup', 'IT Support'],
  },
];

export interface TimelineEntry {
  id: string;
  kind: 'work' | 'education';
  title: string;
  org: string;
  date: string;
  location?: string;
  description: string;
  tools?: string[];
}

export const timeline: TimelineEntry[] = [
  {
    id: 'kingdom-bank',
    kind: 'work',
    title: 'Intern Software Developer',
    org: 'Kingdom Bank',
    date: 'May 2025 - January 2026',
    location: 'Nairobi, Kenya',
    description:
        'Built full-stack ASP.NET MVC 5 applications in C# and Entity Framework, including a department-based Knowledge Help System and a Record Keeping and Onboarding System. Maintained an admin portal used for API management and mobile app integration: views, controllers, dashboards, multi-step workflows, and role and permission management, backed by SQL Server. Also handled IT support: hardware troubleshooting, software installation, OS configuration, and basic network setup.',
    tools: ['ASP.NET MVC 5', 'C#', 'Entity Framework', 'SQL Server'],
  },
  {
    id: 'kca-university',
    kind: 'education',
    title: 'BSc, Information Technology',
    org: 'KCA University',
    date: 'November 2025',
    location: 'Nairobi, Kenya',
    description:
        'Focused on software development, databases, networking, and IT systems management, with practical work in programming and building real applications.',
  },
  {
    id: 'iebc',
    kind: 'work',
    title: 'Election Clerk',
    org: 'IEBC',
    date: 'August 2022',
    location: 'Nairobi, Kenya',
    description:
        'Verified voter information and issued ballot papers under time-sensitive conditions. Maintained accurate ballot records and coordinated with polling officials to keep voting operations running smoothly and in compliance with election laws.',
  },
];

export const contact = {
  title: 'Contact',
  lede: 'Have a role, a project, or a question about how something here was built? I read everything that lands in my inbox.',
  formEndpoint: 'https://formspree.io/f/xwvaqjba',
};

export const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];