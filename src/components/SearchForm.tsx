import { ReactNode } from "react";

type SearchFormProps = {
  children: ReactNode;
  onSubmit: () => void;
};

export default function SearchForm({ children, onSubmit }: SearchFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
}
