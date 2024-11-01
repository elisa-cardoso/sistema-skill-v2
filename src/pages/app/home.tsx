import { Banner } from "@/components/banner";
import { CategoryFilter } from "@/components/categoryFilter";
import { PostCard } from "@/components/postCard";
import { Search } from "@/components/search";
import { Helmet } from "react-helmet-async";
export function Home() {
  return (
    <>
      <Helmet title="Home" />
      <div className="text-center my-10">
        <Banner />
        </div>
        <div className="">
        <Search />
        <CategoryFilter />
        </div> 
        <PostCard />    
    </>
  );
}
