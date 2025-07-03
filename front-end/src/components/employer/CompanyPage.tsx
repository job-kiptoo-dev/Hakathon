import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Globe,
  MapPin,
  Users,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const CompanyPage: React.FC = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState((user as any)?.company || {});

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
    <MainLayout userType="employer">
      <PageHeader
        title="Company Profile"
        description="Manage your company information and branding"
        actions={
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="culture">Culture & Benefits</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Company Name</label>
                      <Input defaultValue="TechCorp Solutions" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Industry</label>
                      <Input defaultValue="Technology" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Company Size</label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000" selected>501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Founded</label>
                      <Input defaultValue="2015" type="number" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1 block">Location</label>
                      <Input defaultValue="San Francisco, CA" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-1 block">Website</label>
                      <Input defaultValue="https://techcorp.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Company Description</label>
                    <Textarea 
                      rows={4}
                      defaultValue="Leading technology company specializing in AI and machine learning solutions. We help businesses transform their operations through innovative technology and data-driven insights."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Culture & Benefits */}
            <TabsContent value="culture">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Company Culture
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Value
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Innovation', 'Work-life balance', 'Remote-friendly', 'Learning & Development', 'Diversity & Inclusion'].map((value) => (
                        <Badge key={value} variant="secondary" className="text-sm">
                          {value}
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
                        Benefits & Perks
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Benefit
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Health Insurance',
                        '401k Matching',
                        'Flexible PTO',
                        'Stock Options',
                        'Remote Work',
                        'Professional Development Budget',
                        'Gym Membership',
                        'Free Lunch'
                      ].map((benefit) => (
                        <div key={benefit} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{benefit}</span>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Branding */}
            <TabsContent value="branding">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Logo</CardTitle>
                    <CardDescription>
                      Upload your company logo to appear on job listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                        <p className="text-sm text-gray-600 mt-1">
                          Recommended: 200x200px, PNG or JPG
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Company Photos</CardTitle>
                    <CardDescription>
                      Showcase your office and team culture
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Photos
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">LinkedIn</label>
                      <Input placeholder="https://linkedin.com/company/techcorp" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Twitter</label>
                      <Input placeholder="https://twitter.com/techcorp" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Facebook</label>
                      <Input placeholder="https://facebook.com/techcorp" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Company Preview</CardTitle>
              <CardDescription>
                How your company appears to candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">TechCorp Solutions</h4>
                    <p className="text-sm text-gray-600">Technology</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    501-1000 employees
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    techcorp.com
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Basic information
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Company description
                  </div>
                  <div className="flex items-center text-orange-600">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                    Company logo
                  </div>
                  <div className="flex items-center text-gray-400">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Company photos
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Company Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Jobs</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Applications</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Profile Views</span>
                  <span className="font-medium">1,234</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
