import { FocusTimer } from '@/components/FocusTimer';
import { TodoPanel } from '@/components/TodoPanel';
import { NotesSection } from '@/components/NotesSection';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { AmbientToggle } from '@/components/AmbientToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-background zen-gradient relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl ambient-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full blur-xl ambient-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-secondary/10 rounded-full blur-lg ambient-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header controls */}
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        <DarkModeToggle />
        <AmbientToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Welcome section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-foreground font-zen mb-4 tracking-wide">
              Welcome to <span className="font-medium text-primary pulse-zen">DOZY</span>
            </h1>
            <p className="text-sm text-muted-foreground font-zen tracking-wide opacity-80">
              Stay calm. Stay focused.
            </p>
          </div>

          {/* Focus Timer */}
          <div className="mb-12">
            <FocusTimer />
          </div>

          {/* Todo Panel */}
          <div className="mb-8">
            <TodoPanel />
          </div>

          {/* Notes Section */}
          <div className="mb-8">
            <NotesSection />
          </div>

          {/* Footer */}
          <div className="text-center pt-8">
            <p className="text-xs text-muted-foreground font-zen opacity-60">
              Breathe. Focus. Achieve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;