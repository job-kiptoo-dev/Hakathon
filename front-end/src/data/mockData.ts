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
  },
  {
    id: 'user-2',
    email: 'sarah.wilson@email.com',
    name: 'Sarah Wilson',
    type: 'applicant',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e601?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-12T09:30:00Z',
    profile: {
      id: 'profile-2',
      userId: 'user-2',
      personalInfo: {
        firstName: 'Sarah',
        lastName: 'Wilson',
        phone: '+1 (555) 234-5678',
        location: 'Austin, TX',
        linkedin: 'https://linkedin.com/in/sarahwilson',
        portfolio: 'https://sarahwilson.dev'
      },
      professional: {
        title: 'Data Scientist',
        summary: 'Experienced data scientist with 4 years of expertise in machine learning, statistical analysis, and data visualization. Proven track record of delivering actionable insights from complex datasets.',
        experience: [
          {
            id: 'exp-3',
            company: 'Analytics Corp',
            position: 'Data Scientist',
            startDate: '2021-06',
            endDate: '2024-01',
            current: false,
            description: 'Developed predictive models that improved customer retention by 25%. Led cross-functional teams to implement data-driven solutions.',
            skills: ['Python', 'SQL', 'TensorFlow', 'Pandas']
          }
        ],
        education: [
          {
            id: 'edu-2',
            institution: 'University of Texas at Austin',
            degree: 'Master of Science',
            field: 'Data Science',
            startDate: '2019-09',
            endDate: '2021-05',
            gpa: 3.8
          }
        ],
        skills: ['Python', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'R', 'Tableau', 'Statistics'],
        certifications: ['Google Cloud Professional Data Engineer', 'AWS Certified Machine Learning']
      },
      preferences: {
        desiredSalaryMin: 110000,
        desiredSalaryMax: 150000,
        preferredLocations: ['Austin, TX', 'Remote'],
        jobTypes: ['full-time'],
        remotePreference: 'remote'
      },
      resume: {
        fileName: 'sarah_wilson_resume.pdf',
        fileUrl: '/resumes/sarah_wilson_resume.pdf',
        uploadedAt: '2024-01-12T11:15:00Z'
      },
      profileCompleteness: 90
    },
    applications: [],
    savedJobs: ['job-2']
  },
  {
    id: 'user-3',
    email: 'mike.chen@email.com',
    name: 'Mike Chen',
    type: 'applicant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-08T14:20:00Z',
    profile: {
      id: 'profile-3',
      userId: 'user-3',
      personalInfo: {
        firstName: 'Mike',
        lastName: 'Chen',
        phone: '+1 (555) 345-6789',
        location: 'Seattle, WA',
        linkedin: 'https://linkedin.com/in/mikechen',
        portfolio: 'https://mikechen.dev'
      },
      professional: {
        title: 'DevOps Engineer',
        summary: 'DevOps engineer with 5 years of experience in cloud infrastructure, CI/CD pipelines, and containerization. Passionate about automation and scalable systems.',
        experience: [
          {
            id: 'exp-4',
            company: 'Cloud Solutions Inc',
            position: 'DevOps Engineer',
            startDate: '2020-03',
            endDate: '2024-01',
            current: false,
            description: 'Designed and implemented CI/CD pipelines that reduced deployment time by 60%. Managed AWS infrastructure serving millions of users.',
            skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
          }
        ],
        education: [
          {
            id: 'edu-3',
            institution: 'University of Washington',
            degree: 'Bachelor of Science',
            field: 'Computer Engineering',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: 3.6
          }
        ],
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python', 'Linux', 'Jenkins', 'Git'],
        certifications: ['AWS Certified Solutions Architect', 'Certified Kubernetes Administrator']
      },
      preferences: {
        desiredSalaryMin: 130000,
        desiredSalaryMax: 170000,
        preferredLocations: ['Seattle, WA', 'San Francisco, CA'],
        jobTypes: ['full-time'],
        remotePreference: 'hybrid'
      },
      resume: {
        fileName: 'mike_chen_resume.pdf',
        fileUrl: '/resumes/mike_chen_resume.pdf',
        uploadedAt: '2024-01-08T16:45:00Z'
      },
      profileCompleteness: 88
    },
    applications: [],
    savedJobs: ['job-3']
  },
  {
    id: 'user-4',
    email: 'emily.davis@email.com',
    name: 'Emily Davis',
    type: 'applicant',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-15T11:10:00Z',
    profile: {
      id: 'profile-4',
      userId: 'user-4',
      personalInfo: {
        firstName: 'Emily',
        lastName: 'Davis',
        phone: '+1 (555) 456-7890',
        location: 'Portland, OR',
        linkedin: 'https://linkedin.com/in/emilydavis',
        portfolio: 'https://emilydavis.design'
      },
      professional: {
        title: 'UX Designer',
        summary: 'Creative UX designer with 4 years of experience creating user-centered designs for web and mobile applications. Strong background in user research and design systems.',
        experience: [
          {
            id: 'exp-5',
            company: 'Design Studio',
            position: 'UX Designer',
            startDate: '2021-01',
            endDate: '2024-01',
            current: false,
            description: 'Led design for multiple client projects, improving user satisfaction scores by 40%. Conducted user research and usability testing.',
            skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'User Research']
          }
        ],
        education: [
          {
            id: 'edu-4',
            institution: 'Art Institute of Portland',
            degree: 'Bachelor of Fine Arts',
            field: 'Graphic Design',
            startDate: '2017-09',
            endDate: '2021-05',
            gpa: 3.9
          }
        ],
        skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Design Systems'],
        certifications: ['Google UX Design Certificate', 'Adobe Certified Expert']
      },
      preferences: {
        desiredSalaryMin: 95000,
        desiredSalaryMax: 125000,
        preferredLocations: ['Portland, OR', 'Seattle, WA'],
        jobTypes: ['full-time'],
        remotePreference: 'hybrid'
      },
      resume: {
        fileName: 'emily_davis_resume.pdf',
        fileUrl: '/resumes/emily_davis_resume.pdf',
        uploadedAt: '2024-01-15T13:30:00Z'
      },
      profileCompleteness: 92
    },
    applications: [],
    savedJobs: ['job-4']
  },
  {
    id: 'user-5',
    email: 'alex.rodriguez@email.com',
    name: 'Alex Rodriguez',
    type: 'applicant',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-05T16:45:00Z',
    profile: {
      id: 'profile-5',
      userId: 'user-5',
      personalInfo: {
        firstName: 'Alex',
        lastName: 'Rodriguez',
        phone: '+1 (555) 567-8901',
        location: 'Denver, CO',
        linkedin: 'https://linkedin.com/in/alexrodriguez',
        portfolio: 'https://alexrodriguez.pm'
      },
      professional: {
        title: 'Product Manager',
        summary: 'Strategic product manager with 3 years of experience driving product vision and roadmap execution. Strong analytical skills and cross-functional collaboration experience.',
        experience: [
          {
            id: 'exp-6',
            company: 'Startup Ventures',
            position: 'Product Manager',
            startDate: '2022-01',
            endDate: '2024-01',
            current: false,
            description: 'Managed product roadmap for B2B SaaS platform, increasing user engagement by 35%. Collaborated with engineering and design teams.',
            skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research']
          }
        ],
        education: [
          {
            id: 'edu-5',
            institution: 'University of Colorado Boulder',
            degree: 'Bachelor of Science',
            field: 'Business Administration',
            startDate: '2018-09',
            endDate: '2022-05',
            gpa: 3.7
          }
        ],
        skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Market Research', 'Leadership', 'Communication'],
        certifications: ['Certified Scrum Product Owner', 'Google Analytics Certified']
      },
      preferences: {
        desiredSalaryMin: 120000,
        desiredSalaryMax: 160000,
        preferredLocations: ['Denver, CO', 'Remote'],
        jobTypes: ['full-time'],
        remotePreference: 'remote'
      },
      resume: {
        fileName: 'alex_rodriguez_resume.pdf',
        fileUrl: '/resumes/alex_rodriguez_resume.pdf',
        uploadedAt: '2024-01-05T18:20:00Z'
      },
      profileCompleteness: 85
    },
    applications: [],
    savedJobs: ['job-5']
  }
];

// Mock Employers will be defined after job listings

// Mock Applications will be defined after applicants are created
export let mockApplications: Application[] = [];

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

// Initialize applications with proper applicant references
mockApplications = [
  {
    id: 'app-1',
    jobId: 'job-1',
    applicantId: 'user-1',
    job: mockJobListings[0],
    applicant: mockApplicants[0], // John Doe
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
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    applicantId: 'user-2',
    job: mockJobListings[1],
    applicant: mockApplicants[1], // Sarah Wilson
    status: 'pending',
    coverLetter: 'Dear Hiring Team,\n\nI am writing to express my interest in the Data Scientist position at DataFlow Inc. With my strong background in machine learning and statistical analysis, I am confident I can contribute to your data-driven initiatives...',
    customAnswers: [],
    submittedAt: '2024-01-22T10:15:00Z',
    lastUpdated: '2024-01-22T10:15:00Z',
    matchScore: 88,
    notes: ''
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    applicantId: 'user-3',
    job: mockJobListings[2],
    applicant: mockApplicants[2], // Mike Chen
    status: 'interview',
    coverLetter: 'Hello,\n\nI am excited to apply for the DevOps Engineer position at TechCorp Solutions. My 5 years of experience in cloud infrastructure and CI/CD pipelines align perfectly with your requirements...',
    customAnswers: [],
    submittedAt: '2024-01-18T16:45:00Z',
    lastUpdated: '2024-01-25T11:30:00Z',
    matchScore: 85,
    notes: 'Good DevOps experience, scheduled for technical interview',
    interviewScheduled: {
      date: '2024-02-02',
      time: '15:00',
      type: 'video',
      location: 'Google Meet',
      interviewers: ['Sarah Johnson', 'Tech Lead']
    }
  },
  {
    id: 'app-4',
    jobId: 'job-4',
    applicantId: 'user-4',
    job: mockJobListings[3],
    applicant: mockApplicants[3], // Emily Davis
    status: 'offered',
    coverLetter: 'Dear Design Team,\n\nI am thrilled to apply for the UX Designer position at GreenTech Innovations. My passion for sustainable technology and user-centered design makes this opportunity particularly exciting...',
    customAnswers: [],
    submittedAt: '2024-01-20T14:20:00Z',
    lastUpdated: '2024-01-28T09:45:00Z',
    matchScore: 94,
    notes: 'Excellent portfolio, strong design thinking skills'
  },
  {
    id: 'app-5',
    jobId: 'job-5',
    applicantId: 'user-5',
    job: mockJobListings[4],
    applicant: mockApplicants[4], // Alex Rodriguez
    status: 'rejected',
    coverLetter: 'Dear Product Team,\n\nI would like to apply for the Product Manager role at DataFlow Inc. My experience in B2B SaaS product management and analytical skills would be valuable to your team...',
    customAnswers: [],
    submittedAt: '2024-01-15T11:30:00Z',
    lastUpdated: '2024-01-26T16:20:00Z',
    matchScore: 72,
    notes: 'Good experience but looking for more senior candidate'
  },
  {
    id: 'app-6',
    jobId: 'job-1',
    applicantId: 'user-2',
    job: mockJobListings[0],
    applicant: mockApplicants[1], // Sarah Wilson applying for Frontend role
    status: 'pending',
    coverLetter: 'Dear Hiring Manager,\n\nWhile my background is primarily in data science, I am passionate about transitioning to frontend development and have been building projects with React and TypeScript...',
    customAnswers: [],
    submittedAt: '2024-01-24T09:20:00Z',
    lastUpdated: '2024-01-24T09:20:00Z',
    matchScore: 65,
    notes: 'Career transition candidate, interesting background'
  },
  {
    id: 'app-7',
    jobId: 'job-2',
    applicantId: 'user-5',
    job: mockJobListings[1],
    applicant: mockApplicants[4], // Alex Rodriguez applying for Data Scientist
    status: 'reviewed',
    coverLetter: 'Dear DataFlow Team,\n\nAs a product manager with strong analytical skills, I am interested in transitioning to a more technical data science role...',
    customAnswers: [],
    submittedAt: '2024-01-19T15:45:00Z',
    lastUpdated: '2024-01-23T11:20:00Z',
    matchScore: 68,
    notes: 'Strong analytical background, needs technical assessment'
  }
];

// Mock Employers with job listings
export const mockEmployers: Employer[] = [
  {
    id: 'emp-1',
    email: 'hr@techcorp.com',
    name: 'Sarah Johnson',
    type: 'employer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e601?w=100&h=100&fit=crop&crop=face',
    createdAt: '2023-12-01T09:00:00Z',
    company: mockCompanies[0],
    jobListings: [mockJobListings[0], mockJobListings[2]] // Senior Frontend Developer and DevOps Engineer
  },
  {
    id: 'emp-2',
    email: 'hiring@dataflow.com',
    name: 'Michael Chen',
    type: 'employer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: '2023-11-15T09:00:00Z',
    company: mockCompanies[1],
    jobListings: [mockJobListings[1], mockJobListings[4]] // Data Scientist and Product Manager
  },
  {
    id: 'emp-3',
    email: 'talent@greentech.com',
    name: 'Emily Rodriguez',
    type: 'employer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    createdAt: '2023-10-20T09:00:00Z',
    company: mockCompanies[2],
    jobListings: [mockJobListings[3]] // UX Designer
  }
];

// Current user state (for demo purposes)
export let currentUser: Applicant | Employer | Admin = mockApplicants[0];

export const setCurrentUser = (user: Applicant | Employer | Admin) => {
  currentUser = user;
};