import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../theme/tokens.dart';

/// 「我的二维码」占位页(2026-09-06 反馈):类似微信「我的二维码」,
/// 他人扫码加好友。**当前为占位** —— 真实二维码生成待接入 qr_flutter;
/// 用户标识 payload 待定(user_id? phone?)。
///
/// 入口:「我的」页账户大卡内嵌 QR 圆钮(单跳直达,无需进 AccountPage)。
/// 占位视觉:brand 主色四角定位方块 + 中央 6×10 点阵 + 用户昵称/邮箱。
class AccountQrPage extends StatelessWidget {
  const AccountQrPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final auth = context.watch<AuthProvider>();
    final name = auth.shownName.isNotEmpty ? auth.shownName : 'PomoFlow 用户';
    final email = auth.email ?? '';
    return Scaffold(
      backgroundColor: theme.pfBg,
      appBar: AppBar(
        backgroundColor: theme.pfBg,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: true,
        title: const Text(
          '我的二维码',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
        ),
        leading: Padding(
          padding: const EdgeInsets.only(left: 14),
          child: GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: theme.pfSurface,
                shape: BoxShape.circle,
                border: Border.all(color: theme.pfLine),
              ),
              alignment: Alignment.center,
              child: Icon(
                Icons.arrow_back_ios_new,
                size: 16,
                color: theme.pfMuted,
              ),
            ),
          ),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 24, 16, 24),
        children: [
          Center(
            child: Container(
              width: 240,
              height: 240,
              decoration: BoxDecoration(
                color: theme.pfSurface,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: theme.pfLine),
                boxShadow: theme.pfShadowSm,
              ),
              padding: const EdgeInsets.all(20),
              child: Stack(
                children: [
                  // 四角定位方块(QR 标准定位点)
                  for (final pos in const [
                    Alignment.topLeft,
                    Alignment.topRight,
                    Alignment.bottomLeft,
                  ])
                    Align(
                      alignment: pos,
                      child: Container(
                        width: 36,
                        height: 36,
                        decoration: BoxDecoration(
                          border: Border.all(color: theme.pfBrand, width: 4),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        padding: const EdgeInsets.all(6),
                        child: Container(
                          decoration: BoxDecoration(
                            color: theme.pfBrand,
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                      ),
                    ),
                  // 中央模拟数据点阵(8x10 棋盘格暗示)
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        for (var r = 0; r < 6; r++)
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 2),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                for (var c = 0; c < 10; c++)
                                  Container(
                                    width: 6,
                                    height: 6,
                                    margin: const EdgeInsets.symmetric(
                                      horizontal: 2,
                                    ),
                                    decoration: BoxDecoration(
                                      color: (r + c).isEven
                                          ? theme.pfBrand
                                          : Colors.transparent,
                                      borderRadius: BorderRadius.circular(1),
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        const SizedBox(height: 6),
                        Text(
                          '用户标识 · 占位',
                          style: TextStyle(fontSize: 10, color: theme.pfMuted),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),
          Text(
            name,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800),
          ),
          if (email.isNotEmpty) ...[
            const SizedBox(height: 4),
            Text(
              email,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, color: theme.pfMuted),
            ),
          ],
          const SizedBox(height: 14),
          Text(
            '扫码添加 PomoFlow 好友',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12.5, color: theme.pfMuted),
          ),
        ],
      ),
    );
  }
}
