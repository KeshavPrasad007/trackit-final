import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Share2, Database, Terminal, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrackerLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function TrackerLayout({ children, className = "" }: TrackerLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const saved = localStorage.getItem('trackit-dark-mode');
    if (saved) {
      setIsDark(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('trackit-dark-mode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const copyPrototypeLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Simple toast notification
    const toast = document.createElement('div');
    toast.textContent = 'Prototype link copied!';
    toast.className = 'fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50';
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 2000);
  };

  return (
    <div className={`min-h-screen bg-background max-w-md mx-auto relative ${className}`}>
      {/* Backend Integration Status Indicators */}
      <div className="absolute top-2 left-2 z-40 flex space-x-1">
        <motion.div 
          className="flex items-center space-x-1 bg-card/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs border"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Database className="h-3 w-3 text-blue-500" />
          <span className="text-muted-foreground">Supabase</span>
          <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
        </motion.div>
        <motion.div 
          className="flex items-center space-x-1 bg-card/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs border"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Terminal className="h-3 w-3 text-green-600" />
          <span className="text-muted-foreground">Python</span>
          <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
        </motion.div>
      </div>

      {/* Hackathon Controls */}
      <div className="absolute top-2 right-2 z-40 flex space-x-2">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="h-8 w-8 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSharePanel(!showSharePanel)}
            className="h-8 w-8 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Share Prototype Panel */}
      <AnimatePresence>
        {showSharePanel && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="absolute top-12 right-2 z-50 bg-card/95 backdrop-blur-sm border rounded-lg shadow-lg p-4 w-64"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Share Prototype</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this live Trackit prototype with your team, judges, or testers.
              </p>
              <div className="space-y-2">
                <Button
                  onClick={copyPrototypeLink}
                  size="sm"
                  className="w-full h-8 text-xs"
                >
                  Copy Live Link
                </Button>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Status:</span>
                  <span className="flex items-center space-x-1">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span>Live & Ready</span>
                  </span>
                </div>
                <div className="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded border">
                  Demo credentials work for all user roles
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {children}

      {/* Hackathon Footer Badge */}
      <motion.div
        className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="bg-card/80 backdrop-blur-sm border rounded-full px-3 py-1 text-xs text-muted-foreground flex items-center space-x-2">
          <Terminal className="h-3 w-3" />
          <span>Hackathon Prototype</span>
          <div className="h-1 w-1 bg-primary rounded-full animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}