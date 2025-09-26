import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, CheckCircle, AlertCircle, Coffee } from 'lucide-react';

interface StatusCardProps {
  status: 'present' | 'absent' | 'free-period' | 'upcoming';
  className?: string;
  title?: string;
  subtitle?: string;
}

export function StatusCard({ status, title, subtitle, className = '' }: StatusCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'present':
        return {
          icon: CheckCircle,
          bgColor: 'bg-[#7ED321]/10',
          borderColor: 'border-[#7ED321]/30',
          iconColor: 'text-[#7ED321]',
          badgeColor: 'bg-[#7ED321]',
          animation: { scale: [1, 1.02, 1] }
        };
      case 'absent':
        return {
          icon: AlertCircle,
          bgColor: 'bg-[#D0021B]/10',
          borderColor: 'border-[#D0021B]/30',
          iconColor: 'text-[#D0021B]',
          badgeColor: 'bg-[#D0021B]',
          animation: { scale: [1, 1.02, 1] }
        };
      case 'free-period':
        return {
          icon: Coffee,
          bgColor: 'bg-[#F5A623]/10',
          borderColor: 'border-[#F5A623]/30',
          iconColor: 'text-[#F5A623]',
          badgeColor: 'bg-[#F5A623]',
          animation: { 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }
        };
      case 'upcoming':
        return {
          icon: Clock,
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/30',
          iconColor: 'text-primary',
          badgeColor: 'bg-primary',
          animation: { scale: [1, 1.02, 1] }
        };
      default:
        return {
          icon: Clock,
          bgColor: 'bg-muted',
          borderColor: 'border-muted',
          iconColor: 'text-muted-foreground',
          badgeColor: 'bg-muted-foreground',
          animation: {}
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className={`${config.bgColor} ${config.borderColor} border-2 overflow-hidden`}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={config.animation}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className={`h-12 w-12 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center`}>
                <Icon className={`h-6 w-6 ${config.iconColor}`} />
              </div>
            </motion.div>
            <div className="flex-1">
              <motion.h3 
                className="font-bold text-lg"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {title}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Badge className={`${config.badgeColor} text-white border-none px-3 py-1`}>
                {status.toUpperCase().replace('-', ' ')}
              </Badge>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}