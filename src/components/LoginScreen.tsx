import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginScreenProps {
  onLogin: (email: string, password: string, role: string) => void;
  isLoading?: boolean;
}

export function LoginScreen({ onLogin, isLoading = false }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('student');

  const handleSubmit = (selectedRole: string) => {
    if (email && password) {
      onLogin(email, password, selectedRole);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8"
        >
          <motion.div
            className="h-16 w-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="h-8 w-8 bg-white rounded-full"></div>
          </motion.div>
          <h1 className="text-3xl font-bold">Welcome to Trackit</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm border-primary/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
                
                <div className="mt-6 space-y-4">
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                    />
                  </motion.div>

                  <TabsContent value="student" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={() => handleSubmit('student')}
                        className="w-full mt-4 h-12 relative overflow-hidden group"
                        disabled={!email || !password || isLoading}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center justify-center">
                          {isLoading ? (
                            <motion.div
                              className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            'Sign in as Student'
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="teacher" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={() => handleSubmit('teacher')}
                        className="w-full mt-4 h-12 relative overflow-hidden group"
                        disabled={!email || !password || isLoading}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center justify-center">
                          {isLoading ? (
                            <motion.div
                              className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            'Sign in as Teacher'
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="admin" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={() => handleSubmit('admin')}
                        className="w-full mt-4 h-12 relative overflow-hidden group"
                        disabled={!email || !password || isLoading}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center justify-center">
                          {isLoading ? (
                            <motion.div
                              className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          ) : (
                            'Sign in as Admin'
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          <p>Demo credentials work for all roles</p>
        </motion.div>
      </motion.div>
    </div>
  );
}