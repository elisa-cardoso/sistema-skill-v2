import { Outlet } from 'react-router-dom'

import Logo from '../../assets/logo-branco.png'
import TextAnimated from '@/components/animations/textAnimated'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-primary p-10 text-muted-foreground">
        <div className="flex">
          <img className="h-14" src={Logo} />         
        </div>

        <TextAnimated />

        <footer className="text-sm text-white">
          Projeto de Estudo Neki &copy; sistema.skill - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex flex-col items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  )
}
