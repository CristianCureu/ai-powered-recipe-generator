import { Input } from "@components/ui/input";
import { Search, X } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  showClearButton?: boolean;
};

export default function SearchInput({
  value,
  onChange,
  onClear,
  showClearButton,
}: SearchInputProps) {
  return (
    <div className="relative">
      {showClearButton ? (
        <X
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer text-muted-foreground"
          onClick={onClear}
        />
      ) : (
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
      <Input
        className="rounded-3xl"
        placeholder="What do you feel like eating?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
