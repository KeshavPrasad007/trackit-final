import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, QrCode, CheckCircle } from 'lucide-react';

interface QRScannerProps {
  onBack: () => void;
}

export function QRScanner({ onBack }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        setScanSuccess(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  const handleScan = () => {
    setIsScanning(true);
    setScanSuccess(false);
  };

  return (
    <motion.div 
      className="p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold">QR Scanner</h1>
          <p className="text-muted-foreground">Scan QR code to mark attendance</p>
        </div>
      </motion.div>

      {/* Scanner Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="h-5 w-5" />
              <span>Camera Scanner</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Scanner Area */}
            <motion.div 
              className="relative aspect-square bg-black rounded-lg overflow-hidden mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mock Camera View */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!isScanning && !scanSuccess && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center text-white"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <QrCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      </motion.div>
                      <p className="text-sm opacity-75">Point camera at QR code</p>
                    </motion.div>
                  )}

                  {isScanning && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full"
                    >
                      {/* Scanning Animation */}
                      <motion.div
                        className="absolute inset-0 border-4 border-primary rounded-lg"
                        animate={{
                          scale: [1, 1.05, 1],
                          borderColor: ['#4A90E2', '#7ED321', '#4A90E2']
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Scanning Line */}
                      <motion.div
                        className="absolute left-0 right-0 h-1 bg-primary rounded-full"
                        animate={{
                          y: [0, 200, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="text-white text-center"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <QrCode className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">Scanning...</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {scanSuccess && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="text-center text-white"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="h-16 w-16 mx-auto mb-4 text-[#7ED321]" />
                      </motion.div>
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-[#7ED321]"
                      >
                        Attendance Marked!
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Corner Markers */}
              {!scanSuccess && (
                <>
                  {[
                    { top: '10px', left: '10px', rotate: 0 },
                    { top: '10px', right: '10px', rotate: 90 },
                    { bottom: '10px', right: '10px', rotate: 180 },
                    { bottom: '10px', left: '10px', rotate: 270 }
                  ].map((position, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-6 h-6 border-l-2 border-t-2 border-white"
                      style={{
                        ...position,
                        transform: `rotate(${position.rotate}deg)`
                      }}
                      animate={isScanning ? {
                        borderColor: ['#ffffff', '#4A90E2', '#7ED321', '#ffffff']
                      } : {}}
                      transition={{
                        duration: 1,
                        repeat: isScanning ? Infinity : 0,
                        delay: index * 0.1
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {!scanSuccess ? (
                  <motion.div
                    key="scan-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Button
                      onClick={handleScan}
                      disabled={isScanning}
                      className="w-full h-12 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                        initial={{ x: isScanning ? 0 : '-100%' }}
                        animate={{ x: isScanning ? ['0%', '100%'] : 0 }}
                        transition={{
                          duration: isScanning ? 1 : 0.3,
                          repeat: isScanning ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      />
                      <span className="relative z-10">
                        {isScanning ? 'Scanning...' : 'Start Scanning'}
                      </span>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Button
                      onClick={onBack}
                      className="w-full h-12 bg-[#7ED321] hover:bg-[#7ED321]/90"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Return to Dashboard
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Position your device's camera towards the QR code</li>
              <li>• Ensure good lighting for better scanning</li>
              <li>• Hold steady until the code is recognized</li>
              <li>• Your attendance will be marked automatically</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}