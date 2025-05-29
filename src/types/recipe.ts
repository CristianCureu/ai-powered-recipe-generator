export type Recipe = {
  id: number;
  title: string;
  duration: string;
  favorite: boolean;
  image: string;
  ingredients: string[];
  instructions: string[];
  hash: string;
};

export type Recipes = Recipe[];
