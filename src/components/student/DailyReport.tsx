import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface DailyReportProps {
  onBack: () => void;
}

export function DailyReport({ onBack }: DailyReportProps) {
  const attendanceData = {
    attended: 4,
    total: 5,
    percentage: 80
  };

  const tasksData = {
    completed: 3,
    total: 5
  };

  const todayClasses = [
    { subject: 'Mathematics', time: '9:00 AM', status: 'present' },
    { subject: 'Physics', time: '10:30 AM', status: 'present' },
    { subject: 'Chemistry', time: '12:00 PM', status: 'present' },
    { subject: 'English', time: '1:30 PM', status: 'absent' },
    { subject: 'History', time: '3:00 PM', status: 'present' },
  ];

  const completedTasks = [
    'Review Chemistry Notes',
    'Mathematics Practice Problems',
    'Physics Lab Report'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-4">
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
            <h1 className="text-xl font-bold">Daily Report</h1>
            <p className="text-white/80 text-sm">Tuesday, September 23, 2025</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Attendance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Attendance Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {attendanceData.attended}/{attendanceData.total}
              </div>
              <p className="text-muted-foreground">Classes Attended</p>
            </div>
            <Progress value={attendanceData.percentage} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              {attendanceData.percentage}% attendance today
            </p>
          </CardContent>
        </Card>

        {/* Tasks Completed */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-[#7ED321]">
                {tasksData.completed}
              </span>
              <span className="text-muted-foreground">
                of {tasksData.total} tasks
              </span>
            </div>
            <div className="space-y-2">
              {completedTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-[#7ED321]" />
                  <span className="text-sm">{task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Details */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayClasses.map((classItem, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-muted-foreground w-16">
                    {classItem.time}
                  </div>
                  <div>
                    <p className="font-medium">{classItem.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {classItem.status === 'present' ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-[#7ED321]" />
                      <span className="text-sm text-[#7ED321]">Present</span>
                    </>
                  ) : classItem.status === 'absent' ? (
                    <>
                      <XCircle className="h-4 w-4 text-[#D0021B]" />
                      <span className="text-sm text-[#D0021B]">Absent</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Pending</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}