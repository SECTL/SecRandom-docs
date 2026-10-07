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

## 三条部署路线

| 路线 | 适合 | 需要装什么 |
|---|---|---|
| **A. Docker Compose** | 想要"一条命令起来"，不想在机器上装 .NET | Docker + Compose 插件 |
| **B. 裸机 systemd + nginx** | 已有 nginx 与证书体系，要接进现有运维 | .NET 10 SDK、Node 20.19+ 用于构建；运行只需要 .NET 运行时 |
| **C. 直接运行** | 开发、试跑、单机自用 | .NET 10 SDK、Node 20.19+ |

配置项一份，三条路线通用：`deploy/.env.example`。**服务端只从环境变量读配置**，不读 `appsettings.json`；非法值直接拒绝启动，并在日志里说明是哪一项。

## 路线 A：Docker Compose

```bash
git clone https://github.com/SECTL/SecRandom-Control-Console.git
cd SecRandom-Control-Console/deploy
cp .env.example .env
chmod 600 .env          # 以后会有身份源的密钥
vi .env                 # 数据目录、监听地址与反向代理相关的几项，逐行注释都说明了不填会怎样
docker compose up -d --build
docker compose ps       # 看到 healthy 才算起来
curl -fsS http://127.0.0.1:8791/healthz
```

镜像里已经包含构建好的控制台，宿主机不需要装 Node。**端口默认只绑 `127.0.0.1:8791`**：外部访问一律走反向代理；想让内网直连，先把 TLS 那件事解决掉，别改成 `0.0.0.0` 了事。数据在命名卷 `control-data` 里。

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

**恢复**：停服 → 覆盖整个数据目录 → 起服。密钥环和数据必须来自**同一次备份**，只换其中一个等于把会话全废掉。

## 升级与回滚

```bash
docker compose up -d --build            # 容器
# 裸机
sudo systemctl stop secrandom-control
sudo rsync -a --delete /tmp/out/ /opt/secrandom-control/current/
sudo systemctl start secrandom-control
```

- 数据库结构在启动时自动初始化，不需要手动迁移；
- 回滚 = 换回旧产物 + 恢复对应时间点的数据目录快照，**先备份再升级**；
- 版本号在控制台或 `GET /v1/meta`（`server_version`）里能看到，排障时先要这个。

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
| 点登录按钮没反应，浏览器拿到一坨 HTML | 反代只代理了 `/v1/`，`/api/auth/*` 落到 SPA 回退 |
| 登录按钮点了跳回 `?error=...`，或直接 503 | 还没装上身份源模块：日志里那句话就是原因，自建登录尚未发布 |
| 被控端一直握不上手 | 服务端没有可用的身份源，节点通道拿不到凭据 |
| 每次重启所有人都要重新登录 | Data Protection 密钥环没持久化（`keys/data-protection` 不在数据目录里） |
| 设备 60 秒掉一次线 | 反代没给 WebSocket 放开超时（默认 60s，而心跳是 25s） |
| 前端发版后要按 Ctrl+F5 | `index.html` 被缓存了 |
| 服务起不来，日志说认证配置不完整 | 某个环境变量的值非法——日志会说是哪一项，不会静默降级 |

日志走 stdout：容器用 `docker compose logs -f control`，裸机用 `journalctl -u secrandom-control -f`。

## 不要这样做

- ❌ **把 8791 直接开到公网**：它是明文 HTTP、没有 TLS、也没按公网暴露设计；
- ❌ **用明文 http 到内网 IP 给客户端填**：客户端会拒绝，真连上也是把会话暴露在链路上；
- ❌ **把 `.env` 提交进 git**（仓库里的 `.gitignore`/`.dockerignore` 已经挡了，别绕过去）；
- ❌ **只备份数据库、不备份密钥环**：看起来恢复了，实际所有人被登出、令牌全失效；
- ❌ **在反向代理里开 `proxy_buffering on`**：SSE 会被攒着不发，控制台看起来"卡住不动"。

## 接下来

- 自部署与官方云的功能差别，见[集控概览](/doc/control/index)；
- 权限、名单与远程操作的边界，见[安全与常见问题](/doc/control/security)。
