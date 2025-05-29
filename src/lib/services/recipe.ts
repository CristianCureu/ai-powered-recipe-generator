import { prisma } from "@lib/prisma"
import { hashRecipe } from '@lib/hash';

export async function saveRecipesToDB(recipes: Recipes) {
    const savedRecipes = [];

    for (const recipe of recipes) {
        const hash = hashRecipe({
            title: recipe.title,
            duration: recipe.duration,
            favorite: recipe.favorite,
            image: recipe.image,
            ingredients: recipe.ingredients.map(i => i.trim().toLowerCase()).sort(),
            instructions: recipe.instructions.map(i => i.trim()).sort(),
        });

        const existing = await prisma.recipe.findUnique({
            where: { hash },
        });

        if (!existing) {
            const created = await prisma.recipe.create({
                data: {
                    ...recipe,
                    hash,
                },
            });
            savedRecipes.push(created);
        } else {
            savedRecipes.push(existing);
        }
    }

    return savedRecipes;
}

export async function unlikeRecipe(id: number) {
    const updated = await prisma.recipe.update({
        where: { id },
        data: { favorite: false },
    });

    return updated;
}
