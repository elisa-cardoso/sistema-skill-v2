import { useEffect, useState } from "react";
import { Pencil, Plus, Search, Trash } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteSkill, getSkills } from "@/services/skillServices";
import { Skills } from "@/@types/skills";
import { Link } from "react-router-dom";
import { toast } from "sonner"; 

export function SkillManagement() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getSkills();
        setSkills(data);
      } catch (err) {
        setError("Erro ao carregar as habilidades.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir esta habilidade?"
    );
    if (confirmDelete) {
      try {
        await deleteSkill(id);
        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill.id !== id)
        ); 
        toast.success("Habilidade excluída com sucesso!"); 
      } catch (err) {
        setError("Erro ao excluir a habilidade.");
        toast.error("Erro ao excluir a habilidade."); 
      }
    }
  };

  if (loading) {
    return <p className="text-center">Carregando habilidades...</p>;
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  return (
    <>
      <Helmet title="Gerenciar conhecimento" />
      <div className="flex flex-col gap-2 my-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Gerenciamento da Biblioteca
        </h1>
        <p>Ajude a manter os conhecimentos sempre atualizados e didáticos!</p>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[250px]">Título</TableHead>
                  <TableHead className="w-[250px]">Autor</TableHead>
                  <TableHead>Categorias</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]">
                  <Link to={`/habilidade/criar`}>
                    <Button size="xs">
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Adicionar conhecimento.</span>
                      Adicionar
                    </Button>
                    </Link>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell>
                      <Link to={`/habilidade/${skill.id}`}>
                        <Button variant="outline" size="xs">
                          <Search className="h-3 w-3" />
                          <span className="sr-only">
                            Visualizar habilidade.
                          </span>
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">{skill.title}</TableCell>
                    <TableCell className="font-medium">Autor</TableCell>
                    <TableCell className="font-medium">
                      {skill.category.map((category) => (
                        <span
                          key={category.id}
                          className="bg-secondary ml-2 text-secondary-foreground px-2 py-1 rounded-full text-xs mt-2"
                        >
                          {category.name}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Link to={`/habilidade/editar/${skill.id}`}>
                        <Button variant="outline" size="xs">
                          <Pencil className="mr-2 h-3 w-3" />
                          Editar
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Button
                        className="text-destructive color-destructive"
                        variant="ghost"
                        size="xs"
                        onClick={() => handleDelete(skill.id)}
                      >
                        <Trash className="mr-2 h-3 w-3" />
                        <span className="sr-only">Deletar conhecimento.</span>
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
