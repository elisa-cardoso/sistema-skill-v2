import { Banner } from "@/components/banner";
import { CategoryFilter } from "@/components/categoryFilter";
import { PostCard } from "@/components/postCard";
import { Search } from "@/components/search";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>("");

  return (
    <>
      <Helmet title="Home" />
      <div className="text-center my-10">
        <Banner />
        </div>
        <div className="">
        <Search onSearch={setSearchTitle} />
        <CategoryFilter onSelectCategory={setSelectedCategory} />
        </div> 
        <PostCard selectedCategory={selectedCategory} searchTitle={searchTitle} />    
    </>
  );
}
