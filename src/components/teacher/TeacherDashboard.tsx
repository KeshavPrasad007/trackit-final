import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ChatbotIcon } from '../ChatbotIcon';
import { QrCode, UserCheck, Clock, CheckCircle, XCircle, LogOut, Settings, Activity, Database, Wifi } from 'lucide-react';

interface TeacherDashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function TeacherDashboard({ onNavigate, onLogout }: TeacherDashboardProps) {
  const currentClass = {
    subject: 'Grade 10 Physics',
    time: '12:00 PM - 1:30 PM',
    room: 'Room 204'
  };

  const students = [
    { id: 1, name: 'Arjun Patel', status: 'present', avatar: 'AP' },
    { id: 2, name: 'Priya Sharma', status: 'present', avatar: 'PS' },
    { id: 3, name: 'Rohan Gupta', status: 'absent', avatar: 'RG' },
    { id: 4, name: 'Sneha Reddy', status: 'present', avatar: 'SR' },
    { id: 5, name: 'Vikram Singh', status: 'left-early', avatar: 'VS' },
    { id: 6, name: 'Ananya Iyer', status: 'present', avatar: 'AI' },
    { id: 7, name: 'Karthik Menon', status: 'present', avatar: 'KM' },
    { id: 8, name: 'Divya Nair', status: 'absent', avatar: 'DN' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-[#7ED321]" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-[#D0021B]" />;
      case 'left-early':
        return <Clock className="h-4 w-4 text-[#F5A623]" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-[#7ED321] text-white border-none">Present</Badge>;
      case 'absent':
        return <Badge className="bg-[#D0021B] text-white border-none">Absent</Badge>;
      case 'left-early':
        return <Badge className="bg-[#F5A623] text-white border-none">Left Early</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Good Afternoon, Prof. Sharma!</h1>
        <p className="text-muted-foreground">Tuesday, September 23, 2025</p>
      </div>

      {/* Current Class Card */}
      <Card className="bg-primary text-white border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Live Class</h2>
              <p className="text-white/80">{currentClass.subject}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Activity className="h-3 w-3 animate-pulse" />
                <Database className="h-3 w-3" />
              </div>
              <Badge className="bg-white/20 text-white border-none">
                ACTIVE
              </Badge>
            </div>
          </div>
          <div className="space-y-1 text-white/80">
            <p>{currentClass.time}</p>
            <p>{currentClass.room}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Wifi className="h-3 w-3" />
              <span className="text-xs">Auto-tracking enabled</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#7ED321]">{presentCount}</div>
            <p className="text-sm text-muted-foreground">Present</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#D0021B]">{absentCount}</div>
            <p className="text-sm text-muted-foreground">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{students.length}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => onNavigate('manual-attendance')}
          className="h-16 flex flex-col space-y-1"
        >
          <UserCheck className="h-6 w-6" />
          <span>Manual Attendance</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => onNavigate('qr-display')}
          className="h-16 flex flex-col space-y-1"
        >
          <QrCode className="h-6 w-6" />
          <span>Display QR Code</span>
        </Button>
      </div>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm">
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(student.status)}
                {getStatusBadge(student.status)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Settings and Logout */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => onNavigate('settings')}
          className="h-16 flex flex-col space-y-1"
        >
          <Settings className="h-6 w-6" />
          <span>Settings</span>
        </Button>
        <Button
          onClick={onLogout}
          className="h-16 flex flex-col space-y-1"
        >
          <LogOut className="h-6 w-6" />
          <span>Logout</span>
        </Button>
      </div>

      {/* Chatbot Icon */}
      <ChatbotIcon userRole="teacher" />
    </div>
  );
}