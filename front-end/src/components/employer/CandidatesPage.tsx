import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Calendar, 
  MessageSquare,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Briefcase,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { mockApplications, mockJobListings, mockApplicants } from '@/data/mockData';

export const CandidatesPage: React.FC = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('match-score');

  // Action handlers
  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? { ...app, status: newStatus as any, lastUpdated: new Date().toISOString() }
          : app
      )
    );
  };

  const handleScheduleInterview = (applicationId: string) => {
    // In a real app, this would open a scheduling modal
    console.log('Schedule interview for application:', applicationId);
    handleStatusChange(applicationId, 'interview');
  };

  const handleMakeOffer = (applicationId: string) => {
    // In a real app, this would open an offer modal
    console.log('Make offer for application:', applicationId);
    handleStatusChange(applicationId, 'offered');
  };

  const handleReject = (applicationId: string) => {
    // In a real app, this would show a confirmation dialog
    if (confirm('Are you sure you want to reject this candidate?')) {
      handleStatusChange(applicationId, 'rejected');
    }
  };

  const filteredApplications = applications.filter(app => {
    const applicant = app.applicant || mockApplicants.find(a => a.id === app.applicantId);
    const matchesSearch = app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJob = !selectedJob || app.jobId === selectedJob;
    const matchesStatus = !selectedStatus || app.status === selectedStatus;

    return matchesSearch && matchesJob && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'match-score':
        return b.matchScore - a.matchScore;
      case 'date':
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      case 'name':
        const applicantA = a.applicant || mockApplicants.find(ap => ap.id === a.applicantId);
        const applicantB = b.applicant || mockApplicants.find(ap => ap.id === b.applicantId);
        return applicantA?.name?.localeCompare(applicantB?.name || '') || 0;
      default:
        return 0;
    }
  });

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'reviewed':
        return <Eye className="h-4 w-4" />;
      case 'interview':
        return <Calendar className="h-4 w-4" />;
      case 'offered':
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.ceil(diffDays / 7)} weeks ago`;
  };

  // Get candidate info from application or find by applicantId
  const getCandidateInfo = (application: any) => {
    const applicant = application.applicant || mockApplicants.find(a => a.id === application.applicantId);

    if (!applicant) {
      return {
        name: 'Unknown Candidate',
        email: 'unknown@email.com',
        phone: 'N/A',
        location: 'Unknown',
        title: 'Unknown Position',
        experience: 'N/A',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        skills: []
      };
    }

    // Calculate years of experience from profile
    const totalExperience = applicant.profile?.professional?.experience?.reduce((total, exp) => {
      const startYear = new Date(exp.startDate).getFullYear();
      const endYear = exp.current ? new Date().getFullYear() : new Date(exp.endDate).getFullYear();
      return total + (endYear - startYear);
    }, 0) || 0;

    return {
      name: applicant.name,
      email: applicant.email,
      phone: applicant.profile?.personalInfo?.phone || 'N/A',
      location: applicant.profile?.personalInfo?.location || 'Unknown',
      title: applicant.profile?.professional?.title || 'Unknown Position',
      experience: totalExperience > 0 ? `${totalExperience} years` : 'Entry level',
      avatar: applicant.avatar,
      skills: applicant.profile?.professional?.skills?.slice(0, 8) || []
    };
  };

  return (
    <MainLayout userType="employer">
      <PageHeader
        title="Candidates"
        description="Review and manage candidate applications"
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Candidates
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter(app => app.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {applications.filter(app => app.status === 'interview').length}
            </div>
            <div className="text-sm text-gray-600">Interviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === 'offered').length}
            </div>
            <div className="text-sm text-gray-600">Offers Made</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(applications.reduce((sum, app) => sum + app.matchScore, 0) / applications.length) || 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Match Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger>
                <SelectValue placeholder="All jobs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All jobs</SelectItem>
                {mockJobListings.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match-score">Best Match</SelectItem>
                <SelectItem value="date">Most Recent</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="space-y-4">
        {sortedApplications.map((application) => {
          const candidate = getCandidateInfo(application);
          
          return (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback>
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-blue-600 font-medium">{candidate.title}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {candidate.location}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {candidate.experience} experience
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getMatchColor(application.matchScore)}`}>
                            {application.matchScore}%
                          </div>
                          <div className="text-xs text-gray-600">Match</div>
                        </div>
                        <Badge className={getStatusColor(application.status)} variant="secondary">
                          <span className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-2">
                        Applied for: <span className="font-medium">{application.job.title}</span>
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Applied {getTimeAgo(application.submittedAt)}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {candidate.email}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {candidate.phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {candidate.skills.length > 0 ? (
                        <>
                          {candidate.skills.slice(0, 5).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 5} more
                            </Badge>
                          )}
                        </>
                      ) : (
                        <span className="text-sm text-gray-500 italic">No skills listed</span>
                      )}
                    </div>

                    {application.interviewScheduled && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-purple-900 text-sm">Interview Scheduled</span>
                        </div>
                        <div className="text-sm text-purple-800">
                          {formatDate(application.interviewScheduled.date)} at {application.interviewScheduled.time}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {application.matchScore}% match
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        {application.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(application.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleScheduleInterview(application.id)}
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              Schedule Interview
                            </Button>
                          </>
                        )}
                        {application.status === 'reviewed' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(application.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleScheduleInterview(application.id)}
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              Schedule Interview
                            </Button>
                          </>
                        )}
                        {application.status === 'interview' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(application.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleMakeOffer(application.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Make Offer
                            </Button>
                          </>
                        )}
                        {(application.status === 'offered' || application.status === 'accepted') && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {application.status === 'offered' ? 'Offer Extended' : 'Offer Accepted'}
                          </Badge>
                        )}
                        {application.status === 'rejected' && (
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Rejected
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {sortedApplications.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No candidates found
              </h3>
              <p className="text-gray-600 mb-4">
                No candidates match your current filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedJob('');
                  setSelectedStatus('');
                  setSortBy('match-score');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};
