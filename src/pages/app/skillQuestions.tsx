import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '@/@types/question';
import { getQuestionsBySkillId } from '@/services/questionServices';

export function SkillQuestions() {
  const { skillId } = useParams<{ skillId: string }>(); 
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getQuestionsBySkillId(Number(skillId));

        setQuestions(data);
      } catch (err) {
        setError('Erro ao carregar questões.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [skillId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question.id}>
            <p>{question.questionText}</p>
            <ul>
              <li>{question.optionA}</li>
              <li>{question.optionB}</li>
              <li>{question.optionC}</li>
              <li>{question.optionD}</li>
            </ul>
          </div>
        ))
      ) : (
        <p>Nenhuma questão encontrada para essa habilidade.</p>
      )}
    </div>
  );
}
