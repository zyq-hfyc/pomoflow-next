# B-Phase-3 安卓真机验证 runbook

> **目的**:把 mobile 端(P3c UI + P3d 账号 + P1 多实体同步)装进真机,
> 端到端验证「登录 → 任务同步 → 专注落 session」全链路。
> 此前所有 mobile 同步代码只在单测层验证过(web 是 demo 内存兜底)。

## 0. 本机环境(2026-08-25 已装好,位置备查)

| 组件 | 位置 / 版本 | 说明 |
|------|------------|------|
| JDK 17 | `D:\SoftWareInstall\jdk-17.0.20+8` | 便携版,未改系统 PATH |
| Android SDK | `D:\SoftWareInstall\AndroidSdk` | cmdline-tools + platform-tools + android-36 + build-tools 36.0.0 |
| Gradle JDK 指向 | `~/.gradle/gradle.properties` → `org.gradle.java.home=D:\SoftWareInstall\jdk-17.0.20+8` | 用户级,不入仓 |
| Flutter SDK 配置 | `flutter config --android-sdk` 已指向上面 SDK | |
| Gradle 发行版 | 腾讯镜像(`gradle-wrapper.properties`) | services.gradle.org 在本网络有 TLS 拦截 |

**每次开新终端构建前**要先设两个环境变量(bash):

```bash
export PATH="/d/SoftWareInstall/flutter_3.47.1/bin:/d/SoftWareInstall/AndroidSdk/platform-tools:$PATH"
export JAVA_HOME="D:\\SoftWareInstall\\jdk-17.0.20+8"
```

## 1. 构建 debug APK

```bash
cd apps/mobile
flutter build apk --debug
```

- 首次构建 10-20 分钟(下载 Gradle 9.3.1 + AGP 9.1 + 全部 maven 依赖);
  之后增量构建 1-2 分钟。
- 产物:`apps/mobile/build/app/outputs/flutter-apk/app-debug.apk`(约 100M+,
  debug 含符号;release 才做瘦身与签名)。
- 预期输出末尾:`✓ Built build\app\outputs\flutter-apk\app-debug.apk`。

## 2. 手机准备(一次性)

1. 设置 → 关于手机 → 连点「版本号」7 次 → 开发者模式打开。
2. 设置 → 开发者选项 → 打开 **USB 调试**。
3. USB 线连电脑(传文件模式),手机弹「允许 USB 调试吗?」→ 允许。

## 3. 安装

```bash
adb devices
# 预期:列出设备且状态为 device(不是 unauthorized)

adb install -r apps/mobile/build/app/outputs/flutter-apk/app-debug.apk
# 预期:Success
# -r = 允许覆盖安装(保留数据:登录态、本地任务库)
```

或直接 `flutter install`(效果同上,要求 flutter 能识别到设备)。

## 4. 端到端验证清单

前置:VM 上 sync-server 已跑起来(`curl http://<vm-ip>:8080/healthz` 通)。
手机与电脑/VM 同一局域网(或手机连 VM 同网段 Wi-Fi)。

### 4.1 登录连通(2 分钟)

1. App 启动 → 登录页 → 服务器地址填 `http://<vm-ip>:8080`
2. 用桌面端同一账号登录 → 进入「专注」首页,底部 Dock 四屏正常
3. 「我的」页显示用户名/邮箱(头像字母占位)

> cleartext 已在 main manifest 放行(`usesCleartextTraffic="true"`),
> 否则 Android 9+ 默认拒绝明文 http。

### 4.2 任务同步 round-trip(5 分钟,验证 P1 主链路)

1. **桌面端**建一个任务(标题带 `from-desktop`)
2. 手机「我的」→ 数据同步 → **立即同步**
   - 预期:状态行显示「已同步 · hh:mm · 推送 0接受 · 拉取 1应用」
   - 手机「任务」页出现该任务
3. **手机**上把该任务勾选完成
4. 桌面端「立即同步」(或等自动同步 ≤1 分钟)
   - 预期:桌面任务列表该任务变已完成 —— **双向闭环成立**

### 4.3 服务端侧核对(可选,VM 上)

```bash
docker exec -it <pg-container> psql -U pomoflow -d pomoflow \
  -c "SELECT entity, entity_id, revision, device_id FROM snapshots ORDER BY updated_ms DESC LIMIT 5;"
# 预期:能看到 entity='task' 且 device_id 为手机设备名的行
```

### 4.4 专注落 session(25 分钟,可留给日常使用)

1. 手机专注屏选任务 → 开始 → 等自然走完(25 分钟;短/长休息**不**计数)
2. 顶部「今日番茄」+1
3. 「我的」→ 立即同步 → 推送 1 接受(session 行)
4. 服务端核对:entity='pomodoro_session' 行出现

### 4.5 账号五件套冒烟(可选)

头像上传(相册)/ 数据导出(分享 JSON)/ 登录设备列表(应出现手机设备名)。

## 5. 故障排查

| 现象 | 排查 |
|------|------|
| adb 找不到设备 | 换线/换口;`adb kill-server && adb start-server`;手机上重新授权 |
| 登录报「无法连接服务器」 | 手机浏览器开 `http://<vm-ip>:8080/healthz` 自测;不通查同一局域网 / VM 桥接 |
| 登录 401 | JWT 过期或密码错;桌面端先登录同一账号确认凭据 |
| 同步「推送 0 拉取 0」 | 手机未登录(userId 空 → SyncClient 跳过);退出重登 |
| 同步报错含 `certificate`/`Cleartext` | 确认装的是本批之后的 APK(manifest 已放行明文) |
| `flutter build` 卡在下载 gradle | 确认 `gradle-wrapper.properties` 是腾讯镜像;删 `~/.gradle/wrapper/dists` 重下 |
| `flutter build` 报 JDK 版本 | 确认 `~/.gradle/gradle.properties` 的 org.gradle.java.home 在;JAVA_HOME 指向 JDK17 |

## 6. 验证完成后

勾掉 `docs/协作任务清单.md` 的「× 真机/桌面 E2E」项。
下一批候选:P2 同步健壮性(软删除 + 后台自动同步)/ 腾讯云部署物料。
