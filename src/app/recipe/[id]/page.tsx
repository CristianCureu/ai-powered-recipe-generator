"use client";

import RecipeSkeleton from "@/components/RecipeSkeleton";
import ToggleLike from "@/components/ToggleFavorite";
import { getRecipeById } from "@/lib/requests/recipe";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function RecipePage() {
  const { id } = useParams();
  const recipeId = Number(id);

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeById(recipeId),
  });

  console.log(recipe);

  if (isLoading) return <RecipeSkeleton />;
  if (isError) return <p>Error while fetching recipe.</p>;

  return (
    <div className="flex min-h-full">
      {/* Left */}
      <div className="flex-1 px-4 lg:px-10">
        <Image
          src={"/placeholder.png"}
          alt={"recipe"}
          width={100}
          height={100}
          className="object-contain w-full bg-gray-200"
        />

        <div className="flex w-full justify-between mt-12">
          <div>
            <h2 className="text-xl font-bold">{recipe?.title}</h2>
            <p>{recipe?.duration}</p>
          </div>
          <div className="self-center lg:self-start">{recipe && <ToggleLike recipe={recipe} />}</div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 px-4 lg:px-10">
        <section className="mb-10">
          <h3>Ingredients:</h3>
          <ul>
            {Array.isArray(recipe?.ingredients) &&
              recipe.ingredients.map((item, index) =>
                typeof item === "string" ? <li key={index}>{item}</li> : null
              )}
          </ul>
        </section>

        <section>
          <h3>Instructions:</h3>
          <ol className="list-decimal list-inside">
            {Array.isArray(recipe?.instructions) &&
              recipe.instructions.map((item, index) =>
                typeof item === "string" ? <li key={index}>{item}</li> : null
              )}
          </ol>
        </section>
      </div>
    </div>
  );
}
