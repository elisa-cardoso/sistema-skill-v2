import { UserSkill } from "@/@types/userSkill";
import { api } from "./api";

export const getAssociation = async (): Promise<UserSkill[]> => {
    try {
      const response = await api.get("/user_skills");
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Erro desconhecido");
    }
  };

  export const deleteAssociation = async (id: number) => {
    try {
      await api.delete(`/user_skills/${id}`);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Erro desconhecido");
    }
  };