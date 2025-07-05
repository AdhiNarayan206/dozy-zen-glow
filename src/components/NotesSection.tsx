import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StickyNote } from 'lucide-react';

export function NotesSection() {
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="zen"
            size="icon"
            className="rounded-full h-12 w-12 zen-shadow hover:scale-105"
          >
            <StickyNote className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border border-border zen-shadow max-w-md">
          <DialogHeader>
            <DialogTitle className="font-zen text-lg">Quick Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jot down your thoughts..."
              className="min-h-40 zen-transition rounded-xl font-zen text-sm resize-none border-0 bg-secondary/30 focus:bg-secondary/50"
            />
            <p className="text-xs text-muted-foreground font-zen">
              Your notes are saved automatically
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}