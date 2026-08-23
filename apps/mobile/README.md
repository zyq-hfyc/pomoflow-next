# PomoFlow 移动端(Flutter)

> 移动端 = 桌面端的功能子集 + 移动交互形态(悬浮胶囊 Dock / 底部抽屉 / 快速新建)。
> 与桌面端共用 `services/sync-server`(JWT + Push/Pull + LWW)。
> UI 基准:《PomoFlow移动端UI设计规则与约束.md》+ 高保真原型 HTML(yuanxing 目录)。

## 当前进度

- **P3a**(✔):Flutter 骨架 + 登录/注册 + JWT 双 token(401 自动刷新)+ 四 Tab 导航
- **P3b**(✔):忘记密码三步流 + 账号管理(资料/改密/登录设备)+ 服务端 CORS
- **P3c-UI**(✔ 本批):按高保真原型重构全部界面
  - 设计令牌 `lib/theme/`(浅/深双套,组件零硬编码色值)
  - 悬浮胶囊 Dock(4 Tab + 中间凸起「新建」)+ IndexedStack 保状态
  - 专注屏(圆环计时 CustomPaint)/ 任务屏(6 视图 + 手账)/ 统计屏(柱状+环形图)
    / 我的屏(渐变资料头 + 账号管理五模块)
  - 快速新建体系(任务/待办/愿望/年度规划/小记,底部 Sheet)
  - 数据层为**内存示例**(演示数据),P3c 换 SQLite + LWW 同步
- **P3c**(× 下一批):本地 SQLite(Drift)+ 任务 CRUD 持久化 + Push/Pull 同步引擎 +
  计时数据落库 + 头像上传/数据导出/账号注销接真

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
flutter test           # 令牌双主题断言 + 分段控件交互
flutter build web --release
```

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
