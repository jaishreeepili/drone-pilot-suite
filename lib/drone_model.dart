import 'package:flutter/material.dart';
import 'dart:math';

class Drone3DView extends StatefulWidget {
  final double roll, pitch, yaw;

  const Drone3DView({
    super.key,
    required this.roll,
    required this.pitch,
    required this.yaw,
  });

  @override
  State<Drone3DView> createState() => _Drone3DViewState();
}

class _Drone3DViewState extends State<Drone3DView> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 400,
      height: 400,
      color: Colors.black,
      child: Center(
        child: AnimatedContainer(
          duration: Duration(milliseconds: 100),
          child: Transform(
            alignment: Alignment.center,
            transform: Matrix4.identity()
              ..rotateX(widget.pitch * pi / 180)
              ..rotateY(widget.roll * pi / 180)
              ..rotateZ(widget.yaw * pi / 180),
            child: Container(
              width: 300,
              height: 300,
              child: CustomPaint(
                painter: DronePainter(),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class DronePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    
    // Body gradient
    final bodyGradient = RadialGradient(
      colors: [Colors.blue.shade800, Colors.blue.shade300],
    );
    final bodyPaint = Paint()
      ..shader = bodyGradient.createShader(Rect.fromCircle(center: center, radius: 25))
      ..style = PaintingStyle.fill;

    // Arms with gradient
    final armPaint = Paint()
      ..color = Colors.red
      ..style = PaintingStyle.stroke
      ..strokeWidth = 6
      ..strokeCap = StrokeCap.round;

    // Propellers
    final propellerPaint = Paint()
      ..color = Colors.grey[800]!
      ..style = PaintingStyle.fill;

    // Draw drone body (circle instead of square)
    canvas.drawCircle(center, 25, bodyPaint);

    // Draw arms with rounded ends
    canvas.drawLine(center, Offset(center.dx - 100, center.dy), armPaint);
    canvas.drawLine(center, Offset(center.dx + 100, center.dy), armPaint);
    canvas.drawLine(center, Offset(center.dx, center.dy - 100), armPaint);
    canvas.drawLine(center, Offset(center.dx, center.dy + 100), armPaint);

    // Draw motors/propellers
    canvas.drawCircle(Offset(center.dx - 100, center.dy), 15, propellerPaint);
    canvas.drawCircle(Offset(center.dx + 100, center.dy), 15, propellerPaint);
    canvas.drawCircle(Offset(center.dx, center.dy - 100), 15, propellerPaint);
    canvas.drawCircle(Offset(center.dx, center.dy + 100), 15, propellerPaint);

    // Front indicator (green LED)
    final ledPaint = Paint()..color = Colors.green;
    canvas.drawCircle(Offset(center.dx, center.dy - 15), 8, ledPaint);

    // Status text
    final textStyle = TextStyle(color: Colors.white, fontSize: 12);
    final textSpan = TextSpan(text: 'DRONE', style: textStyle);
    final textPainter = TextPainter(
      text: textSpan,
      textAlign: TextAlign.center,
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(center.dx - 25, center.dy - 8));
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}