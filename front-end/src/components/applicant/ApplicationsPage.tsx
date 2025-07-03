import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  Eye,
  FileText,
  MessageSquare,
  XCircle
} from 'lucide-react';
import { mockApplications } from '@/data/mockData';

export const ApplicationsPage: React.FC = () => {
  const [applications] = useState(mockApplications);
  const [selectedTab, setSelectedTab] = useState('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'reviewed':
        return <Eye className="h-4 w-4" />;
      case 'interview':
        return <Calendar className="h-4 w-4" />;
      case 'offered':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'offered':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'reviewed':
        return 50;
      case 'interview':
        return 75;
      case 'offered':
      case 'accepted':
        return 100;
      case 'rejected':
        return 0;
      default:
        return 0;
    }
  };

  const filterApplications = (status: string) => {
    if (status === 'all') {return applications;}
    return applications.filter(app => app.status === status);
  };

  const getTabCounts = () => {
    return {
      all: applications.length,
      pending: applications.filter(app => app.status === 'pending').length,
      reviewed: applications.filter(app => app.status === 'reviewed').length,
      interview: applications.filter(app => app.status === 'interview').length,
      offered: applications.filter(app => app.status === 'offered').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
    };
  };

  const tabCounts = getTabCounts();
  const filteredApplications = filterApplications(selectedTab);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
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
    if (diffDays < 30) {return `${Math.ceil(diffDays / 7)} weeks ago`;}
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <MainLayout userType="applicant">
      <PageHeader
        title="My Applications"
        description="Track the status of your job applications"
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        }
      />

      {/* Application Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{tabCounts.all}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{tabCounts.interview}</div>
            <div className="text-sm text-gray-600">Interviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{tabCounts.offered}</div>
            <div className="text-sm text-gray-600">Offers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((tabCounts.interview / tabCounts.all) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Interview Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({tabCounts.pending})</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed ({tabCounts.reviewed})</TabsTrigger>
          <TabsTrigger value="interview">Interview ({tabCounts.interview})</TabsTrigger>
          <TabsTrigger value="offered">Offered ({tabCounts.offered})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({tabCounts.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {application.job.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">
                        {application.job.company.name}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Applied {getTimeAgo(application.submittedAt)}</span>
                        <span>•</span>
                        <span>Match Score: {application.matchScore}%</span>
                        <span>•</span>
                        <span>{application.job.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(application.status)} variant="secondary">
                        <span className="flex items-center gap-1">
                          {getStatusIcon(application.status)}
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Application Progress</span>
                      <span>{getStatusProgress(application.status)}%</span>
                    </div>
                    <Progress value={getStatusProgress(application.status)} className="h-2" />
                  </div>

                  {/* Interview Details */}
                  {application.interviewScheduled && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">Interview Scheduled</span>
                      </div>
                      <div className="text-sm text-purple-800">
                        <p>Date: {formatDate(application.interviewScheduled.date)} at {application.interviewScheduled.time}</p>
                        <p>Type: {application.interviewScheduled.type}</p>
                        <p>Interviewers: {application.interviewScheduled.interviewers.join(', ')}</p>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {application.notes && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900 text-sm">Notes</span>
                      </div>
                      <p className="text-sm text-blue-800">{application.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Submitted: {formatDate(application.submittedAt)}</span>
                      <span>Last Updated: {formatDate(application.lastUpdated)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {application.status === 'interview' && (
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Prepare Interview
                        </Button>
                      )}
                      {application.status === 'offered' && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Respond to Offer
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredApplications.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No applications found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedTab === 'all' 
                      ? "You haven't submitted any applications yet."
                      : `No applications with status "${selectedTab}".`
                    }
                  </p>
                  <Button>Start Job Search</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};
