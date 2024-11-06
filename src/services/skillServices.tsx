import { Skills, UpdateSkillType } from "@/@types/skills";
import { api } from "./api";
import { getSkillsByCategory } from "./categoryServices";


export async function getSkills(): Promise<Skills[]> {
  const response = await api.get<Skills[]>("/skill");
  return response.data;
}

export async function getSkillsByTitle(title: string): Promise<Skills[]> {
  const response = await api.get<Skills[]>(`/skill/search?title=${title}`);
  return response.data;
}

// melhorar no back
export async function getSkillsByTitleAndCategory(categoryId: number | null, title: string | null): Promise<Skills[]> {
  if (categoryId && title) {
    const skillsByCategory = await getSkillsByCategory(categoryId);
    return skillsByCategory.filter((skill) =>
      skill.title.toLowerCase().includes(title.toLowerCase())
    );
  } else if (categoryId) {
    return getSkillsByCategory(categoryId);
  } else if (title) {
    return getSkillsByTitle(title);
  } else {
    return getSkills();
  }
}

export async function getSkillById(id: number) {
  const response = await api.get(`/skill/${id}`);
  return response.data;
}

export async function deleteSkill(id: number): Promise<void> {
  await api.delete(`/skill/${id}`);
}

export async function updateSkill(id: number, data: UpdateSkillType): Promise<void> {
  try {
    await api.put(`/skill/${id}`, data);
    console.log("Skill atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar a habilidade:", error);
    throw new Error("Erro ao atualizar a habilidade");
  }
}