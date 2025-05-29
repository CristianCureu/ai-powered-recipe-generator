🍽️ AI Recipe Finder
AI-powered web app to generate and save recipes based on user prompts. Built with Next.js 14, Tailwind CSS, ShadCN UI, Prisma, SQLite, React Query, and OpenAI.

🚀 Features

🔍 Search recipes with AI (OpenAI GPT-4 Turbo)
❤️ Favorite your recipes
📋 View full ingredients and instructions
⚡ Optimistic UI with React Query
🎨 UI built with ShadCN and Tailwind

🧱 Tech Stack

Next.js App Router
React Query (TanStack)
Prisma ORM with SQLite
Tailwind CSS + ShadCN UI
OpenAI API

🛠️ Setup Instructions

1. Clone the repo
   bashgit clone https://github.com/yourusername/ai-recipe-finder.git
   cd ai-recipe-finder
2. Install dependencies
   bashpnpm install

# or

npm install 3. Environment variables
Create a .env file:
envOPENAI_API_KEY=your-openai-key
DATABASE_URL="file:./dev.db"
📦 Prisma Setup 4. Initialize database
bashnpx prisma generate
npx prisma migrate dev --name init 5. Seed (optional)
bashnpx prisma studio
🧠 OpenAI API
The API request is handled in:
/src/app/api/recipes/route.ts
Schema validation with Zod is used to ensure prompt integrity.
You send a prompt like:
ts{
prompt: "chicken and rice"
}
And receive a response with:
tstype Recipe = {
id: string;
title: string;
duration: string;
favorite: boolean;
image: string;
ingredients: string[];
instructions: string[];
}
🖼️ Project Structure
bashsrc/
│
├── app/ # Next.js app routes
│ └── recipe/[id]/ # Dynamic route for recipe details
│
├── components/ # Reusable UI components
│
├── lib/
│ ├── openai.ts # OpenAI config
│ ├── prisma.ts # Prisma client
│ ├── requests/ # API requests (fetch functions)
│ ├── mutations/ # React Query mutations
│ └── validations/ # Zod schemas
│
├── types/ # Shared TypeScript types
└── styles/ # Global styles
🐳 Optional: Docker Setup
If you'd like to containerize the app later:
dockerfile# Example only (not yet configured)
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
✅ Scripts
bashpnpm dev # Start dev server
pnpm build # Build for production
pnpm start # Start production server
pnpm lint # Run ESLint
🙌 Credits
Built by [your name] as part of an AI-powered project demo.
