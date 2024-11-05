import LogoLight from '../assets/logo-branco.png' 
import LogoDark from '../assets/logo.png' 
import { useTheme } from './theme/theme-provider';

export function Footer() {
  const { theme } = useTheme();
    return (
      <footer className="bg-secondary">
        <div className="w-5/6 max-w-screen mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src={ theme === 'dark' ? LogoLight : LogoDark }
                className="h-10 mt-2"
              />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-muted-foreground sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Politica de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Entre em Contato
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-muted-foreground sm:mx-auto" />
          <span className="block text-sm text-muted-foreground sm:text-center">
          Projeto de Estudo Neki &copy; sistema.skill - {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    );
  }
  