# 📘 Location Tree API – Quick Documentation

## 🧰 Tech Stack

- **Backend:** NestJS
- **Database:** PostgreSQL (Docker)
- **ORM:** TypeORM
- **Docs:** Swagger (OpenAPI)

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone <repo-url>
cd location-tree-api
npm install
```

### 2. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

> Default config:
> - DB name: `location`
> - Port: `5432`
> - Username: `admin`
> - Password: `admin`

### 3. Run App

```bash
npm run start:dev
```

---

## 📁 Available Endpoints (Base: `/locations`)

### ➕ Create

```http
POST /locations
```

```json
{
  "name": "District 1",
  "parentId": "optional-parent-uuid"
}
```

---

### 📥 Get All

```http
GET /locations
```

→ List of all locations (flat, with parent if exists)

---

### 🔍 Get One

```http
GET /locations/:id
```

→ Get location by ID

---

### ✏️ Update

```http
PATCH /locations/:id
```

```json
{
  "name": "New Name",
  "parentId": "optional-new-parent-id"
}
```

---

### ❌ Delete

```http
DELETE /locations/:id
```

→ Children (if any) will become top-level.

---

## 🛡️ Validation

- `name` is required
- `parentId` must be a valid UUID (if provided)
- Prevents circular reference (parent cannot be self or child)

---

## 📚 Swagger Docs

- URL: [http://localhost:3000/api](http://localhost:3000/api)
- Try endpoints directly from browser

---

## 🧪 Testing (Optional / Planned)

- Use Jest for unit testing services
- Coverage: create, update, delete, prevent circular
