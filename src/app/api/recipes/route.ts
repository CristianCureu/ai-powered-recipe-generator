import { generateRecipeSchema } from "@/lib/validations/generate-recipe.schema";
import { recipeArraySchema } from "@/lib/validations/recipe-response.schema";
import { saveRecipesToDB } from "@/lib/services/recipe";
import { NextResponse } from "next/server";
import { Recipes } from "@/types/recipe";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = generateRecipeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { prompt } = parsed.data;

  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a JSON API. Always respond with valid, minified JSON matching the structure requested. Never include explanations.",
      },
      {
        role: "user",
        content: `Generate 5 recipes based on: "${prompt}". 

Respond with JSON ONLY using the exact structure below.

Use the Lorem Picsum service to generate image URLs. For example:
"https://picsum.photos/seed/unique-key/400/300"

- Each recipe must have a unique image using a different seed (e.g. the title).
- Don't use any external services or APIs for images—only Lorem Picsum.
- Always ensure the image URL follows this format:
  "https://picsum.photos/seed/RECIPE_TITLE_SLUG/400/300"

Requirements:
- "ingredients": Use bullet-style strings starting with "•", like "• 2 cups of flour".
- "instructions": Write full, paragraph-style steps, like those in food blogs. Each step should be labeled and written as a detailed paragraph. Avoid just listing actions.

Each instruction should:
- Have a bolded step title like "Boil the potatoes." followed by detailed explanation in natural language.
- Be a full paragraph (not just 1 line).
- Include helpful notes or tips inside parentheses when relevant.
- Use a friendly, conversational tone.

[
  {
    "title": "string",
    "duration": "string",
    "favorite": false,
    "image": "https://example.com/image.jpg",
    "ingredients": [
    "• 2 pounds of Yukon Gold potatoes",
    "• 4 cloves garlic",
    "• 1 tablespoon sea salt",
    "• 1/2 cup unsalted butter",
    "• 1/2 cup milk",
    "• 1/4 cup cream cheese",
    "• Freshly ground black pepper, to taste
    ],
    "instructions": [
    "Cut the potatoes. Feel free to peel them or leave the skins on for extra flavor and nutrients. Cut them into 1-inch chunks and transfer them to a large stockpot filled with cold water as you go.",
    "Boil the potatoes. Ensure the water line is about 1 inch above the potatoes. Add garlic and 1 tbsp salt, then boil for 10–12 minutes, until tender. Drain thoroughly.",
    "Prepare your butter mixture. While the potatoes are boiling, gently heat butter, milk, and 2 tsp sea salt in a saucepan (don’t boil the milk). Set aside.",
    "Pan-dry the potatoes. Return drained potatoes to the pot, turn the burner to low, and shake for about 1 minute to release steam. Then remove from heat.",
    "Mash the potatoes. Use your preferred masher to mash to your desired consistency.",
    "Stir everything together. Fold in half the butter mixture, then the rest, followed by the cream cheese. Stir just until combined to avoid gummy texture.",
    "Taste and season. Add more salt and pepper to taste.",
    "Serve warm. Garnish with any toppings you like and enjoy!"
    ]
  }
]`,
      },
    ],
    temperature: 0.7,
  });

  const message = chat.choices?.[0]?.message?.content;

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "No content returned from model" },
      { status: 500 },
    );
  }

  try {
    const recipes: Recipes = JSON.parse(message);

    const parsed = recipeArraySchema.safeParse(recipes);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid recipe structure from model" },
        { status: 500 },
      );
    }

    const saved = await saveRecipesToDB(recipes);
    return NextResponse.json(saved);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Invalid JSON returned by model" },
      { status: 500 },
    );
  }
}
