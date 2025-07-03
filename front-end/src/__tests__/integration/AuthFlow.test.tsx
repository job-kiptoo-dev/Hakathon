import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@/App';

// Mock the gemini service
jest.mock('@/services/geminiService', () => ({
  geminiService: {
    calculateJobMatch: jest.fn().mockResolvedValue({
      score: 85,
      reasons: ['Strong skill alignment'],
      skillsMatch: { matched: ['React'], missing: ['Python'] }
    }),
    generateCoverLetter: jest.fn().mockResolvedValue('Mock cover letter'),
    optimizeJobDescription: jest.fn().mockResolvedValue({
      optimizedDescription: 'Optimized job description',
      suggestions: ['Add more details'],
      seoScore: 85
    }),
    parseResume: jest.fn().mockResolvedValue({
      personalInfo: { name: 'John Doe', email: 'john@example.com' },
      skills: ['React', 'TypeScript'],
      experience: [],
      education: []
    }),
    generateInterviewQuestions: jest.fn().mockResolvedValue([
      { question: 'Tell me about yourself', category: 'behavioral' }
    ])
  }
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderApp = () => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset any mocks
    jest.clearAllMocks();
  });

  test('should redirect unauthenticated users to landing page', () => {
    renderApp();
    
    expect(screen.getByText('Find Your Dream Job')).toBeInTheDocument();
    expect(screen.getByText('AI-powered job recommendations tailored for you')).toBeInTheDocument();
  });

  test('should show login and signup buttons on landing page', () => {
    renderApp();
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('should navigate to auth page when login button is clicked', () => {
    renderApp();
    
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    // Should navigate to auth page
    expect(window.location.pathname).toBe('/auth');
  });

  test('should complete full authentication flow for applicant', async () => {
    renderApp();
    
    // Navigate to auth page
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    // Wait for auth page to load
    await waitFor(() => {
      expect(screen.getByText('Welcome to JobMatch AI')).toBeInTheDocument();
    });

    // Fill in login form
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit login form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Should redirect to applicant dashboard
    await waitFor(() => {
      expect(window.location.pathname).toBe('/applicant/dashboard');
    });
    
    // Should show applicant dashboard content
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
  });

  test('should complete signup flow for new applicant', async () => {
    renderApp();
    
    // Navigate to auth page
    const signupButton = screen.getByText('Sign Up');
    fireEvent.click(signupButton);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome to JobMatch AI')).toBeInTheDocument();
    });

    // Switch to signup tab
    const signupTab = screen.getByText('Sign Up');
    fireEvent.click(signupTab);
    
    // Fill in signup form
    const nameInput = screen.getByPlaceholderText('Enter your full name');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Create a password');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Select user type
    const applicantRadio = screen.getByLabelText('Job Seeker');
    fireEvent.click(applicantRadio);
    
    // Submit signup form
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);
    
    // Should redirect to applicant dashboard
    await waitFor(() => {
      expect(window.location.pathname).toBe('/applicant/dashboard');
    });
  });

  test('should handle employer authentication flow', async () => {
    renderApp();
    
    // Navigate to auth and login as employer
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome to JobMatch AI')).toBeInTheDocument();
    });

    // Mock employer login
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    
    fireEvent.change(emailInput, { target: { value: 'employer@company.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Should redirect to employer dashboard
    await waitFor(() => {
      expect(window.location.pathname).toBe('/employer/dashboard');
    });
  });

  test('should handle admin authentication flow', async () => {
    renderApp();
    
    // Navigate to auth and login as admin
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome to JobMatch AI')).toBeInTheDocument();
    });

    // Mock admin login
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    
    fireEvent.change(emailInput, { target: { value: 'admin@platform.com' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    // Should redirect to admin dashboard
    await waitFor(() => {
      expect(window.location.pathname).toBe('/admin/dashboard');
    });
  });

  test('should persist authentication state across page reloads', async () => {
    renderApp();
    
    // Login first
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome to JobMatch AI')).toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/applicant/dashboard');
    });

    // Simulate page reload by re-rendering the app
    renderApp();
    
    // Should still be authenticated and on dashboard
    await waitFor(() => {
      expect(window.location.pathname).toBe('/applicant/dashboard');
    });
  });

  test('should handle logout correctly', async () => {
    // Pre-authenticate user
    localStorage.setItem('user', JSON.stringify({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      type: 'applicant'
    }));
    
    renderApp();
    
    // Should start on dashboard
    await waitFor(() => {
      expect(window.location.pathname).toBe('/applicant/dashboard');
    });

    // Find and click logout button
    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);
    
    // Should redirect to landing page
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
    
    // Should show landing page content
    expect(screen.getByText('Find Your Dream Job')).toBeInTheDocument();
  });
});
