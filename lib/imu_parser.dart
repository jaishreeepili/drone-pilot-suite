import 'telemetry_data.dart'; // Make sure this defines the TelemetryData class

TelemetryData? parseTelemetry(String line) {
  try {
    line = line.trim();

    if (!line.contains("CH:") || !line.contains("RPY:")) return null;

    final parts = line.split(';');
    if (parts.length != 2) return null;

    // Extract RC channel values
    final chPart = parts[0].split(':')[1]; // e.g., "1030,1020,1015,1012"
    final rc = chPart.split(',').map((e) => int.tryParse(e.trim()) ?? 0).toList();

    // Extract RPY values
    final rpyPart = parts[1].split(':')[1]; // e.g., "-119.00,-129.00,44.00"
    final angles = rpyPart.split(',').map((e) => double.tryParse(e.trim()) ?? 0).toList();

    if (rc.length < 4 || angles.length < 3) return null;

    return TelemetryData(
      rcChannels: rc.sublist(0, 4),
      roll: angles[0],
      pitch: angles[1],
      yaw: angles[2],
    );
  } catch (e) {
    print('Parse error: $e');
    return null;
  }
}
