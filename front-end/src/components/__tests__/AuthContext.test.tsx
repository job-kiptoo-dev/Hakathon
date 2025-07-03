import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

// Mock component to test the AuthContext
const TestComponent = () => {
  const { user, login, logout, signup, isLoading } = useAuth();

  return (
    <div>
      <div data-testid="user-status">
        {user ? `Logged in as ${user.name}` : 'Not logged in'}
      </div>
      <div data-testid="loading-status">
        {isLoading ? 'Loading' : 'Not loading'}
      </div>
      <button
        data-testid="login-button"
        onClick={() => login('test@example.com', 'password')}
      >
        Login
      </button>
      <button
        data-testid="logout-button"
        onClick={logout}
      >
        Logout
      </button>
      <button
        data-testid="signup-button"
        onClick={() => signup({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password',
          userType: 'applicant'
        })}
      >
        Signup
      </button>
    </div>
  );
};

const renderWithAuthProvider = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should start with no user logged in', () => {
    renderWithAuthProvider(<TestComponent />);
    
    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    expect(screen.getByTestId('loading-status')).toHaveTextContent('Not loading');
  });

  test('should handle login successfully', async () => {
    renderWithAuthProvider(<TestComponent />);
    
    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    // Should show loading state
    expect(screen.getByTestId('loading-status')).toHaveTextContent('Loading');

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as John Doe');
    });

    expect(screen.getByTestId('loading-status')).toHaveTextContent('Not loading');
  });

  test('should handle logout', async () => {
    renderWithAuthProvider(<TestComponent />);
    
    // First login
    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as John Doe');
    });

    // Then logout
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
  });

  test('should handle signup successfully', async () => {
    renderWithAuthProvider(<TestComponent />);
    
    const signupButton = screen.getByTestId('signup-button');
    fireEvent.click(signupButton);

    // Should show loading state
    expect(screen.getByTestId('loading-status')).toHaveTextContent('Loading');

    // Wait for signup to complete
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Test User');
    });

    expect(screen.getByTestId('loading-status')).toHaveTextContent('Not loading');
  });

  test('should persist user data in localStorage', async () => {
    renderWithAuthProvider(<TestComponent />);
    
    const loginButton = screen.getByTestId('login-button');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as John Doe');
    });

    // Check if user data is stored in localStorage
    const storedUser = localStorage.getItem('user');
    expect(storedUser).toBeTruthy();
    
    const userData = JSON.parse(storedUser!);
    expect(userData.name).toBe('John Doe');
    expect(userData.email).toBe('test@example.com');
  });

  test('should restore user from localStorage on mount', () => {
    // Pre-populate localStorage
    const mockUser = {
      id: '1',
      name: 'Stored User',
      email: 'stored@example.com',
      type: 'applicant'
    };
    localStorage.setItem('user', JSON.stringify(mockUser));

    renderWithAuthProvider(<TestComponent />);
    
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as Stored User');
  });
});
