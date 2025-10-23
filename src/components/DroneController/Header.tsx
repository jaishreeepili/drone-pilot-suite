import { Plane, Radio, Satellite, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="glass border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AG Drone Controller
              </h1>
              <p className="text-xs text-foreground/60">Advanced Pilot Suite v2.0</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 ml-8">
            <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm">
              Pilot
            </button>
            <button className="px-4 py-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-secondary/50 font-medium text-sm transition-colors">
              Editor
            </button>
            <button className="px-4 py-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-secondary/50 font-medium text-sm transition-colors">
              Waypoint
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-lg glass">
            <Radio className="w-4 h-4 text-primary" />
            <span className="text-sm">RC: Connected</span>
          </div>
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-lg glass">
            <Satellite className="w-4 h-4 text-accent" />
            <span className="text-sm">GPS: 12 Sats</span>
          </div>
          <button className="p-2 rounded-lg glass hover:bg-secondary/70 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}