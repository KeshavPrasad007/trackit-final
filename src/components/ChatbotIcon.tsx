import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

interface ChatbotIconProps {
  userRole?: 'student' | 'teacher' | 'admin' | null;
}

export function ChatbotIcon({ userRole }: ChatbotIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: `Hi! I'm TrackerBot 🤖 How can I help you today? You can ask me about attendance, schedules, ${userRole === 'student' ? 'assignments' : userRole === 'teacher' ? 'class management' : 'system administration'}, or anything else!`
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessages = [
      ...messages,
      { type: 'user', content: message },
      { 
        type: 'bot', 
        content: `Thanks for your question! I'd be happy to help you with "${message}". This is a demo version - in the full app, I'll provide intelligent responses about attendance tracking, schedules, and productivity tips.` 
      }
    ];

    setMessages(newMessages);
    setMessage('');
  };

  const suggestedQuestions = userRole === 'student' 
    ? ["What's my attendance rate?", "Any suggested tasks?", "When is my next class?"]
    : userRole === 'teacher'
    ? ["How to mark attendance?", "View class reports", "Generate QR codes"]
    : ["System statistics", "Manage timetables", "User reports"];

  return (
    <>
      {/* Floating Chatbot Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", bounce: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ x: ['0%', '200%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 3
              }}
            />
            
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.div>
            
            {/* Question mark indicator */}
            <motion.div
              className="absolute -top-1 -right-1 h-4 w-4 bg-warning rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-2 w-2 text-white" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Chat Window */}
            <motion.div
              className="fixed bottom-6 right-6 left-6 md:left-auto md:w-80 z-50"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <Card className="shadow-2xl border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <MessageCircle className="h-5 w-5" />
                      </motion.div>
                      <span>TrackerBot</span>
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-2 w-2 bg-success rounded-full"
                      />
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {/* Messages */}
                  <div className="h-64 overflow-y-auto p-4 space-y-3">
                    <AnimatePresence>
                      {messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.type === 'user' 
                                ? 'bg-primary text-white ml-4' 
                                : 'bg-muted mr-4'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {/* Suggested Questions */}
                  <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestedQuestions.map((question, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setMessage(question)}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Input */}
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask me anything about Trackit..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          onClick={handleSendMessage}
                          size="icon"
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}