import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Edit, MapPin, MessageSquare, Phone, Plus, Video } from 'lucide-react';

export const InterviewsPage: React.FC = () => {
  const [interviews] = useState([
    {
      id: '1',
      candidateName: 'John Doe',
      candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      jobTitle: 'Senior Frontend Developer',
      date: '2024-01-30',
      time: '14:00',
      type: 'video',
      status: 'scheduled',
      interviewers: ['Sarah Johnson', 'Mike Chen'],
      duration: 60,
      notes: 'Focus on React and TypeScript experience'
    },
    {
      id: '2',
      candidateName: 'Jane Smith',
      candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e601?w=100&h=100&fit=crop&crop=face',
      jobTitle: 'Data Scientist',
      date: '2024-01-31',
      time: '10:00',
      type: 'phone',
      status: 'scheduled',
      interviewers: ['Alex Wilson'],
      duration: 45,
      notes: 'Initial screening call'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MainLayout userType="employer">
      <PageHeader
        title="Interviews"
        description="Manage and schedule candidate interviews"
        actions={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Interviews */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>
                Your scheduled interviews for this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interviews.map((interview) => (
                  <div key={interview.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                        <AvatarFallback>
                          {interview.candidateName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{interview.candidateName}</h4>
                            <p className="text-blue-600 text-sm">{interview.jobTitle}</p>
                          </div>
                          <Badge className={getStatusColor(interview.status)} variant="secondary">
                            {interview.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(interview.date)}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {interview.time} ({interview.duration} min)
                          </span>
                          <span className="flex items-center">
                            {getTypeIcon(interview.type)}
                            <span className="ml-1 capitalize">{interview.type}</span>
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Interviewers:</span> {interview.interviewers.join(', ')}
                          </p>
                          {interview.notes && (
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">Notes:</span> {interview.notes}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm">
                            Join Interview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Calendar Widget */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm">Today</span>
                  <span className="text-sm font-medium">2 interviews</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm">Tomorrow</span>
                  <span className="text-sm font-medium">1 interview</span>
                </div>
                <div className="flex justify-between items-center p-2">
                  <span className="text-sm">Thursday</span>
                  <span className="text-sm font-medium">3 interviews</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Interview Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">75%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Interview Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
