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
            path: '/bibliteca',
            element: <Home />,
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
            path: '/questoes/habilidade/:skillId',
            element: <SkillQuestions />,
          },
          {
            path: '/gerenciar/conhecimento',
            element: <SkillManagement />,
          },
          {
            path: '/gerenciar/questoes',
            element: <Home />,
          },
          

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