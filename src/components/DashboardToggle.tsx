
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { Dashboard } from './Dashboard';

interface DashboardToggleProps {
  userName: string;
}

export function DashboardToggle({ userName }: DashboardToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="zen"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-6 top-6 z-30 font-zen flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        Hey {userName}
      </Button>
      
      {isOpen && <Dashboard />}
    </>
  );
}
