import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Question } from "@/@types/question";
import { toast } from "sonner";
import { getQuestionById, updateQuestion } from "@/services/questionServices";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";  // Importando o Select do ShadCN UI

const questionSchema = z.object({
  questionText: z.string().min(5, "Texto da questão deve ter no mínimo 5 caracteres"),
  optionA: z.string().min(1, "Opção A é obrigatória"),
  optionB: z.string().min(1, "Opção B é obrigatória"),
  optionC: z.string().min(1, "Opção C é obrigatória"),
  optionD: z.string().min(1, "Opção D é obrigatória"),
  correctOption: z.enum(["A", "B", "C", "D"]).refine(value => ["A", "B", "C", "D"].includes(value), {
    message: "Opção correta deve ser uma das alternativas A, B, C ou D"
  }),
});

type FormData = z.infer<typeof questionSchema>;

export function EditQuestion() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(questionSchema),
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getQuestionById(Number(questionId));
        setQuestionData(data);
        if (data) {
          setValue("questionText", data.questionText);
          setValue("optionA", data.optionA);
          setValue("optionB", data.optionB);
          setValue("optionC", data.optionC);
          setValue("optionD", data.optionD);
          setValue("correctOption", data.correctOption);
        }
      } catch (err) {
        setError("Erro ao carregar a questão.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateQuestion(Number(questionId), data);
      toast.success("Questão atualizada com sucesso!");
      navigate(-1);
    } catch (err) {
      toast.error("Erro ao atualizar a questão.");
    }
  };

  if (loading) {
    return <p>Carregando questão...</p>;
  }

  if (error || !questionData) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-8">Editar Questão</h1>
      <div className="flex justify-center">
        <div className="w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="questionText">Pergunta</Label>
              <Controller
                control={control}
                name="questionText"
                render={({ field }) => (
                  <Textarea
                    id="questionText"
                    {...field}
                    required
                    rows={4}
                    className="mt-2"
                  />
                )}
              />
              {errors.questionText && (
                <p className="text-sm mt-2 text-destructive">{errors.questionText.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="optionA">Opção A</Label>
              <Controller
                control={control}
                name="optionA"
                render={({ field }) => (
                  <Textarea
                    id="optionA"
                    {...field}
                    required
                    rows={2}
                    className="mt-2"
                  />
                )}
              />
              {errors.optionA && (
                <p className="text-sm mt-2 text-destructive">{errors.optionA.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="optionB">Opção B</Label>
              <Controller
                control={control}
                name="optionB"
                render={({ field }) => (
                  <Textarea
                    id="optionB"
                    {...field}
                    required
                    rows={2}
                    className="mt-2"
                  />
                )}
              />
              {errors.optionB && (
                <p className="text-sm mt-2 text-destructive">{errors.optionB.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="optionC">Opção C</Label>
              <Controller
                control={control}
                name="optionC"
                render={({ field }) => (
                  <Textarea
                    id="optionC"
                    {...field}
                    required
                    rows={2}
                    className="mt-2"
                  />
                )}
              />
              {errors.optionC && (
                <p className="text-sm mt-2 text-destructive">{errors.optionC.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="optionD">Opção D</Label>
              <Controller
                control={control}
                name="optionD"
                render={({ field }) => (
                  <Textarea
                    id="optionD"
                    {...field}
                    required
                    rows={2}
                    className="mt-2"
                  />
                )}
              />
              {errors.optionD && (
                <p className="text-sm mt-2 text-destructive">{errors.optionD.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="correctOption">Opção Correta</Label>
              <Controller
                control={control}
                name="correctOption"
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Opção A</SelectItem>
                      <SelectItem value="B">Opção B</SelectItem>
                      <SelectItem value="C">Opção C</SelectItem>
                      <SelectItem value="D">Opção D</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.correctOption && (
                <p className="text-sm mt-2 text-destructive">{errors.correctOption.message}</p>
              )}
            </div>
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
