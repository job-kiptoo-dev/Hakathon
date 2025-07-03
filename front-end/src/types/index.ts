export interface User {
  id: string;
  email: string;
  name: string;
  type: 'applicant' | 'employer' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Applicant extends User {
  type: 'applicant';
  profile: ApplicantProfile;
  applications: Application[];
  savedJobs: string[];
}

export interface Employer extends User {
  type: 'employer';
  company: Company;
  jobListings: JobListing[];
}

export interface Admin extends User {
  type: 'admin';
  permissions: string[];
}

export interface ApplicantProfile {
  id: string;
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };
  professional: {
    title: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    certifications: string[];
  };
  preferences: {
    desiredSalaryMin: number;
    desiredSalaryMax: number;
    preferredLocations: string[];
    jobTypes: string[];
    remotePreference: 'remote' | 'hybrid' | 'onsite' | 'flexible';
  };
  resume?: {
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
  };
  profileCompleteness: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  logo?: string;
  culture: string[];
  benefits: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: Company;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  experience: {
    min: number;
    max: number;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  remote: 'remote' | 'hybrid' | 'onsite';
  benefits: string[];
  postedAt: string;
  deadline?: string;
  status: 'active' | 'paused' | 'closed';
  applicantCount: number;
  viewCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  applicantId: string;
  job: JobListing;
  applicant?: Applicant; // Optional for easier data handling
  status: 'pending' | 'reviewed' | 'interview' | 'offered' | 'rejected' | 'accepted';
  coverLetter: string;
  customAnswers: { question: string; answer: string; }[];
  submittedAt: string;
  lastUpdated: string;
  matchScore: number;
  notes?: string;
  interviewScheduled?: {
    date: string;
    time: string;
    type: 'phone' | 'video' | 'in-person';
    location?: string;
    interviewers: string[];
  };
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'technical' | 'behavioral' | 'situational' | 'company-specific';
  difficulty: 'easy' | 'medium' | 'hard';
  skills: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application_status' | 'new_job_match' | 'interview_scheduled' | 'message' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface JobMatch {
  job: JobListing;
  score: number;
  reasons: string[];
  skillsMatch: {
    matched: string[];
    missing: string[];
    additional: string[];
  };
}

export interface SearchFilters {
  keywords: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: string[];
  remote: string[];
  experience: string;
  company?: string;
  datePosted: string;
}

export interface AnalyticsData {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  successfulMatches: number;
  userGrowth: { date: string; users: number; }[];
  jobGrowth: { date: string; jobs: number; }[];
  applicationStats: {
    pending: number;
    reviewed: number;
    interview: number;
    offered: number;
    rejected: number;
    accepted: number;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'applicant' | 'employer' | 'admin') => Promise<boolean>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<boolean>;
  isLoading: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  userType: 'applicant' | 'employer' | 'admin';
  companyName?: string; // For employers
}