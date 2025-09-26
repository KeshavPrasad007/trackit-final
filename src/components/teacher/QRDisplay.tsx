import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface QRDisplayProps {
  onBack: () => void;
}

export function QRDisplay({ onBack }: QRDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [qrCode, setQrCode] = useState('QR_CODE_12345_PHYSICS_2025');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Generate new QR code
          setQrCode(`QR_CODE_${Math.random().toString(36).substr(2, 9)}_PHYSICS_2025`);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const refreshQR = () => {
    setQrCode(`QR_CODE_${Math.random().toString(36).substr(2, 9)}_PHYSICS_2025`);
    setTimeLeft(60);
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
              <h1 className="text-xl font-bold">QR Code Display</h1>
              <p className="text-white/80 text-sm">Grade 10 Physics</p>
            </div>
          </div>
          <Button
            onClick={refreshQR}
            className="bg-white text-primary hover:bg-white/90"
            size="sm"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center justify-center min-h-[70vh]">
        {/* QR Code Display */}
        <Card className="w-full max-w-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* QR Code Placeholder */}
              <div className="mx-auto w-64 h-64 bg-black flex items-center justify-center rounded-lg">
                <div className="text-white text-center">
                  <div className="text-xs mb-2">QR CODE</div>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          Math.random() > 0.5 ? 'bg-white' : 'bg-black'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs mt-2 font-mono">
                    {qrCode.slice(0, 12)}...
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <p className="text-sm text-muted-foreground">
                  This code will refresh in {timeLeft} seconds
                </p>
              </div>

              {/* Instructions */}
              <div className="text-center space-y-2">
                <p className="text-sm font-medium">
                  Students can scan this QR code to mark attendance
                </p>
                <p className="text-xs text-muted-foreground">
                  Code automatically refreshes for security
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Students Counter */}
        <Card className="w-full max-w-sm mt-6">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-lg font-semibold">Active Scans</div>
              <div className="text-2xl font-bold text-[#7ED321]">12</div>
              <p className="text-sm text-muted-foreground">
                Students marked present via QR
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}