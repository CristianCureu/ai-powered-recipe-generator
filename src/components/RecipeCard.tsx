import Link from "next/link";
import { Card } from "./ui/card";
import Image from "next/image";
import ToggleFavorite from "@components/ToggleFavorite";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="block">
      <Card className="flex items-center flex-row justify-between py-2 px-4 h-full hover:shadow-md transition bg-gray-200">
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={"/placeholder.png"}
            alt={recipe.title}
            width={64}
            height={64}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-1 px-4 h-full">
          <h3 className="font-semibold">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground">{recipe.duration} min.</p>
        </div>

        <ToggleFavorite recipe={recipe} />
      </Card>
    </Link>
  );
}
