import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Users,
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import { mockAnalyticsData, mockJobListings, mockApplications } from '@/data/mockData';

export const AdminReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const analytics = mockAnalyticsData;

  const reportData = {
    userMetrics: {
      totalUsers: analytics.totalUsers,
      newUsersThisMonth: 147,
      activeUsers: 892,
      userRetentionRate: 78.5
    },
    jobMetrics: {
      totalJobs: analytics.totalJobs,
      activeJobs: mockJobListings.filter(job => job.status === 'active').length,
      avgJobViews: Math.round(mockJobListings.reduce((sum, job) => sum + job.viewCount, 0) / mockJobListings.length),
      jobCompletionRate: 65.2
    },
    applicationMetrics: {
      totalApplications: analytics.totalApplications,
      successRate: Math.round((analytics.successfulMatches / analytics.totalApplications) * 100),
      avgTimeToHire: 18,
      interviewRate: Math.round((analytics.applicationStats.interview / analytics.totalApplications) * 100)
    },
    platformHealth: {
      systemUptime: 99.8,
      avgResponseTime: 245,
      errorRate: 0.02,
      userSatisfaction: 4.8
    }
  };

  const topPerformingJobs = mockJobListings
    .sort((a, b) => b.applicantCount - a.applicantCount)
    .slice(0, 5);

  const applicationTrends = [
    { month: 'Jan', applications: 320, hires: 45 },
    { month: 'Feb', applications: 385, hires: 52 },
    { month: 'Mar', applications: 420, hires: 58 },
    { month: 'Apr', applications: 395, hires: 61 },
    { month: 'May', applications: 450, hires: 67 },
    { month: 'Jun', applications: 485, hires: 72 }
  ];

  const generateReport = (type: string) => {
    // In a real app, this would trigger a report generation
    alert(`Generating ${type} report...`);
  };

  return (
    <MainLayout userType="admin">
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive platform performance and usage reports"
      />

      {/* Report Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
          <CardDescription>
            Generate detailed reports for different time periods and metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => generateReport('user-activity')}>
                <Download className="h-4 w-4 mr-2" />
                User Activity
              </Button>
              <Button variant="outline" size="sm" onClick={() => generateReport('job-performance')}>
                <Download className="h-4 w-4 mr-2" />
                Job Performance
              </Button>
              <Button variant="outline" size="sm" onClick={() => generateReport('financial')}>
                <Download className="h-4 w-4 mr-2" />
                Financial Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* User Metrics */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{reportData.userMetrics.totalUsers.toLocaleString()}</p>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600">+{reportData.userMetrics.newUsersThisMonth} this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Metrics */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Active Jobs</h3>
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{reportData.jobMetrics.activeJobs}</p>
              <div className="flex items-center text-sm">
                <span className="text-gray-600">Completion rate: {reportData.jobMetrics.jobCompletionRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Metrics */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
              <CheckCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{reportData.applicationMetrics.successRate}%</p>
              <div className="flex items-center text-sm">
                <span className="text-gray-600">Avg time to hire: {reportData.applicationMetrics.avgTimeToHire} days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Health */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">System Uptime</h3>
              <BarChart3 className="h-5 w-5 text-orange-600" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{reportData.platformHealth.systemUptime}%</p>
              <div className="flex items-center text-sm">
                <span className="text-gray-600">Avg response: {reportData.platformHealth.avgResponseTime}ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Performing Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Jobs</CardTitle>
            <CardDescription>Jobs with the highest application rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingJobs.map((job, index) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.company.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{job.applicantCount} apps</p>
                    <p className="text-sm text-gray-600">{job.viewCount} views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status Distribution</CardTitle>
            <CardDescription>Current status of all applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.applicationStats).map(([status, count]) => {
                const percentage = (count / analytics.totalApplications) * 100;
                const getStatusIcon = (status: string) => {
                  switch (status) {
                    case 'pending':
                      return <Clock className="h-4 w-4 text-yellow-600" />;
                    case 'reviewed':
                      return <FileText className="h-4 w-4 text-blue-600" />;
                    case 'interview':
                      return <Users className="h-4 w-4 text-purple-600" />;
                    case 'offered':
                      return <CheckCircle className="h-4 w-4 text-green-600" />;
                    case 'accepted':
                      return <CheckCircle className="h-4 w-4 text-green-700" />;
                    case 'rejected':
                      return <XCircle className="h-4 w-4 text-red-600" />;
                    default:
                      return <FileText className="h-4 w-4 text-gray-600" />;
                  }
                };

                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span className="capitalize font-medium">{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{count}</span>
                      <Badge variant="outline">{percentage.toFixed(1)}%</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Download detailed reports for comprehensive analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">User Activity Report</h4>
              <p className="text-sm text-gray-600 mb-4">Detailed user engagement and activity metrics</p>
              <Button variant="outline" size="sm" onClick={() => generateReport('user-activity')}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Job Performance Report</h4>
              <p className="text-sm text-gray-600 mb-4">Job posting effectiveness and application trends</p>
              <Button variant="outline" size="sm" onClick={() => generateReport('job-performance')}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Financial Report</h4>
              <p className="text-sm text-gray-600 mb-4">Revenue, costs, and financial performance metrics</p>
              <Button variant="outline" size="sm" onClick={() => generateReport('financial')}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};
