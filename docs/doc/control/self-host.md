---
title: 自部署
createTime: 2026/10/27 10:00:00
---

# 自部署集控

> 把集控服务端部署到**你自己的服务器**：设备与数据都在你手里，不经过我们的实例。官方云 `secrandom-control.sectl.cn` 照旧可用，两者互不影响。

::: warning 现在还不适合正式上线
自部署的**服务端与 Web 控制台源码已经公开**（[SecRandom-Control-Console](https://github.com/SECTL/SecRandom-Control-Console)，Elastic-2.0 + AGPL-3.0），但**自建专用的登录还没做完**：现在的代码里没有任何身份源，也还没有首次启动引导，容器能起来、控制台首页能打开，**登录进不去**。

自建要的本地账号 / 飞书 / 钉钉三种登录方式正在开发。**现在可以拿来试、跑通部署链路、评估运维方式，但不要把它当成"装完就能用"的自建服务。**
:::

::: info 这一页的语言版本
这一页中英文都有，两边内容保持同步：

- 简体中文：本页
- English: [Self-Hosting](/en/doc/control/self-host)

:::

## 先想清楚：客户端只接受 https，或 http + 127.0.0.1

这不是部署偏好，是**客户端写死的校验**：

| 你要的形态 | 需要什么 |
|---|---|
| 单机自用（控制台和被控端在同一台机器） | 不需要证书，地址填 `http://127.0.0.1:8791` |
| 内网多机（老师电脑 + 教室机） | **必须给 TLS 证书**：公网域名证书，或内网 CA / 自签证书**并装进每台客户端的信任存储** |
| 公网 | 域名 + 证书 |

填 `http://192.168.x.x:8791` 这种明文地址会被客户端**直接拒绝**，别在这上面浪费一个下午。

**证书这一栏最容易被低估**：客户端用的是 .NET 的默认证书校验（走 Windows 信任存储），代码里**没有任何绕过校验的开关**——自签或内网 CA 签的证书，必须导入**每一台**客户端机器的「受信任的根证书颁发机构（本地计算机）」，否则节点通道（`wss://`）根本握不上手。用公网 CA 的证书可以免掉这一步。另外，地址必须在**每一台教室机上都能解析、都能连通**（内网域名或公网域名都行，就是别填只有你这台机认识的 `hosts` 名字）。

## 系统要求

三条路线都一样的部分：

| 项 | 要求 |
|---|---|
| 服务器 | 64 位 Linux（x86_64 或 arm64）；Windows 只在开发试跑时用过，没做过部署验证 |
| CPU | 1 核够用；几百台设备同时上报时看的是网络，不是 CPU |
| 内存 | 512 MB 够跑——服务端空载只有几十 MB（实测：Windows 开发构建、空载驻留约 72 MB、约 40 线程）；几千台设备后按需加 |
| 磁盘 | 留 5 GB 以上：镜像 + .NET 运行时本身占几百 MB，数据目录随审计（默认只留 30 天）与命令历史增长。数据目录**必须持久化**，丢了就是全体重新登录、设备重新接入 |
| 网络 | 教室机要能出站访问到你给的这个地址；反向代理那一层（如果走 B 路线）另需 80/443 |
| 证书 | 见上一节：客户端只认 `https`/`wss`，且校验的是**每台机器自己的信任存储** |

分路线要装的东西：

- **路线 A（Docker）**：Docker Engine + Compose v2 插件（`docker compose version` 能跑就行），以及一条能出网到 `ghcr.io` 的线路。**宿主机不需要装 .NET、不需要装 Node、也不需要 clone 源码**——镜像发布在 GHCR 上，`docker compose pull` 直接拉；amd64 与 arm64 都发了，compose 按宿主机架构自己挑。只有你要**自己从源码构建**（改了代码、内网没外网、或信不过官方镜像）时才需要 `node:24` 与 `dotnet/sdk:10.0` 这些基础镜像，那种情况下构建机建议 4 GB 内存以上。
- **路线 B（裸机）**：运行只要 .NET 10 运行时（`aspnetcore-runtime-10.0`；用 `dotnet publish --self-contained` 发布的话连运行时都不用装）；构建那一步需要 **.NET SDK ≥ 10.0.103**（见 `global.json`）与 **Node 20.19+**；systemd；**nginx ≥ 1.25.1**（配置里用了 `http2 on;`，更老的版本换成 `listen 443 ssl http2;`）；一份客户端信任的证书。
- **路线 C（直接跑）**：.NET 10 SDK 或运行时，仅此而已；要外部访问就得自己解决 TLS。

## 三条部署路线

| 路线 | 适合 | 需要装什么 |
|---|---|---|
| **A. Docker Compose** | 想要"一条命令起来"，不想在机器上装 .NET | Docker + Compose 插件（宿主机不需要 .NET / Node，也不需要源码） |
| **B. 裸机 systemd + nginx** | 已有 nginx 与证书体系，要接进现有运维 | 构建机：.NET SDK 10.0.103+、Node 20.19+；服务器：.NET 运行时 + systemd + nginx ≥ 1.25.1 |
| **C. 直接运行** | 开发、试跑、单机自用 | .NET 10 SDK（或运行时） |

配置项一份，三条路线通用：`deploy/.env.example`。**服务端只从环境变量读配置**，不读 `appsettings.json`；非法值直接拒绝启动，并在日志里说明是哪一项。

## 路线 A：Docker Compose（直接拉官方镜像）

镜像是**发布好的**，装在 **GHCR 这一个地方**：`ghcr.io/sectl/secrandom-control-console`。

所以装的时候**不需要 clone 整个仓库**，只要一个目录、两个文件：

```bash
mkdir -p /opt/secrandom-control && cd /opt/secrandom-control

# 1. 取 compose 文件与配置样板
curl -fsSLO https://raw.githubusercontent.com/SECTL/SecRandom-Control-Console/main/deploy/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/SECTL/SecRandom-Control-Console/main/deploy/.env.example -o .env
chmod 600 .env          # 以后会有身份源的密钥
vi .env                 # 逐行注释都写了不填会怎样；至少把数据目录与监听地址看一眼

# 2. 拉镜像并起来
docker compose pull
docker compose up -d
docker compose ps                          # 看到 healthy 才算起来
curl -fsS http://127.0.0.1:8791/healthz    # 期望 {"status":"ok"}
```

这就是全部：**一个目录、一份 compose、一份 `.env`**。镜像里已经包含构建好的控制台和 .NET 运行时，宿主机不需要 Node、不需要 .NET，也不需要源码。

### 版本号就是日期

镜像按三个 tag 发布，compose 默认用 `latest`：

| tag | 是什么 | 什么时候用 |
|---|---|---|
| `2026.10.07` | **部署日期**：2026-10-07 那一版 | 想钉住版本、可控升级 |
| `<commit sha>` | 某一次提交构建出来的 | 排障、核对到底跑的是哪份代码 |
| `latest` | 最新发布的一版 | 想一直跟最新 |

要钉版本，在 `.env` 里加一行（compose 会读，服务端本身不读）：

```bash
CTRL_IMAGE_TAG=2026.10.07
```

同理，`CTRL_IMAGE` 能整个换掉镜像名，走内网镜像站或私有 registry 时用：`CTRL_IMAGE=registry.example.com/xxx/yyy`。

每次发版在 [Releases](https://github.com/SECTL/SecRandom-Control-Console/releases) 留一份记录，并附上 `secrandom-control-<版本>-linux-x64.tar.gz`（自包含服务端 + 全套 `deploy/` 配置，解包即用）与 `SHA256SUMS` —— 镜像拉不动，或者要装在没有 Docker 的机器上时走这条路。

::: tip 拉不到镜像时
`docker pull` 报 `403` / `denied` / `manifest unknown`，按顺序查三件事：① 这一版是不是还没发布（`latest` 也要等第一次发版之后才有）；② 这台机器能不能出网到 `ghcr.io`（内网环境要走代理或镜像站，用 `CTRL_IMAGE` 指过去）；③ 镜像包是不是私有可见性 —— 发版流程建出来的 GHCR package 默认可能不是公开的，**第一次发布后需要在 GitHub 上把它改成 public**，否则仓库外的人一律拉不到。
:::

**端口默认只绑 `127.0.0.1:8791`**：外部访问一律走反向代理；想让内网直连，先把 TLS 那件事解决掉，别改成 `0.0.0.0` 了事。数据在命名卷 `control-data` 里。

### 确实要从源码构建时

改了代码、或这台机器根本出不了外网，就用仓库里的构建覆盖文件：

```bash
git clone https://github.com/SECTL/SecRandom-Control-Console.git
cd SecRandom-Control-Console/deploy
cp .env.example .env && chmod 600 .env && vi .env
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

这条路会在这台机器上真构建（`node:24` 打前端 → `dotnet/sdk:10.0` 发布），时间和内存都按构建机算。产出的镜像叫 `secrandom-control:local`，**故意不叫官方那个名字** —— 免得以后分不清手上跑的是官方镜像还是自己编的。

只写 `docker-compose.yml` 时永远是**拉镜像**；加上覆盖文件才会构建。

## 路线 B：裸机 systemd + nginx

```bash
# 1. 构建（需要 .NET 10 SDK 与 Node 20.19+）
node scripts/build-web.mjs                 # 产出 artifacts/web
dotnet publish src/SecRandom.Control/SecRandom.Control.csproj -c Release -o /tmp/out

# 2. 安装
sudo mkdir -p /opt/secrandom-control/current /var/lib/secrandom-control
sudo cp -r /tmp/out/. /opt/secrandom-control/current/
sudo useradd --system --home /var/lib/secrandom-control --shell /usr/sbin/nologin secrandom-control
sudo chown -R secrandom-control:secrandom-control /var/lib/secrandom-control

# 3. 配置（chmod 600；unit 文件本身通常是 0644，别把密钥写进去）
sudo install -m 600 /dev/null /etc/secrandom-control.env
sudo vi /etc/secrandom-control.env

# 4. 起服务
sudo cp deploy/secrandom-control.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now secrandom-control

# 5. 反向代理
sudo cp deploy/nginx.conf /etc/nginx/conf.d/secrandom-control.conf
sudo vi /etc/nginx/conf.d/secrandom-control.conf   # 改域名与证书路径
sudo nginx -t && sudo systemctl reload nginx
```

`deploy/nginx.conf` 里逐段注明了为什么 `/api/` 和 `/v1/` 都要代理、为什么 WebSocket 与 SSE 要单独放行、为什么 `index.html` 不能缓存——**改动它之前先读那几行注释**。

## 路线 C：直接运行（开发 / 单机自用）

```bash
node scripts/build-web.mjs
CTRL_DATA_ROOT=./data CTRL_LISTEN_URL=http://127.0.0.1:8791 \
  dotnet run --project src/SecRandom.Control
# 打开 http://127.0.0.1:8791
```

用 http + 回环地址时记得 `CTRL_AUTH_COOKIE_SECURE=false`，否则浏览器不会回传会话 cookie。

## 备份：备份的就是这一个目录

`CTRL_DATA_ROOT`（容器里是 `/data`）下的东西**共同构成一个实例的全部状态**：

| 路径 | 是什么 | 丢了会怎样 |
|---|---|---|
| `*.db`（SQLite，含 `-wal`/`-shm`） | 组、成员、节点、命令、审计 | 全没了 |
| `auth/sessions/` | 控制台会话 | 所有人重新登录 |
| `auth/login-states/` | 登录过程中的一次性 state（PKCE） | 正在进行的登录失败 |
| `keys/data-protection/` | 加密密钥环 | **会话与已加密令牌全部解不开**，等于所有人重新登录 |
| `instance.json` | 初始化配置（自建模式落地后出现） | 退回"需要重新初始化" |

**备份的要点只有一个：整个数据目录一起、停机或热备份**（SQLite 开了 WAL，直接 `cp` 单个 `.db` 会拿到缺 WAL 的残本）。

```bash
# 容器：停服后把命名卷整个打包
docker compose stop control
docker run --rm -v secrandom-control_control-data:/data -v "$PWD:/backup" alpine \
  tar czf /backup/control-data-$(date +%F).tgz -C /data .
docker compose start control

# 裸机
sudo systemctl stop secrandom-control
sudo tar czf control-data-$(date +%F).tgz -C /var/lib/secrandom-control .
sudo systemctl start secrandom-control
```

卷名 = **compose 项目名 + `_control-data`**，而 `docker-compose.yml` 里写死了 `name: secrandom-control`，所以就是 `secrandom-control_control-data`（`docker volume ls` 可以确认）。不想停服就让容器里的 `sqlite3` 做在线备份，但**密钥环也要一起备**。

**占多少空间**：库本身很小，`control.db` 空库只有几 KB，密钥环不到 1 KB；涨的是审计记录与命令历史，而审计默认**只留 30 天**（`CTRL_AUDIT_RETENTION_DAYS`）——所以数据目录通常是几十 MB 这个量级，不会失控。要长期留档就把审计导出去，别把保留天数改成 0（那等于磁盘占用没有上界）。

**恢复**：停服 → 覆盖整个数据目录 → 起服。密钥环和数据必须来自**同一次备份**，只换其中一个等于把会话全废掉。

## 升级与回滚

```bash
# 容器：拉新版再重启
docker compose pull && docker compose up -d

# 裸机
sudo systemctl stop secrandom-control
sudo rsync -a --delete /tmp/out/ /opt/secrandom-control/current/
sudo systemctl start secrandom-control
```

- 数据库结构在启动时自动初始化，不需要手动迁移；
- **回滚**：容器把 `.env` 里的 `CTRL_IMAGE_TAG` 改成上一个日期，再 `docker compose pull && docker compose up -d`；裸机换回旧产物。两边都要连**对应时间点的数据目录快照**一起回，**先备份再升级**；
- 版本号就是**部署日期**：控制台页脚或 `GET /v1/meta`（`server_version`）显示的 `2026.10.07`，意思就是"这一版是 2026-10-07 的"。日期取自那次提交的时间，所以同一个版本在哪台机器上装出来都报同一个号 —— 排障时先要这个。

## 上线自检

```bash
curl -fsS http://127.0.0.1:8791/healthz         # 期望：{"status":"ok"}
curl -fsS https://control.example.com/v1/meta   # 反代这一层也要通
```

然后在浏览器与设备侧确认：

1. 打开 `https://control.example.com`，页面能加载（不是 404、不是白屏）；
2. 点登录能跳到身份源并回来——**这一步目前过不去：自建登录还在开发**；但要是"点了没反应"，先查 nginx 有没有代理 `/api/`；
3. 被控端能连上（节点通道是 `wss://<域名>/v1/node/connect`）。

## 症状 → 原因

| 症状 | 多半是 |
|---|---|
| `docker compose pull` 报 403 / `denied` / `manifest unknown` | 这一版还没发布，或 GHCR 上的包还是私有可见性；钉了 `CTRL_IMAGE_TAG` 的日期而那一版没发出来，也是同一个表现（见上面的"拉不到镜像时"） |
| 点登录按钮没反应，浏览器拿到一坨 HTML | 反代只代理了 `/v1/`，`/api/auth/*` 落到 SPA 回退 |
| 登录按钮点了跳回 `?error=...`，或直接 503 `auth_not_configured` | 服务端里没有任何身份源。**现在就长这样**——自建登录还没做完，不是你把哪一项配错了 |
| 回调回来报 `redirect_uri` 不匹配 | `CTRL_AUTH_REDIRECT_URI` 与身份源那边登记的回调地址不是一字不差 |
| 被控端一直握不上手 | 服务端没有可用的身份源，节点通道拿不到凭据 |
| 手机 App 也用不了 | 同一个原因：Bearer 那条 REST 通路同样要身份源 |
| 每次重启所有人都要重新登录 | Data Protection 密钥环没持久化（`keys/data-protection` 不在数据目录里） |
| 设备 60 秒掉一次线 | 反代没给 WebSocket 放开超时（默认 60s，而心跳是 25s） |
| 前端发版后要按 Ctrl+F5 | `index.html` 被缓存了 |
| 服务起不来，日志说认证配置不完整 | 某个环境变量的值非法——日志会说是哪一项，不会静默降级 |

这张表里跟"服务端还没有身份源"有关的两行（跳回 `?error=...`、被控端握不上手）是**当前版本本来的样子**，不是"你配错了"：这一步要等自建登录做出来。

日志走 stdout：容器用 `docker compose logs -f control`，裸机用 `journalctl -u secrandom-control -f`。

## 不要这样做

- ❌ **把 8791 直接开到公网**：它是明文 HTTP、没有 TLS、也没按公网暴露设计；
- ❌ **用明文 http 到内网 IP 给客户端填**：客户端会拒绝，真连上也是把会话暴露在链路上；
- ❌ **把 `.env` 提交进 git**（仓库里的 `.gitignore`/`.dockerignore` 已经挡了，别绕过去）；
- ❌ **生产上一直用 `latest`**：升级会变成"哪天悄悄换了个版本"；钉住 `CTRL_IMAGE_TAG=2026.10.07`，升级才是一次有意识的动作，回滚也只是把它改回去；
- ❌ **只备份数据库、不备份密钥环**：看起来恢复了，实际所有人被登出、令牌全失效；
- ❌ **在反向代理里开 `proxy_buffering on`**：SSE 会被攒着不发，控制台看起来"卡住不动"。

## 接下来

- 自部署与官方云的功能差别，见[集控概览](/doc/control/index)；
- 权限、名单与远程操作的边界，见[安全与常见问题](/doc/control/security)。
