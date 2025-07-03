import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  Eye,
  Flag,
  MessageSquare,
  Shield,
  User,
  XCircle
} from 'lucide-react';
import { mockJobListings } from '@/data/mockData';

export const ContentModerationPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('pending');

  // Mock moderation queue data
  const moderationQueue = [
    {
      id: 'mod-1',
      type: 'job_listing',
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      content: 'We are looking for a senior software engineer with 5+ years of experience...',
      submittedBy: 'hr@techcorp.com',
      submittedAt: '2024-01-25T10:30:00Z',
      status: 'pending',
      flags: ['salary_missing', 'vague_requirements'],
      priority: 'medium'
    },
    {
      id: 'mod-2',
      type: 'company_profile',
      title: 'DataFlow Inc Profile Update',
      company: 'DataFlow Inc',
      content: 'Updated company description and benefits information...',
      submittedBy: 'admin@dataflow.com',
      submittedAt: '2024-01-25T09:15:00Z',
      status: 'pending',
      flags: ['needs_verification'],
      priority: 'low'
    },
    {
      id: 'mod-3',
      type: 'user_report',
      title: 'Inappropriate Job Description',
      company: 'Unknown Company',
      content: 'User reported job posting for discriminatory language...',
      submittedBy: 'system',
      submittedAt: '2024-01-24T16:45:00Z',
      status: 'pending',
      flags: ['user_report', 'discrimination'],
      priority: 'high'
    }
  ];

  const approvedItems = [
    {
      id: 'app-1',
      type: 'job_listing',
      title: 'Frontend Developer',
      company: 'GreenTech Innovations',
      approvedBy: 'admin@platform.com',
      approvedAt: '2024-01-25T08:30:00Z',
      status: 'approved'
    }
  ];

  const rejectedItems = [
    {
      id: 'rej-1',
      type: 'job_listing',
      title: 'Unpaid Internship',
      company: 'StartupXYZ',
      rejectedBy: 'admin@platform.com',
      rejectedAt: '2024-01-24T14:20:00Z',
      rejectionReason: 'Violates minimum wage requirements',
      status: 'rejected'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job_listing':
        return <Briefcase className="h-4 w-4" />;
      case 'company_profile':
        return <User className="h-4 w-4" />;
      case 'user_report':
        return <Flag className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFlagColor = (flag: string) => {
    switch (flag) {
      case 'discrimination':
      case 'inappropriate':
        return 'bg-red-100 text-red-800';
      case 'user_report':
        return 'bg-orange-100 text-orange-800';
      case 'needs_verification':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 24) {return `${diffHours} hours ago`;}
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays} days ago`;
  };

  const moderationStats = {
    pending: moderationQueue.length,
    approved: approvedItems.length,
    rejected: rejectedItems.length,
    highPriority: moderationQueue.filter(item => item.priority === 'high').length
  };

  return (
    <MainLayout userType="admin">
      <PageHeader
        title="Content Moderation"
        description="Review and moderate platform content"
        actions={
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Moderation Settings
          </Button>
        }
      />

      {/* Moderation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{moderationStats.pending}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{moderationStats.highPriority}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{moderationStats.approved}</div>
            <div className="text-sm text-gray-600">Approved Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{moderationStats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected Today</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({moderationStats.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({moderationStats.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({moderationStats.rejected})</TabsTrigger>
        </TabsList>

        {/* Pending Items */}
        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {moderationQueue.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <Badge className={getPriorityColor(item.priority)} variant="secondary">
                            {item.priority} priority
                          </Badge>
                        </div>
                        <p className="text-blue-600 font-medium mb-1">{item.company}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>Submitted by: {item.submittedBy}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {getTimeAgo(item.submittedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 text-sm line-clamp-3">{item.content}</p>
                  </div>

                  {/* Flags */}
                  {item.flags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.flags.map((flag) => (
                        <Badge key={flag} className={getFlagColor(flag)} variant="secondary">
                          <Flag className="h-3 w-3 mr-1" />
                          {flag.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Moderation Actions */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Full Content
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact Submitter
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {moderationQueue.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    All caught up!
                  </h3>
                  <p className="text-gray-600">
                    No items pending moderation at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Approved Items */}
        <TabsContent value="approved" className="mt-6">
          <div className="space-y-4">
            {approvedItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(item.type)}
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.company}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Approved by: {item.approvedBy}</p>
                      <p>{formatDate(item.approvedAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Rejected Items */}
        <TabsContent value="rejected" className="mt-6">
          <div className="space-y-4">
            {rejectedItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(item.type)}
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.company}</p>
                        <div className="bg-red-50 border border-red-200 rounded p-2">
                          <p className="text-sm text-red-800">
                            <strong>Rejection Reason:</strong> {item.rejectionReason}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Rejected by: {item.rejectedBy}</p>
                      <p>{formatDate(item.rejectedAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};
