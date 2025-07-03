import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw,
  Edit,
  CheckCircle
} from 'lucide-react';
import { geminiService } from '@/services/geminiService';

interface CoverLetterGeneratorProps {
  jobTitle?: string;
  companyName?: string;
  jobDescription?: string;
  applicantName?: string;
  applicantSummary?: string;
  applicantExperience?: string[];
}

export const CoverLetterGenerator: React.FC<CoverLetterGeneratorProps> = ({
  jobTitle: initialJobTitle = '',
  companyName: initialCompanyName = '',
  jobDescription: initialJobDescription = '',
  applicantName: initialApplicantName = '',
  applicantSummary: initialApplicantSummary = '',
  applicantExperience: initialApplicantExperience = []
}) => {
  const [jobTitle, setJobTitle] = useState(initialJobTitle);
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [jobDescription, setJobDescription] = useState(initialJobDescription);
  const [applicantName, setApplicantName] = useState(initialApplicantName);
  const [applicantSummary, setApplicantSummary] = useState(initialApplicantSummary);
  const [experience, setExperience] = useState(initialApplicantExperience.join('\n'));
  const [generating, setGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle || !companyName || !applicantName) {
      return;
    }

    setGenerating(true);
    try {
      const experienceArray = experience.split('\n').filter(exp => exp.trim());
      const coverLetter = await geminiService.generateCoverLetter(
        jobTitle,
        companyName,
        jobDescription,
        applicantName,
        applicantSummary,
        experienceArray
      );
      
      setGeneratedLetter(coverLetter);
      setIsEditing(false);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      // Fallback cover letter
      setGeneratedLetter(`Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

${applicantSummary || 'As an experienced professional, I bring a unique combination of technical skills and problem-solving abilities to this role.'}

In my previous roles, I have:
${experience.split('\n').filter(exp => exp.trim()).map(exp => `• ${exp}`).join('\n')}

I am particularly drawn to ${companyName} because of your commitment to innovation and excellence. I believe my skills and experience align well with your team's goals, and I would welcome the opportunity to discuss how I can contribute to your continued success.

Thank you for considering my application. I look forward to hearing from you.

Sincerely,
${applicantName}`);
    }
    setGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${jobTitle.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isFormValid = jobTitle && companyName && applicantName;

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
            AI Cover Letter Generator
          </CardTitle>
          <CardDescription>
            Generate a personalized cover letter tailored to the job and your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Job Title *</label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Company Name *</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., TechCorp Solutions"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Your Name *</label>
            <Input
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="e.g., John Doe"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Job Description</label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here (optional but recommended for better results)"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Professional Summary</label>
            <Textarea
              value={applicantSummary}
              onChange={(e) => setApplicantSummary(e.target.value)}
              placeholder="Brief summary of your professional background and key strengths"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Relevant Experience</label>
            <Textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="List your relevant work experience, achievements, or projects (one per line)"
              rows={4}
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={generating || !isFormValid}
            className="w-full"
          >
            {generating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating Cover Letter...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Cover Letter
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Cover Letter */}
      {generatedLetter && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Generated Cover Letter
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  {isEditing ? 'Preview' : 'Edit'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
            ) : (
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                    {generatedLetter}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Tips for Better Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Include the complete job description for more targeted content</p>
            <p>• Provide specific examples of your achievements and experience</p>
            <p>• Mention relevant skills and technologies from the job posting</p>
            <p>• Keep your professional summary concise but impactful</p>
            <p>• Review and customize the generated letter before sending</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
