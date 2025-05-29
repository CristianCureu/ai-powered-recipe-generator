import RecipeCard from "./RecipeCard";

type RecipeSectionProps = {
  title: string;
  recipes: Recipes;
  showGenerateButton?: boolean;
  onGenerateNew?: () => void;
};

export default function RecipeSection({
  title,
  recipes,
  showGenerateButton,
  onGenerateNew,
}: RecipeSectionProps) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>

      <div className="grid gap-4">
        {recipes.length === 0 ? (
          <p>No recipes</p>
        ) : (
          recipes.map((recipe) => <RecipeCard key={recipe.title} recipe={recipe} />)
        )}
      </div>

      {showGenerateButton && onGenerateNew && (
        <div className="mt-6 flex justify-center">
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 cursor-pointer"
            onClick={onGenerateNew}
          >
            I don't like these
          </button>
        </div>
      )}
    </div>
  );
}
