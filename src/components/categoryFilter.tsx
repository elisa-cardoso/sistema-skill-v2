import { Button } from "./ui/button";

const categories = [
  "Categoria 1",
  "Categoria 2",
  "Categoria 3",
  "Categoria 4",
  "Categoria 5",
];

export function CategoryFilter() {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {categories.map((category, index) => (
        <Button key={index} variant="blue" className="text-sm" size='sm'>
          {category}
        </Button>
      ))}
    </div>
  );
}