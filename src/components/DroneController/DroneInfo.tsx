import { Battery, Plane } from 'lucide-react';

interface DroneInfoProps {
  batteryLevel?: number;
}

export function DroneInfo({ batteryLevel = 85 }: DroneInfoProps) {
  return (
    <div className="glass p-4 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-primary" />
          <span className="font-semibold">AG Drone X7</span>
        </div>
        <div className="flex items-center gap-2">
          <Battery className={`w-5 h-5 ${batteryLevel > 50 ? 'text-accent' : 'text-status-warning'}`} />
          <span className="text-sm font-medium">{batteryLevel}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-foreground/60">Altitude Limit</span>
            <span className="font-medium">120m</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="500" 
            defaultValue="120"
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-foreground/60">Resolution</span>
            <span className="font-medium">4K</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="3" 
            defaultValue="2"
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 rounded-lg glass hover:bg-primary/10 hover:text-primary text-sm font-medium transition-colors">
          ISO
        </button>
        <button className="flex-1 px-3 py-2 rounded-lg glass hover:bg-primary/10 hover:text-primary text-sm font-medium transition-colors">
          HDR
        </button>
        <button className="flex-1 px-3 py-2 rounded-lg glass hover:bg-primary/10 hover:text-primary text-sm font-medium transition-colors">
          DVR
        </button>
      </div>
    </div>
  );
}