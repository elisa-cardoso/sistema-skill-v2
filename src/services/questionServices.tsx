import { api } from './api';

export const getQuestionsBySkillId = async (skillId: number) => {
    try {
        const response = await api.get(`/questions/skill/${skillId}`);
        return response.data
    } catch (error) {
        console.error('Erro ao buscar questões:', error);
        throw new Error('Erro ao buscar questões.');
    }
};