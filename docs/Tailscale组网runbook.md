# Tailscale 组网 runbook(出门在外也能同步)

> **目标**:手机离开家庭 Wi-Fi(流量 / 公司网 / 异地)也能连上 VM 里的
> sync-server,同步不断线。
>
> **现状**:手机只有一条路 —— 家庭 Wi-Fi → 宿主机端口转发
> `192.168.3.29:8080`(见 [App重装后配置指南](./App重装后配置指南.md))。
> 一出门这条路就断。
>
> **方案**:用 Tailscale(免费)把 VM 和手机组成一个虚拟局域网(tailnet),
> 手机直连 VM 的 `100.x.y.z` 地址。免公网 IP、免云服务器、免端口转发,
> 全程 WireGuard 加密。**App 零改动** —— 服务器地址栏本来就接受
> `http://100.x.y.z:8080` 这种格式。

---

## 环境要求(2026-09-04 实测依据)

### 节点(本方案需要 2 台,第 3 台可选)

| 节点 | 系统 | 角色 | 说明 |
| ---- | ---- | ---- | ---- |
| VM(Ubuntu) | Ubuntu(VMware NAT,`192.168.75.128`) | **必装** | sync-server 所在;装 Tailscale 后获得固定 `100.x` 地址 |
| 手机 | Android(MIUI) | **必装** | 装 Tailscale App + 开 VPN |
| Windows 宿主机 | Win11 | 可选 | 装了更好(见步骤 5),不装不影响手机方案 |

### 资源开销

- VM:Tailscale 常驻内存约 20-30 MB,磁盘约 40 MB —— 对 60G 盘的 VM
  可忽略;`tailscaled` 是全出站连接,**不需要**在 VMware / 路由器上开任何端口。
- 手机:VPN 常驻,耗电增量很小(仅 tailnet 内流量走隧道,普通上网不受影响)。

### 国内可达性实测(2026-09-04,宿主机 curl)

| 目标 | 结果 | 耗时 |
| ---- | ---- | ---- |
| `login.tailscale.com` | HTTP 302(正常跳登录) | 0.72s |
| `controlplane.tailscale.com`(组网协调服务器) | HTTP 302 | 0.72s |
| `pkgs.tailscale.com`(apt 安装源) | HTTP 200 | 6.67s(慢但可用) |

> 结论:注册 / 安装 / 日常组网信令国内网络直连可达,无需自备代理。

---

## 拓扑:组网前 vs 组网后

```
【组网前 —— 只在家能用】

  手机 ──(家庭 Wi-Fi)──▶ 宿主机 192.168.3.29:8080 ──portproxy──▶ VM 8080
  ✗ 手机用流量 / 公司网 / 异地:没有任何路到 VM

【组网后 —— 哪里都能用】

  手机 ──(任何网络)──▶ Tailscale 隧道(WireGuard 加密)──▶ VM 100.x.y.z:8080
                         ↑ 两端都能主动连出去,无需公网 IP / 端口转发

  原 portproxy 链路保留不冲突(家里的备用路),见「与 portproxy 的关系」。
```

---

## 步骤 0:注册 Tailscale 账号(约 3 分钟,一次性)

1. 浏览器打开 **https://login.tailscale.com**
2. 点 **Get started**,用 Google / GitHub / 微软账号任一 SSO 登录
   (不需要邮箱密码注册,选一个你有的即可)
3. 免费个人版(Personal)限额:**3 用户 / 100 设备** —— 本方案最多用
   3 台,绰绰有余,不会产生费用

> 之后每台设备「登录同一账号」即自动入网,无需其他配置。

---

## 步骤 1:VM(Ubuntu)安装并加入

VM 上开终端(或 VMware 控制台),逐条执行:

### 1.1 安装

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

- **作用**:官方一键脚本 —— 自动识别 Ubuntu 版本、添加
  `pkgs.tailscale.com` apt 源并安装 `tailscale` + `tailscaled`
- **预期**:脚本先打印几行 ` Installing tailscale repository...`,
  最后出现一个 `https://login.tailscale.com/a/xxxxxxxx` 形式的**登录链接**
- **耗时**:约 1-2 分钟(pkgs 源国内偏慢,6s 级 TTFB,属正常;卡住超过
  5 分钟看下方备选)

<details>
<summary>备选:一键脚本失败时的手动三行(等效)</summary>

```bash
# 添加官方 apt 源($(lsb_release -cs) 自动取 Ubuntu 代号,如 jammy)
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/$(lsb_release -cs).noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/$(lsb_release -cs).tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list
sudo apt-get update && sudo apt-get install -y tailscale
```
</details>

### 1.2 加入 tailnet

```bash
sudo tailscale up
```

- **预期**:终端打印一个登录 URL。**在任意有浏览器的机器**(宿主机
  Windows 即可)打开它,登录步骤 0 的同一账号 → 页面显示 **Connect** /
  授权成功;VM 终端随后出现 `Success.`

### 1.3 取 VM 的 tailnet IP(重点,记下来)

```bash
tailscale ip -4
```

- **预期**:输出一行 `100.x.y.z`(Tailscale 保留网段,全球唯一分配)
- **这就是手机端要填的服务器地址主体**。该地址**永久不变**(除非你
  在管理台主动删机器重加),比 DHCP 的 `192.168.3.29` 稳定得多

### 1.4 开机自启核验(不做的话 VM 重启后失联)

```bash
systemctl is-enabled tailscaled
```

- **预期**:`enabled`(安装脚本通常已设;输出 `disabled` 就补一条
  `sudo systemctl enable --now tailscaled`)

### 1.5 防火墙核验(仅当 VM 开了 ufw)

```bash
sudo ufw status
```

- 输出 `Status: inactive` → 跳过本条(本 VM docker compose 部署,默认没开)
- 输出 `active` → 放行 tailnet 网卡入站:
  `sudo ufw allow in on tailscale0`

### 1.6 本机自检

```bash
curl http://127.0.0.1:8080/healthz
```

- **预期**:`{"ok":true,"service":"sync-server"}`(sync-server 还活着,
  老链路不受影响)

### 1.7 关闭密钥过期(强烈建议,一次性的防坑操作)

浏览器打开 **https://login.tailscale.com/admin/machines** → 找到 VM 这台
机器 → 右侧 `⋯` 菜单 → **Disable key expiry**。

- **为什么**:Tailscale 节点密钥默认约 180 天过期,过期后 VM 会**静默
  掉线**,半年后你会遇到「出门突然连不上」且毫无报错 —— 提前关掉一劳永逸

---

## 步骤 2:手机安装并加入

### 2.1 安装(三选一,MIUI 无 Play 商店就选 ③)

| 来源 | 操作 |
| ---- | ---- |
| ① Play 商店 | 搜 **Tailscale** 安装 |
| ② F-Droid | `https://f-droid.org/packages/com.tailscale.ipn/` |
| ③ GitHub APK(推荐 MIUI) | `https://github.com/tailscale/tailscale-android/releases` 下载最新 `.apk` 直装 |

### 2.2 登录并开 VPN

1. 打开 Tailscale App → **Sign in** → 选**与 VM 相同的** SSO 账号
2. 系统弹「VPN 连接请求」→ **确定**(钥匙/钥匙孔图标出现在状态栏即成功)
3. App 主界面右上角开关拨到 **ON**

### 2.3 MIUI 保活设置(不做的话锁屏后 VPN 被杀,同步时好时坏)

与 App 后台同步(workmanager)同款操作:

- 设置 → 应用设置 → 应用管理 → Tailscale → **自启动:开**
- 省电策略 → **无限制**
- 最近任务卡片**下拉上锁**(加锁图标),清理后台时不被杀

---

## 步骤 3:连通性验证(手机浏览器,先不进 App)

手机(**任意网络下**,包括流量)打开浏览器访问:

```
http://100.x.y.z:8080/healthz
```

(把 `100.x.y.z` 换成步骤 1.3 取到的地址)

- **预期**:显示 `{"ok":true,"service":"sync-server"}`
- **不通** → 查下方「故障排查」第 3 / 4 条

---

## 步骤 4:App 切换服务器地址

> 换地址 = 换一条路到**同一台服务器**,账号与数据完全不变。
> App 的地址只在登录页能改(代码层 `setServerUrl` 唯一调用点是登录页),
> 已登录状态需要退出重登 —— 全程 1 分钟。

1. 「我的」→ **先手动「立即同步」一次**并确认成功(把本地改动全部推上云)
2. 退出登录 → 回到登录页
3. 顶部「服务器地址」填 **`http://100.x.y.z:8080`**
   (校验只要求 `http://` 开头,`100.x` IP 与以后的 `.ts.net` 域名都接受)
4. 重新登录原账号 → 「我的」→ 立即同步 → 数据完整恢复

> 切到 `100.x` 后**在家也能用**(隧道照样走),一个地址走天下;
> 原来的 `192.168.3.29:8080` 不用再填。

---

## 步骤 5(可选):Windows 宿主机加入

**好处**:① 宿主机浏览器可直接开 `http://100.x.y.z:8080/healthz` 排查;
② 桌面端 App 也可改填 `100.x` 地址,以后排查只看一条链路。

1. 下载安装:**https://tailscale.com/download**(Windows 版安装包)
2. 登录**同一账号**,系统托盘出现 Tailscale 图标即成功
3. (可选)桌面端 App → 设置 → 数据同步 → 服务器地址改
   `http://100.x.y.z:8080` → 保存 → 立即同步验证
   —— 不改也行,`192.168.75.128:8080` 在家继续可用

---

## 步骤 6:出门验收(本方案的核心目标)

1. 手机**关 Wi-Fi,开流量**(模拟出门)
2. 确认 Tailscale VPN 开着(状态栏钥匙图标)
3. 浏览器开 `http://100.x.y.z:8080/healthz` → 通
4. 打开 App → 「我的」→ **立即同步** → 显示「已同步 · hh:mm · 推送 N …」

> 流量下首次握手可能 2-5 秒(走 DERP 中继建立隧道),之后稳定;
> 同步载荷是 KB 级 JSON,中继延迟完全够用。

## 验收清单

- [ ] VM:`tailscale ip -4` 有 `100.x` 地址,`systemctl is-enabled tailscaled` = enabled
- [ ] 管理台已对 VM **Disable key expiry**
- [ ] 手机:Tailscale VPN 开(钥匙图标),MIUI 自启动 + 无限制已设
- [ ] 手机流量下浏览器 `healthz` 返回 `{"ok":true}`
- [ ] App 已切 `http://100.x.y.z:8080`,重登后立即同步成功
- [ ] (可选)宿主机已入网,`healthz` 通

---

## 与现有 portproxy 的关系

| 链路 | 地址 | 什么时候用 |
| ---- | ---- | ---- |
| Tailscale(新) | `http://100.x.y.z:8080` | **任何时候**,推荐常驻 |
| portproxy(旧) | `http://192.168.3.29:8080` | 仅家庭 Wi-Fi;Tailscale 故障时的内网备用路 |

- 两条链路**互不冲突**,不需要删 portproxy 规则
- portproxy 的老毛病仍在:绑定宿主机具体 IP,DHCP 变了要重建
  (见 [App重装后配置指南](./App重装后配置指南.md))—— Tailscale 地址
  永久不变,以后手机端可彻底忘了这件事

## 常见问题与故障排查

| # | 症状 | 最可能原因 | 处理 |
| - | ---- | ---------- | ---- |
| 1 | 注册页 / 管理台打不开 | 当前网络对 login.tailscale.com 不稳 | 换网络(如手机热点)完成注册与授权,一次性操作 |
| 2 | 手机 `healthz` 不通,`tailscale status` 里 VM 显示 `offline` | VM 的 tailscaled 挂了 / VM 关机 | VM 上 `systemctl status tailscaled`;`sudo systemctl restart tailscaled`;确认 VM 开机 |
| 3 | 手机 Tailscale 显示已连但仍不通 | MIUI 杀了 VPN 后台 | 步骤 2.3 三件套(自启动 + 无限制 + 上锁),重新拨 VPN |
| 4 | VM 重启后手机连不上 | 没做开机自启(1.4) | `sudo systemctl enable --now tailscaled` |
| 5 | 用了几个月突然全员失联 | 节点密钥过期(没做 1.7) | 管理台 Machines → ⋯ → Reauthorize;并 Disable key expiry |
| 6 | 流量下同步慢 / 首次 2-5 秒 | DERP 中继建立隧道 | 属正常,等握手完成即可;持续极慢可断开重拨一次 VPN |
| 7 | 在家 Wi-Fi 反而变慢? | 不会 —— Tailscale 只接管 tailnet 内(`100.x` / `ts.net`)流量 | 普通上网不经过隧道,无影响 |

诊断命令速查(VM 上):

```bash
tailscale status      # 看 peers 与在线状态(手机应在列表且非 offline)
tailscale ping <手机的100.x地址>   # 测隧道连通与走直连还是中继
```

## 安全性说明

- **tailnet 是你的私有网**:设备必须用你的账号登录才能加入,外人不可见
- **隧道本身 WireGuard 加密**:手机 ↔ VM 之间即使应用层是 `http`,
  在隧道内也是密文,公网 / 运营商看不到内容
- 服务端 `8080` 没有对公网开放任何新端口(全出站连接),攻击面不变
- 想再进一步上 HTTPS(可选加固,本批不做):Tailscale 自带
  `tailscale serve` 可一键给服务端配 Let's Encrypt 证书,需要时另立批

## 变更记录

- **2026-09-04**:建立。预检实测三域可达(controlplane 302/0.72s、
  pkgs 200/6.67s);核账确认 mobile 地址链路零改动兼容
  (`setServerUrl` 仅去尾斜杠,登录页仅校验 `http(s)://` 前缀)。
