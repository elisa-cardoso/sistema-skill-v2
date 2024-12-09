import { CategoryFilter } from "@/components/categoryFilter";
import { PostCard } from "@/components/postCard";
import { Search } from "@/components/search";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CarouselHome from "@/components/carouselHome";
import { Banner } from "@/components/banner";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

  const handleSearch = (title: string) => {
    setSearchTitle(title);
    setPageIndex(1);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setPageIndex(1);
  };

  const handleSortChange = (direction: "ASC" | "DESC") => {
    setSortDirection(direction);
  };

  return (
    <>
      <Helmet title="Home" />

      <div className="flex items-center mx-40 ">
        <div>
          <CarouselHome />
        </div>
      </div>
      <div className="text-center mt-20 mb-10">
        <Banner />
      </div>
      <div className="flex mx-96 items-center gap-4">
        <div className="flex-1">
          <Search onSearch={handleSearch} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center px-4 py-2 text-sm border rounded-md">
              Ordenação <ChevronDown className="ml-2" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem onClick={() => handleSortChange("ASC")}>
              Filtro de A-Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("DESC")}>
              Filtro de Z-A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4">
        <CategoryFilter onSelectCategory={handleCategorySelect} />
      </div>

      <PostCard
        selectedCategory={selectedCategory}
        searchTitle={searchTitle}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        sortDirection={sortDirection}
      />
    </>
  );
}
