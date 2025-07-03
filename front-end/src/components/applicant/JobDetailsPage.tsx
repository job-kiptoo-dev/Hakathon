import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  MapPin,
  Share2,
  Users
} from 'lucide-react';
import { mockJobListings } from '@/data/mockData';
import { JobListing } from '@/types';

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobListing | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundJob = mockJobListings.find(j => j.id === id);
      setJob(foundJob || null);
      setLoading(false);
      
      // Check if job is saved (mock implementation)
      setIsSaved(Math.random() > 0.5);
    }
  }, [id]);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // In a real app, this would save to the backend
  };

  const handleApply = () => {
    // In a real app, this would navigate to application form or trigger application flow
    alert('Application functionality would be implemented here');
  };

  const handleShare = () => {
    if (navigator.share && job) {
      navigator.share({
        title: job.title,
        text: `Check out this job opportunity: ${job.title} at ${job.company.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Job URL copied to clipboard!');
    }
  };

  const getMatchScore = () => {
    // Simulate AI matching score
    return Math.floor(Math.random() * 30) + 70;
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) {return 'bg-green-500';}
    if (score >= 75) {return 'bg-blue-500';}
    if (score >= 60) {return 'bg-yellow-500';}
    return 'bg-red-500';
  };

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
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

  if (loading) {
    return (
      <MainLayout userType="applicant">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout userType="applicant">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
            <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/applicant/jobs')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Job Search
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const matchScore = getMatchScore();

  return (
    <MainLayout userType="applicant">
      <PageHeader
        title={job.title}
        description={`${job.company.name} • ${job.location}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/applicant/jobs')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              onClick={handleSaveJob}
              className={isSaved ? 'text-blue-600' : ''}
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4 mr-2" />
              ) : (
                <Bookmark className="h-4 w-4 mr-2" />
              )}
              {isSaved ? 'Saved' : 'Save Job'}
            </Button>
            <Button onClick={handleApply}>
              Apply Now
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                    <Badge className={`${getMatchColor(matchScore)} text-white`}>
                      {matchScore}% Match
                    </Badge>
                  </div>
                  <p className="text-blue-600 font-medium text-lg mb-2">{job.company.name}</p>
                  <div className="flex items-center text-gray-600 gap-4 flex-wrap">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {formatSalary(job.salary.min, job.salary.max)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {getTimeAgo(job.postedAt)}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applicantCount} applicants
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="capitalize">
                  {job.type}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {job.remote}
                </Badge>
                <Badge variant="outline">
                  {job.experience.min}-{job.experience.max} years experience
                </Badge>
              </div>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </CardContent>
          </Card>

          {/* Job Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Apply */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Apply</CardTitle>
              <CardDescription>
                Apply with your saved profile and resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleApply} className="w-full" size="lg">
                Apply Now
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveJob}
                className="w-full"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save for Later
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                About {job.company.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{job.company.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Industry:</span>
                  <span className="font-medium">{job.company.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Company Size:</span>
                  <span className="font-medium">{job.company.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{job.company.location}</span>
                </div>
              </div>

              {job.company.website && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={job.company.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Posted:</span>
                <span className="font-medium">{getTimeAgo(job.postedAt)}</span>
              </div>
              {job.deadline && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Deadline:</span>
                  <span className="font-medium">
                    {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Job Type:</span>
                <span className="font-medium capitalize">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Work Style:</span>
                <span className="font-medium capitalize">{job.remote}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Experience:</span>
                <span className="font-medium">
                  {job.experience.min}-{job.experience.max} years
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
