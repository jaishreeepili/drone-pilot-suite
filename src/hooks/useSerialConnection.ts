import { useState, useCallback, useRef } from 'react';

export interface TelemetryData {
  rcChannels: number[];
  roll: number;
  pitch: number;
  yaw: number;
}

export function useSerialConnection() {
  const [port, setPort] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>('');
  const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);
  const keepReadingRef = useRef(false);

  const parseTelemetry = (line: string): TelemetryData | null => {
    try {
      line = line.trim();
      if (!line.includes('CH:') || !line.includes('RPY:')) return null;

      const parts = line.split(';');
      if (parts.length !== 2) return null;

      const chPart = parts[0].split(':')[1];
      const rc = chPart.split(',').map(e => parseInt(e.trim()) || 0);

      const rpyPart = parts[1].split(':')[1];
      const angles = rpyPart.split(',').map(e => parseFloat(e.trim()) || 0);

      if (rc.length < 4 || angles.length < 3) return null;

      return {
        rcChannels: rc.slice(0, 4),
        roll: angles[0],
        pitch: angles[1],
        yaw: angles[2],
      };
    } catch (e) {
      console.error('Parse error:', e);
      return null;
    }
  };

  const connect = useCallback(async () => {
    try {
      if (!('serial' in navigator)) {
        setError('Web Serial API not supported in this browser');
        return;
      }

      const selectedPort = await (navigator as any).serial.requestPort();
      await selectedPort.open({ baudRate: 115200 });
      
      setPort(selectedPort);
      setIsConnected(true);
      setError('');
      keepReadingRef.current = true;

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = selectedPort.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;

      let buffer = '';
      
      while (keepReadingRef.current) {
        try {
          const { value, done } = await reader.read();
          if (done) break;
          
          buffer += value;
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            const data = parseTelemetry(line);
            if (data) {
              setTelemetryData(data);
            }
          }
        } catch (err) {
          console.error('Read error:', err);
          break;
        }
      }

      reader.releaseLock();
    } catch (err: any) {
      setError(err.message || 'Failed to connect to serial port');
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    keepReadingRef.current = false;
    
    if (readerRef.current) {
      try {
        await readerRef.current.cancel();
      } catch (e) {
        console.error('Error canceling reader:', e);
      }
      readerRef.current = null;
    }

    if (port) {
      try {
        await port.close();
      } catch (e) {
        console.error('Error closing port:', e);
      }
    }

    setPort(null);
    setIsConnected(false);
    setTelemetryData(null);
  }, [port]);

  return {
    isConnected,
    error,
    telemetryData,
    connect,
    disconnect,
  };
}