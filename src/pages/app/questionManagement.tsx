import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Pencil, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getQuestionsBySkillId, deleteQuestion } from "@/services/questionServices";
import { Question } from "@/@types/question";
import { toast } from "sonner";

import '../stylesLineTable.css'

export function QuestionManagement() {
  const { skillId } = useParams<{ skillId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const data: Question[] = await getQuestionsBySkillId(Number(skillId));
        setQuestions(data);
      } catch (err) {
        setError("Erro ao carregar as questões.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [skillId]);

  const handleDelete = async (questionId: number) => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir esta questão?"
    );
    if (confirmDelete) {
      try {
        await deleteQuestion(questionId);
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
        toast.success("Questão excluída com sucesso!");
      } catch (err) {
        setError("Erro ao excluir a questão.");
        toast.error("Erro ao excluir a questão.");
      }
    }
  };

  if (loading) {
    return <p className="text-center">Carregando questões...</p>;
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="my-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Edição de Questões</h1>
        <p>Gerencie e edite as questões para essa habilidade específica.</p>
      </div>
      <div className="flex mb-8 justify-center">
        <div className="w-full">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Questão</TableHead>
                  <TableHead className="w-[200px]">Opção A</TableHead>
                  <TableHead className="w-[200px]">Opção B</TableHead>
                  <TableHead className="w-[200px]">Opção C</TableHead>
                  <TableHead className="w-[200px]">Opção D</TableHead>
                  <TableHead className="w-[150px]">Correta</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead className="w-[100px]">
                      <Link to={`/questoes/criar/${skillId}`}>
                        <Button size="xs">
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Adicionar questão.</span>
                          Adicionar
                        </Button>
                      </Link>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                     <TableCell className="line-clamp-2 table-cell">{question.questionText}</TableCell>
                    <TableCell className="line-clamp-2 table-cell">{question.optionA}</TableCell>
                    <TableCell className="line-clamp-2 table-cell">{question.optionB}</TableCell>
                    <TableCell className="line-clamp-2 table-cell">{question.optionC}</TableCell>
                    <TableCell className="line-clamp-2 table-cell">{question.optionD}</TableCell>
                    <TableCell className="line-clamp-2 table-cell font-bold">{question.correctOption}</TableCell>
                    <TableCell className="flex gap-2">
                      <Link to={`/questoes/editar/${question.id}`}>
                        <Button variant="outline" size="xs">
                          <Pencil className="mr-2 h-3 w-3" />
                          Editar
                        </Button>
                      </Link>
                      </TableCell>
                      <TableCell>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleDelete(question.id)}
                        className="text-destructive color-destructive"
                      >
                        <Trash className="mr-2 h-3 w-3" />
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
