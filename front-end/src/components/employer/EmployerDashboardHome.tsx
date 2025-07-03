import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Briefcase, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Eye,
  MessageSquare,
  Plus,
  Send,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockApplications, mockJobListings } from '@/data/mockData';

export const EmployerDashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [activeJobs] = useState(mockJobListings.slice(0, 2));
  const [recentApplications] = useState(mockApplications.slice(0, 5));



  const stats = [
    {
      title: 'Active Job Listings',
      value: '8',
      change: '+2 this month',
      icon: Briefcase,
      color: 'text-blue-600'
    },
    {
      title: 'Total Applications',
      value: '156',
      change: '+24 this week',
      icon: Send,
      color: 'text-green-600'
    },
    {
      title: 'Interviews Scheduled',
      value: '12',
      change: '+5 this week',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Candidates Hired',
      value: '3',
      change: '+1 this month',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {return '1 day ago';}
    if (diffDays < 7) {return `${diffDays} days ago`;}
    return `${Math.ceil(diffDays / 7)} weeks ago`;
  };

  return (
    <MainLayout userType="employer">
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0]}!`}
        description="Manage your job listings and track candidate applications"
        actions={
          <Button asChild>
            <Link to="/employer/jobs/new">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        }
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
        {/* Active Job Listings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Active Job Listings
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/employer/jobs">View All</Link>
                </Button>
              </CardTitle>
              <CardDescription>
                Your currently active job postings and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.location} • {job.type}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">{job.applicantCount}</div>
                        <div className="text-xs text-gray-600">Applications</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">{job.viewCount}</div>
                        <div className="text-xs text-gray-600">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">
                          {Math.round((job.applicantCount / job.viewCount) * 100)}%
                        </div>
                        <div className="text-xs text-gray-600">Conversion</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Posted {getTimeAgo(job.postedAt)}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm">
                          <Users className="h-4 w-4 mr-1" />
                          Review Candidates
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link to="/employer/jobs/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Post New Job
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2" />
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
                      <p className="text-xs text-gray-500">
                        Applied {getTimeAgo(app.submittedAt)}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-gray-600">{app.matchScore}% match</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(app.status)} variant="secondary">
                      {app.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/employer/candidates">View All Candidates</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hiring Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hiring Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Applications</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Under Review</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Interview Scheduled</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Offers Extended</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hired</span>
                  <span className="font-medium text-green-600">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                <Link to="/employer/jobs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                <Link to="/employer/candidates">
                  <Users className="h-4 w-4 mr-2" />
                  Review Candidates
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                <Link to="/employer/interviews">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interviews
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm" asChild>
                <Link to="/employer/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
