import ToggleFavorite from "@components/ToggleFavorite";
import FallbackImage from "@components/FallbackImage";
import type { Recipe } from "@/types/recipe";
import { Card } from "./ui/card";
import Link from "next/link";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <Card className="flex items-center flex-row justify-between py-2 px-4 h-full hover:shadow-md transition bg-gray-200">
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <FallbackImage
            src={recipe.image || ""}
            alt={recipe.title}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 px-4 h-full">
          <h3 className="font-semibold">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground">{recipe.duration}</p>
        </div>

        <ToggleFavorite recipe={recipe} />
      </Card>
    </Link>
  );
}
