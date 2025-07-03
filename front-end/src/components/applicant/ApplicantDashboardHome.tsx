import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  Send
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobListings, mockApplications, mockNotifications } from '@/data/mockData';
import { geminiService } from '@/services/geminiService';

export const ApplicantDashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [jobMatches, setJobMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobMatches = async () => {
      setLoading(true);
      try {
        // Simulate AI job matching
        const matches = await Promise.all(
          mockJobListings.slice(0, 3).map(async (job) => {
            const matchData = await geminiService.calculateJobMatch(
              job.description,
              job.requirements,
              job.skills,
              (user as any)?.profile?.professional?.skills || [],
              (user as any)?.profile?.professional?.experience?.[0]?.description || '',
              (user as any)?.profile?.professional?.summary || ''
            );
            return {
              job,
              ...matchData
            };
          })
        );
        setJobMatches(matches);
      } catch (error) {
        console.error('Error loading job matches:', error);
        // Fallback to mock data
        setJobMatches(mockJobListings.slice(0, 3).map(job => ({
          job,
          score: Math.floor(Math.random() * 30) + 70,
          reasons: ['Strong skill match', 'Experience aligns well', 'Good cultural fit'],
          skillsMatch: {
            matched: job.skills.slice(0, 3),
            missing: job.skills.slice(3, 5)
          }
        })));
      }
      setLoading(false);
    };

    loadJobMatches();
  }, [user]);

  const stats = [
    {
      title: 'Applications Sent',
      value: '12',
      change: '+3 this week',
      icon: Send,
      color: 'text-blue-600'
    },
    {
      title: 'Profile Views',
      value: '48',
      change: '+12 this week',
      icon: Eye,
      color: 'text-green-600'
    },
    {
      title: 'Interviews Scheduled',
      value: '3',
      change: '+1 this week',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Job Matches',
      value: '24',
      change: '+8 new',
      icon: Star,
      color: 'text-orange-600'
    }
  ];

  const recentApplications = mockApplications.slice(0, 3);
  const recentNotifications = mockNotifications.slice(0, 3);

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'offered':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout userType="applicant">
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0]}!`}
        description="Here's what's happening with your job search"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Job Matches */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                AI-Powered Job Matches
              </CardTitle>
              <CardDescription>
                Jobs that match your skills and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {jobMatches.map((match, index) => (
                    <div key={match.job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{match.job.title}</h4>
                          <p className="text-sm text-gray-600">{match.job.company.name}</p>
                        </div>
                        <Badge className={`${getMatchColor(match.score)} text-white`}>
                          {match.score}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {match.job.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {match.skillsMatch.matched.slice(0, 3).map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/applicant/jobs/${match.job.id}`}>View</Link>
                          </Button>
                          <Button size="sm">Apply</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <Button variant="outline" asChild>
                      <Link to="/applicant/jobs">View All Matches</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resume uploaded
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Skills added
                  </div>
                  <div className="flex items-center text-orange-600">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Add portfolio link
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/applicant/profile">Complete Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {app.job.title}
                      </p>
                      <p className="text-xs text-gray-500">{app.job.company.name}</p>
                    </div>
                    <Badge className={getStatusColor(app.status)} variant="secondary">
                      {app.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/applicant/applications">View All</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="text-sm">
                    <p className="font-medium text-gray-900">{notification.title}</p>
                    <p className="text-gray-600 text-xs">{notification.message}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
