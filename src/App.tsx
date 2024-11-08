import './global.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'
import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey='sistemaskill-theme' defaultTheme='dark'>
      <Helmet titleTemplate="%s | sistema.skill" />
      <Toaster />
      
      <CyclesContextProvider>
      <RouterProvider router={router} />
      </CyclesContextProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}