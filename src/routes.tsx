import { createBrowserRouter } from 'react-router-dom'
import { SignIn } from './pages/auth/sign-in'
import { Home } from './pages/app/home'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { SignUp } from './pages/auth/sign-up'
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
            path: '/gerenciar/conhecimento',
            element: <Home />,
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