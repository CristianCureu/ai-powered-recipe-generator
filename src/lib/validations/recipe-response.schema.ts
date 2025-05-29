import { z } from "zod";

export const recipeSchema = z.object({
    title: z.string(),
    duration: z.string(),
    favorite: z.boolean(),
    image: z.string(),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
});

export const recipeArraySchema = z.array(recipeSchema);

export type RecipeInput = z.infer<typeof recipeSchema>;
