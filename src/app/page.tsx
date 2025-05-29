"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateRecipe, getFavorites } from "@/lib/requests/recipe";
import RecipeSkeleton from "@/components/RecipeSkeleton";
import RecipeSection from "@/components/RecipeSection";
import SearchInput from "@/components/SearchInput";
import SearchForm from "@/components/SearchForm";
import type { Recipes } from "@/types/recipe";
import { useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const {
    data: favorites,
    isLoading: isLoadingFavorites,
    isError: isErrorFavorites,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    staleTime: 10 * 60 * 1000,
  });

  const { data: suggestedRecipes } = useQuery({
    queryKey: ["suggested"],
    queryFn: () => Promise.resolve([]),
    enabled: false,
  });

  const {
    mutate: generateRecipeMutation,
    isPending: isPendingGenerating,
    isError: isErrorGenerating,
  } = useMutation({
    mutationFn: generateRecipe,
    onError: (error) => {
      console.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["suggested"], data);
    },
  });

  const handleGenerateRecipe = () => {
    if (searchValue.length < 5) {
      setError("Prompt must be at least 5 chars.");
    } else {
      generateRecipeMutation({ prompt: searchValue });
      setError("");
    }
  };

  const handleClear = () => {
    queryClient.setQueryData(["suggested"], []);
    setSearchValue("");
  };

  const renderRecipeSection = ({
    title,
    isLoading,
    isError,
    data,
    showGenerateButton = false,
    onGenerateNew,
  }: {
    title: string;
    isLoading: boolean;
    isError: boolean;
    data?: Recipes;
    showGenerateButton?: boolean;
    onGenerateNew?: () => void;
  }) => {
    if (isLoading) return <RecipeSkeleton />;
    if (isError)
      return <p className="mt-12">Failed to load {title.toLowerCase()}</p>;

    return (
      <RecipeSection
        title={title}
        recipes={data || []}
        showGenerateButton={showGenerateButton}
        onGenerateNew={onGenerateNew}
      />
    );
  };

  const showSuggested =
    !!suggestedRecipes?.length || isPendingGenerating || isErrorGenerating;

  const showClearButton = !!suggestedRecipes?.length && !isPendingGenerating;

  return (
    <div className="max-w-xl mx-auto">
      {isPendingGenerating ? (
        <p>Loading...</p>
      ) : (
        <SearchForm onSubmit={handleGenerateRecipe}>
          <SearchInput
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            onClear={handleClear}
            showClearButton={showClearButton}
          />
        </SearchForm>
      )}

      {error && <div className="text-red-600 text-sm ml-4 mt-2">{error}</div>}

      {!showSuggested
        ? renderRecipeSection({
            title: "Favorites",
            isLoading: isLoadingFavorites,
            isError: isErrorFavorites,
            data: favorites,
          })
        : renderRecipeSection({
            title: "Suggested Recipes",
            isLoading: isPendingGenerating,
            isError: isErrorGenerating,
            data: suggestedRecipes,
            showGenerateButton: true,
            onGenerateNew: handleGenerateRecipe,
          })}
    </div>
  );
}
