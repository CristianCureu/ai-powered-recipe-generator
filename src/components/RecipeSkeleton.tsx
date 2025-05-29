import { Skeleton } from "./ui/skeleton";

export default function RecipeSkeleton() {
  return (
    <div className="grid gap-4 mt-12">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
