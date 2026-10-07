---
title: Self-Hosting
createTime: 2026/10/27 10:00:00
---

# Self-Hosting Control

> Deploy the control server on **your own server**: the devices and the data stay in your hands, and nothing passes through our instance. The official cloud at `secrandom-control.sectl.cn` keeps working as before — the two do not affect each other.

::: warning Not ready for production yet
The **server and Web console source are already public** ([SecRandom-Control-Console](https://github.com/SECTL/SecRandom-Control-Console), Elastic-2.0 + AGPL-3.0), but **the self-hosting sign-in path is not finished yet**: the code ships with no identity source at all and there is no first-run wizard, so a deployed instance comes up and serves the console page, but **nobody can sign in**.

Three sign-in methods for self-hosting — local accounts, Feishu and DingTalk — are in development. **You can try it now, get the whole path working and evaluate deployment options, but do not treat it as a self-hosted service that "just works once installed".**
:::

::: info Language versions of this page
This page is available in both languages and is kept in sync:

- 简体中文：[自部署](/doc/control/self-host)
- English: this page

:::

## First, be clear: the client only accepts https, or http + 127.0.0.1

This is not a deployment preference — it is a **check hard-coded into the client**:

| What you want | What it takes |
|---|---|
| Single machine for your own use (console and managed device on the same machine) | No certificate needed; enter `http://127.0.0.1:8791` as the address |
| Several machines on the LAN (teacher's computer + classroom machines) | **A TLS certificate is mandatory**: a public domain certificate, or an internal CA / self-signed certificate **installed into the trust store of every client** |
| Public internet | A domain + a certificate |

An address in the clear such as `http://192.168.x.x:8791` is **rejected outright** by the client — do not waste an afternoon on it.

**The certificate row is the one people underestimate**: the client uses .NET's default certificate validation (the Windows trust store) and there is **no switch in the code to bypass it**. A self-signed certificate, or one signed by an internal CA, must be imported into the **Trusted Root Certification Authorities (Local Computer)** store of **every single** client machine — otherwise the node channel (`wss://`) never completes a handshake. A certificate from a public CA saves you that step. Also make sure the address **resolves and is reachable from every classroom machine** (an internal or public domain name both work — just do not use a `hosts` name only your own machine knows).

## System requirements

What all three routes share:

| Item | Requirement |
|---|---|
| Server | 64-bit Linux (x86_64 or arm64). Windows has only been used for development trial runs and is not deployment-tested |
| CPU | 1 core is enough; with hundreds of devices reporting at once the bottleneck is the network, not the CPU |
| Memory | 512 MB will do — the server is only a few dozen MB idle (measured: a Windows development build, idle, ~72 MB resident and ~40 threads); add more once you are in the thousands of devices |
| Disk | Keep 5 GB or more free: the image plus the .NET runtime take a few hundred MB, and the data directory grows with the audit log (30-day retention by default) and command history. The data directory **must be persisted** — losing it means everyone signs in again and every device re-registers |
| Network | Classroom machines need outbound access to the address you hand out; if you go with route B, the reverse proxy needs 80/443 as well |
| Certificate | See the section above: the client only accepts `https`/`wss`, and it validates against the trust store of **each machine** |

What to install, per route:

- **Route A (Docker)**: Docker Engine plus the Compose v2 plugin (if `docker compose version` runs, you are fine), and a working network path out to `ghcr.io`. The host does **not** need .NET installed, does **not** need Node, and does **not** need the source either — the image is published on GHCR and `docker compose pull` fetches it directly; both amd64 and arm64 are published and compose picks the one matching the host architecture. Only if you **build from source yourself** (you changed the code, the machine has no outbound internet, or you do not trust the official image) do you need the `node:24` and `dotnet/sdk:10.0` base images, and in that case give the build machine 4 GB of memory or more.
- **Route B (bare metal)**: running needs only the **.NET 10 runtime** (`aspnetcore-runtime-10.0`; publish with `dotnet publish --self-contained` and you do not even need that); the build step needs **.NET SDK >= 10.0.103** (see `global.json`) and **Node 20.19+**; systemd; **nginx >= 1.25.1** (the config uses `http2 on;` — on older versions change it to `listen 443 ssl http2;`); and a certificate your clients trust.
- **Route C (run it directly)**: the .NET 10 SDK or runtime, nothing else; for outside access you handle TLS yourself.

## Three deployment routes

| Route | Suits | What you need to install |
|---|---|---|
| **A. Docker Compose** | You want "one command and it is up" and would rather not install .NET on the machine | Docker + the Compose plugin (no .NET or Node needed on the host, and you do not need the source either) |
| **B. Bare metal systemd + nginx** | You already have nginx and a certificate system and want to fit this into existing operations | Build machine: .NET SDK 10.0.103+, Node 20.19+; server: the .NET runtime + systemd + nginx >= 1.25.1 |
| **C. Run it directly** | Development, trial runs, single machine for your own use | .NET 10 SDK (or the runtime) |

There is one set of configuration options, shared by all three routes: `deploy/.env.example`. **The server reads configuration from environment variables only**, never from `appsettings.json`; an illegal value is refused at startup, and the log says which option it was.

## Route A: Docker Compose (pull the official image)

The image is **prebuilt** and lives in exactly one place: `ghcr.io/sectl/secrandom-control-console`.

So installing it does **not** need the whole repository cloned — one directory and two files is enough:

```bash
mkdir -p /opt/secrandom-control && cd /opt/secrandom-control

# 1. Fetch the compose file and the configuration template
curl -fsSLO https://raw.githubusercontent.com/SECTL/SecRandom-Control-Console/main/deploy/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/SECTL/SecRandom-Control-Console/main/deploy/.env.example -o .env
chmod 600 .env          # it will hold provider secrets later
vi .env                 # the per-line comments say what happens if you omit each one; at least glance at the data directory and the listen address

# 2. Pull the image and start it
docker compose pull
docker compose up -d
docker compose ps                          # only healthy counts as up
curl -fsS http://127.0.0.1:8791/healthz    # expected {"status":"ok"}
```

That is all there is to it: **one directory, one compose file, one `.env`**. The image already contains the built console and the .NET runtime, so the host needs neither Node nor .NET, nor the source.

### The version number is the date

Images are published under three tags, and compose uses `latest` by default:

| tag | What it is | When to use it |
|---|---|---|
| `2026.10.07` | The **deployment date**: the build from 2026-10-07 | You want to pin a version and control upgrades |
| `<commit sha>` | Built from one specific commit | Troubleshooting, checking which code is actually running |
| `latest` | The newest release | You always want the newest |

To pin a version, add one line to `.env` (compose reads it, the server itself does not):

```bash
CTRL_IMAGE_TAG=2026.10.07
```

Likewise, `CTRL_IMAGE` replaces the whole image name, for internal mirrors or a private registry: `CTRL_IMAGE=registry.example.com/xxx/yyy`.

Every release leaves a record in [Releases](https://github.com/SECTL/SecRandom-Control-Console/releases), along with `secrandom-control-<version>-linux-x64.tar.gz` (a self-contained server plus the whole `deploy/` config set, unpack and run) and `SHA256SUMS` — the route to take when the image cannot be pulled, or when you are installing on a machine without Docker.

::: tip When you cannot pull the image
If `docker pull` reports `403` / `denied` / `manifest unknown`, check three things in order: ① whether that version has been released at all (`latest` only exists after the first release); ② whether this machine can reach `ghcr.io` (an internal network needs a proxy or a mirror — point `CTRL_IMAGE` at it); ③ whether the package visibility is private — a GHCR package created by the release workflow is not necessarily public, and **after the first release you have to switch it to public on GitHub**, otherwise nobody outside the repository can pull it.
:::

**The port binds to `127.0.0.1:8791` only by default**: outside access always goes through a reverse proxy; if you want the LAN to connect directly, solve the TLS question first instead of simply changing it to `0.0.0.0`. The data lives in the named volume `control-data`.

### When you really do want to build from source

If you changed the code, or this machine simply has no outbound internet, use the build override file from the repository:

```bash
git clone https://github.com/SECTL/SecRandom-Control-Console.git
cd SecRandom-Control-Console/deploy
cp .env.example .env && chmod 600 .env && vi .env
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

This route really does build on that machine (`node:24` builds the front end, then `dotnet/sdk:10.0` publishes), so the time and memory are build-machine numbers. The resulting image is called `secrandom-control:local`, **deliberately not the official name** — so that later on you can tell whether you are running the official image or your own build.

With only `docker-compose.yml` it always **pulls the image**; the override file is what makes it build.

## Route B: Bare metal systemd + nginx

```bash
# 1. Build (needs .NET 10 SDK and Node 20.19+)
node scripts/build-web.mjs                 # produces artifacts/web
dotnet publish src/SecRandom.Control/SecRandom.Control.csproj -c Release -o /tmp/out

# 2. Install
sudo mkdir -p /opt/secrandom-control/current /var/lib/secrandom-control
sudo cp -r /tmp/out/. /opt/secrandom-control/current/
sudo useradd --system --home /var/lib/secrandom-control --shell /usr/sbin/nologin secrandom-control
sudo chown -R secrandom-control:secrandom-control /var/lib/secrandom-control

# 3. Configure (chmod 600; the unit file itself is usually 0644, do not put secrets in it)
sudo install -m 600 /dev/null /etc/secrandom-control.env
sudo vi /etc/secrandom-control.env

# 4. Start the service
sudo cp deploy/secrandom-control.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now secrandom-control

# 5. Reverse proxy
sudo cp deploy/nginx.conf /etc/nginx/conf.d/secrandom-control.conf
sudo vi /etc/nginx/conf.d/secrandom-control.conf   # change the domain and the certificate paths
sudo nginx -t && sudo systemctl reload nginx
```

Section by section, `deploy/nginx.conf` explains why both `/api/` and `/v1/` have to be proxied, why WebSocket and SSE need separate allowances, and why `index.html` must not be cached — **read those comments before you change it**.

## Route C: Run it directly (development / single machine for your own use)

```bash
node scripts/build-web.mjs
CTRL_DATA_ROOT=./data CTRL_LISTEN_URL=http://127.0.0.1:8791 \
  dotnet run --project src/SecRandom.Control
# open http://127.0.0.1:8791
```

With http plus a loopback address, remember `CTRL_AUTH_COOKIE_SECURE=false`, otherwise the browser will not send the session cookie back.

## Backup: this one directory is what you back up

Everything under `CTRL_DATA_ROOT` (inside the container, `/data`) **together makes up the entire state of an instance**:

| Path | What it is | What happens if it is lost |
|---|---|---|
| `*.db` (SQLite, including `-wal`/`-shm`) | Groups, members, nodes, commands, audit | Everything is gone |
| `auth/sessions/` | Console sessions | Everyone signs in again |
| `auth/login-states/` | The one-time state of a sign-in in progress (PKCE) | Sign-ins in progress fail |
| `keys/data-protection/` | The encryption key ring | **Sessions and already-encrypted tokens can never be decrypted** — the same as everyone signing in again |
| `instance.json` | Initialization configuration (appears once the self-built mode lands) | Falls back to "needs to be initialized again" |

**There is only one rule for backup: take the whole data directory together, either offline or as a hot backup** (SQLite has WAL enabled, so `cp`-ing a single `.db` directly gets you a truncated copy missing its WAL).

```bash
# Container: stop the service, then pack the whole named volume
docker compose stop control
docker run --rm -v secrandom-control_control-data:/data -v "$PWD:/backup" alpine \
  tar czf /backup/control-data-$(date +%F).tgz -C /data .
docker compose start control

# Bare metal
sudo systemctl stop secrandom-control
sudo tar czf control-data-$(date +%F).tgz -C /var/lib/secrandom-control .
sudo systemctl start secrandom-control
```

The volume name is **the compose project name + `_control-data`**, and `docker-compose.yml` hard-codes `name: secrandom-control`, so it is `secrandom-control_control-data` (`docker volume ls` will confirm it). If you would rather not stop the service, let the `sqlite3` inside the container do an online backup — but **the key ring has to be backed up along with it**.

**How much space does it take**: the database itself is small — an empty `control.db` is a few KB and the key ring is under 1 KB. What grows is the audit log and the command history, and the audit log is **kept for 30 days only** by default (`CTRL_AUDIT_RETENTION_DAYS`) — so the data directory usually stays in the tens of MB and never runs away. If you need a long-term archive, export the audit records; do not set retention to 0 (that leaves disk usage with no upper bound).

**Restore**: stop the service → overwrite the whole data directory → start the service. The key ring and the data must come from **the same backup**; replacing only one of them throws away every session.

## Upgrade and rollback

```bash
# Container: pull the new version, then restart
docker compose pull && docker compose up -d

# Bare metal
sudo systemctl stop secrandom-control
sudo rsync -a --delete /tmp/out/ /opt/secrandom-control/current/
sudo systemctl start secrandom-control
```

- The database structure is initialized automatically at startup; no manual migration is needed;
- **Rollback**: for containers, change `CTRL_IMAGE_TAG` in `.env` back to the previous date, then `docker compose pull && docker compose up -d`; for bare metal, swap the old artifacts back. Either way it has to go back together with the data-directory snapshot from the matching point in time — **back up before you upgrade**;
- The version number is the **deployment date**: what the console footer, or `GET /v1/meta` (`server_version`), shows as `2026.10.07` means "this build is the one from 2026-10-07". The date comes from the time of that commit, so the same version reports the same number no matter which machine it was built on — this is the first thing to ask for when troubleshooting.

## Go-live self-check

```bash
curl -fsS http://127.0.0.1:8791/healthz         # expected: {"status":"ok"}
curl -fsS https://control.example.com/v1/meta   # the reverse proxy layer has to work too
```

Then confirm in the browser and on the device side:

1. Open `https://control.example.com` and the page loads (not a 404, not a blank screen);
2. Clicking sign-in can reach the identity source and come back — **at present this step cannot pass: sign-in for self-hosting is still in development**; if instead "nothing happens when I click", first check whether nginx proxies `/api/`;
3. The managed device can connect (the node channel is `wss://<domain>/v1/node/connect`).

## Symptom → cause

| Symptom | Most likely cause |
|---|---|
| `docker compose pull` reports 403 / `denied` / `manifest unknown` | That version has not been released yet, or the package on GHCR is still private visibility. Pinning `CTRL_IMAGE_TAG` to a date that was never released looks exactly the same (see "When you cannot pull the image" above) |
| Clicking the sign-in button does nothing and the browser gets a blob of HTML | The reverse proxy only proxies `/v1/`, so `/api/auth/*` falls through to the SPA fallback |
| The sign-in button comes back with `?error=...`, or a straight 503 `auth_not_configured` | The server ships with no identity source at all. **This is simply what it looks like right now** — self-hosting sign-in is not finished; you did not misconfigure anything |
| After the callback comes back it reports a `redirect_uri` mismatch | `CTRL_AUTH_REDIRECT_URI` does not exactly match the callback address registered with the identity source |
| No managed device can complete a handshake | The server has no usable identity source, so the node channel cannot obtain credentials |
| The phone/tablet App does not work | Same reason: the REST path served with a Bearer token needs an identity source too |
| After every restart everyone has to sign in again | The Data Protection key ring was not persisted (`keys/data-protection` is not in the data directory) |
| Devices drop the connection every 60 seconds | The reverse proxy did not lift the timeout for WebSocket (the default is 60s, while the heartbeat is 25s) |
| After a front-end release you have to press Ctrl+F5 | `index.html` was cached |
| The service will not start and the log says the authentication configuration is incomplete | An environment variable has an illegal value — the log says which one, and nothing degrades silently |

The two rows in this table that have to do with "the server has no identity source yet" (the one that bounces back to `?error=...`, and the one where no managed device can complete a handshake) are **simply how the current version behaves** rather than something you misconfigured: that step has to wait for self-hosting sign-in to land.

Logs go to stdout: in a container use `docker compose logs -f control`, on bare metal use `journalctl -u secrandom-control -f`.

## Do not do this

- ❌ **Expose 8791 directly to the public internet**: it is plain HTTP, has no TLS, and was not designed for public exposure;
- ❌ **Enter a plain http address on a LAN IP in the client**: the client will refuse it, and even if it did connect you would be exposing the session on the wire;
- ❌ **Commit `.env` into git** (the `.gitignore`/`.dockerignore` in the repository already block it — do not work around them);
- ❌ **Keep running `latest` in production**: upgrades turn into "some day the version quietly changed"; pin `CTRL_IMAGE_TAG=2026.10.07` so that upgrading is a deliberate act and rolling back is just changing it back;
- ❌ **Back up only the database and not the key ring**: it looks restored, but in reality everyone is signed out and every token is invalid;
- ❌ **Turn on `proxy_buffering on` in the reverse proxy**: SSE will be held back and never sent, and the console will look "stuck and not moving".

## Next

- For the functional differences between self-hosting and the official cloud, see [Control Overview](/en/doc/control/index);
- For permissions, rosters and the boundaries of remote operations, see [Security & FAQ](/en/doc/control/security).
