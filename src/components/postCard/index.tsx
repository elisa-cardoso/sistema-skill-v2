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

interface PostCardProps {
  selectedCategory: number | null;
  searchTitle: string;
}

export function PostCard({ selectedCategory, searchTitle }: PostCardProps) {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      setLoading(true);
      setError(null);

      try {
        const data = await getSkillsByTitleAndCategory(
          selectedCategory,
          searchTitle
        );
        setSkills(data);
      } catch (err) {
        setError("Erro ao carregar conhecimentos.");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, [selectedCategory, searchTitle]);

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
    <div className="flex flex-wrap justify-center gap-4">
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
                  {category.name}{" "}
                </span>
              ))}
            </div>
            <CardDescription className="description-clamp mt-4">
              {skill.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex space-x-2">
            <Link to={`/habilidade/${skill.id}`}>
              <Button variant="outline" className="flex-1">
                Saiba Mais
              </Button>
            </Link>
            <Button className="flex-1">Iniciar Teste</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
