
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WelcomeModalProps {
  isOpen: boolean;
  onNameSubmit: (name: string) => void;
}

export function WelcomeModal({ isOpen, onNameSubmit }: WelcomeModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-center font-zen text-xl">Welcome to DOZY</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-zen">What's your name?</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="font-zen"
              autoFocus
            />
          </div>
          <Button 
            type="submit" 
            className="w-full font-zen" 
            disabled={!name.trim()}
            variant="zen"
          >
            Get Started
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
