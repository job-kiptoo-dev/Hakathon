import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  Calendar,
  Copy,
  Edit,
  Eye,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Share,
  Trash2,
  TrendingUp,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockJobListings } from '@/data/mockData';

export const JobListingsPage: React.FC = () => {
  const [jobs] = useState(mockJobListings);
  const [selectedTab, setSelectedTab] = useState('all');

  const filterJobs = (status: string) => {
    if (status === 'all') {return jobs;}
    return jobs.filter(job => job.status === status);
  };

  const getTabCounts = () => {
    return {
      all: jobs.length,
      active: jobs.filter(job => job.status === 'active').length,
      paused: jobs.filter(job => job.status === 'paused').length,
      closed: jobs.filter(job => job.status === 'closed').length,
    };
  };

  const tabCounts = getTabCounts();
  const filteredJobs = filterJobs(selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="h-4 w-4" />;
      case 'paused':
        return <Pause className="h-4 w-4" />;
      case 'closed':
        return <Eye className="h-4 w-4" />;
      default:
        return null;
    }
  };

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
    return `${Math.ceil(diffDays / 7)} weeks ago`;
  };

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  return (
    <MainLayout userType="employer">
      <PageHeader
        title="Job Listings"
        description="Manage your job postings and track their performance"
        actions={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        }
      />

      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{tabCounts.all}</div>
            <div className="text-sm text-gray-600">Total Jobs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{tabCounts.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{tabCounts.paused}</div>
            <div className="text-sm text-gray-600">Paused</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {jobs.reduce((sum, job) => sum + job.applicantCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="active">Active ({tabCounts.active})</TabsTrigger>
          <TabsTrigger value="paused">Paused ({tabCounts.paused})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({tabCounts.closed})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)} variant="secondary">
                          <span className="flex items-center gap-1">
                            {getStatusIcon(job.status)}
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{formatSalary(job.salary.min, job.salary.max)}</span>
                        <span>•</span>
                        <span className="capitalize">{job.type}</span>
                        <span>•</span>
                        <span className="capitalize">{job.remote}</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Posted {getTimeAgo(job.postedAt)}
                        {job.deadline && ` • Deadline: ${formatDate(job.deadline)}`}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Job
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate Job
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Share Job
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {job.status === 'active' ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause Job
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Activate Job
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Job
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 6).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 6} more
                      </Badge>
                    )}
                  </div>

                  {/* Job Performance Metrics */}
                  <div className="grid grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
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
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        {Math.floor(Math.random() * 10) + 1}
                      </div>
                      <div className="text-xs text-gray-600">Interviews</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Created: {formatDate(job.postedAt)}</span>
                      {job.deadline && (
                        <span>Deadline: {formatDate(job.deadline)}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        View Candidates ({job.applicantCount})
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No job listings found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedTab === 'all' 
                      ? "You haven't posted any jobs yet."
                      : `No jobs with status "${selectedTab}".`
                    }
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Your First Job
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};
