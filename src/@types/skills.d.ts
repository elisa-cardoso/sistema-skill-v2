import { Category } from "./category";

export interface Skills {
    id: number;
    image: string;
    title: string;
    category: Category[];
    description: string;
  }