import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotesSectionProps {
  className?: string;
}

export function NotesSection({ className }: NotesSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');

  return (
    <div className={className}>
      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="w-full zen-transition rounded-2xl p-4 justify-between font-zen"
      >
        <span className="text-muted-foreground">Notes</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>

      {/* Notes panel */}
      <div
        className={cn(
          "zen-transition overflow-hidden",
          isOpen 
            ? "max-h-64 opacity-100 mt-2" 
            : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-card rounded-2xl p-6 zen-shadow border border-border">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Jot down your thoughts..."
            className="min-h-32 zen-transition rounded-xl font-zen text-sm resize-none border-0 bg-secondary/30 focus:bg-secondary/50"
          />
          <p className="text-xs text-muted-foreground mt-2 font-zen">
            Your notes are saved automatically
          </p>
        </div>
      </div>
    </div>
  );
}