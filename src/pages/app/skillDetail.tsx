import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skills } from "@/@types/skills";
import { ClipLoader } from "react-spinners";
import { getSkillById } from "@/services/skillServices";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/markdownRenderer";

export function SkillDetail() {
  const { id } = useParams<{ id: string }>();
  const [skill, setSkill] = useState<Skills | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkill() {
      setLoading(true);
      setError(null);

      try {
        const data = await getSkillById(Number(id));
        setSkill(data);
      } catch (err) {
        setError("Erro ao carregar detalhes da habilidade.");
      } finally {
        setLoading(false);
      }
    }

    fetchSkill();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="var(--primary)" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  if (!skill) {
    return <p className="text-center">Habilidade não encontrada.</p>;
  }

  return (
    <div className="flex justify-center min-h-screen">
    <div className="w-2/3 flex flex-col items-center">
      <img
        className="w-full h-80 object-cover rounded-lg mt-4"
        alt={skill.title}
        src={skill.image}
      />
      <div className="flex flex-col mt-4 w-4/5">
        <div className="flex justify-between w-full mt-8">
          <h1 className="text-4xl font-black">{skill.title}</h1>
          <Button className="ml-4">Iniciar Teste</Button>
        </div>
        
        <div className="flex justify-start gap-2 mt-2">
          {skill.category.map((category) => (
            <span
              key={category.id}
              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
            >
              {category.name}
            </span>
          ))}
        </div>
  
        <div className="mt-10 w-full">
          <MarkdownRenderer content={skill.description} />
        </div>
      </div>
    </div>
  </div>
  );
}
