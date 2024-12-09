// SkillAssociationDrawer.tsx
import { FC, useEffect, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createUserSkillAssociation } from "@/services/userSkillServices";
import { getSkills } from "@/services/skillServices";
import { CheckCircle, Frown, Meh, Smile } from "lucide-react";

const DIFFICULTY_OPTIONS = [
  {
    label: "Dominado",
    value: "dominado",
    icon: <CheckCircle />,
    color: "#36a49f",
  },
  {
    label: "Fácil",
    value: "fácil",
    icon: <Smile />,
    color: "#34d399",
  },
  {
    label: "Médio",
    value: "médio",
    icon: <Meh />,
    color: "#fb923c",
  },
  {
    label: "Difícil",
    value: "difícil",
    icon: <Frown />,
    color: "#ef4444",
  },
];

interface DrowerLibraryProps {
  onAssociationCreated: () => void;
}

const questionSchema = z.object({
  skillId: z.number().min(1, "Selecione uma skill"),
  difficultyRating: z.enum(["fácil", "médio", "difícil", "dominado"], {
    message: "Selecione uma dificuldade",
  }),
});

type FormData = z.infer<typeof questionSchema>;

export const DrowerLibrary: FC<DrowerLibraryProps> = ({ onAssociationCreated }) => {
  const [skills, setSkills] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(questionSchema),
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getSkills();
        setSkills(response);
      } catch (err) {
        setError("Erro ao carregar as habilidades.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleAssociationSubmit = async (data: FormData) => {
    try {
      await createUserSkillAssociation(data.skillId, 1, data.difficultyRating);
      toast.success("Associação criada com sucesso!");
      onAssociationCreated();
    } catch (error) {
      toast.error("Erro ao criar a associação.");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Associe-se com uma habilidade</Button>
      </DrawerTrigger>

      <DrawerContent className="my-12 w-1/3 mx-auto px-28">
          <DrawerHeader className="mb-5 mt-6">
            <DrawerTitle className="text-center">Criar Nova Associação</DrawerTitle>
            <DrawerDescription className="text-center">
              Associe uma habilidade e defina a dificuldade.
            </DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={handleSubmit(handleAssociationSubmit)}
            className="space-y-4"
          >
            <div>
              <Controller
                control={control}
                name="skillId"
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {field.value
                          ? skills.find((skill) => skill.id === field.value)
                              ?.title
                          : "Selecione uma habilidade"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {skills.map((skill) => (
                        <DropdownMenuItem className="w-full"
                          key={skill.id}
                          onClick={() => field.onChange(skill.id)}
                        >
                          {skill.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              {errors.skillId && (
                <p className="text-sm mt-2 text-destructive">
                  {errors.skillId.message}
                </p>
              )}
            </div>

            <div>
              <Controller
                control={control}
                name="difficultyRating"
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {field.value || "Selecione uma dificuldade"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-full">
                      {DIFFICULTY_OPTIONS.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => field.onChange(option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              {errors.difficultyRating && (
                <p className="text-sm mt-2 text-destructive">
                  {errors.difficultyRating.message}
                </p>
              )}
            </div>

            
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                Criar Associação
              </Button>
           
          </form>
        
      </DrawerContent>
    </Drawer>
  );
};
