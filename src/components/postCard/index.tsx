import { useEffect, useState } from "react";
import { getSkillsByTitleAndCategory } from "@/services/skillServices";
import { Skills } from "@/@types/skills";
import { ClipLoader } from "react-spinners";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

import "./styles.css";
import { Link } from "react-router-dom";
import { Pagination } from "../pagination";

interface PostCardProps {
  selectedCategory: number | null;
  searchTitle: string;
}

export function PostCard({ selectedCategory, searchTitle }: PostCardProps) {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0); 
  const [totalCount, setTotalCount] = useState<number>(0);
  const [perPage] = useState<number>(10); 

  useEffect(() => {
    async function fetchSkills() {
      setLoading(true);
      setError(null);

      try {
        const data = await getSkillsByTitleAndCategory(
          selectedCategory,
          searchTitle,
          pageIndex,
          perPage
        );
        setSkills(data.content);
        setTotalCount(data.totalElements);
      } catch (err) {
        setError("Erro ao carregar conhecimentos.");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, [selectedCategory, searchTitle,pageIndex]);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex); 
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="var(--primary)" loading={loading} size={50} />
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <p className="text-center">
        Nenhum conhecimento encontrado para esta categoria.
      </p>
    );
  }

  return (
    <div>
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
              <Link to={`/questoes/habilidade/${skill.id}`}  className="flex-1">
                <Button className="w-full">
                  <span className="sr-only">Iniciar teste de nivelamento.</span>
                  Iniciar Teste
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination
        pageIndex={pageIndex}
        totalCount={totalCount}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
