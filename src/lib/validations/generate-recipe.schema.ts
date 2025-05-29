import { z } from "zod"

export const generateRecipeSchema = z.object({
    prompt: z.string().min(5),
})

export type GenerateRecipeRequest = z.infer<typeof generateRecipeSchema>
