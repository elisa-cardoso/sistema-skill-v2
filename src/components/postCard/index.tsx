import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useCallback } from "react";
import { getSkillsByTitleAndCategory } from "@/services/skillServices";
import { Skills } from "@/@types/skills";
import { debounce } from "lodash";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Pagination } from "../pagination";

interface PostCardProps {
  selectedCategory: number | null;
  searchTitle: string;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  sortDirection: "ASC" | "DESC";
}

export function PostCard({
  selectedCategory,
  searchTitle,
  pageIndex,
  setPageIndex,
  sortDirection,
}: PostCardProps) {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage] = useState<number>(10);

  const fetchSkills = useCallback(
    debounce(async (categoryId: number | null, title: string, page: number, size: number, sortDirection: "ASC" | "DESC") => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSkillsByTitleAndCategory(categoryId, title, page, size, sortDirection);
        setSkills(data.skills);
        setTotalCount(data.totalElements);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Erro ao carregar conhecimentos.");
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    setLoading(true);
    fetchSkills(selectedCategory, searchTitle, pageIndex, perPage, sortDirection);

    return () => {
      fetchSkills.cancel();
    };
  }, [selectedCategory, searchTitle, pageIndex, perPage, sortDirection, fetchSkills]);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  return (
    <div>
      {loading ? (
        <div className="flex flex-wrap justify-center mt-8 gap-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="w-80">
              <Skeleton className="h-48 w-full mb-4 rounded-md" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-4/5 mb-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center mt-8 gap-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="w-80 bg-transparent shadow-md">
              <CardHeader>
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  src={skill.image}
                  alt={skill.title}
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{skill.title}</CardTitle>
                <div className="text-primary text-sm flex flex-wrap gap-1">
                  {skill.category.map((category) => (
                    <span
                      key={category.id}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs mt-2"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
                <CardDescription className="text-clamp mt-4">
                  {skill.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex space-x-2">
                <Link to={`/habilidade/${skill.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <span className="sr-only">Visualizar habilidade.</span>
                    Saiba Mais
                  </Button>
                </Link>
                <Link to={`/questoes/habilidade/${skill.id}`} className="flex-1">
                  <Button className="w-full">
                    <span className="sr-only">Iniciar teste de nivelamento.</span>
                    Iniciar Teste
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        perPage={perPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
