import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  BarChart3, 
  Briefcase, 
  CheckCircle, 
  Clock,
  FileText,
  TrendingUp,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockAnalyticsData } from '@/data/mockData';

export const AdminDashboardHome: React.FC = () => {
  const { user } = useAuth();
  const analytics = mockAnalyticsData;

  const stats = [
    {
      title: 'Total Users',
      value: analytics.totalUsers.toLocaleString(),
      change: '+12% this month',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Jobs',
      value: analytics.totalJobs.toLocaleString(),
      change: '+8% this month',
      icon: Briefcase,
      color: 'text-green-600'
    },
    {
      title: 'Applications',
      value: analytics.totalApplications.toLocaleString(),
      change: '+24% this month',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      title: 'Successful Matches',
      value: analytics.successfulMatches.toLocaleString(),
      change: '+15% this month',
      icon: CheckCircle,
      color: 'text-orange-600'
    }
  ];

  const recentActivity = [
    { type: 'user_signup', message: 'New user registered: john.doe@email.com', time: '2 minutes ago' },
    { type: 'job_posted', message: 'New job posted: Senior Developer at TechCorp', time: '15 minutes ago' },
    { type: 'application', message: '5 new applications received', time: '1 hour ago' },
    { type: 'interview', message: 'Interview scheduled for Frontend Developer role', time: '2 hours ago' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'job_posted':
        return <Briefcase className="h-4 w-4 text-green-600" />;
      case 'application':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'interview':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <MainLayout userType="admin">
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0]}!`}
        description="Platform overview and system monitoring"
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
        {/* Application Status Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Application Status Overview
              </CardTitle>
              <CardDescription>
                Current status of all applications in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.applicationStats).map(([status, count]) => {
                  const percentage = (count / analytics.totalApplications) * 100;
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case 'pending':
                        return 'bg-yellow-500';
                      case 'reviewed':
                        return 'bg-blue-500';
                      case 'interview':
                        return 'bg-purple-500';
                      case 'offered':
                        return 'bg-green-500';
                      case 'accepted':
                        return 'bg-green-600';
                      case 'rejected':
                        return 'bg-red-500';
                      default:
                        return 'bg-gray-500';
                    }
                  };

                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-medium">{status}</span>
                        <span>{count} ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getStatusColor(status)}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Service</span>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <Badge className="bg-yellow-100 text-yellow-800" variant="secondary">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Warning
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">
                    {Math.round((analytics.successfulMatches / analytics.totalApplications) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. Time to Hire</span>
                  <span className="font-medium">18 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">User Satisfaction</span>
                  <span className="font-medium text-green-600">4.8/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="font-medium">234</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
