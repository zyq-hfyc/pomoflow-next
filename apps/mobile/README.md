# PomoFlow 移动端(Flutter)

> 移动端 = 桌面端的功能子集 + 移动交互形态(悬浮胶囊 Dock / 底部抽屉 / 快速新建)。
> 与桌面端共用 `services/sync-server`(JWT + Push/Pull + LWW)。
> UI 基准:《PomoFlow移动端UI设计规则与约束.md》+ 高保真原型 HTML(yuanxing 目录)。

## 当前进度

P3 全线完成:本地 SQLite(sqflite)+ LWW 同步引擎 + 全实体跨端同步
(任务/子任务/项目 3 级/标签/番茄会话/手账/四粒度复盘/座右铭/通知模板)、
统计 CSV 导出、本地通知提醒、垃圾箱、后台自动同步、release 签名包。
批次明细以根目录 `docs/协作任务清单.md` 为准,本段只保现状一句话。

## 运行

```bash
# 环境:Flutter 3.47+(D:\SoftWareInstall\flutter_3.47.1,国内镜像已配)
cd apps/mobile
flutter pub get
flutter run -d chrome          # Web 预览(推荐,无需 Android SDK)
# flutter run -d <device-id>   # Android 需装对应 SDK
```

首次使用:登录页顶部填服务器地址(如 `http://192.168.75.128:8080`)→ 保存 → 登录/注册。

## 验证

```bash
flutter analyze        # 0 问题
flutter test           # 全量单元/组件测试
flutter build web --release
```

## 打 release 包

```bash
# 环境(Flutter / SDK / JDK17,JAVA_HOME 必须是 17,gradle 定死 JVM_17):
export PATH="/d/SoftWareInstall/flutter_3.47.1/bin:/d/SoftWareInstall/AndroidSdk/platform-tools:$PATH"
export JAVA_HOME="D:\\SoftWareInstall\\jdk-17.0.20+8"
cd apps/mobile
flutter build apk --release --split-per-abi
# 产物:build/app/outputs/flutter-apk/app-{arm64-v8a,v7a,x86_64}-release.apk
# 真机装机用 arm64-v8a 包(装错 ABI 报 INSTALL_FAILED_NO_MATCHING_ABIS)
```

签名验证(release 必须是自签名证书,见 `CN=Android Debug` 即签名未生效,禁装机):

```bash
BT=$(ls -d /d/SoftWareInstall/AndroidSdk/build-tools/* | sort -V | tail -1)
"$BT/apksigner" verify --print-certs \
  build/app/outputs/flutter-apk/app-arm64-v8a-release.apk | head -5
```

> ⚠️ 签名来自 `android/key.properties` + `pomoflow-release.keystore`(均已 gitignore,
> 密码自保管)。**key.properties 缺失时构建不报错、静默回落 debug 签名** —— 出包后
> 务必 apksigner 验一眼。keystore 丢失 = 永远无法发同签名升级版。

## 目录地图

```text
lib/
├── main.dart            入口(MultiProvider:Auth/Theme/Nav/Task)
├── theme/               tokens.dart(设计令牌)+ app_theme.dart(双主题)
├── models/task.dart     PfTask / PfJournal(手账)+ 优先级
├── providers/           auth / theme / nav / task(内存数据)
├── services/api_client.dart  JWT + 401→refresh→重试
├── widgets/             FloatingDock / PfSliverAppBar / pfSheet / 分段控件…
├── sheets/              快速新建 / 任务表单 / 通用表单 / 小记
└── pages/               login / forgot_password / home(四屏)/ account
```
