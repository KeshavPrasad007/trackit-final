import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ArrowLeft, Save } from 'lucide-react';

interface ManualAttendanceProps {
  onBack: () => void;
}

export function ManualAttendance({ onBack }: ManualAttendanceProps) {
  const [students, setStudents] = useState([
    { id: 1, name: 'Arjun Patel', status: 'present', avatar: 'AP' },
    { id: 2, name: 'Priya Sharma', status: 'present', avatar: 'PS' },
    { id: 3, name: 'Rohan Gupta', status: 'absent', avatar: 'RG' },
    { id: 4, name: 'Sneha Reddy', status: 'present', avatar: 'SR' },
    { id: 5, name: 'Vikram Singh', status: 'present', avatar: 'VS' },
    { id: 6, name: 'Ananya Iyer', status: 'present', avatar: 'AI' },
    { id: 7, name: 'Karthik Menon', status: 'present', avatar: 'KM' },
    { id: 8, name: 'Divya Nair', status: 'absent', avatar: 'DN' },
  ]);

  const toggleAttendance = (studentId: number) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
          : student
      )
    );
  };

  const handleSave = () => {
    // Save attendance logic here
    onBack();
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
              <h1 className="text-xl font-bold">Manual Attendance</h1>
              <p className="text-white/80 text-sm">Grade 10 Physics</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            className="bg-white text-primary hover:bg-white/90"
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Instructions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Tap on a student to toggle their attendance status between Present and Absent.
            </p>
          </CardContent>
        </Card>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Students ({students.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => toggleAttendance(student.id)}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  student.status === 'present'
                    ? 'border-[#7ED321] bg-[#7ED321]/10'
                    : 'border-[#D0021B] bg-[#D0021B]/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-sm">
                      {student.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">Student ID: {student.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      student.status === 'present'
                        ? 'bg-[#7ED321] text-white'
                        : 'bg-[#D0021B] text-white'
                    }`}
                  >
                    {student.status === 'present' ? 'Present' : 'Absent'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Tap to toggle</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}