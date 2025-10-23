import { TelemetryData } from '@/hooks/useSerialConnection';
import { Gamepad2 } from 'lucide-react';

interface TelemetryDisplayProps {
  data: TelemetryData | null;
}

export function TelemetryDisplay({ data }: TelemetryDisplayProps) {
  const channels = data?.rcChannels || [1000, 1000, 1000, 1000];
  const channelNames = ['Throttle', 'Roll', 'Pitch', 'Yaw'];
  
  const normalizeValue = (value: number) => {
    return Math.max(0, Math.min(100, ((value - 1000) / 1000) * 100));
  };

  return (
    <div className="glass p-4 rounded-xl space-y-4">
      <div className="flex items-center gap-2">
        <Gamepad2 className="w-5 h-5 text-primary" />
        <span className="font-semibold">RC Inputs</span>
      </div>

      <div className="space-y-3">
        {channels.map((value, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-foreground/80">{channelNames[index]}</span>
              <span className="font-mono font-medium">{value}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-200"
                style={{ width: `${normalizeValue(value)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {data && (
        <div className="pt-3 border-t border-border/50">
          <div className="text-xs text-foreground/60 mb-2">IMU Data</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-secondary/50">
              <div className="text-xs text-foreground/60">Roll</div>
              <div className="font-mono font-bold text-status-armed">{data.roll.toFixed(1)}°</div>
            </div>
            <div className="p-2 rounded-lg bg-secondary/50">
              <div className="text-xs text-foreground/60">Pitch</div>
              <div className="font-mono font-bold text-primary">{data.pitch.toFixed(1)}°</div>
            </div>
            <div className="p-2 rounded-lg bg-secondary/50">
              <div className="text-xs text-foreground/60">Yaw</div>
              <div className="font-mono font-bold text-accent">{data.yaw.toFixed(1)}°</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}