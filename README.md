# ☕ Xavier Carrera Gimbert Coffee Project

This is a **fully responsive web application** built with a modern technology stack.

## ✨ Tech Stack

- **Frontend:** **Next.js** (React framework) and **Tailwind CSS** (for styling).
- **Backend:** **NestJS** (Node.js framework) and **Prisma** (ORM).
- **Database:** **PostgreSQL**.

## 🎨 Design

[Visit the Figma design here](https://www.figma.com/design/a7Y3xMc2fiCsr3IN9v0oXM/Xavier-Carrera-Gimbert-Coffee?node-id=2-2&t=2c60sgiVUHrWRKTq-1)

<img width="1912" height="1015" alt="image" src="https://github.com/user-attachments/assets/944ec9cc-9ded-4668-81e9-e3f68b8fbeb0" />
<img width="2031" height="1143" alt="image" src="https://github.com/user-attachments/assets/d406d222-00a7-41b4-8d5f-16fde535fb58" />

## 🚀 How to Run Locally

### 🛠️ Prerequisites

1.  **Environment Setup:** Create the necessary **.env** files. Duplicate the provided **.example.env** files in both the `backend` and `frontend` directories and rename them to **.env**.

### ⚙️ Backend Setup (`backend` directory)

Run these commands sequentially:

- `pnpm install`
- `pnpm prisma migrate dev`
- `pnpm build`
- `pnpm start` (Keep this process running for the backend server.)
- `pnpm db:seed` (To populate the database with initial data.)

### 🌐 Frontend Setup (`frontend` directory)

Run these commands sequentially:

- `pnpm install`
- `pnpm build`
- `pnpm start` (Keep this process running to view the application.)

---

## ✅ Testing

Use these commands from within the **`frontend`** directory:

- `pnpm run test` (For **unit and integration testing**.)

* `pnpm run test:e2e` (For **end-to-end testing**. The application must be running—both frontend and backend—for these tests to work.)
