import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFavorite } from "@/lib/requests/recipe";

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, value }: { id: number; value: boolean }) =>
      toggleFavorite(id, value),

    onMutate: async ({ id, value }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousFavorites = queryClient.getQueryData<Recipe[]>([
        "favorites",
      ]);

      queryClient.setQueryData<Recipe[]>(["favorites"], (old) =>
        old
          ?.map((recipe) =>
            recipe.id === id ? { ...recipe, favorite: value } : recipe,
          )
          .filter((recipe) => recipe.id !== id),
      );

      queryClient.setQueryData<Recipe[]>(
        ["suggested"],
        (old) =>
          old?.map((recipe) =>
            recipe.id === id ? { ...recipe, favorite: value } : recipe,
          ) ?? [],
      );

      queryClient.setQueryData<Recipe>(["recipe", id], (old) =>
        old?.id === id ? { ...old, favorite: value } : old,
      );

      return { previousFavorites };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
