import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { JobMatcher } from '@/components/ai/JobMatcher';

// Mock the geminiService
jest.mock('@/services/geminiService', () => ({
  geminiService: {
    calculateJobMatch: jest.fn().mockResolvedValue({
      score: 85,
      reasons: ['Strong skill alignment', 'Experience matches requirements'],
      skillsMatch: {
        matched: ['React', 'TypeScript'],
        missing: ['Python', 'AWS']
      }
    })
  }
}));

// Mock the mockJobListings
jest.mock('@/data/mockData', () => ({
  mockJobListings: [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: { name: 'TechCorp' },
      description: 'We are looking for a senior frontend developer...',
      requirements: ['React', 'TypeScript', 'JavaScript'],
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
      location: 'San Francisco, CA',
      salary: { min: 120000, max: 160000 },
      type: 'full-time',
      remote: 'hybrid',
      postedAt: '2024-01-20T10:00:00Z',
      applicantCount: 25,
      viewCount: 150
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: { name: 'StartupXYZ' },
      description: 'Join our growing team as a full stack developer...',
      requirements: ['React', 'Node.js', 'Python'],
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      location: 'Remote',
      salary: { min: 100000, max: 140000 },
      type: 'full-time',
      remote: 'remote',
      postedAt: '2024-01-22T14:30:00Z',
      applicantCount: 18,
      viewCount: 89
    }
  ]
}));

describe('JobMatcher', () => {
  const defaultProps = {
    applicantSkills: ['React', 'TypeScript', 'JavaScript'],
    applicantExperience: 'Senior Frontend Developer with 5 years experience',
    applicantSummary: 'Passionate developer with expertise in modern web technologies'
  };

  test('should render loading state initially', () => {
    render(<JobMatcher {...defaultProps} />);
    
    expect(screen.getByText('Analyzing Job Matches')).toBeInTheDocument();
    expect(screen.getByText('AI is calculating your compatibility with available positions...')).toBeInTheDocument();
  });

  test('should display job matches after loading', async () => {
    render(<JobMatcher {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('AI Job Matches')).toBeInTheDocument();
    });

    expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('TechCorp')).toBeInTheDocument();
    expect(screen.getByText('StartupXYZ')).toBeInTheDocument();
  });

  test('should display match scores', async () => {
    render(<JobMatcher {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getAllByText(/\d+% Match/)).toHaveLength(2);
    });
  });

  test('should show top match badge for highest scoring job', async () => {
    render(<JobMatcher {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('Top Match')).toBeInTheDocument();
    });
  });

  test('should display matching and missing skills', async () => {
    render(<JobMatcher {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('Matching Skills:')).toBeInTheDocument();
      expect(screen.getByText('Skills to Learn:')).toBeInTheDocument();
    });
  });

  test('should handle empty skills gracefully', async () => {
    render(<JobMatcher applicantSkills={[]} applicantExperience="" applicantSummary="" />);
    
    await waitFor(() => {
      expect(screen.getByText('No Job Matches Yet')).toBeInTheDocument();
      expect(screen.getByText('Complete your profile to get AI-powered job recommendations')).toBeInTheDocument();
    });
  });

  test('should call onJobSelect when apply button is clicked', async () => {
    const mockOnJobSelect = jest.fn();
    render(<JobMatcher {...defaultProps} onJobSelect={mockOnJobSelect} />);
    
    await waitFor(() => {
      expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument();
    });

    const applyButtons = screen.getAllByText('Apply Now');
    expect(applyButtons).toHaveLength(2);
    
    // Click the first apply button
    applyButtons[0].click();
    
    expect(mockOnJobSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '1',
        title: 'Senior Frontend Developer'
      }),
      expect.objectContaining({
        score: 85
      })
    );
  });

  test('should display job details correctly', async () => {
    render(<JobMatcher {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
      expect(screen.getByText('$120k - $160k')).toBeInTheDocument();
      expect(screen.getByText('full-time')).toBeInTheDocument();
    });
  });

  test('should show application and view counts', async () => {
    render(<JobMatcher {...defaultProps} />);
    
    await waitFor(() => {
      expect(screen.getByText('25 applicants')).toBeInTheDocument();
      expect(screen.getByText('150 views')).toBeInTheDocument();
    });
  });
});
