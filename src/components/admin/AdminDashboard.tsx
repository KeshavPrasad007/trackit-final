import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChatbotIcon } from '../ChatbotIcon';
import { Users, BookOpen, Calendar, Settings, TrendingUp, Clock, LogOut, Database, Activity, Server } from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const stats = {
    totalStudents: 1247,
    studentsPresent: 1123,
    totalClasses: 45,
    activeClasses: 12,
    attendanceRate: 90.1,
    totalTeachers: 67
  };

  const recentActivity = [
    { action: 'New class created', details: 'Grade 11 Chemistry - Prof. Agarwal', time: '2 min ago' },
    { action: 'Attendance recorded', details: 'Grade 10 Physics - 28/30 present', time: '5 min ago' },
    { action: 'Teacher assigned', details: 'Prof. Sharma to Grade 9 Math', time: '15 min ago' },
    { action: 'Schedule updated', details: 'Room 204 - Time slot changed', time: '1 hour ago' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Tuesday, September 23, 2025</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Students Present</p>
                <p className="text-xl font-bold">{stats.studentsPresent}</p>
                <p className="text-xs text-muted-foreground">of {stats.totalStudents} total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-[#7ED321]" />
              <div>
                <p className="text-sm text-muted-foreground">Active Classes</p>
                <p className="text-xl font-bold">{stats.activeClasses}</p>
                <p className="text-xs text-muted-foreground">of {stats.totalClasses} total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-[#F5A623]" />
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-xl font-bold">{stats.attendanceRate}%</p>
                <p className="text-xs text-[#7ED321]">+2.1% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
                <p className="text-xl font-bold">{stats.totalTeachers}</p>
                <p className="text-xs text-muted-foreground">Active faculty</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate('timetable-management')}
            className="h-16 flex flex-col space-y-1"
          >
            <Calendar className="h-6 w-6" />
            <span>Manage Timetables</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('user-management')}
            className="h-16 flex flex-col space-y-1"
          >
            <Users className="h-6 w-6" />
            <span>User Management</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('reports')}
            className="h-16 flex flex-col space-y-1"
          >
            <TrendingUp className="h-6 w-6" />
            <span>View Reports</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('settings')}
            className="h-16 flex flex-col space-y-1"
          >
            <Settings className="h-6 w-6" />
            <span>Settings</span>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
              <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{activity.time}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Backend Services</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Supabase Database</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-[#7ED321] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#7ED321]">Connected</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-600" />
              <span className="text-sm">Python API Server</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-[#7ED321] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#7ED321]">Running</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">QR Code Generation</span>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-[#7ED321] rounded-full"></div>
              <span className="text-sm text-[#7ED321]">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Wi-Fi Tracking</span>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-[#F5A623] rounded-full"></div>
              <span className="text-sm text-[#F5A623]">Maintenance</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Settings and Logout */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => onNavigate('settings')}
          className="h-16 flex flex-col space-y-1"
        >
          <Settings className="h-6 w-6" />
          <span>App Settings</span>
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
      <ChatbotIcon userRole="admin" />
    </div>
  );
}