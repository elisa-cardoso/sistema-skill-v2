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
import { UserSkill } from "@/@types/userSkill";
import {
  getAssociation,
  deleteAssociation,
  toggleFavorite,
} from "@/services/userSkillServices";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export function Library() {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    } catch (error) {
      setError("Erro ao excluir a habilidade.");
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
    } catch (error) {
      setError("Erro ao favoritar/desfavoritar a habilidade.");
    }
  };

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-2 my-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Minha biblioteca</h1>
        <p>Gerencie os conhecimentos da sua estante virtual!</p>
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
                <button
                  className="absolute top-2 right-2 text-2xl"
                  onClick={() => handleFavoriteToggle(userSkill.id)}
                >
                  {userSkill.favorite ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
              </CardHeader>
              <CardContent>
                <CardTitle>{userSkill.skillName}</CardTitle>
                <CardDescription>
                  <div>
                    <div className="text-primary my-4 text-sm flex gap-1">
                      {renderStars(userSkill.level)}
                    </div>
                  </div>
                  <p className="text-clamp mt-2">{userSkill.description}</p>
                </CardDescription>
              </CardContent>
              <CardFooter className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(userSkill.id)}
                >
                  <span className="sr-only">Excluir habilidade.</span>
                  Excluir Associação
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
