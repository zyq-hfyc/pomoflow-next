// 提示铃音生成器(一次性工具,重跑覆盖):
//   dart run tool/gen_sounds.dart
// 产出 android/app/src/main/res/raw/{ding_clear,ding_soft}.wav —— 通知
// channel 铃音资源(RawResourceAndroidNotificationSound)。16bit PCM 单声道。
import 'dart:io';
import 'dart:math' as math;
import 'dart:typed_data';

const rate = 44100;

/// 每段一个基频;段间无缝衔接,指数衰减 + 起音斜坡,尾部静音防截断爆音。
List<int> _render(List<double> freqs) {
  final segLen = (0.45 * rate).floor();
  final samples = <int>[];
  for (final f in freqs) {
    for (var i = 0; i < segLen; i++) {
      final t = i / rate;
      final decay = math.exp(-4.5 * (i / segLen));
      final attack = math.min(1.0, i / 300.0);
      final v =
          math.sin(2 * math.pi * f * t) +
          0.35 * math.sin(2 * math.pi * 2 * f * t) +
          0.12 * math.sin(2 * math.pi * 3 * f * t);
      samples.add((0.32 * v * decay * attack * 32767).round().clamp(-32767, 32767));
    }
  }
  samples.addAll(List.filled(2205, 0));
  return samples;
}

void _writeWav(String path, List<int> samples) {
  final dataLen = samples.length * 2;
  final b = BytesBuilder();
  void ascii(String s) => b.add(s.codeUnits);
  void u16(int v) {
    b.addByte(v & 0xff);
    b.addByte((v >> 8) & 0xff);
  }

  void u32(int v) {
    b.addByte(v & 0xff);
    b.addByte((v >> 8) & 0xff);
    b.addByte((v >> 16) & 0xff);
    b.addByte((v >> 24) & 0xff);
  }

  ascii('RIFF');
  u32(36 + dataLen);
  ascii('WAVE');
  ascii('fmt ');
  u32(16);
  u16(1); // PCM
  u16(1); // mono
  u32(rate);
  u32(rate * 2);
  u16(2);
  u16(16);
  ascii('data');
  u32(dataLen);
  for (final v in samples) {
    b.addByte(v & 0xff);
    b.addByte((v >> 8) & 0xff);
  }
  File(path).writeAsBytesSync(b.toBytes());
}

void main() {
  final out = 'android/app/src/main/res/raw';
  Directory(out).createSync(recursive: true);
  _writeWav('$out/ding_clear.wav', _render([1318.51, 1760.00])); // 清脆:E6→A6
  _writeWav('$out/ding_soft.wav', _render([1046.50])); // 温和:C6
  stdout.writeln('written: $out/{ding_clear,ding_soft}.wav');
}
