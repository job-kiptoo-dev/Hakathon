import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  Phone,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Download
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: 'interview' | 'meeting' | 'deadline' | 'reminder';
  location?: string;
  attendees?: string[];
  meetingLink?: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
}

interface CalendarIntegrationProps {
  events?: CalendarEvent[];
  onEventCreate?: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate?: (id: string, event: Partial<CalendarEvent>) => void;
  onEventDelete?: (id: string) => void;
  userType?: 'applicant' | 'employer' | 'admin';
}

export const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({
  events = [],
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  userType = 'applicant'
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Mock events for demo
  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Interview with TechCorp',
      description: 'Technical interview for Senior Frontend Developer position',
      startTime: '2024-01-30T14:00:00Z',
      endTime: '2024-01-30T15:00:00Z',
      type: 'interview',
      location: 'Video Call',
      attendees: ['sarah.johnson@techcorp.com', 'mike.chen@techcorp.com'],
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Application Deadline - DataFlow Inc',
      description: 'Submit application for Data Scientist position',
      startTime: '2024-01-31T23:59:00Z',
      endTime: '2024-01-31T23:59:00Z',
      type: 'deadline',
      status: 'scheduled'
    }
  ];

  const allEvents = [...events, ...mockEvents];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Users className="h-4 w-4" />;
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      case 'deadline':
        return <Clock className="h-4 w-4" />;
      case 'reminder':
        return <Clock className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'interview':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'deadline':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const generateCalendarFile = (event: CalendarEvent) => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//JobMatch AI//Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@jobmatch.ai`,
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description || ''}`,
      event.location ? `LOCATION:${event.location}` : '',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(line => line).join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const upcomingEvents = allEvents
    .filter(event => new Date(event.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </span>
            <Button size="sm" onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </Button>
          </CardTitle>
          <CardDescription>
            Your scheduled interviews, meetings, and deadlines
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No upcoming events</h3>
              <p className="text-gray-500 text-sm">
                Your calendar is clear. Add events to stay organized.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const { date, time } = formatDateTime(event.startTime);
                const endTime = formatDateTime(event.endTime).time;
                
                return (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border-l-4 ${getEventColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getEventIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <Badge className={getStatusColor(event.status)} variant="secondary">
                              {event.status}
                            </Badge>
                          </div>
                          
                          {event.description && (
                            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {time} - {endTime}
                            </span>
                            {event.location && (
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </span>
                            )}
                          </div>
                          
                          {event.attendees && event.attendees.length > 0 && (
                            <div className="mt-2">
                              <span className="text-sm text-gray-600">
                                Attendees: {event.attendees.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateCalendarFile(event)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          .ics
                        </Button>
                        
                        {event.meetingLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(event.meetingLink, '_blank')}
                          >
                            <Video className="h-4 w-4 mr-1" />
                            Join
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingEvent(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Calendar Integration Options */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar Integration</CardTitle>
          <CardDescription>
            Connect your external calendars to sync events automatically
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded mb-2"></div>
              <span className="text-sm">Google Calendar</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded mb-2"></div>
              <span className="text-sm">Outlook</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <div className="w-6 h-6 bg-gray-800 rounded mb-2"></div>
              <span className="text-sm">Apple Calendar</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
            <Button variant="outline" className="justify-start">
              <Clock className="h-4 w-4 mr-2" />
              Set Application Reminder
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Calendar
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Events
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
