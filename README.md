# Portfolio

A console-style portfolio plus a private admin site to edit its content.

| Part | Path | Stack | Purpose |
| --- | --- | --- | --- |
| Public site | `frontend/projects/public` | Angular 22 | Read-only console UI: type `1`–`5` to browse experience, studies, projects, skills and contact |
| Admin site | `frontend/projects/admin` | Angular 22 (Signal Forms) | Create / edit / delete everything (local only, no auth) |
| Public API | `backend/src/public` | NestJS 12 + Prisma 7 | `GET /api/{profile,experiences,studies,projects,skills}` |
| Admin API | `backend/src/admin` | NestJS 12 + Prisma 7 | CRUD on the same resources, `PUT /api/profile` |
| Database | `backend/prisma` | PostgreSQL 17 | Schema, migrations and seed (content of the previous portfolio) |

The ASCII logo at the top of the public site is generated from the first and last name stored in the
`Profile` table — edit them in the admin site.

## Run everything with Docker

```bash
docker compose up -d --build
```

| Service | URL |
| --- | --- |
| Public site | http://localhost:8090 |
| Admin site | http://localhost:8091 (bound to 127.0.0.1) |
| Public API | http://localhost:3000/api |
| Admin API | http://localhost:3001/api (bound to 127.0.0.1) |
| PostgreSQL | `localhost:5433`, user/password/db `portfolio` |

Ports can be changed with `PUBLIC_WEB_PORT`, `ADMIN_WEB_PORT`, `PUBLIC_API_PORT`, `ADMIN_API_PORT`
and `DB_PORT`. The `migrate` service applies migrations and seeds the database only when it is empty,
so your edits survive restarts. `docker compose down -v` wipes the data.

## Develop with hot reload

```bash
docker compose up -d db migrate          # database only

cd backend
cp .env.example .env && npm install
npm run start:public:dev                 # :3000
npm run start:admin:dev                  # :3001

cd frontend
npm install
npm run start:public                     # http://localhost:4200, proxies /api to :3000
npm run start:admin                      # http://localhost:4300, proxies /api to :3001
```

Schema changes: edit `backend/prisma/schema.prisma`, then `npx prisma migrate dev --name <change>`
inside `backend/`.

## Tests

```bash
cd backend && npm test
cd frontend && npx ng test public --watch=false && npx ng test admin --watch=false
```

## Deployment

`.github/workflows/main.yaml` builds the public site on every push to `main` and publishes it to the
`prod` branch (GitHub Pages, base href `/Portfolio/`). The APIs and database are **not** deployed yet,
so the published site cannot load data until a public API is hosted somewhere.
