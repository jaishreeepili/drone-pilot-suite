import { Header } from '@/components/DroneController/Header';
import { VideoFeed } from '@/components/DroneController/VideoFeed';
import { DroneInfo } from '@/components/DroneController/DroneInfo';
import { ControlPanel } from '@/components/DroneController/ControlPanel';
import { Drone3DView } from '@/components/DroneController/Drone3DView';
import { SerialConnection } from '@/components/DroneController/SerialConnection';
import { TelemetryDisplay } from '@/components/DroneController/TelemetryDisplay';
import { useSerialConnection } from '@/hooks/useSerialConnection';

export default function Index() {
  const { isConnected, error, telemetryData, connect, disconnect } = useSerialConnection();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <VideoFeed />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SerialConnection 
                isConnected={isConnected}
                error={error}
                onConnect={connect}
                onDisconnect={disconnect}
              />
              <TelemetryDisplay data={telemetryData} />
            </div>

            <Drone3DView 
              roll={telemetryData?.roll || 0}
              pitch={telemetryData?.pitch || 0}
              yaw={telemetryData?.yaw || 0}
            />
          </div>

          <div className="space-y-6">
            <DroneInfo />
            <ControlPanel />
          </div>
        </div>
      </main>
    </div>
  );
}