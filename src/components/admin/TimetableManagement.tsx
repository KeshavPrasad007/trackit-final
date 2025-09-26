import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Plus, Edit, Trash2, Clock, MapPin, User } from 'lucide-react';

interface TimetableManagementProps {
  onBack: () => void;
}

export function TimetableManagement({ onBack }: TimetableManagementProps) {
  const [activeTab, setActiveTab] = useState('view');
  
  const classes = [
    {
      id: 1,
      subject: 'Mathematics',
      grade: 'Grade 10',
      teacher: 'Prof. Agarwal',
      room: 'Room 101',
      time: '9:00 AM - 10:30 AM',
      day: 'Monday',
      students: 28
    },
    {
      id: 2,
      subject: 'Physics',
      grade: 'Grade 10',
      teacher: 'Prof. Sharma',
      room: 'Room 204',
      time: '12:00 PM - 1:30 PM',
      day: 'Monday',
      students: 30
    },
    {
      id: 3,
      subject: 'Chemistry',
      grade: 'Grade 11',
      teacher: 'Prof. Krishnan',
      room: 'Lab 301',
      time: '2:00 PM - 3:30 PM',
      day: 'Monday',
      students: 25
    },
  ];

  const [formData, setFormData] = useState({
    subject: '',
    grade: '',
    teacher: '',
    room: '',
    startTime: '',
    endTime: '',
    day: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add class logic here
    console.log('Creating class:', formData);
    setActiveTab('view');
    // Reset form
    setFormData({
      subject: '',
      grade: '',
      teacher: '',
      room: '',
      startTime: '',
      endTime: '',
      day: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Timetable Management</h1>
              <p className="text-white/80 text-sm">Create and manage class schedules</p>
            </div>
          </div>
          <Button
            onClick={() => setActiveTab('create')}
            className="bg-white text-primary hover:bg-white/90"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'view' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('view')}
            className="flex-1"
            size="sm"
          >
            View Schedule
          </Button>
          <Button
            variant={activeTab === 'create' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('create')}
            className="flex-1"
            size="sm"
          >
            Create Class
          </Button>
        </div>

        {/* View Schedule Tab */}
        {activeTab === 'view' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monday Classes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {classes.map((classItem) => (
                  <div key={classItem.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{classItem.subject}</h3>
                          <span className="text-sm text-muted-foreground">
                            • {classItem.grade}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{classItem.room}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{classItem.teacher}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {classItem.students} students enrolled
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create Class Tab */}
        {activeTab === 'create' && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Class</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Mathematics"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value: string) => handleInputChange('grade', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grade-9">Grade 9</SelectItem>
                        <SelectItem value="grade-10">Grade 10</SelectItem>
                        <SelectItem value="grade-11">Grade 11</SelectItem>
                        <SelectItem value="grade-12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacher">Teacher</Label>
                  <Select
                    value={formData.teacher}
                    onValueChange={(value: string) => handleInputChange('teacher', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prof-johnson">Prof. Johnson</SelectItem>
                      <SelectItem value="prof-smith">Prof. Smith</SelectItem>
                      <SelectItem value="prof-wilson">Prof. Wilson</SelectItem>
                      <SelectItem value="prof-davis">Prof. Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Input
                    id="room"
                    placeholder="e.g., Room 101"
                    value={formData.room}
                    onChange={(e) => handleInputChange('room', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="day">Day</Label>
                  <Select
                    value={formData.day}
                    onValueChange={(value: string) => handleInputChange('day', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Class
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab('view')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}