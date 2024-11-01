import { Separator } from './ui/separator'
import { NavLink } from './nav-link'

import Logo from '../assets/logoNeki.jpg' 
import { ThemeToggle } from './theme/theme-toggle'
import { AccountMenu } from './account-menu'
export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
      <img className="h-9" src={Logo} />  
        
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