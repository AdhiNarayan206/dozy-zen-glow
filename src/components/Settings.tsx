
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Settings as SettingsIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Settings() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  // Load settings from localStorage or use defaults
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
  const [focusTime, setFocusTime] = useState([settings.focusTime]);
  const [shortBreak, setShortBreak] = useState([settings.shortBreak]);
  const [longBreak, setLongBreak] = useState([settings.longBreak]);
  const [wallpaper, setWallpaper] = useState(settings.wallpaper);

  const applyWallpaperTheme = (wallpaperType: string) => {
    const root = document.documentElement;
    
    switch (wallpaperType) {
      case 'forest':
        root.style.setProperty('--primary', '120 40% 35%');
        root.style.setProperty('--primary-foreground', '120 10% 95%');
        root.style.setProperty('--accent', '120 20% 80%');
        break;
      case 'ocean':
        root.style.setProperty('--primary', '200 60% 45%');
        root.style.setProperty('--primary-foreground', '200 10% 95%');
        root.style.setProperty('--accent', '200 30% 85%');
        break;
      case 'sunset':
        root.style.setProperty('--primary', '25 70% 55%');
        root.style.setProperty('--primary-foreground', '25 10% 95%');
        root.style.setProperty('--accent', '25 40% 85%');
        break;
      case 'minimal':
        root.style.setProperty('--primary', '0 0% 50%');
        root.style.setProperty('--primary-foreground', '0 0% 98%');
        root.style.setProperty('--accent', '0 0% 90%');
        break;
      default: // default zen
        root.style.setProperty('--primary', '150 25% 45%');
        root.style.setProperty('--primary-foreground', '210 20% 98%');
        root.style.setProperty('--accent', '170 20% 85%');
        break;
    }
  };

  const handleSaveSettings = () => {
    const newSettings = {
      focusTime: focusTime[0],
      shortBreak: shortBreak[0],
      longBreak: longBreak[0],
      wallpaper: wallpaper
    };

    // Save to localStorage
    localStorage.setItem('dozy-settings', JSON.stringify(newSettings));
    
    // Apply wallpaper theme
    applyWallpaperTheme(wallpaper);
    
    // Update state
    setSettings(newSettings);
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
    
    // Show success toast
    toast({
      title: "Settings Saved",
      description: "Your preferences have been saved successfully.",
    });

    // Close the dialog
    setOpen(false);

    console.log('Settings saved:', newSettings);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="zen"
            size="icon"
            className="rounded-full h-12 w-12 zen-shadow hover:scale-105 group relative"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="absolute right-full mr-3 px-2 py-1 bg-popover text-popover-foreground text-xs font-zen rounded-md opacity-0 group-hover:opacity-100 zen-transition whitespace-nowrap pointer-events-none">
              Settings
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border border-border zen-shadow max-w-md">
          <DialogHeader>
            <DialogTitle className="font-zen text-lg">Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Timer Settings */}
            <div className="space-y-4">
              <h3 className="font-zen font-medium text-sm text-muted-foreground uppercase tracking-wide">Timer Settings</h3>
              
              <div className="space-y-2">
                <Label className="font-zen text-sm">Focus Time: {focusTime[0]} minutes</Label>
                <Slider
                  value={focusTime}
                  onValueChange={setFocusTime}
                  min={15}
                  max={60}
                  step={5}
                  className="zen-transition"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-zen text-sm">Short Break: {shortBreak[0]} minutes</Label>
                <Slider
                  value={shortBreak}
                  onValueChange={setShortBreak}
                  min={3}
                  max={15}
                  step={1}
                  className="zen-transition"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-zen text-sm">Long Break: {longBreak[0]} minutes</Label>
                <Slider
                  value={longBreak}
                  onValueChange={setLongBreak}
                  min={10}
                  max={30}
                  step={5}
                  className="zen-transition"
                />
              </div>
            </div>

            {/* Background Settings */}
            <div className="space-y-4">
              <h3 className="font-zen font-medium text-sm text-muted-foreground uppercase tracking-wide">Background</h3>
              
              <div className="space-y-2">
                <Label className="font-zen text-sm">Wallpaper</Label>
                <Select value={wallpaper} onValueChange={setWallpaper}>
                  <SelectTrigger className="zen-transition rounded-xl border-0 bg-secondary/30 focus:bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border zen-shadow">
                    <SelectItem value="default">Default Zen</SelectItem>
                    <SelectItem value="forest">Forest Green</SelectItem>
                    <SelectItem value="ocean">Ocean Blue</SelectItem>
                    <SelectItem value="sunset">Warm Sunset</SelectItem>
                    <SelectItem value="minimal">Pure Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                variant="zen" 
                className="w-full font-zen"
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
