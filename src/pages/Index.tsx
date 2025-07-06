
import { FocusTimer } from '@/components/FocusTimer';
import { TodoPanel } from '@/components/TodoPanel';
import { NotesSection } from '@/components/NotesSection';
import { Settings } from '@/components/Settings';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { AmbientToggle } from '@/components/AmbientToggle';
import { Dashboard } from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background zen-gradient relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/8 rounded-full blur-3xl ambient-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/8 rounded-full blur-2xl ambient-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary/8 rounded-full blur-xl ambient-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Dashboard - Left side */}
      <Dashboard />

      {/* Header controls */}
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        <DarkModeToggle />
        <AmbientToggle />
      </div>

      {/* Right side controls */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        <Settings />
        <TodoPanel />
        <NotesSection />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-lg mx-auto">
          {/* Welcome section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light text-foreground font-zen mb-6 tracking-wide">
              Stay <span className="font-medium text-primary pulse-zen">Focused</span>
            </h1>
            <p className="text-base text-muted-foreground font-zen tracking-wide opacity-80 max-w-md mx-auto">
              Use the Pomodoro Technique to boost your productivity and maintain focus throughout your day.
            </p>
          </div>

          {/* Focus Timer */}
          <div className="mb-16">
            <FocusTimer />
          </div>

          {/* Footer */}
          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground font-zen opacity-60">
              Focus • Rest • Repeat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
