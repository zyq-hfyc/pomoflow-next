# 移动端发布手册(RELEASE)

> 维护者视角的 Android 构建与发布流程。版本号在 `pubspec.yaml` 的 `version` 字段
> (`x.y.z+构建号`),当前 `0.2.0+2012`;发布前手动 bump,与
> [RELEASE_NOTES.md](../../../docs/RELEASE_NOTES.md) 的版本条目对齐。

## 构建:`--dart-define` 决定版本形态

同一份代码构建两种形态,**构建期区分**(2026-11-20 腾讯云生产部署批):

| 形态 | dart-define | 行为 |
|------|-------------|------|
| 开发/测试版 | 不设(默认) | 登录页显示服务器输入框,VM 地址自填;`SharedPreferences` 的 `server_url` 为准 |
| 生产受管版(managed) | 见下 | 地址编译期烘焙且**总是赢**;登录页服务器输入框不渲染(只读展示);未登录由同步报错引导登录 |

managed 两个变量(与桌面端 `POMOFLOW_MANAGED_BUILD` / `POMOFLOW_DEFAULT_SERVER_URL` 同语义):

```sh
--dart-define=POMOFLOW_MANAGED_BUILD=true
--dart-define=POMOFLOW_DEFAULT_SERVER_URL=http://<生产服务器IP>
```

- `MANAGED_BUILD=true` 而 URL 为空 → `ApiClient.initialize()` 直接抛错拒绝启动
  (fail-fast,防流水线漏配产出「空 managed」包)
- 烘焙值同时写回 `server_url` 键,供换服亲和检测辨识「服务器变了」
- dart-define 值不属机密,只烘地址,**任何密钥都不进客户端**

## 命令

```sh
cd apps/mobile

# 测试版 APK(VM 自部署,开发/真机联调用)
flutter build apk --release

# 生产受管版 APK(腾讯云,内测分发)
flutter build apk --release \
  --dart-define=POMOFLOW_MANAGED_BUILD=true \
  --dart-define=POMOFLOW_DEFAULT_SERVER_URL=http://<生产服务器IP>

# 产物:build/app/outputs/flutter-apk/app-arm64-v8a-release.apk(真机必须 arm64 包)
```

CI 的 mobile 门禁(`flutter analyze` + `flutter test`)与 dart-define 无关,
两条命令产出的代码都过同一套检查。

## 换服亲和(升级自动迁移的关键)

老设备(数据同步自 VM)安装生产 managed 包升级后,**首次同步时**触发复位:
pull 游标归零 + 全部实体行重标 pending(全量重推)+ 清登录态(重登即可)。
数据迁移 = 客户端 LWW 全量重推/重拉,无需任何服务端数据搬运;
见 [sync_client.dart](../lib/services/sync_client.dart) 的 `_ensureServerAffinity`
与桌面端同机制。行为锁在
[test/services/server_switch_reset_test.dart](../test/services/server_switch_reset_test.dart)。

## 发布步骤(内测分发,无应用商店期)

1. `pubspec.yaml` bump 版本 → 更新根 [RELEASE_NOTES.md](../../../docs/RELEASE_NOTES.md)
2. 按上面命令构建生产 managed APK
3. 真机冒烟:登录页无服务器输入框(只读行显示生产地址)→ 注册/登录 → 手动同步
4. APK 交发布分发通道(admin 上传或直发内测用户)
