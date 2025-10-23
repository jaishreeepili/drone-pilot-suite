import { Map, Gauge, Clock, Camera, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface ControlPanelProps {
  speed?: number;
  height?: number;
  flightTime?: string;
}

export function ControlPanel({ speed = 0, height = 0, flightTime = '00:00' }: ControlPanelProps) {
  return (
    <div className="space-y-4">
      <div className="glass p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <Map className="w-5 h-5 text-primary" />
          <span className="font-semibold">Real-time Map</span>
        </div>
        <div className="aspect-square bg-gradient-to-br from-secondary/40 to-background/20 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-primary/20"></div>
              ))}
            </div>
          </div>
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse-slow shadow-glow"></div>
        </div>
      </div>

      <div className="glass p-4 rounded-xl space-y-3">
        <h3 className="font-semibold text-sm">Flight Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <Gauge className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-lg font-bold">{speed}</div>
            <div className="text-xs text-foreground/60">km/h</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <ChevronUp className="w-4 h-4 text-accent mx-auto mb-1" />
            <div className="text-lg font-bold">{height}</div>
            <div className="text-xs text-foreground/60">meters</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <Clock className="w-4 h-4 text-foreground/60 mx-auto mb-1" />
            <div className="text-lg font-bold">{flightTime}</div>
            <div className="text-xs text-foreground/60">time</div>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-xl space-y-3">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">Camera Settings</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/60">Lens</span>
            <select className="px-2 py-1 rounded glass text-sm">
              <option>Wide</option>
              <option>Normal</option>
              <option>Tele</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/60">ISO</span>
            <select className="px-2 py-1 rounded glass text-sm">
              <option>Auto</option>
              <option>100</option>
              <option>200</option>
              <option>400</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/60">Shutter</span>
            <select className="px-2 py-1 rounded glass text-sm">
              <option>Auto</option>
              <option>1/60</option>
              <option>1/120</option>
              <option>1/240</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-xl space-y-3">
        <h3 className="font-semibold text-sm">Display</h3>
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium">
            1080P
          </button>
          <button className="flex-1 px-3 py-2 rounded-lg glass hover:bg-secondary/70 text-xs font-medium transition-colors">
            720P
          </button>
          <button className="flex-1 px-3 py-2 rounded-lg glass hover:bg-secondary/70 text-xs font-medium transition-colors">
            480P
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button className="col-start-2 p-2 glass rounded-lg hover:bg-primary/10 transition-colors">
            <ChevronUp className="w-4 h-4 mx-auto" />
          </button>
          <button className="p-2 glass rounded-lg hover:bg-primary/10 transition-colors">
            <ChevronLeft className="w-4 h-4 mx-auto" />
          </button>
          <button className="p-2 glass rounded-lg bg-primary/20 font-medium text-sm">
            AWB
          </button>
          <button className="p-2 glass rounded-lg hover:bg-primary/10 transition-colors">
            <ChevronRight className="w-4 h-4 mx-auto" />
          </button>
          <button className="col-start-2 p-2 glass rounded-lg hover:bg-primary/10 transition-colors">
            <ChevronDown className="w-4 h-4 mx-auto" />
          </button>
          <button className="p-2 glass rounded-lg bg-accent/20 font-medium text-sm text-accent">
            DISP
          </button>
        </div>
      </div>
    </div>
  );
}