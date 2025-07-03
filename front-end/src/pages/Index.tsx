import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  
  const handleUserTypeSelection = (userType: 'applicant' | 'employer' | 'admin') => {
    if (userType === 'applicant') {
      navigate('/applicant');
    } else if (userType === 'employer') {
      navigate('/employer');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">JobMatch AI</h1>
            <div className="flex gap-4">
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                Login
              </Button>
              <Button variant="secondary">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            AI-Powered Job Matching Platform
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Connect talented professionals with their dream jobs using advanced AI matching, 
            automated applications, and intelligent interview preparation.
          </p>
        </div>

        {/* User Type Selection */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-white text-center mb-8">
            Choose Your Experience
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Applicant Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <CardTitle className="text-white">Job Seekers</CardTitle>
                <CardDescription className="text-white/80">
                  Find your perfect job with AI-powered matching
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-white/80 text-sm space-y-2 mb-6">
                  <li>• AI-powered job recommendations</li>
                  <li>• Auto-generated cover letters</li>
                  <li>• Interview preparation tools</li>
                  <li>• Application tracking</li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => handleUserTypeSelection('applicant')}
                >
                  Get Started as Job Seeker
                </Button>
              </CardContent>
            </Card>

            {/* Employer Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <CardTitle className="text-white">Employers</CardTitle>
                <CardDescription className="text-white/80">
                  Find top talent with intelligent candidate ranking
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-white/80 text-sm space-y-2 mb-6">
                  <li>• AI candidate screening</li>
                  <li>• Smart job posting optimization</li>
                  <li>• Interview question generation</li>
                  <li>• Candidate ranking system</li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => handleUserTypeSelection('employer')}
                >
                  Post Jobs & Hire
                </Button>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <CardTitle className="text-white">Administrators</CardTitle>
                <CardDescription className="text-white/80">
                  Manage platform operations and analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-white/80 text-sm space-y-2 mb-6">
                  <li>• Platform analytics dashboard</li>
                  <li>• User management tools</li>
                  <li>• Content moderation</li>
                  <li>• System monitoring</li>
                </ul>
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => handleUserTypeSelection('admin')}
                >
                  Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold text-white mb-12">
            Powered by Advanced AI Technology
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Smart Matching</h4>
              <p className="text-white/80 text-sm">AI analyzes skills and preferences for perfect job matches</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📝</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Auto Applications</h4>
              <p className="text-white/80 text-sm">Generate personalized cover letters and applications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Interview Prep</h4>
              <p className="text-white/80 text-sm">AI-generated practice questions tailored to each role</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Real-time Analytics</h4>
              <p className="text-white/80 text-sm">Track applications and optimize your job search strategy</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
