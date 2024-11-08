import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createQuestion } from "@/services/questionServices";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export function CreateQuestion() {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(questionSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createQuestion(Number(skillId), data);
      toast.success("Questão criada com sucesso!");
      navigate(-1);
    } catch (err) {
      toast.error("Erro ao criar a questão.");
    }
  };

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-8">Criar Nova Questão</h1>
      <div className="flex justify-center">
        <div className="w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="questionText">Texto da Questão</Label>
              <Controller
                control={control}
                name="questionText"
                render={({ field }) => (
                  <Textarea
                    id="questionText"
                    {...field}
                    required
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
                  <Input
                    id="optionA"
                    {...field}
                    required
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
                  <Input
                    id="optionB"
                    {...field}
                    required
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
                  <Input
                    id="optionC"
                    {...field}
                    required
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
                  <Input
                    id="optionD"
                    {...field}
                    required
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
                    value={field.value || ""}
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
            <div>
              <Button className="mt-4" type="submit">Criar Questão</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
