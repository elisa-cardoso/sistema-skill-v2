import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryServices";

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  onSelectCategory: (categoryId: number | null) => void;
}

export function CategoryFilter({ onSelectCategory }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null); 

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data)) 
      .catch(() => setCategories([])); 
  }, []);

  const handleCategorySelect = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      onSelectCategory(null);
    } else {
      setSelectedCategory(categoryId);
      onSelectCategory(categoryId);
    }
  };

  
  if (categories === null) return <p className="text-center">Carregando categorias...</p>;
  
  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="blue"
          className={`text-sm ${selectedCategory === category.id ? 'bg-blue-500 text-white' : ''}`}
          size="sm"
          onClick={() => handleCategorySelect(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
