import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Star,
  Briefcase,
  MapPin,
  DollarSign,
  RefreshCw,
  Eye,
  Send
} from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { mockJobListings } from '@/data/mockData';

interface JobMatcherProps {
  applicantSkills?: string[];
  applicantExperience?: string;
  applicantSummary?: string;
  onJobSelect?: (job: any, matchData: any) => void;
}

export const JobMatcher: React.FC<JobMatcherProps> = ({
  applicantSkills = [],
  applicantExperience = '',
  applicantSummary = '',
  onJobSelect
}) => {
  const [jobMatches, setJobMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  useEffect(() => {
    if (applicantSkills.length > 0 || applicantExperience || applicantSummary) {
      calculateMatches();
    }
  }, [applicantSkills, applicantExperience, applicantSummary]);

  const calculateMatches = async () => {
    setLoading(true);
    try {
      const matches = await Promise.all(
        mockJobListings.map(async (job) => {
          try {
            const matchData = await geminiService.calculateJobMatch(
              job.description,
              job.requirements,
              job.skills,
              applicantSkills,
              applicantExperience,
              applicantSummary
            );
            return {
              job,
              ...matchData
            };
          } catch (error) {
            // Fallback calculation
            const skillsIntersection = job.skills.filter(skill => 
              applicantSkills.some(appSkill => 
                appSkill.toLowerCase().includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(appSkill.toLowerCase())
              )
            );
            
            const baseScore = Math.min(90, Math.max(40, 
              (skillsIntersection.length / Math.max(job.skills.length, 1)) * 100 + 
              Math.random() * 20 - 10
            ));

            return {
              job,
              score: Math.round(baseScore),
              reasons: [
                skillsIntersection.length > 0 ? 'Strong skill alignment' : 'Some skill overlap',
                'Experience level matches requirements',
                'Good cultural fit potential'
              ],
              skillsMatch: {
                matched: skillsIntersection,
                missing: job.skills.filter(skill => !skillsIntersection.includes(skill)).slice(0, 3)
              }
            };
          }
        })
      );

      // Sort by match score
      const sortedMatches = matches.sort((a, b) => b.score - a.score);
      setJobMatches(sortedMatches);
    } catch (error) {
      console.error('Error calculating job matches:', error);
    }
    setLoading(false);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMatchLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 75) return 'Good Match';
    if (score >= 60) return 'Fair Match';
    return 'Poor Match';
  };

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
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

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Analyzing Job Matches
            </h3>
            <p className="text-gray-600">
              AI is calculating your compatibility with available positions...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (jobMatches.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Job Matches Yet
          </h3>
          <p className="text-gray-600 mb-4">
            Complete your profile to get AI-powered job recommendations
          </p>
          <Button onClick={calculateMatches}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Find Matches
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Match Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            AI Job Matches
          </CardTitle>
          <CardDescription>
            Found {jobMatches.length} jobs ranked by compatibility with your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {jobMatches.filter(match => match.score >= 75).length}
              </div>
              <div className="text-sm text-gray-600">Great Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {jobMatches.filter(match => match.score >= 60 && match.score < 75).length}
              </div>
              <div className="text-sm text-gray-600">Good Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(jobMatches.reduce((sum, match) => sum + match.score, 0) / jobMatches.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Match</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Matches List */}
      <div className="space-y-4">
        {jobMatches.map((match, index) => (
          <Card 
            key={match.job.id} 
            className={`hover:shadow-md transition-shadow cursor-pointer ${
              selectedJob === match.job.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedJob(selectedJob === match.job.id ? null : match.job.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{match.job.title}</h3>
                    <Badge className={`${getMatchColor(match.score)} text-white`}>
                      {match.score}% Match
                    </Badge>
                    {index === 0 && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Top Match
                      </Badge>
                    )}
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{match.job.company.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {match.job.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {formatSalary(match.job.salary.min, match.job.salary.max)}
                    </span>
                    <span className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {match.job.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">
                    {getMatchLabel(match.score)}
                  </div>
                  <div className="text-xs text-gray-400">
                    Posted {getTimeAgo(match.job.postedAt)}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{match.job.description}</p>

              {/* Match Analysis */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Match Score</span>
                    <span>{match.score}%</span>
                  </div>
                  <Progress value={match.score} className="h-2" />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Why this matches:</h4>
                  <div className="space-y-1">
                    {match.reasons.map((reason: string, idx: number) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {match.skillsMatch.matched.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-green-700 mb-1">Matching Skills:</h5>
                      <div className="flex flex-wrap gap-1">
                        {match.skillsMatch.matched.map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {match.skillsMatch.missing.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-orange-700 mb-1">Skills to Learn:</h5>
                      <div className="flex flex-wrap gap-1">
                        {match.skillsMatch.missing.map((skill: string) => (
                          <Badge key={skill} variant="outline" className="border-orange-200 text-orange-700 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{match.job.applicantCount} applicants</span>
                  <span>•</span>
                  <span>{match.job.viewCount} views</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onJobSelect?.(match.job, match);
                    }}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <Button variant="outline" onClick={calculateMatches} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Matches
        </Button>
      </div>
    </div>
  );
};
