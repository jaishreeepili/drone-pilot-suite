import { Circle, Video, Compass } from 'lucide-react';
import { useState } from 'react';

export function VideoFeed() {
  const [isRecording, setIsRecording] = useState(false);
  const [hdrEnabled, setHdrEnabled] = useState(false);

  return (
    <div className="relative aspect-video glass overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-background/40 flex items-center justify-center">
        <div className="text-center">
          <Video className="w-16 h-16 text-foreground/20 mx-auto mb-2" />
          <p className="text-sm text-foreground/40">Live Feed</p>
          <p className="text-xs text-foreground/30">Connect camera to view</p>
        </div>
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        <button 
          onClick={() => setHdrEnabled(!hdrEnabled)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            hdrEnabled 
              ? 'bg-primary text-white' 
              : 'glass text-foreground/60 hover:text-foreground'
          }`}
        >
          HDR
        </button>
        <div className="glass px-3 py-1.5 rounded-lg text-xs font-medium">
          60 FPS
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <button className="glass px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20 hover:text-red-400 transition-colors">
          IR
        </button>
        <button className="glass px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-500/20 hover:text-green-400 transition-colors">
          G
        </button>
        <button className="glass px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 transition-colors">
          B
        </button>
        <button className="glass px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-yellow-500/20 hover:text-yellow-400 transition-colors">
          Y
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button 
          onClick={() => setIsRecording(!isRecording)}
          className={`p-3 rounded-full transition-all ${
            isRecording 
              ? 'bg-status-armed shadow-lg shadow-status-armed/50 animate-pulse-slow' 
              : 'glass hover:bg-secondary/70'
          }`}
        >
          <Circle className={`w-5 h-5 ${isRecording ? 'fill-white text-white' : ''}`} />
        </button>
      </div>

      <div className="absolute bottom-4 right-4">
        <div className="glass p-3 rounded-full">
          <Compass className="w-5 h-5 text-primary" style={{ transform: 'rotate(45deg)' }} />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-8 h-0.5 bg-primary"></div>
        <div className="w-0.5 h-8 bg-primary absolute"></div>
        <div className="w-24 h-24 border-2 border-primary/30 rounded-full"></div>
      </div>

      <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-accent rounded-full" 
              style={{ height: `${Math.random() * 20 + 4}px` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass px-4 py-2 rounded-lg text-xs font-medium opacity-80">
        <span className="text-accent">◆</span> LEVEL
      </div>
    </div>
  );
}