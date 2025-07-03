import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  FileText, 
  Download,
  Calendar,
  Target,
  DollarSign,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { mockAnalyticsData } from '@/data/mockData';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const analytics = mockAnalyticsData;

  // Mock additional analytics data
  const userGrowthData = [
    { month: 'Jan', users: 850, employers: 120, applicants: 730 },
    { month: 'Feb', users: 920, employers: 135, applicants: 785 },
    { month: 'Mar', users: 1050, employers: 150, applicants: 900 },
    { month: 'Apr', users: 1180, employers: 165, applicants: 1015 },
    { month: 'May', users: 1247, employers: 178, applicants: 1069 }
  ];

  const jobCategoryData = [
    { name: 'Technology', value: 45, color: '#3B82F6' },
    { name: 'Marketing', value: 20, color: '#10B981' },
    { name: 'Sales', value: 15, color: '#F59E0B' },
    { name: 'Design', value: 12, color: '#8B5CF6' },
    { name: 'Other', value: 8, color: '#6B7280' }
  ];

  const applicationFlowData = [
    { stage: 'Applied', count: 3892, percentage: 100 },
    { stage: 'Reviewed', count: 2334, percentage: 60 },
    { stage: 'Interview', count: 934, percentage: 24 },
    { stage: 'Offered', count: 234, percentage: 6 },
    { stage: 'Hired', count: 156, percentage: 4 }
  ];

  const platformMetrics = [
    {
      title: 'Average Time to Hire',
      value: '18 days',
      change: '-2 days from last month',
      icon: Clock,
      color: 'text-blue-600',
      trend: 'down'
    },
    {
      title: 'Success Rate',
      value: '6.2%',
      change: '+0.8% from last month',
      icon: Target,
      color: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'Average Salary Posted',
      value: '$95,000',
      change: '+$3,000 from last month',
      icon: DollarSign,
      color: 'text-purple-600',
      trend: 'up'
    },
    {
      title: 'User Satisfaction',
      value: '4.8/5',
      change: '+0.1 from last month',
      icon: Users,
      color: 'text-orange-600',
      trend: 'up'
    }
  ];

  const topPerformingJobs = [
    { title: 'Senior Frontend Developer', applications: 156, views: 1234, company: 'TechCorp' },
    { title: 'Data Scientist', applications: 134, views: 987, company: 'DataFlow' },
    { title: 'Product Manager', applications: 98, views: 756, company: 'StartupXYZ' },
    { title: 'UX Designer', applications: 87, views: 654, company: 'DesignCo' },
    { title: 'DevOps Engineer', applications: 76, views: 543, company: 'CloudTech' }
  ];

  return (
    <MainLayout userType="admin">
      <PageHeader
        title="Analytics Dashboard"
        description="Platform performance metrics and insights"
        actions={
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {platformMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className={`text-xs mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Monthly user registration trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="applicants" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="employers" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Job Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Job Categories</CardTitle>
                <CardDescription>Distribution of job postings by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={jobCategoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {jobCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Registration Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applicants" fill="#3B82F6" name="Job Seekers" />
                    <Bar dataKey="employers" fill="#10B981" name="Employers" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Daily Active Users</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weekly Active Users</span>
                    <span className="font-semibold">8,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Active Users</span>
                    <span className="font-semibold">15,678</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Session Duration</span>
                    <span className="font-semibold">12m 34s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Jobs</CardTitle>
                <CardDescription>Jobs with highest application rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingJobs.map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{job.title}</h4>
                        <p className="text-xs text-gray-600">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{job.applications} applications</p>
                        <p className="text-xs text-gray-600">{job.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Posting Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Jobs Posted This Month</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Job Views</span>
                    <span className="font-semibold">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Applications per Job</span>
                    <span className="font-semibold">25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Job Fill Rate</span>
                    <span className="font-semibold">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
                <CardDescription>Conversion rates through hiring process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicationFlowData.map((stage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{stage.stage}</span>
                        <span>{stage.count} ({stage.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stage.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Applications</span>
                    <span className="font-semibold">{analytics.totalApplications.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Applications This Week</span>
                    <span className="font-semibold">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Interview Rate</span>
                    <span className="font-semibold">24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Offer Rate</span>
                    <span className="font-semibold">6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Acceptance Rate</span>
                    <span className="font-semibold">85%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};
