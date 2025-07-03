import { 
  Applicant, 
  Employer, 
  Admin, 
  JobListing, 
  Application, 
  Company, 
  Notification,
  AnalyticsData 
} from '../types';

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: 'comp-1',
    name: 'TechCorp Solutions',
    description: 'Leading technology company specializing in AI and machine learning solutions.',
    industry: 'Technology',
    size: '500-1000',
    location: 'San Francisco, CA',
    website: 'https://techcorp.com',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center',
    culture: ['Innovation', 'Work-life balance', 'Remote-friendly', 'Learning & Development'],
    benefits: ['Health Insurance', '401k Matching', 'Flexible PTO', 'Stock Options', 'Remote Work']
  },
  {
    id: 'comp-2',
    name: 'DataFlow Inc',
    description: 'Data analytics and business intelligence platform helping companies make data-driven decisions.',
    industry: 'Data & Analytics',
    size: '100-500',
    location: 'Austin, TX',
    website: 'https://dataflow.com',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center',
    culture: ['Data-driven', 'Collaborative', 'Fast-paced', 'Growth mindset'],
    benefits: ['Health Insurance', 'Dental & Vision', 'Unlimited PTO', 'Professional Development', 'Gym Membership']
  },
  {
    id: 'comp-3',
    name: 'GreenTech Innovations',
    description: 'Sustainable technology solutions for a better tomorrow.',
    industry: 'Clean Energy',
    size: '50-100',
    location: 'Seattle, WA',
    website: 'https://greentech.com',
    logo: 'https://images.unsplash.com/photo-1497436072909-f5e4be374596?w=100&h=100&fit=crop&crop=center',
    culture: ['Sustainability', 'Innovation', 'Social impact', 'Transparency'],
    benefits: ['Health Insurance', 'Green commuting allowance', 'Flexible hours', 'Equity participation']
  }
];

// Mock Job Listings
export const mockJobListings: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: mockCompanies[0],
    description: 'We are seeking a highly skilled Senior Frontend Developer to join our dynamic team. You will be responsible for creating outstanding user experiences using modern web technologies.',
    requirements: [
      '5+ years of experience in frontend development',
      'Expert knowledge of React, TypeScript, and modern CSS',
      'Experience with state management (Redux, Zustand)',
      'Strong understanding of responsive design',
      'Experience with testing frameworks (Jest, Cypress)',
      'Knowledge of performance optimization techniques'
    ],
    responsibilities: [
      'Develop and maintain high-quality web applications',
      'Collaborate with design and backend teams',
      'Implement responsive and accessible user interfaces',
      'Optimize applications for maximum speed and scalability',
      'Mentor junior developers and contribute to code reviews'
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Jest', 'Webpack'],
    experience: { min: 5, max: 8 },
    salary: { min: 120000, max: 160000, currency: 'USD' },
    location: 'San Francisco, CA',
    type: 'full-time',
    remote: 'hybrid',
    benefits: ['Health Insurance', 'Stock Options', 'Flexible PTO', '401k Matching'],
    postedAt: '2024-01-15T10:00:00Z',
    deadline: '2024-02-15T23:59:59Z',
    status: 'active',
    applicantCount: 24,
    viewCount: 156
  },
  {
    id: 'job-2',
    title: 'Data Scientist',
    company: mockCompanies[1],
    description: 'Join our data science team to build machine learning models and derive insights from large datasets to drive business decisions.',
    requirements: [
      'Masters or PhD in Data Science, Statistics, or related field',
      '3+ years of experience in data science/machine learning',
      'Proficiency in Python and SQL',
      'Experience with ML frameworks (scikit-learn, TensorFlow, PyTorch)',
      'Strong statistical analysis skills',
      'Experience with data visualization tools'
    ],
    responsibilities: [
      'Develop and deploy machine learning models',
      'Analyze large datasets to identify trends and patterns',
      'Create data visualizations and reports',
      'Collaborate with engineering teams on model deployment',
      'Present findings to stakeholders'
    ],
    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'TensorFlow', 'Pandas', 'Jupyter', 'Tableau'],
    experience: { min: 3, max: 6 },
    salary: { min: 110000, max: 150000, currency: 'USD' },
    location: 'Austin, TX',
    type: 'full-time',
    remote: 'remote',
    benefits: ['Health Insurance', 'Unlimited PTO', 'Professional Development', 'Remote Work Setup'],
    postedAt: '2024-01-20T09:30:00Z',
    deadline: '2024-02-20T23:59:59Z',
    status: 'active',
    applicantCount: 18,
    viewCount: 89
  },
  {
    id: 'job-3',
    title: 'DevOps Engineer',
    company: mockCompanies[0],
    description: 'We are looking for a DevOps Engineer to help us scale our infrastructure and improve our deployment processes.',
    requirements: [
      '4+ years of DevOps/Infrastructure experience',
      'Strong knowledge of AWS/Azure/GCP',
      'Experience with containerization (Docker, Kubernetes)',
      'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
      'Experience with CI/CD pipelines',
      'Strong scripting skills (Python, Bash)'
    ],
    responsibilities: [
      'Design and maintain cloud infrastructure',
      'Implement and improve CI/CD pipelines',
      'Monitor system performance and reliability',
      'Automate deployment and scaling processes',
      'Ensure security best practices'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python', 'Linux', 'Git', 'Jenkins'],
    experience: { min: 4, max: 7 },
    salary: { min: 130000, max: 170000, currency: 'USD' },
    location: 'San Francisco, CA',
    type: 'full-time',
    remote: 'hybrid',
    benefits: ['Health Insurance', 'Stock Options', 'Flexible PTO', 'Professional Development'],
    postedAt: '2024-01-18T14:20:00Z',
    status: 'active',
    applicantCount: 31,
    viewCount: 203
  },
  {
    id: 'job-4',
    title: 'UX Designer',
    company: mockCompanies[2],
    description: 'Join our design team to create intuitive and beautiful user experiences for our sustainable technology products.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)',
      'Strong portfolio demonstrating user-centered design',
      'Experience with user research and usability testing',
      'Knowledge of design systems and component libraries'
    ],
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with developers and product managers',
      'Maintain and evolve design systems'
    ],
    skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
    experience: { min: 3, max: 5 },
    salary: { min: 95000, max: 125000, currency: 'USD' },
    location: 'Seattle, WA',
    type: 'full-time',
    remote: 'hybrid',
    benefits: ['Health Insurance', 'Flexible hours', 'Professional Development', 'Design tool subscriptions'],
    postedAt: '2024-01-22T11:15:00Z',
    status: 'active',
    applicantCount: 15,
    viewCount: 67
  },
  {
    id: 'job-5',
    title: 'Product Manager',
    company: mockCompanies[1],
    description: 'Lead product strategy and development for our data analytics platform.',
    requirements: [
      '5+ years of product management experience',
      'Experience with data products or B2B SaaS',
      'Strong analytical and strategic thinking skills',
      'Experience with agile development methodologies',
      'Excellent communication and leadership skills'
    ],
    responsibilities: [
      'Define product vision and strategy',
      'Manage product roadmap and prioritization',
      'Work closely with engineering and design teams',
      'Analyze market trends and customer feedback',
      'Define and track key product metrics'
    ],
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Market Research', 'Leadership', 'Communication'],
    experience: { min: 5, max: 8 },
    salary: { min: 140000, max: 180000, currency: 'USD' },
    location: 'Austin, TX',
    type: 'full-time',
    remote: 'remote',
    benefits: ['Health Insurance', 'Stock Options', 'Unlimited PTO', 'Leadership Development'],
    postedAt: '2024-01-25T16:45:00Z',
    status: 'active',
    applicantCount: 22,
    viewCount: 134
  }
];

// Mock Applicants
export const mockApplicants: Applicant[] = [
  {
    id: 'user-1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    type: 'applicant',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-10T08:00:00Z',
    profile: {
      id: 'profile-1',
      userId: 'user-1',
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'https://linkedin.com/in/johndoe',
        portfolio: 'https://johndoe.dev'
      },
      professional: {
        title: 'Senior Frontend Developer',
        summary: 'Passionate frontend developer with 6 years of experience building scalable web applications using React, TypeScript, and modern web technologies. Strong focus on user experience and performance optimization.',
        experience: [
          {
            id: 'exp-1',
            company: 'Tech Startup Inc',
            position: 'Senior Frontend Developer',
            startDate: '2022-01',
            endDate: '2024-01',
            current: false,
            description: 'Led frontend development for a fintech application, resulting in 40% improvement in user engagement. Mentored junior developers and established frontend best practices.',
            skills: ['React', 'TypeScript', 'Redux', 'CSS-in-JS']
          },
          {
            id: 'exp-2',
            company: 'Digital Agency Co',
            position: 'Frontend Developer',
            startDate: '2020-03',
            endDate: '2022-01',
            current: false,
            description: 'Developed responsive websites for various clients using React and modern CSS. Collaborated with designers to implement pixel-perfect interfaces.',
            skills: ['React', 'JavaScript', 'SASS', 'Webpack']
          }
        ],
        education: [
          {
            id: 'edu-1',
            institution: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: 3.7
          }
        ],
        skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Jest', 'Git', 'Webpack', 'Node.js'],
        certifications: ['AWS Certified Developer Associate', 'Google Analytics Certified']
      },
      preferences: {
        desiredSalaryMin: 120000,
        desiredSalaryMax: 160000,
        preferredLocations: ['San Francisco, CA', 'Remote'],
        jobTypes: ['full-time'],
        remotePreference: 'hybrid'
      },
      resume: {
        fileName: 'john_doe_resume.pdf',
        fileUrl: '/resumes/john_doe_resume.pdf',
        uploadedAt: '2024-01-10T10:30:00Z'
      },
      profileCompleteness: 95
    },
    applications: [],
    savedJobs: ['job-1', 'job-3']
  }
];

// Mock Employers
export const mockEmployers: Employer[] = [
  {
    id: 'emp-1',
    email: 'hr@techcorp.com',
    name: 'Sarah Johnson',
    type: 'employer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e601?w=100&h=100&fit=crop&crop=face',
    createdAt: '2023-12-01T09:00:00Z',
    company: mockCompanies[0],
    jobListings: [mockJobListings[0], mockJobListings[2]]
  }
];

// Mock Applications
export const mockApplications: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    applicantId: 'user-1',
    job: mockJobListings[0],
    status: 'reviewed',
    coverLetter: 'Dear Hiring Manager,\n\nI am excited to apply for the Senior Frontend Developer position at TechCorp Solutions. With 6 years of experience in frontend development and a proven track record of building scalable React applications, I believe I would be a valuable addition to your team...',
    customAnswers: [
      {
        question: 'What interests you most about this role?',
        answer: 'I am particularly excited about the opportunity to work on AI-powered solutions and contribute to innovative projects that can make a real impact.'
      }
    ],
    submittedAt: '2024-01-16T14:30:00Z',
    lastUpdated: '2024-01-20T09:15:00Z',
    matchScore: 92,
    notes: 'Strong technical background, good cultural fit',
    interviewScheduled: {
      date: '2024-01-30',
      time: '14:00',
      type: 'video',
      location: 'Zoom Meeting',
      interviewers: ['Sarah Johnson', 'Mike Chen']
    }
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'interview_scheduled',
    title: 'Interview Scheduled',
    message: 'Your interview for Senior Frontend Developer at TechCorp Solutions has been scheduled for January 30th at 2:00 PM.',
    read: false,
    createdAt: '2024-01-25T11:30:00Z',
    actionUrl: '/applicant/applications/app-1'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'new_job_match',
    title: 'New Job Match',
    message: 'We found a new job that matches your profile: DevOps Engineer at TechCorp Solutions (88% match)',
    read: false,
    createdAt: '2024-01-24T16:20:00Z',
    actionUrl: '/applicant/jobs/job-3'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'application_status',
    title: 'Application Update',
    message: 'Your application for Senior Frontend Developer has been reviewed.',
    read: true,
    createdAt: '2024-01-20T09:15:00Z',
    actionUrl: '/applicant/applications/app-1'
  }
];

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData = {
  totalUsers: 1247,
  totalJobs: 156,
  totalApplications: 3892,
  successfulMatches: 234,
  userGrowth: [
    { date: '2024-01-01', users: 1100 },
    { date: '2024-01-08', users: 1150 },
    { date: '2024-01-15', users: 1200 },
    { date: '2024-01-22', users: 1247 }
  ],
  jobGrowth: [
    { date: '2024-01-01', jobs: 120 },
    { date: '2024-01-08', jobs: 135 },
    { date: '2024-01-15', jobs: 145 },
    { date: '2024-01-22', jobs: 156 }
  ],
  applicationStats: {
    pending: 892,
    reviewed: 1567,
    interview: 234,
    offered: 123,
    rejected: 876,
    accepted: 200
  }
};

// Current user state (for demo purposes)
export let currentUser = mockApplicants[0];

export const setCurrentUser = (user: any) => {
  currentUser = user;
};