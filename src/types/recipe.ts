type Recipe = {
    id: number;
    title: string;
    duration: string;
    favorite: boolean;
    image: string;
    ingredients: string[];
    instructions: string[];
    hash: string;
};

type Recipes = Recipe[];