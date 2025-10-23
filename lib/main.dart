import 'package:flutter/material.dart';
import 'package:flutter_libserialport/flutter_libserialport.dart';

import 'imu_parser.dart';
import 'drone_model.dart';
import 'telemetry_data.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: TelemetryHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class TelemetryHomePage extends StatefulWidget {
  const TelemetryHomePage({super.key});
  @override
  State<TelemetryHomePage> createState() => _TelemetryHomePageState();
}

class _TelemetryHomePageState extends State<TelemetryHomePage> {
  List<String> availablePorts = [];
  String? selectedPort;
  SerialPort? port;
  SerialPortReader? reader;
  bool isConnected = false;

  String rawBuffer = '';
  TelemetryData currentData = TelemetryData(rcChannels: [0, 0, 0, 0], roll: 0, pitch: 0, yaw: 0);

  @override
  void initState() {
    super.initState();
    availablePorts = SerialPort.availablePorts;
    if (availablePorts.isNotEmpty) {
      selectedPort = availablePorts.first;
    }
  }

  void connectToPort() {
    if (selectedPort == null) return;

    port = SerialPort(selectedPort!);
    final config = SerialPortConfig()
      ..baudRate = 115200
      ..stopBits = 1
      ..bits = 8
      ..parity = SerialPortParity.none;

    if (!port!.openReadWrite()) {
      print("Failed to open port: $selectedPort");
      return;
    }

    reader = SerialPortReader(port!);
    reader!.stream.listen((data) {
      final chunk = String.fromCharCodes(data);
      rawBuffer += chunk;

      if (rawBuffer.contains("\n")) {
        final lines = rawBuffer.split("\n");
        for (var line in lines) {
          final parsed = parseTelemetry(line);
          if (parsed != null) {
            setState(() {
              currentData = parsed;
            });
          }
        }
        rawBuffer = '';
      }
    });

    setState(() {
      isConnected = true;
    });
  }

  void disconnectPort() {
    reader?.close();
    port?.close();
    port = null;
    reader = null;

    setState(() {
      isConnected = false;
      rawBuffer = '';
    });
  }

  @override
  void dispose() {
    disconnectPort();
    super.dispose();
  }

  // Helper method for RC channel bars - FIXED VERSION
  Widget _buildRCChannelBar(String label, int value, Color color) {
    // RC inputs typically range from 1000-2000 (PWM)
    double percentage = ((value - 1000) / 1000).clamp(0.0, 1.0);
    int percent = (percentage * 100).round();
    
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label, style: TextStyle(color: Colors.white70, fontSize: 12)),
              Text("$value", style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.bold)),
            ],
          ),
          SizedBox(height: 4),
          Container(
            height: 20,
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.grey[800],
              borderRadius: BorderRadius.circular(10),
            ),
            child: Stack(
              children: [
                // Background
                Container(
                  height: 20,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Colors.grey[800],
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                // Animated fill - FIXED: Use FractionallySizedBox
                FractionallySizedBox(
                  widthFactor: percentage,
                  child: Container(
                    height: 20,
                    decoration: BoxDecoration(
                      color: color,
                      borderRadius: BorderRadius.circular(10),
                      gradient: LinearGradient(
                        colors: [color, color.withOpacity(0.7)],
                        begin: Alignment.centerLeft,
                        end: Alignment.centerRight,
                      ),
                    ),
                  ),
                ),
                // Center percentage text
                Container(
                  height: 20,
                  width: double.infinity,
                  alignment: Alignment.center,
                  child: Text(
                    "$percent%",
                    style: TextStyle(
                      color: percentage > 0.5 ? Colors.white : Colors.black,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Drone Telemetry Viewer'),
        backgroundColor: Colors.grey[900],
      ),
      body: Row(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Logo and App Name
                  Container(
                    padding: EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.grey[900],
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        // Logo from assets
                        Container(
                          width: 50,
                          height: 50,
                          child: Image.asset(
                            'assets/logo.jpg',
                            fit: BoxFit.contain,
                          ),
                        ),
                        SizedBox(width: 12),
                        // App Name and Description
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Drone Telemetry Viewer',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                              Text(
                                'Real-time Flight Data Monitoring',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.white70,
                                ),
                              ),
                              Text(
                                'By ChipUAV Systems',  // Replace with your text
                                style: TextStyle(
                                  fontSize: 10,
                                  color: Colors.white60,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 20),

                  const Text("Select Serial Port:", style: TextStyle(fontWeight: FontWeight.bold)),
                  DropdownButton<String>(
                    value: selectedPort,
                    hint: const Text("No port"),
                    items: availablePorts.map((portName) {
                      return DropdownMenuItem<String>(
                        value: portName,
                        child: Text(portName),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setState(() {
                        selectedPort = value;
                      });
                    },
                  ),
                  ElevatedButton(
                    onPressed: isConnected ? disconnectPort : connectToPort,
                    child: Text(isConnected ? 'Disconnect' : 'Connect'),
                  ),
                  const SizedBox(height: 20),
                  
                  // RC Inputs with animated bars
                  Container(
                    padding: EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.grey[900],
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("RC INPUTS", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                        SizedBox(height: 10),
                        _buildRCChannelBar("Throttle", currentData.rcChannels[0], Colors.red),
                        _buildRCChannelBar("Roll", currentData.rcChannels[1], Colors.green),
                        _buildRCChannelBar("Pitch", currentData.rcChannels[2], Colors.blue),
                        _buildRCChannelBar("Yaw", currentData.rcChannels[3], Colors.orange),
                      ],
                    ),
                  ),
                  
                  const SizedBox(height: 20),
                  
                  // IMU Data - ENHANCED VERSION
                  Container(
                    padding: EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.grey[900],
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("IMU DATA", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                        SizedBox(height: 10),
                        _buildDataRow("Roll", "${currentData.roll.toStringAsFixed(1)}°", Colors.orange),
                        _buildDataRow("Pitch", "${currentData.pitch.toStringAsFixed(1)}°", Colors.orange),
                        _buildDataRow("Yaw", "${currentData.yaw.toStringAsFixed(1)}°", Colors.orange),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(width: 20),
          SizedBox(
            width: 400,
            height: 400,
            child: Drone3DView(
              roll: currentData.roll,
              pitch: currentData.pitch,
              yaw: currentData.yaw,
            ),
          ),
        ],
      ),
    );
  }

  // Helper method for data rows
  Widget _buildDataRow(String label, String value, Color color) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(color: Colors.white70)),
          Text(value, style: TextStyle(color: color, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}