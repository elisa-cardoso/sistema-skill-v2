import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '@/@types/question';
import { getQuestionsBySkillId, getUserSkillLevel, getValidAnswer } from '@/services/questionServices';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import Lottie from 'react-lottie';
import animationData from '../../../assets/Animation - 1731035297347.json' 

export function SkillQuestions() {
  const { skillId } = useParams<{ skillId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userLevel, setUserLevel] = useState<number | null>(null);
  const [userScore, setUserScore] = useState<number | null>(null);

  const progressPercentage = Math.round((currentQuestionIndex / questions.length) * 100);

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
      toast.error("Selecione uma resposta.");
      return;
    }

    try {
      const question = questions[currentQuestionIndex];
      const response = await getValidAnswer(question.id, selectedAnswer);

      if (response) {
        const { correct, score, level } = response;
  
        if (correct) {
          toast.success("Correto! Avançando para a próxima pergunta.");
          setUserScore(score);
          setUserLevel(level);
        } else {
          toast.error("Resposta incorreta.");
        }
        
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        
      } else {
        toast.error("Erro ao validar a resposta. Tente novamente.");
      }
  
    } catch (error) {
      console.error('Erro ao validar a resposta:', error);
      toast.error("Erro ao validar a resposta.");
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
          toast.error("Erro ao obter nível do usuário.");
        }
      }
    };
    fetchUserSkillLevel();
  }, [currentQuestionIndex, questions.length, skillId]);

  if (loading) return <div className="text-center">Carregando...</div>;
  if (error) return <div className="text-center">{error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full my-8">
      {/* Barra de progresso centralizada */}
      <Progress value={progressPercentage} className="mt-4 mb-16 w-3/4 md:w-2/4" />

      {currentQuestionIndex < questions.length ? (
        <Card className="w-full md:w-2/4 p-4 shadow-md text-center">
          <CardHeader>
            <p className="font-semibold">{currentQuestion.questionText}</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mt-4">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedAnswer === 'A'}
                  onCheckedChange={() => setSelectedAnswer('A')}
                />
                {currentQuestion.optionA}
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedAnswer === 'B'}
                  onCheckedChange={() => setSelectedAnswer('B')}
                />
                {currentQuestion.optionB}
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedAnswer === 'C'}
                  onCheckedChange={() => setSelectedAnswer('C')}
                />
                {currentQuestion.optionC}
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedAnswer === 'D'}
                  onCheckedChange={() => setSelectedAnswer('D')}
                />
                {currentQuestion.optionD}
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <Button onClick={validateAnswer} disabled={!selectedAnswer}>
              Confirmar Resposta
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full md:w-2/4 p-4 shadow-md text-center">
          <CardHeader>
          <Lottie 
          options={{
            animationData, 
            loop: true,
            autoplay: true,
          }}
          height={300} 
          width={300}  
        />
            <h2 className='text-4xl font-extrabold'>Parabéns!</h2>
            <p> Você completou todas as questões.</p>
          </CardHeader>
          <CardContent className='mb-14'>
            <p className='font-bold text-lg'>Seu nível nessa habilidade é: {userScore} de 5</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
