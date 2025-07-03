import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  Award, 
  Briefcase, 
  CheckCircle, 
  Download,
  FileText,
  GraduationCap,
  RefreshCw,
  Upload,
  User
} from 'lucide-react';
import { geminiService } from '@/services/geminiService';

interface ResumeParserProps {
  onParsed?: (parsedData: any) => void;
}

export const ResumeParser: React.FC<ResumeParserProps> = ({ onParsed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, DOC, DOCX, or TXT file');
        return;
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const fakeEvent = {
        target: { files: [droppedFile] }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const parseResume = async () => {
    if (!file) {return;}

    setParsing(true);
    setError(null);

    try {
      // In a real application, you would extract text from the file
      // For this demo, we'll simulate with sample resume text
      const sampleResumeText = `
        John Doe
        john.doe@email.com
        (555) 123-4567
        San Francisco, CA

        PROFESSIONAL SUMMARY
        Experienced software engineer with 6+ years of experience in full-stack development.
        Specialized in React, Node.js, and cloud technologies.

        EXPERIENCE
        Senior Software Engineer | TechCorp Inc | Jan 2022 - Present
        - Led development of customer-facing web applications using React and TypeScript
        - Improved application performance by 40% through optimization techniques
        - Mentored junior developers and established coding best practices

        Software Engineer | StartupXYZ | Jun 2019 - Dec 2021
        - Developed RESTful APIs using Node.js and Express
        - Implemented automated testing resulting in 95% code coverage
        - Collaborated with cross-functional teams in Agile environment

        EDUCATION
        Bachelor of Science in Computer Science | UC Berkeley | 2015-2019
        GPA: 3.7/4.0

        SKILLS
        JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, Git
      `;

      const result = await geminiService.parseResume(sampleResumeText);
      setParsedData(result);
      onParsed?.(result);
    } catch (error) {
      console.error('Error parsing resume:', error);
      setError('Failed to parse resume. Please try again.');
    }

    setParsing(false);
  };

  const getCompletionPercentage = () => {
    if (!parsedData) {return 0;}
    
    let completed = 0;
    const total = 5;
    
    if (parsedData.personalInfo?.name) {completed++;}
    if (parsedData.experience?.length > 0) {completed++;}
    if (parsedData.education?.length > 0) {completed++;}
    if (parsedData.skills?.length > 0) {completed++;}
    if (parsedData.summary) {completed++;}
    
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            AI Resume Parser
          </CardTitle>
          <CardDescription>
            Upload your resume and let AI extract and organize your information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload your resume
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOC, DOCX, TXT (max 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">{file.name}</h4>
                    <p className="text-sm text-blue-700">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setParsedData(null);
                    setError(null);
                  }}
                >
                  Remove
                </Button>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <Button 
                onClick={parseResume} 
                disabled={parsing}
                className="w-full"
              >
                {parsing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Parsing Resume...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Parse Resume with AI
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parsed Results */}
      {parsedData && (
        <div className="space-y-4">
          {/* Completion Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Parsing Complete
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {getCompletionPercentage()}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Information Extracted
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={getCompletionPercentage()} className="h-2" />
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="font-medium">{parsedData.personalInfo?.name || 'Not found'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="font-medium">{parsedData.personalInfo?.email || 'Not found'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="font-medium">{parsedData.personalInfo?.phone || 'Not found'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="font-medium">{parsedData.personalInfo?.location || 'Not found'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          {parsedData.summary && (
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{parsedData.summary}</p>
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {parsedData.skills?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {parsedData.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Experience */}
          {parsedData.experience?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedData.experience.map((exp: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        {exp.startDate} - {exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 text-sm">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {parsedData.education?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedData.education.map((edu: any, index: number) => (
                    <div key={index} className="border-l-2 border-green-200 pl-4">
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-green-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-600">
                        {edu.field} • {edu.graduationDate}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Button className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Use This Information
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
