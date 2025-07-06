
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export function AmbientToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleAmbient = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Start playing
      if (iframeRef.current) {
        iframeRef.current.style.display = 'block';
        // Send play command to YouTube iframe
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    } else {
      // Stop playing
      if (iframeRef.current) {
        iframeRef.current.style.display = 'none';
        // Send pause command to YouTube iframe
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }
  };

  useEffect(() => {
    // Listen for YouTube player ready
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      if (event.data && typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'video-ready') {
            console.log('YouTube player ready');
          }
        } catch (e) {
          // Ignore non-JSON messages
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
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
      
      {/* Hidden YouTube iframe for ambient sound */}
      <iframe
        ref={iframeRef}
        style={{ display: 'none' }}
        width="1"
        height="1"
        src="https://www.youtube.com/embed/jfKfPfyJRdk?enablejsapi=1&autoplay=0&loop=1&playlist=jfKfPfyJRdk&controls=0"
        title="Ambient Sound"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
}
