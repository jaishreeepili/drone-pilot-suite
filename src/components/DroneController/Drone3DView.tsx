import { useEffect, useRef } from 'react';

interface Drone3DViewProps {
  roll: number;
  pitch: number;
  yaw: number;
}

export function Drone3DView({ roll, pitch, yaw }: Drone3DViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((yaw * Math.PI) / 180);

    const droneSize = 60;
    const armLength = 40;

    ctx.shadowBlur = 20;
    ctx.shadowColor = 'hsl(210, 100%, 50%)';
    
    ctx.fillStyle = 'hsl(220, 15%, 25%)';
    ctx.beginPath();
    ctx.arc(0, 0, droneSize / 2, 0, Math.PI * 2);
    ctx.fill();

    const armAngle = Math.PI / 4;
    const arms = [
      { angle: armAngle, color: 'hsl(0, 85%, 60%)' },
      { angle: Math.PI - armAngle, color: 'hsl(142, 71%, 45%)' },
      { angle: Math.PI + armAngle, color: 'hsl(142, 71%, 45%)' },
      { angle: -armAngle, color: 'hsl(0, 85%, 60%)' }
    ];

    arms.forEach(arm => {
      const x = Math.cos(arm.angle) * armLength;
      const y = Math.sin(arm.angle) * armLength;

      ctx.strokeStyle = 'hsl(220, 15%, 20%)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.fillStyle = arm.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = arm.color;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'hsl(210, 100%, 50%)';
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(-6, -5);
    ctx.lineTo(6, -5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = 'hsl(210, 20%, 98%)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Yaw', centerX, height - 40);
    ctx.fillText(`${yaw.toFixed(1)}°`, centerX, height - 25);

  }, [roll, pitch, yaw]);

  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="font-semibold mb-4 text-center">3D Orientation</h3>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={300}
        className="w-full"
      />
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <div className="text-xs text-foreground/60 mb-1">Roll</div>
          <div className="text-lg font-bold text-status-armed">{roll.toFixed(1)}°</div>
        </div>
        <div>
          <div className="text-xs text-foreground/60 mb-1">Pitch</div>
          <div className="text-lg font-bold text-primary">{pitch.toFixed(1)}°</div>
        </div>
        <div>
          <div className="text-xs text-foreground/60 mb-1">Yaw</div>
          <div className="text-lg font-bold text-accent">{yaw.toFixed(1)}°</div>
        </div>
      </div>
    </div>
  );
}