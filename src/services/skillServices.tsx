import { Skills } from "@/@types/skills";
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