import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Mic, 
  Video,
  FileText,
  Brain,
  Target,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { mockJobListings } from '@/data/mockData';

export const InterviewPrepPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const upcomingInterviews = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      date: '2024-01-30',
      time: '14:00',
      type: 'video',
      interviewers: ['Sarah Johnson', 'Mike Chen']
    }
  ];

  const generateQuestions = async () => {
    if (!selectedJob) return;
    
    setLoading(true);
    try {
      const job = mockJobListings.find(j => j.id === selectedJob);
      if (job) {
        const generatedQuestions = await geminiService.generateInterviewQuestions(
          job.title,
          job.description,
          job.skills,
          difficulty
        );
        setQuestions(generatedQuestions);
        setCurrentQuestion(0);
        setAnswers({});
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback questions
      setQuestions([
        {
          question: "Tell me about yourself and your experience with frontend development.",
          category: "behavioral",
          difficulty: difficulty
        },
        {
          question: "How do you handle state management in React applications?",
          category: "technical",
          difficulty: difficulty
        },
        {
          question: "Describe a challenging project you worked on and how you overcame obstacles.",
          category: "situational",
          difficulty: difficulty
        }
      ]);
    }
    setLoading(false);
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-blue-100 text-blue-800';
      case 'behavioral':
        return 'bg-green-100 text-green-800';
      case 'situational':
        return 'bg-purple-100 text-purple-800';
      case 'company-specific':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const interviewTips = [
    {
      title: "Research the Company",
      description: "Learn about the company's mission, values, recent news, and culture.",
      icon: Target
    },
    {
      title: "Practice STAR Method",
      description: "Structure your answers using Situation, Task, Action, Result framework.",
      icon: Brain
    },
    {
      title: "Prepare Questions",
      description: "Have thoughtful questions ready about the role, team, and company.",
      icon: Lightbulb
    },
    {
      title: "Technical Setup",
      description: "Test your camera, microphone, and internet connection beforehand.",
      icon: Video
    }
  ];

  return (
    <MainLayout userType="applicant">
      <PageHeader
        title="Interview Preparation"
        description="Practice with AI-generated questions and prepare for your interviews"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-blue-900">{interview.jobTitle}</h4>
                          <p className="text-blue-700">{interview.company}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800" variant="secondary">
                          {interview.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-blue-800 mb-3">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(interview.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {interview.time}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">
                        Interviewers: {interview.interviewers.join(', ')}
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Prepare for This Interview
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">
                  No upcoming interviews scheduled
                </p>
              )}
            </CardContent>
          </Card>

          {/* Practice Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Practice Questions
              </CardTitle>
              <CardDescription>
                Generate AI-powered interview questions based on specific job postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Job</label>
                    <Select value={selectedJob} onValueChange={setSelectedJob}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a job to practice for" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockJobListings.map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.title} at {job.company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Difficulty</label>
                    <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={generateQuestions} 
                  disabled={!selectedJob || loading}
                  className="w-full"
                >
                  {loading ? 'Generating Questions...' : 'Generate Practice Questions'}
                </Button>

                {questions.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        Question {currentQuestion + 1} of {questions.length}
                      </h4>
                      <div className="flex gap-2">
                        <Badge className={getCategoryColor(questions[currentQuestion]?.category)} variant="secondary">
                          {questions[currentQuestion]?.category}
                        </Badge>
                        <Badge className={getDifficultyColor(questions[currentQuestion]?.difficulty)} variant="secondary">
                          {questions[currentQuestion]?.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <p className="text-lg font-medium text-gray-900">
                          {questions[currentQuestion]?.question}
                        </p>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Your Answer</label>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsRecording(!isRecording)}
                          >
                            {isRecording ? (
                              <>
                                <Pause className="h-4 w-4 mr-1" />
                                Stop Recording
                              </>
                            ) : (
                              <>
                                <Mic className="h-4 w-4 mr-1" />
                                Record Answer
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        rows={4}
                        placeholder="Type your answer here or use voice recording..."
                        value={answers[currentQuestion] || ''}
                        onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                        disabled={currentQuestion === questions.length - 1}
                      >
                        Next
                      </Button>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset Session
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Export Answers
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Interview Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Interview Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interviewTips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{tip.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Practice Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Questions Practiced</span>
                  <span className="font-medium">12/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-green-600">8</div>
                    <div className="text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-600">4</div>
                    <div className="text-gray-600">In Progress</div>
                  </div>
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
                <Video className="h-4 w-4 mr-2" />
                Mock Video Interview
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Common Questions
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Company Research
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
