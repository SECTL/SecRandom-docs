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

## Three deployment routes

| Route | Suits | What you need to install |
|---|---|---|
| **A. Docker Compose** | You want "one command and it is up" and would rather not install .NET on the machine | Docker + the Compose plugin |
| **B. Bare metal systemd + nginx** | You already have nginx and a certificate system and want to fit this into existing operations | .NET 10 SDK and Node 20.19+ to build; running needs only the .NET runtime |
| **C. Run it directly** | Development, trial runs, single machine for your own use | .NET 10 SDK, Node 20.19+ |

There is one set of configuration options, shared by all three routes: `deploy/.env.example`. **The server reads configuration from environment variables only**, never from `appsettings.json`; an illegal value is refused at startup, and the log says which option it was.

## Route A: Docker Compose

```bash
git clone https://github.com/SECTL/SecRandom-Control-Console.git
cd SecRandom-Control-Console/deploy
cp .env.example .env
chmod 600 .env          # it will hold provider secrets
vi .env                 # the few options for the data directory, listen address and reverse proxy; the per-line comments say what happens if you omit each one
docker compose up -d --build
docker compose ps       # only healthy counts as up
curl -fsS http://127.0.0.1:8791/healthz
```

The image already contains the built console, so the host does not need Node. **The port binds to `127.0.0.1:8791` only by default**: outside access always goes through a reverse proxy; if you want the LAN to connect directly, solve the TLS question first instead of simply changing it to `0.0.0.0`. The data lives in the named volume `control-data`.

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

**Restore**: stop the service → overwrite the whole data directory → start the service. The key ring and the data must come from **the same backup**; replacing only one of them throws away every session.

## Upgrade and rollback

```bash
docker compose up -d --build            # container
# bare metal
sudo systemctl stop secrandom-control
sudo rsync -a --delete /tmp/out/ /opt/secrandom-control/current/
sudo systemctl start secrandom-control
```

- The database structure is initialized automatically at startup; no manual migration is needed;
- Rollback = put the old build back + restore the data directory snapshot from the matching point in time — **back up before you upgrade**;
- The version number is visible in the console or from `GET /v1/meta` (`server_version`); when troubleshooting, ask for that first.

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
| Clicking the sign-in button does nothing and the browser gets a blob of HTML | The reverse proxy only proxies `/v1/`, so `/api/auth/*` falls through to the SPA fallback |
| After the sign-in redirect comes back it reports a `redirect_uri` mismatch | `CTRL_AUTH_REDIRECT_URI` does not exactly match the callback address registered with the platform |
| No managed device can complete a handshake | The server has no usable identity source, so the node channel cannot obtain credentials |
| The phone/tablet App does not work | Same reason: the REST path served with a Bearer token needs an identity source too |
| After every restart everyone has to sign in again | The Data Protection key ring was not persisted (`keys/data-protection` is not in the data directory) |
| Devices drop the connection every 60 seconds | The reverse proxy did not lift the timeout for WebSocket (the default is 60s, while the heartbeat is 25s) |
| After a front-end release you have to press Ctrl+F5 | `index.html` was cached |
| The service will not start and the log says the authentication configuration is incomplete | An environment variable has an illegal value — the log says which one, and nothing degrades silently |

Logs go to stdout: in a container use `docker compose logs -f control`, on bare metal use `journalctl -u secrandom-control -f`.

## Do not do this

- ❌ **Expose 8791 directly to the public internet**: it is plain HTTP, has no TLS, and was not designed for public exposure;
- ❌ **Enter a plain http address on a LAN IP in the client**: the client will refuse it, and even if it did connect you would be exposing the session on the wire;
- ❌ **Commit `.env` into git** (the `.gitignore`/`.dockerignore` in the repository already block it — do not work around them);
- ❌ **Back up only the database and not the key ring**: it looks restored, but in reality everyone is signed out and every token is invalid;
- ❌ **Turn on `proxy_buffering on` in the reverse proxy**: SSE will be held back and never sent, and the console will look "stuck and not moving".

## Next

- For the functional differences between self-hosting and the official cloud, see [Control Overview](/en/doc/control/index);
- For permissions, rosters and the boundaries of remote operations, see [Security & FAQ](/en/doc/control/security).
