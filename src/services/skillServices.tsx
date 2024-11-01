import { Skills } from "@/@types/skills";
import { api } from "./api";


export async function getSkills(): Promise<Skills[]> {
  const response = await api.get<Skills[]>("/skill");
  return response.data;
}