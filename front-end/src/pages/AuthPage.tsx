import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Home } from 'lucide-react';

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Redirect if already authenticated
  if (user) {
    switch (user.type) {
      case 'applicant':
        return <Navigate to="/applicant/dashboard" replace />;
      case 'employer':
        return <Navigate to="/employer/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  const handleAuthSuccess = () => {
    // Navigation will be handled by the redirect logic above
    // since user state will be updated
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Home Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to JobMatch AI
          </h1>
          <p className="text-gray-600">
            Connect talent with opportunity using AI
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm 
              onSuccess={handleAuthSuccess}
              onSwitchToSignup={() => setActiveTab('signup')}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm 
              onSuccess={handleAuthSuccess}
              onSwitchToLogin={() => setActiveTab('login')}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Demo Access</h3>
            <p className="text-sm text-gray-600 mb-3">
              Use these credentials to explore different user experiences:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="font-medium">Job Seeker:</span>
                <span>john.doe@email.com / password123</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Employer:</span>
                <span>hr@techcorp.com / password123</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Admin:</span>
                <span>admin@platform.com / admin123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
