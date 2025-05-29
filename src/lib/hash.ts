import crypto from 'crypto';

export function hashRecipe(recipe: {
    title: string;
    duration: string;
    favorite: boolean;
    image: string;
    ingredients: string[];
    instructions: string[];
}): string {
    const str = JSON.stringify(recipe);
    return crypto.createHash('sha256').update(str).digest('hex');
}
