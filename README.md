# 🍽️ AI Recipe Finder

AI-powered web app to generate and save recipes based on user prompts. Built with **Next.js 14**, **Tailwind CSS**, **ShadCN UI**, **Prisma**, **SQLite**, **React Query**, and **OpenAI**.

---

## 🚀 Features

- Search recipes with AI (OpenAI GPT-4 Turbo)
- Favorite your recipes
- View full ingredients and instructions
- Optimistic UI with React Query
- UI built with ShadCN and Tailwind

---

## 🧱 Tech Stack

- **Next.js App Router**
- **React Query (TanStack)**
- **Prisma ORM** with **SQLite**
- **Tailwind CSS** + **ShadCN UI**
- **OpenAI API**

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/ai-recipe-finder.git
cd ai-powered-recipe-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

```bash
OPENAI_API_KEY=your-openai-key
DATABASE_URL="file:./dev.db"
```

### 4. Initialize database

Generate client from schema

```bash
npx prisma generate
```

Push the schema to create the SQLite database (recommended if migrations are not committed):

```bash
npx prisma db push
```

> 💡 If `prisma/migrations/` exists, you can alternatively run:
>
> ```bash
> npx prisma migrate dev
> 

### 5. (Optional) Start Prisma Studio

Open DB in browser

```bash
npx prisma studio
```

### 6. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.
