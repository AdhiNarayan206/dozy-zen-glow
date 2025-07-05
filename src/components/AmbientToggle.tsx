import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export function AmbientToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAmbient = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you would control audio playback here
    console.log('Ambient sound:', isPlaying ? 'stopped' : 'playing');
  };

  return (
    <Button
      onClick={toggleAmbient}
      variant="ghost"
      size="sm"
      className="zen-transition rounded-full h-10 w-10 p-0 hover:bg-secondary/50"
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-muted-foreground" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      )}
    </Button>
  );
}