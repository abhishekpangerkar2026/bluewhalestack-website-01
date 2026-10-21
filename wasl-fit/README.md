# Wasl Fit

Resident fitness app for Wasl communities: book community gyms and trainers, QR check-in, wallet, monthly challenges.

| Part | Folder | Stack | Live |
|---|---|---|---|
| API | `api/` | .NET 8 minimal API, EF Core, Postgres, JWT | https://api-production-11c6f.up.railway.app (`/swagger`) |
| App | `mobile/` | Flutter (iOS, Android, web), Provider, go_router | https://web-production-6f52e.up.railway.app |

Both deploy to the Railway project **wasl-fit** from branch `claude/wasl-fit-app-research-v3r397`.

## Open in VS Code

```bash
git clone https://github.com/abhishekpangerkar2026/bluewhalestack-website-01.git
cd bluewhalestack-website-01
git checkout claude/wasl-fit-app-research-v3r397
code wasl-fit          # open this folder as the workspace
```

Install the recommended extensions when prompted (Flutter, C# Dev Kit, Docker, REST Client).
Prerequisites: [Flutter 3.47](https://docs.flutter.dev/get-started/install) (`flutter doctor`), [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0), Docker.

## Run it

Press **F5** (Run and Debug) and pick one:

- **App (web) → live Railway API** — quickest; no local backend needed.
- **App (phone/emulator) → live Railway API** — pick a device in the status bar first.
- **API (.NET) → local Postgres** — run the task **local database (Postgres)** first
  (`Terminal → Run Task`). Swagger opens at http://localhost:5080/swagger.
  Then run **App (web) → local API**.

Tasks (`Terminal → Run Task`): `app: analyze`, `app: test`, `app: build web`, `build api`.
`requests.http` has ready-made API calls.

## Deploy

Pushing to the branch updates the code; the Railway services follow it.
To work with Railway from the VS Code terminal:

```bash
npm i -g @railway/cli
railway login
railway link        # choose project "wasl-fit"
railway logs --service api
railway logs --service web
```

## Before real users

- Turn off `SELF_SERVE_LEASE` and `FAKE_PAYMENTS` in Railway (the API returns 501 without them; real lease verification and a payment gateway still need building).
- Change the seeded trainer/staff password (`ChangeMe!123`) and rotate `JWT_SECRET`.
- Replace `EnsureCreated` with EF Core migrations before the schema changes.
- Arabic strings (`mobile/lib/core/l10n.dart`) are a first draft: have a native speaker review.
- Brand: the look is original; Wasl's palette goes in `mobile/lib/core/theme.dart`.
