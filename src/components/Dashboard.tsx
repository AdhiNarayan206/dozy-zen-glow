
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Calendar, TrendingUp } from 'lucide-react';

interface Session {
  date: string;
  duration: number;
  type: 'focus' | 'break';
}

interface Stats {
  todayMinutes: number;
  weekMinutes: number;
  totalSessions: number;
  streak: number;
}

export function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState<Stats>({
    todayMinutes: 0,
    weekMinutes: 0,
    totalSessions: 0,
    streak: 0
  });

  useEffect(() => {
    const loadStats = () => {
      const sessionData: Session[] = JSON.parse(localStorage.getItem('dozy-sessions') || '[]');
      setSessions(sessionData);

      const today = new Date().toISOString().split('T')[0];
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const todayMinutes = sessionData
        .filter(session => session.date === today && session.type === 'focus')
        .reduce((total, session) => total + session.duration, 0);

      const weekMinutes = sessionData
        .filter(session => {
          const sessionDate = new Date(session.date);
          return sessionDate >= oneWeekAgo && session.type === 'focus';
        })
        .reduce((total, session) => total + session.duration, 0);

      const totalSessions = sessionData.filter(session => session.type === 'focus').length;

      // Calculate streak
      let streak = 0;
      const dates = [...new Set(sessionData.map(s => s.date))].sort().reverse();
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const daysBetween = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
        if (daysBetween === i) {
          streak++;
        } else {
          break;
        }
      }

      setStats({
        todayMinutes,
        weekMinutes,
        totalSessions,
        streak
      });
    };

    loadStats();

    // Update stats when storage changes
    const handleStorageChange = () => loadStats();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="w-80 space-y-4">
      <Card className="bg-card/95 backdrop-blur-sm border-border/50 zen-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-zen flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Today's Focus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-zen text-sm text-muted-foreground">Time Focused</span>
            </div>
            <Badge variant="secondary" className="font-zen">
              {formatTime(stats.todayMinutes)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-zen text-sm text-muted-foreground">Sessions</span>
            </div>
            <Badge variant="secondary" className="font-zen">
              {sessions.filter(s => s.date === new Date().toISOString().split('T')[0] && s.type === 'focus').length}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/95 backdrop-blur-sm border-border/50 zen-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-zen flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-zen font-semibold text-primary">
                {stats.streak}
              </div>
              <div className="text-xs font-zen text-muted-foreground uppercase tracking-wide">
                Day Streak
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-zen font-semibold text-primary">
                {stats.totalSessions}
              </div>
              <div className="text-xs font-zen text-muted-foreground uppercase tracking-wide">
                Total Sessions
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="font-zen text-sm text-muted-foreground">This Week</span>
              <Badge variant="outline" className="font-zen">
                {formatTime(stats.weekMinutes)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
