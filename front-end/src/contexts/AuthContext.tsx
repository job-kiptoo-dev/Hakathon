import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, SignupData } from '../types';
import { mockApplicants, mockEmployers, mockCompanies } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials for testing
const MOCK_CREDENTIALS = {
  applicant: { email: 'john.doe@email.com', password: 'password123' },
  employer: { email: 'hr@techcorp.com', password: 'password123' },
  admin: { email: 'admin@platform.com', password: 'admin123' }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string, userType: 'applicant' | 'employer' | 'admin'): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check mock credentials
      const mockCred = MOCK_CREDENTIALS[userType];
      if (email === mockCred.email && password === mockCred.password) {
        let loggedInUser: User;

        switch (userType) {
          case 'applicant':
            loggedInUser = mockApplicants[0];
            break;
          case 'employer':
            loggedInUser = mockEmployers[0];
            break;
          case 'admin':
            loggedInUser = {
              id: 'admin-1',
              email: 'admin@platform.com',
              name: 'Admin User',
              type: 'admin',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
              createdAt: '2023-11-01T09:00:00Z',
              permissions: ['user_management', 'content_moderation', 'system_monitoring', 'analytics']
            };
            break;
          default:
            throw new Error('Invalid user type');
        }

        setUser(loggedInUser);
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create new user based on type
      const newUser: User = {
        id: `${userData.userType}-${Date.now()}`,
        email: userData.email,
        name: userData.name,
        type: userData.userType,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
        createdAt: new Date().toISOString(),
      };

      // Add type-specific properties
      if (userData.userType === 'applicant') {
        (newUser as any).profile = {
          id: `profile-${Date.now()}`,
          userId: newUser.id,
          personalInfo: {
            firstName: userData.name.split(' ')[0] || '',
            lastName: userData.name.split(' ')[1] || '',
            phone: '',
            location: '',
          },
          professional: {
            title: '',
            summary: '',
            experience: [],
            education: [],
            skills: [],
            certifications: []
          },
          preferences: {
            desiredSalaryMin: 0,
            desiredSalaryMax: 0,
            preferredLocations: [],
            jobTypes: [],
            remotePreference: 'flexible' as const
          },
          profileCompleteness: 20
        };
        (newUser as any).applications = [];
        (newUser as any).savedJobs = [];
      } else if (userData.userType === 'employer') {
        (newUser as any).company = {
          id: `comp-${Date.now()}`,
          name: userData.companyName || 'New Company',
          description: '',
          industry: '',
          size: '',
          location: '',
          culture: [],
          benefits: []
        };
        (newUser as any).jobListings = [];
      } else if (userData.userType === 'admin') {
        (newUser as any).permissions = ['basic_access'];
      }

      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
