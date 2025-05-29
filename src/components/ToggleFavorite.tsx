"use client";

import { Recipe } from "@/generated/prisma";
import { useToggleFavorite } from "@/lib/mutations/useToggleFavorite";
import { Heart } from "lucide-react";
import React from "react";

type ToggleLikeProps = {
  recipe: Recipe;
};

export default function ToggleFavorite({ recipe }: ToggleLikeProps) {
  const { mutate: toggleFavorite } = useToggleFavorite();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite({ id: recipe.id, value: !recipe.favorite });
  };

  return (
    <Heart
      className={`cursor-pointer min-w-6 min-h-6 ${
        recipe?.favorite ? "fill-black" : "stroke-black"
      }`}
      onClick={handleToggleFavorite}
    />
  );
}
