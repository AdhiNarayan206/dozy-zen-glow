
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import { Dashboard } from './Dashboard';

interface DashboardToggleProps {
  userName: string;
}

export function DashboardToggle({ userName }: DashboardToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-6 top-6 z-30">
      <Button
        variant="zen"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="font-zen flex items-center gap-2 mb-2"
      >
        <User className="w-4 h-4" />
        Hey {userName}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>
      
      {isOpen && <Dashboard />}
    </div>
  );
}
