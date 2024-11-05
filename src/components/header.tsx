import { Separator } from './ui/separator'
import { NavLink } from './nav-link'

import { ThemeToggle } from './theme/theme-toggle'
import { AccountMenu } from './account-menu'

import LogoLight from '../assets/logo-branco.png' 
import LogoDark from '../assets/logo.png' 
import { useTheme } from './theme/theme-provider'

export function Header() {
  const { theme } = useTheme();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
      <img className="h-10 mt-2" src={ theme === 'dark' ? LogoLight : LogoDark } />  
        
        <nav className="flex items-center space-x-4 lg:space-x-6 justify-center flex-grow">
          <NavLink to="/">
            Home
          </NavLink>
          <Separator orientation="vertical" className="h-6" />
          <NavLink to="/biblioteca">
            Minha biblioteca
          </NavLink>
          <Separator orientation="vertical" className="h-6" />
          <NavLink to="/gerenciar/conhecimento">
            Gerenciar conhecimento
          </NavLink>
          <Separator orientation="vertical" className="h-6" />
          <NavLink to="/gerenciar/questoes">
            Gerenciar questões
          </NavLink>
        </nav>

        <div className='ml-auto flex items-center gap-2'>
            <ThemeToggle />
            <AccountMenu />
        </div>

      </div>
    </div>
  )
}