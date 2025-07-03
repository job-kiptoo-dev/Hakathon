import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Settings
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState<string | null>(null);
  const [profileData, setProfileData] = useState((user as any)?.profile || {});

  const profileCompleteness = 85;

  const completionItems = [
    { label: 'Basic Information', completed: true },
    { label: 'Professional Summary', completed: true },
    { label: 'Work Experience', completed: true },
    { label: 'Education', completed: true },
    { label: 'Skills', completed: true },
    { label: 'Resume Upload', completed: true },
    { label: 'Portfolio Link', completed: false },
    { label: 'Certifications', completed: false },
  ];

  const handleSave = (section: string) => {
    // In a real app, this would save to the backend
    setEditing(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a file storage service
      console.log('Uploading file:', file.name);
    }
  };

  return (
    <MainLayout userType="applicant">
      <PageHeader
        title="My Profile"
        description="Manage your professional profile and preferences"
        actions={
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completion */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>
                Complete your profile to get better job matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{profileCompleteness}%</span>
                  </div>
                  <Progress value={profileCompleteness} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  {completionItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className={item.completed ? 'text-green-600' : 'text-gray-600'}>
                        {item.label}
                      </span>
                      {item.completed ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          ✓
                        </Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Resume
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Download Profile PDF
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">First Name</label>
                      <Input defaultValue="John" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Last Name</label>
                      <Input defaultValue="Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <Input defaultValue="john.doe@email.com" type="email" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone</label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1 block">Location</label>
                      <Input defaultValue="San Francisco, CA" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">LinkedIn</label>
                      <Input defaultValue="https://linkedin.com/in/johndoe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Portfolio</label>
                      <Input defaultValue="https://johndoe.dev" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Professional Information */}
            <TabsContent value="professional">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Current Title</label>
                        <Input defaultValue="Senior Frontend Developer" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Professional Summary</label>
                        <Textarea 
                          rows={4}
                          defaultValue="Passionate frontend developer with 6 years of experience building scalable web applications using React, TypeScript, and modern web technologies. Strong focus on user experience and performance optimization."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Skills
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Skill
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Redux', 'Jest', 'Git', 'Webpack', 'Node.js'].map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                          <button className="ml-2 text-gray-500 hover:text-red-500">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Certifications
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Certification
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">AWS Certified Developer Associate</p>
                          <p className="text-sm text-gray-600">Amazon Web Services</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Google Analytics Certified</p>
                          <p className="text-sm text-gray-600">Google</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Experience & Education */}
            <TabsContent value="experience">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2" />
                        Work Experience
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Experience
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">Senior Frontend Developer</h4>
                            <p className="text-blue-600">Tech Startup Inc</p>
                            <p className="text-sm text-gray-600">Jan 2022 - Jan 2024</p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700">
                          Led frontend development for a fintech application, resulting in 40% improvement in user engagement. 
                          Mentored junior developers and established frontend best practices.
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {['React', 'TypeScript', 'Redux', 'CSS-in-JS'].map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        Education
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Education
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
                          <p className="text-blue-600">University of California, Berkeley</p>
                          <p className="text-sm text-gray-600">Sep 2016 - May 2020</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">GPA: 3.7/4.0</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Job Preferences */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Job Preferences</CardTitle>
                  <CardDescription>
                    Help us find the perfect job matches for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Minimum Salary</label>
                      <Input defaultValue="120000" type="number" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Maximum Salary</label>
                      <Input defaultValue="160000" type="number" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Locations</label>
                    <div className="flex flex-wrap gap-2">
                      {['San Francisco, CA', 'Remote'].map((location) => (
                        <Badge key={location} variant="secondary">
                          {location}
                          <button className="ml-2 text-gray-500 hover:text-red-500">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Location
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Job Types</label>
                    <div className="flex flex-wrap gap-2">
                      {['Full-time'].map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                          <button className="ml-2 text-gray-500 hover:text-red-500">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Remote Work Preference</label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="hybrid">Hybrid</option>
                      <option value="remote">Remote</option>
                      <option value="onsite">On-site</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};
