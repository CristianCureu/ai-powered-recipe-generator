# 🍽️ AI Recipe Finder

AI-powered web app to generate and save recipes based on user prompts. Built with **Next.js 14**, **Tailwind CSS**, **ShadCN UI**, **Prisma**, **SQLite**, **React Query**, and **OpenAI**.

---

## 🚀 Features

- 🔍 Search recipes with AI (OpenAI GPT-4 Turbo)
- ❤️ Favorite your recipes
- 📋 View full ingredients and instructions
- ⚡ Optimistic UI with React Query
- 🎨 UI built with ShadCN and Tailwind

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
cd ai-recipe-finder
npm install
```

### 2. Install dependencies

npm install

### 3. Environment variables

OPENAI_API_KEY=your-openai-key
DATABASE_URL="file:./dev.db"

### 4. Initialize database

# Generate client from schema

npx prisma generate

# Create & apply migration

npx prisma migrate dev --name init

### 5. Start Prisma Studio (Optional UI for DB)

# Open DB in browser

npx prisma studio

### 6. Start the development server

Open http://localhost:3000 to view the app.