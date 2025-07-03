import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockJobListings, mockApplicants } from '@/data/mockData';
import { geminiService } from '@/services/geminiService';
import { JobListing } from '@/types';

export default function ApplicantDashboard() {
  const [jobs] = useState(mockJobListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [generatingCoverLetter, setGeneratingCoverLetter] = useState(false);
  const applicant = mockApplicants[0];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'bg-match-excellent';
    if (score >= 75) return 'bg-match-good'; 
    if (score >= 60) return 'bg-match-fair';
    return 'bg-match-poor';
  };

  const handleGenerateCoverLetter = async (job: JobListing) => {
    setGeneratingCoverLetter(true);
    try {
      const coverLetter = await geminiService.generateCoverLetter(
        job.title,
        job.company.name,
        job.description,
        applicant.name,
        applicant.profile.professional.summary,
        applicant.profile.professional.experience.map(exp => `${exp.position} at ${exp.company}: ${exp.description}`)
      );
      alert(`Generated Cover Letter:\n\n${coverLetter}`);
    } catch (error) {
      alert('Error generating cover letter. Please try again.');
    }
    setGeneratingCoverLetter(false);
  };

  return (
    <div className="min-h-screen bg-background font-poppins">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">JobMatch AI</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {applicant.name}</span>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Find Your Dream Job</h2>
          <p className="text-muted-foreground">AI-powered job recommendations tailored for you</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            className="w-full px-4 py-2 border border-input rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-primary">
                      {job.company.name} • {job.location}
                    </CardDescription>
                  </div>
                  <Badge className={`${getMatchColor(88)} text-white`}>
                    88% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{job.skills.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{job.type}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{job.remote}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedJob(job)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleGenerateCoverLetter(job)}
                      disabled={generatingCoverLetter}
                    >
                      {generatingCoverLetter ? 'Generating...' : 'Quick Apply'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}