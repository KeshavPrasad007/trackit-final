import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  User, 
  Smartphone,
  Clock,
  QrCode,
  Users,
  Settings as SettingsIcon,
  Info,
  HelpCircle
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  userRole: 'student' | 'teacher' | 'admin' | null;
}

export function Settings({ onBack, userRole }: SettingsProps) {
  const [settings, setSettings] = useState({
    // General Settings
    darkMode: false,
    language: 'en',
    notifications: true,
    
    // Student Settings
    studyReminders: true,
    parentalAccess: false,
    taskSuggestions: true,
    breakReminders: true,
    
    // Teacher Settings
    autoQRGeneration: true,
    lateStudentAlerts: true,
    attendanceNotifications: true,
    classReminders: true,
    
    // Admin Settings
    systemNotifications: true,
    attendancePolicy: 'strict',
    qrExpiration: '30',
    autoBackup: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences</p>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>General</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked: any) => updateSetting('darkMode', checked)}
            />
          </div>

          <Separator />

          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">Select app language</p>
              </div>
            </div>
            <Select value={settings.language} onValueChange={(value: any) => updateSetting('language', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive app notifications</p>
              </div>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked: any) => updateSetting('notifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Display Name</Label>
            <Input 
              placeholder="Enter your display name" 
              defaultValue={
                userRole === 'student' ? 'Alex Johnson' :
                userRole === 'teacher' ? 'Prof. Smith' :
                userRole === 'admin' ? 'Admin User' :
                'User Name'
              } 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              placeholder="Enter your email" 
              defaultValue={
                userRole === 'student' ? 'alex.johnson@school.edu' :
                userRole === 'teacher' ? 'prof.smith@school.edu' :
                userRole === 'admin' ? 'admin@school.edu' :
                'user@school.edu'
              } 
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input placeholder="Enter your phone number" defaultValue="+1 (555) 123-4567" />
          </div>

          <Button variant="outline" className="w-full">
            Update Profile
          </Button>
        </CardContent>
      </Card>

      {/* Student-Specific Settings */}
      {userRole === 'student' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Study Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Study Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming tasks</p>
              </div>
              <Switch
                checked={settings.studyReminders}
                onCheckedChange={(checked: any) => updateSetting('studyReminders', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Task Suggestions</Label>
                <p className="text-sm text-muted-foreground">Receive AI-powered task suggestions</p>
              </div>
              <Switch
                checked={settings.taskSuggestions}
                onCheckedChange={(checked: any) => updateSetting('taskSuggestions', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Break Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified to take breaks</p>
              </div>
              <Switch
                checked={settings.breakReminders}
                onCheckedChange={(checked: any) => updateSetting('breakReminders', checked)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Privacy Settings */}
      {(userRole === 'student' || userRole === 'teacher') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy & Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {userRole === 'student' && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Parental Access</Label>
                    <p className="text-sm text-muted-foreground">Allow parents to view attendance</p>
                  </div>
                  <Switch
                    checked={settings.parentalAccess}
                    onCheckedChange={(checked: any) => updateSetting('parentalAccess', checked)}
                  />
                </div>
                <Separator />
              </>
            )}

            <div className="space-y-2">
              <Label>Data Sharing</Label>
              <Select defaultValue="minimal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Data Sharing</SelectItem>
                  <SelectItem value="minimal">Minimal (Required Only)</SelectItem>
                  <SelectItem value="analytics">Analytics Only</SelectItem>
                  <SelectItem value="full">Full Sharing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teacher-Specific Settings */}
      {userRole === 'teacher' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="h-5 w-5" />
              <span>Teaching Tools</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto QR Generation</Label>
                <p className="text-sm text-muted-foreground">Automatically generate QR codes for classes</p>
              </div>
              <Switch
                checked={settings.autoQRGeneration}
                onCheckedChange={(checked: any) => updateSetting('autoQRGeneration', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Late Student Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when students arrive late</p>
              </div>
              <Switch
                checked={settings.lateStudentAlerts}
                onCheckedChange={(checked: any) => updateSetting('lateStudentAlerts', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Class Reminders</Label>
                <p className="text-sm text-muted-foreground">Receive reminders before classes</p>
              </div>
              <Switch
                checked={settings.classReminders}
                onCheckedChange={(checked: any) => updateSetting('classReminders', checked)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admin-Specific Settings */}
      {userRole === 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>System Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Attendance Policy</Label>
              <Select value={settings.attendancePolicy} onValueChange={(value: any) => updateSetting('attendancePolicy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lenient">Lenient (5 min grace period)</SelectItem>
                  <SelectItem value="standard">Standard (2 min grace period)</SelectItem>
                  <SelectItem value="strict">Strict (No grace period)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>QR Code Expiration (minutes)</Label>
              <Select value={settings.qrExpiration} onValueChange={(value: any) => updateSetting('qrExpiration', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Automatically backup attendance data</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked: any) => updateSetting('autoBackup', checked)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* About & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5" />
            <span>About & Support</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>App Version</Label>
              <p className="text-sm text-muted-foreground">Trackit v2.1.0</p>
            </div>
          </div>

          <Separator />

          <Button variant="outline" className="w-full flex items-center space-x-2">
            <HelpCircle className="h-4 w-4" />
            <span>Help & Support</span>
          </Button>

          <Button variant="outline" className="w-full">
            Privacy Policy
          </Button>

          <Button variant="outline" className="w-full">
            Terms of Service
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button className="w-full h-12">
        Save Settings
      </Button>
    </div>
  );
}