import { useEffect, useState } from "react";
import { getSkills } from "@/services/skillServices";
import { Skills } from "@/@types/skills";
import { ClipLoader } from "react-spinners";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { getSkillsByCategory } from "@/services/categoryServices";

interface PostCardProps {
  selectedCategory: number | null; 
}

export function PostCard({ selectedCategory }: PostCardProps) {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      setLoading(true);
      setError(null);
      try {
        const data = selectedCategory
          ? await getSkillsByCategory(selectedCategory)
          : await getSkills(); 
        setSkills(data);
      } catch (err) {
        setError("Erro ao carregar conhecimentos.");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="var(--primary)" loading={loading} size={50} />
      </div>
    );
  }

  if (skills.length === 0) {
    return <p className="text-center">Nenhum conhecimento encontrado para esta categoria.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
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
            <div className="text-primary mb-2">{skill.categoryIds}</div>
            <CardDescription>{skill.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button>Saiba Mais</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
