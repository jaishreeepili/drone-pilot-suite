class TelemetryData {
  final List<int> rcChannels;
  final double roll;
  final double pitch;
  final double yaw;

  TelemetryData({
    required this.rcChannels,
    required this.roll,
    required this.pitch,
    required this.yaw,
  });
}
