import { Skills } from "./skills";

interface Question {
  id: number;
  skill: Skills;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}
interface ValidationResponse {
  correctOption: boolean;
  isCorrect: boolean;
}
