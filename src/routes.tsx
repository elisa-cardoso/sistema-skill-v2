import { createBrowserRouter } from 'react-router-dom'
import { SignIn } from './pages/auth/sign-in'
import { Home } from './pages/app/home'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { SignUp } from './pages/auth/sign-up'
import { SkillDetail } from './pages/app/skillDetail'
import { SkillManagement } from './pages/app/skillManagement'
import { EditSkill } from './pages/app/editSkill'
import { SkillQuestions } from './pages/app/skillQuestions'
import { CreateSkill } from './pages/app/createSkill'
import { Pomodoro } from './pages/app/pomodoro'
import { QuestionManagement } from './pages/app/questionManagement'
import { EditQuestion } from './pages/app/editQuestion'
import { CreateQuestion } from './pages/app/createQuestion'
import { Library } from './pages/app/library'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/biblioteca',
            element: <Library />,
          },
          {
            path: '/pomodoro',
            element: <Pomodoro />,
          },
          {
            path: '/habilidade/:id',
            element: <SkillDetail />,
          },
          {
            path: '/habilidade/editar/:id',
            element: <EditSkill />,
          },
          {
            path: '/habilidade/criar',
            element: <CreateSkill />,
          },
          {
            path: '/questoes/habilidade/:skillId',
            element: <SkillQuestions />,
          },
          {
            path: '/gerenciar/conhecimento',
            element: <SkillManagement />,
          },
          {
            path: '/gerenciar/questoes/:skillId',
            element: <QuestionManagement />,
          },
          {
            path: '/questoes/editar/:questionId',
            element: <EditQuestion />,
          },
          {
            path: '/questoes/criar/:skillId',
            element: <CreateQuestion />,
          }
        ],
      },
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/sign-in',
            element: <SignIn />,
          },
          {
            path: '/sign-up',
            element: <SignUp />,
          },
        ],
      },
])