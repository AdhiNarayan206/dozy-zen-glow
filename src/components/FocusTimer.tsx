
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface FocusTimerProps {
  className?: string;
}

export function FocusTimer({ className }: FocusTimerProps) {
  // Load settings from localStorage
  const loadSettings = () => {
    const saved = localStorage.getItem('dozy-settings');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      focusTime: 25,
      shortBreak: 5,
      longBreak: 15,
      wallpaper: 'default'
    };
  };

  const [settings, setSettings] = useState(loadSettings());
  const [timeLeft, setTimeLeft] = useState(settings.focusTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [currentMode, setCurrentMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [sessionsCompleted, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update timer when settings change
  useEffect(() => {
    const handleStorageChange = () => {
      const newSettings = loadSettings();
      setSettings(newSettings);
      
      // Only update time if timer is not active
      if (!isActive) {
        const newTime = getCurrentModeDuration(newSettings) * 60;
        setTimeLeft(newTime);
      }
    };

    // Listen for custom storage events and regular storage events
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isActive, currentMode]);

  // Update timeLeft when currentMode changes and timer is not active
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(getCurrentModeDuration(settings) * 60);
    }
  }, [currentMode, isActive, settings]);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            // Timer completed
            setIsActive(false);
            setIsPaused(true);
            
            // Save session data
            const sessionData = {
              date: new Date().toISOString().split('T')[0],
              duration: getCurrentModeDuration(settings),
              type: currentMode
            };
            
            const existingSessions = JSON.parse(localStorage.getItem('dozy-sessions') || '[]');
            existingSessions.push(sessionData);
            localStorage.setItem('dozy-sessions', JSON.stringify(existingSessions));
            
            if (currentMode === 'focus') {
              setSessions(prev => prev + 1);
            }
            
            // Auto-switch to break mode
            const nextMode = currentMode === 'focus' 
              ? (sessionsCompleted % 4 === 3 ? 'longBreak' : 'shortBreak')
              : 'focus';
            
            setCurrentMode(nextMode);
            return getNextModeTime(nextMode, settings);
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, currentMode, sessionsCompleted, settings]);

  const getCurrentModeDuration = (currentSettings = settings) => {
    switch (currentMode) {
      case 'focus': return currentSettings.focusTime;
      case 'shortBreak': return currentSettings.shortBreak;
      case 'longBreak': return currentSettings.longBreak;
    }
  };

  const getNextModeTime = (mode: 'focus' | 'shortBreak' | 'longBreak', currentSettings = settings) => {
    switch (mode) {
      case 'focus': return currentSettings.focusTime * 60;
      case 'shortBreak': return currentSettings.shortBreak * 60;
      case 'longBreak': return currentSettings.longBreak * 60;
    }
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTimeLeft(getCurrentModeDuration() * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((getCurrentModeDuration() * 60 - timeLeft) / (getCurrentModeDuration() * 60)) * 100;

  const getModeLabel = () => {
    switch (currentMode) {
      case 'focus': return 'Focus Time';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
    }
  };

  const getModeColor = () => {
    switch (currentMode) {
      case 'focus': return 'hsl(var(--primary))';
      case 'shortBreak': return 'hsl(150 60% 50%)';
      case 'longBreak': return 'hsl(200 60% 50%)';
    }
  };

  return (
    <div className={`zen-transition ${className}`}>
      {/* Mode indicator */}
      <div className="text-center mb-4">
        <span className="text-sm font-zen text-muted-foreground uppercase tracking-widest">
          {getModeLabel()}
        </span>
      </div>

      {/* Timer Circle */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="2"
            className="opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getModeColor()}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="zen-transition"
          />
        </svg>
        
        {/* Timer display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-light text-foreground font-zen tracking-wider mb-1">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-muted-foreground font-zen uppercase tracking-wide">
            Session {sessionsCompleted + 1}
          </span>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex justify-center gap-4">
        {!isActive || isPaused ? (
          <Button
            onClick={handleStart}
            size="lg"
            className="zen-transition zen-shadow rounded-full px-12 py-4 font-zen text-base h-14"
            style={{ backgroundColor: getModeColor() }}
          >
            <Play className="w-5 h-5 mr-3" />
            {!isActive ? 'Start' : 'Resume'}
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            variant="secondary"
            size="lg"
            className="zen-transition zen-shadow rounded-full px-12 py-4 font-zen text-base h-14"
          >
            <Pause className="w-5 h-5 mr-3" />
            Pause
          </Button>
        )}
        
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="zen-transition rounded-full px-8 py-4 font-zen text-base h-14"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
