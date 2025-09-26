import React, { useState, useEffect } from "react";
import { TrackerLayout } from "./components/TrackerLayout";
import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen } from "./components/LoginScreen";

// Student Components
import { StudentDashboard } from "./components/student/StudentDashboard";
import { QRScanner } from "./components/student/QRScanner";
import { DailyReport } from "./components/student/DailyReport";

// Teacher Components
import { TeacherDashboard } from "./components/teacher/TeacherDashboard";
import { ManualAttendance } from "./components/teacher/ManualAttendance";
import { QRDisplay } from "./components/teacher/QRDisplay";

// Admin Components
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { TimetableManagement } from "./components/admin/TimetableManagement";

// Settings Components
import { Settings } from "./components/Settings";

type Screen =
  | "splash"
  | "login"
  | "student-dashboard"
  | "qr-scanner"
  | "daily-report"
  | "teacher-dashboard"
  | "manual-attendance"
  | "qr-display"
  | "admin-dashboard"
  | "timetable-management"
  | "settings";

type UserRole = "student" | "teacher" | "admin" | null;

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("splash");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Simulate splash screen loading
    const timer = setTimeout(() => {
      setCurrentScreen("login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (
    email: string,
    password: string,
    role: string,
  ) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setUserRole(role as UserRole);

      // Navigate to appropriate dashboard based on role
      switch (role) {
        case "student":
          setCurrentScreen("student-dashboard");
          break;
        case "teacher":
          setCurrentScreen("teacher-dashboard");
          break;
        case "admin":
          setCurrentScreen("admin-dashboard");
          break;
        default:
          setCurrentScreen("login");
      }
      setIsTransitioning(false);
    }, 200);
  };

  const handleNavigation = (screen: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen as Screen);
      setIsTransitioning(false);
    }, 150);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      // Navigate back to appropriate dashboard based on user role
      switch (userRole) {
        case "student":
          setCurrentScreen("student-dashboard");
          break;
        case "teacher":
          setCurrentScreen("teacher-dashboard");
          break;
        case "admin":
          setCurrentScreen("admin-dashboard");
          break;
        default:
          setCurrentScreen("login");
      }
      setIsTransitioning(false);
    }, 150);
  };

  const handleLogout = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setUserRole(null);
      setCurrentScreen("login");
      setIsTransitioning(false);
    }, 150);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen />;

      case "login":
        return (
          <LoginScreen
            onLogin={handleLogin}
            isLoading={isTransitioning}
          />
        );

      // Student Screens
      case "student-dashboard":
        return (
          <StudentDashboard
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        );

      case "qr-scanner":
        return <QRScanner onBack={handleBack} />;

      case "daily-report":
        return <DailyReport onBack={handleBack} />;

      // Teacher Screens
      case "teacher-dashboard":
        return (
          <TeacherDashboard
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        );

      case "manual-attendance":
        return <ManualAttendance onBack={handleBack} />;

      case "qr-display":
        return <QRDisplay onBack={handleBack} />;

      // Admin Screens
      case "admin-dashboard":
        return (
          <AdminDashboard
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        );

      case "timetable-management":
        return <TimetableManagement onBack={handleBack} />;

      case "settings":
        return (
          <Settings onBack={handleBack} userRole={userRole} />
        );

      default:
        return (
          <LoginScreen
            onLogin={handleLogin}
            isLoading={isTransitioning}
          />
        );
    }
  };

  return (
    <TrackerLayout>
      <div className="page-transition">{renderScreen()}</div>
    </TrackerLayout>
  );
}