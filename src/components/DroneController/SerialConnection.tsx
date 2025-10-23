import { Cable, Usb } from 'lucide-react';

interface SerialConnectionProps {
  isConnected: boolean;
  error: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function SerialConnection({ isConnected, error, onConnect, onDisconnect }: SerialConnectionProps) {
  return (
    <div className="glass p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Usb className="w-5 h-5 text-primary" />
          <span className="font-semibold">Serial Connection</span>
        </div>
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-accent animate-pulse-slow' : 'bg-foreground/20'}`}></div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-status-armed/10 border border-status-armed/20 text-status-armed text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex gap-2">
          {!isConnected ? (
            <button 
              onClick={onConnect}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-primary text-white font-medium hover:shadow-glow transition-all"
            >
              <Cable className="w-4 h-4 inline-block mr-2" />
              Connect USB
            </button>
          ) : (
            <button 
              onClick={onDisconnect}
              className="flex-1 px-4 py-2 rounded-lg bg-status-armed/20 text-status-armed font-medium hover:bg-status-armed/30 transition-colors"
            >
              Disconnect
            </button>
          )}
        </div>

        <div className="text-xs text-foreground/60 space-y-1">
          <p>• ARTX-7 FPGA Board</p>
          <p>• Baud Rate: 115200</p>
          <p>• Format: CH:####,####,####,####;RPY:##.##,##.##,##.##</p>
        </div>
      </div>
    </div>
  );
}