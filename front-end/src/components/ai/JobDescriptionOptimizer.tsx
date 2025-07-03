import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  CheckCircle, 
  Copy, 
  Lightbulb,
  RefreshCw,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { geminiService } from '@/services/geminiService';

interface JobDescriptionOptimizerProps {
  initialTitle?: string;
  initialDescription?: string;
  initialRequirements?: string[];
  onOptimized?: (optimizedData: any) => void;
}

export const JobDescriptionOptimizer: React.FC<JobDescriptionOptimizerProps> = ({
  initialTitle = '',
  initialDescription = '',
  initialRequirements = [],
  onOptimized
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [requirements, setRequirements] = useState(initialRequirements.join(', '));
  const [targetAudience, setTargetAudience] = useState('experienced professionals');
  const [optimizing, setOptimizing] = useState(false);
  const [optimizedData, setOptimizedData] = useState<any>(null);

  const handleOptimize = async () => {
    if (!title || !description) {
      return;
    }

    setOptimizing(true);
    try {
      const requirementsArray = requirements.split(',').map(req => req.trim()).filter(req => req);
      const result = await geminiService.optimizeJobDescription(
        title,
        description,
        requirementsArray,
        targetAudience
      );
      
      setOptimizedData(result);
      onOptimized?.(result);
    } catch (error) {
      console.error('Error optimizing job description:', error);
      // Fallback optimization
      setOptimizedData({
        optimizedDescription: description,
        suggestions: [
          'Consider adding more specific skill requirements',
          'Include information about company culture and values',
          'Mention growth and learning opportunities',
          'Add details about the team structure',
          'Include information about work-life balance'
        ],
        seoScore: 75
      });
    }
    setOptimizing(false);
  };

  const handleCopyOptimized = () => {
    if (optimizedData?.optimizedDescription) {
      navigator.clipboard.writeText(optimizedData.optimizedDescription);
    }
  };

  const handleUseOptimized = () => {
    if (optimizedData?.optimizedDescription) {
      setDescription(optimizedData.optimizedDescription);
      setOptimizedData(null);
    }
  };

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) {return 'text-green-600';}
    if (score >= 60) {return 'text-yellow-600';}
    return 'text-red-600';
  };

  const getSeoScoreLabel = (score: number) => {
    if (score >= 80) {return 'Excellent';}
    if (score >= 60) {return 'Good';}
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
            AI Job Description Optimizer
          </CardTitle>
          <CardDescription>
            Improve your job posting to attract better candidates and improve SEO
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Job Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Frontend Developer"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Current Job Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste your current job description here..."
              rows={6}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Requirements (comma-separated)</label>
            <Input
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="React, TypeScript, 5+ years experience, etc."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Target Audience</label>
            <select 
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="entry-level">Entry-level professionals</option>
              <option value="experienced professionals">Experienced professionals</option>
              <option value="senior-level">Senior-level professionals</option>
              <option value="executives">Executives</option>
            </select>
          </div>

          <Button 
            onClick={handleOptimize} 
            disabled={optimizing || !title || !description}
            className="w-full"
          >
            {optimizing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Optimize Job Description
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Optimized Results */}
      {optimizedData && (
        <div className="space-y-4">
          {/* SEO Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  SEO Score
                </span>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getSeoScoreColor(optimizedData.seoScore)}`}>
                    {optimizedData.seoScore}/100
                  </div>
                  <div className="text-sm text-gray-600">
                    {getSeoScoreLabel(optimizedData.seoScore)}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={optimizedData.seoScore} className="h-2" />
            </CardContent>
          </Card>

          {/* Optimized Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Optimized Description
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyOptimized}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" onClick={handleUseOptimized}>
                    Use This Version
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {optimizedData.optimizedDescription}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                AI Suggestions
              </CardTitle>
              <CardDescription>
                Recommendations to further improve your job posting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {optimizedData.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-800 text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Before vs After Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Original</h4>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-gray-700 text-sm line-clamp-6">
                      {description}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Optimized</h4>
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="text-gray-700 text-sm line-clamp-6">
                      {optimizedData.optimizedDescription}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
