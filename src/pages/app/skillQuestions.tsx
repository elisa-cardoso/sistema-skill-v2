import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '@/@types/question';
import { getQuestionsBySkillId, getUserSkillLevel, getValidAnswer } from '@/services/questionServices';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export function SkillQuestions() {
  const { skillId } = useParams<{ skillId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [userLevel, setUserLevel] = useState<number | null>(null);
  const [userScore, setUserScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data: Question[] = await getQuestionsBySkillId(Number(skillId));
        setQuestions(data);
      } catch (err) {
        setError('Erro ao carregar questões.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [skillId]);


  const validateAnswer = async () => {
    if (!selectedAnswer) {
      setFeedback("Selecione uma resposta.");
      return;
    }

    try {
      const question = questions[currentQuestionIndex];
      const response = await getValidAnswer(question.id, selectedAnswer);

      if (response) {
        const { correct, score, level } = response;
  
        if (correct) {
          setFeedback("Correto! Avançando para a próxima pergunta.");
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setSelectedAnswer(null);
        } else {
          setFeedback("Resposta incorreta. Tente novamente.");
        }
        setUserScore(score);
        setUserLevel(level);
      } else {
        setFeedback("Erro ao validar a resposta. Tente novamente.");
      }
  
    } catch (error) {
      console.error('Erro ao validar a resposta:', error);
      setFeedback("Erro ao validar a resposta.");
    }
  };


  useEffect(() => {
    const fetchUserSkillLevel = async () => {
      if (currentQuestionIndex >= questions.length) {
        try {
          const { level, score } = await getUserSkillLevel(Number(skillId));
          setUserLevel(level);
          setUserScore(score);
        } catch (error) {
          console.error("Erro ao obter nível do usuário:", error);
        }
      }
    };
    fetchUserSkillLevel();
  }, [currentQuestionIndex, questions.length, skillId]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {currentQuestionIndex < questions.length ? (
        <div key={currentQuestion.id}>
          <p>{currentQuestion.questionText}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Checkbox
                checked={selectedAnswer === 'A'}
                onCheckedChange={() => setSelectedAnswer('A')}
              />
              {currentQuestion.optionA}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Checkbox
                checked={selectedAnswer === 'B'}
                onCheckedChange={() => setSelectedAnswer('B')}
              />
              {currentQuestion.optionB}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Checkbox
                checked={selectedAnswer === 'C'}
                onCheckedChange={() => setSelectedAnswer('C')}
              />
              {currentQuestion.optionC}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Checkbox
                checked={selectedAnswer === 'D'}
                onCheckedChange={() => setSelectedAnswer('D')}
              />
              {currentQuestion.optionD}
            </label>
          </div>
          <Button onClick={validateAnswer} disabled={!selectedAnswer}>
            Confirmar Resposta
          </Button>
          {feedback && <p>{feedback}</p>}
        </div>
      ) : (
        <div>
          <p>Parabéns! Você completou todas as questões.</p>
          <p>Seu Nível: {userLevel}</p>
          <p>Sua Pontuação: {userScore}</p>
        </div>
      )}
    </div>
  );
}
