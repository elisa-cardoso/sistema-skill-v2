import { Question, ValidationResponse } from '@/@types/question';
import { api } from './api';

export const getQuestionsBySkillId = async (skillId: number): Promise<Question[]> => {
    try {
        const response = await api.get(`/questions/skill/${skillId}`);
        return response.data
    } catch (error) {
        console.error('Erro ao buscar questões:', error);
        throw new Error('Erro ao buscar questões.');
    }
};

export const getValidAnswer = async (questionId: number, selectedAnswer: string): Promise<boolean> => {
  try {
    const response = await api.post<ValidationResponse>(`/questions/${questionId}/validate`, {
      answer: selectedAnswer,
    });
    console.log('Resultado da validação:', response.data);

    return response.data.isCorrect;
  } catch (error) {
    console.error('Erro na validação da resposta:', error);
    return false;
  }
};