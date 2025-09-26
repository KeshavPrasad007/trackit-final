import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { StatusCard } from '../StatusCard';
import { ChatbotIcon } from '../ChatbotIcon';
import { QrCode, BookOpen, Calendar, BarChart3, LogOut, Settings, Wifi, Database, Activity } from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function StudentDashboard({ onNavigate, onLogout }: StudentDashboardProps) {
  const mockSchedule = [
    { time: '9:00 AM', subject: 'Mathematics', status: 'completed' },
    { time: '10:30 AM', subject: 'Physics', status: 'completed' },
    { time: '12:00 PM', subject: 'Chemistry', status: 'current' },
    { time: '1:30 PM', subject: 'English', status: 'upcoming' },
    { time: '3:00 PM', subject: 'History', status: 'upcoming' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-2xl font-bold">Good Morning, Arjun!</h1>
          <p className="text-muted-foreground">Tuesday, September 23, 2025</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('qr-scanner')}
            className="transition-all duration-200 hover:border-primary hover:text-primary"
          >
            <QrCode className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Status Card */}
      <motion.div variants={itemVariants}>
        <StatusCard
          status="free-period"
          title="You have a Free Period!"
          subtitle="Next class: English in 45 minutes"
        />
      </motion.div>

      {/* API Connection Status */}
      <motion.div variants={itemVariants}>
        <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Auto-Attendance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Real-time Sync</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="h-3 w-3 text-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Connected</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggested Task Card */}
      <motion.div variants={itemVariants}>
        <Card className="border-dashed border-2 border-primary/30 overflow-hidden">
          <CardContent className="p-6">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <BookOpen className="h-6 w-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-semibold">Suggested Task</h3>
                <p className="text-sm text-muted-foreground">Review Chemistry Notes</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="sm" className="transition-all duration-200">
                  Start Task
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Schedule */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSchedule.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(74, 144, 226, 0.05)'
                }}
              >
                <div className="text-sm text-muted-foreground w-16">
                  {item.time}
                </div>
                <motion.div 
                  className={`h-3 w-3 rounded-full ${
                    item.status === 'completed' ? 'bg-[#7ED321]' :
                    item.status === 'current' ? 'bg-primary' :
                    'bg-muted'
                  }`}
                  animate={item.status === 'current' ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="flex-1 text-sm">
                  {item.subject}
                </div>
                {item.status === 'completed' && (
                  <motion.div 
                    className="text-xs text-[#7ED321] font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    Present
                  </motion.div>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={itemVariants}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="h-16 w-full transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-md"
            onClick={() => onNavigate('daily-report')}
          >
            <div className="flex flex-col items-center space-y-1">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">Daily Report</span>
            </div>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="h-16 w-full transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-md"
            onClick={() => onNavigate('qr-scanner')}
          >
            <div className="flex flex-col items-center space-y-1">
              <QrCode className="h-5 w-5" />
              <span className="text-sm">QR Scanner</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Settings and Logout */}
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={itemVariants}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="h-16 w-full transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-md"
            onClick={() => onNavigate('settings')}
          >
            <div className="flex flex-col items-center space-y-1">
              <Settings className="h-5 w-5" />
              <span className="text-sm">Settings</span>
            </div>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="h-16 w-full transition-all duration-200 hover:border-destructive hover:text-destructive hover:shadow-md"
            onClick={onLogout}
          >
            <div className="flex flex-col items-center space-y-1">
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Logout</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Chatbot Icon */}
      <ChatbotIcon userRole="student" />
    </motion.div>
  );
}