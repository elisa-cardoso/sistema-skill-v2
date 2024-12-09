import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { UserSkill } from "@/@types/userSkill";
import {
  getAssociation,
  deleteAssociation,
  toggleFavorite,
  updateSkillDifficulty,
} from "@/services/userSkillServices";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import {
  CheckCircle,
  ChevronDown,
  Frown,
  Meh,
  Smile,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import { DrowerLibrary } from "@/components/drawerLibrary";

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

export function Library() {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const getUserSkills = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAssociation();
        setUserSkills(data);
      } catch (err) {
        setError("Erro ao carregar as habilidades.");
      } finally {
        setLoading(false);
      }
    };

    getUserSkills();
  }, []);

  const renderStars = (level: number) => {
    const fullStars = Math.floor(level);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index + fullStars} className="text-yellow-500" />
        ))}
      </>
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAssociation(id);
      setUserSkills((prevSkills) =>
        prevSkills.filter((skill) => skill.id !== id)
      );
      toast.success("Habilidade excluída com sucesso!");
    } catch (error) {
      setError("Erro ao excluir a habilidade.");
      toast.error("Erro ao excluir a habilidade.");
    }
  };

  const handleFavoriteToggle = async (userSkillId: number) => {
    try {
      const updatedSkill: UserSkill = await toggleFavorite(userSkillId);
      setUserSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === userSkillId
            ? { ...skill, favorite: updatedSkill.favorite }
            : skill
        )
      );
      const action = updatedSkill.favorite ? "favoritada" : "desfavoritada";
      toast.success(`Habilidade ${action}!`);
    } catch (error) {
      setError("Erro ao favoritar/desfavoritar a habilidade.");
      toast.error("Erro ao favoritar/desfavoritar a habilidade.");
    }
  };

  const handleUpdateDifficultyRating = async (
    skillId: number,
    difficultyRating: string
  ) => {
    try {
      const updatedSkill: UserSkill = await updateSkillDifficulty(
        skillId,
        difficultyRating
      );
      console.log("Habilidade atualizada com sucesso:", updatedSkill);
      setUserSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.skillId === skillId
            ? { ...skill, difficultyRating: updatedSkill.difficultyRating }
            : skill
        )
      );
      setSelectedDifficulties((prev) => ({
        ...prev,
        [skillId]: difficultyRating,
      }));
      toast.success("Dificuldade atualizada com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar a dificuldade da habilidade.");
      toast.error("Erro ao atualizar a dificuldade da habilidade.");
    }
  };
  const fetchUserSkills = async () => {
    try {
      const data = await getAssociation();
      setUserSkills(data);
    } catch (err) {
      console.error("Erro ao carregar as habilidades.", err);
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, []);

  const handleAssociationCreated = () => {
    fetchUserSkills();
  };

  return (
    <div>
      <div className="flex flex-col gap-2 my-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Minha biblioteca</h1>
        <p>Gerencie os conhecimentos da sua estante virtual!</p>
      </div>
      <div className="my-8 text-center">
        <Button>
        <DrowerLibrary onAssociationCreated={handleAssociationCreated} />
        </Button>

      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="var(--primary)" loading={loading} size={50} />
        </div>
      ) : userSkills.length === 0 ? (
        <p className="text-center">Nenhuma habilidade associada ao usuário.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mt-14">
          {userSkills.map((userSkill) => (
            <Card
              key={userSkill.id}
              className="w-80 bg-transparent shadow-md flex flex-col"
            >
              <CardHeader className="relative">
                <img
                  src={userSkill.image}
                  alt={userSkill.skillName}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="favorite"
                  className="absolute top-2 right-2 rounded-full w-12 h-12"
                  onClick={() => handleFavoriteToggle(userSkill.id)}
                >
                  {userSkill.favorite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <CardTitle>{userSkill.skillName}</CardTitle>
                <CardDescription>
                  <div>
                    <div className="text-primary my-4 text-sm flex gap-1">
                      {renderStars(userSkill.level)}
                    </div>
                  </div>
                  <div className="text-clamp mt-2">{userSkill.description}</div>
                </CardDescription>
              </CardContent>
              <CardFooter className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(userSkill.id)}
                >
                  <Trash />
                  Deletar
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1"
                      style={{
                        color: selectedDifficulties[userSkill.skillId]
                          ? DIFFICULTY_OPTIONS.find(
                              (option) =>
                                option.value ===
                                selectedDifficulties[userSkill.skillId]
                            )?.color
                          : DIFFICULTY_OPTIONS.find(
                              (option) =>
                                option.value === userSkill.difficultyRating
                            )?.color,
                      }}
                    >
                      {
                        DIFFICULTY_OPTIONS.find(
                          (option) =>
                            option.value ===
                            (selectedDifficulties[userSkill.skillId] ||
                              userSkill.difficultyRating)
                        )?.icon
                      }
                      {selectedDifficulties[userSkill.skillId] ||
                        userSkill.difficultyRating ||
                        "Dificuldade"}
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {DIFFICULTY_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => {
                          console.log("Dificuldade selecionada:", option.value);
                          handleUpdateDifficultyRating(
                            userSkill.skillId,
                            option.value
                          );
                        }}
                      >
                        <span
                          className="inline-flex items-center gap-2"
                          style={{ color: option.color }}
                        >
                          {option.icon}
                          {option.label}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
