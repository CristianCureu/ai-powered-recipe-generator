import { GenerateRecipeRequest } from "@/lib/validations/generate-recipe.schema"

export async function generateRecipe({ prompt }: GenerateRecipeRequest) {
    const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    })

    if (!res.ok) {
        throw new Error("Failed to generate recipes")
    }

    const data: Recipes = await res.json()
    return data
}

export async function getFavorites() {
    const res = await fetch("/api/recipes/favorites")

    if (!res.ok) {
        throw new Error("Failed to get recipes.")
    }

    const data: Recipes = await res.json()
    return data
}


export async function toggleFavorite(id: number, value: boolean) {
    const res = await fetch(`/api/recipes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: value }),
    });

    if (!res.ok) {
        throw new Error("Failed to like/unlike recipe.")
    }

    const data: Recipe = await res.json()
    return data
}

export async function getRecipeById(id: number) {
    const res = await fetch(`/api/recipes/${id}`)

    if (!res.ok) {
        throw new Error("Failed to like/unlike recipe.")
    }

    const data: Recipe = await res.json()
    return data
}