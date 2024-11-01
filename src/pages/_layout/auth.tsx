import { Outlet } from "react-router-dom";
import { Instagram, Gem } from "lucide-react";

import Logo from "../../assets/logo-branco.png";
import TextAnimated from "@/components/animations/loginText/textAnimated";
import { Button } from "@/components/ui/button";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-gradient-to-b from-primary to-white p-10 text-muted-foreground">
        <div className="flex">
          <img className="h-14" src={Logo} />
        </div>

        <TextAnimated />

        <footer className="flex items-center justify-between text-sm text-black mt-4">
          <div>
            Projeto de Estudo Neki &copy; sistema.skill - {new Date().getFullYear()}
          </div>
          <div className="flex items-center ml-4 gap-3">
            <Button
             variant='defaultBlack'
              className="flex items-center justify-center border-none cursor-pointer"
            >
              <Instagram size={24} className="text-white" />
            </Button>
            <Button 
            variant='defaultBlack'
              className="flex items-center justify-center border-none cursor-pointer"
            >
              <Gem size={24} className="text-white" />
            </Button>
          </div>
        </footer>
      </div>
      <div className="flex flex-col items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  );
}
