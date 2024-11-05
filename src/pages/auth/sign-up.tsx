import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "@/services/userServices";
import { LoginRequest } from "@/@types/user";
import { zodResolver } from '@hookform/resolvers/zod';

const signUpForm = z
  .object({
    login: z.string().email(),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
      .regex(/[A-Z]/, {
        message: "A senha deve ter pelo menos uma letra maiúscula",
      })
      .regex(/[a-z]/, {
        message: "A senha deve ter pelo menos uma letra minúscula",
      })
      .regex(/[0-9]/, { message: "A senha deve ter pelo menos um número" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem. Tente novamente.",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      const registerData: LoginRequest = {
        login: data.login,
        password: data.password,
      };
      await signUp(registerData.login, registerData.password); 
      toast.success("Cadastro realizado com sucesso!");
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar. Tente novamente!");
    }
  }


  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);


  const togglePasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisible = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
      <Button variant='outline' asChild className="absolute right-8 top-8">
        <Link to='/sign-in'>
        Sua biblioteca
        </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-secondary-foreground">
              Crie sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              E aprimore suas habilidades conosco!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="login">Seu e-mail</Label>
              <Input id="login" type="email" {...register("login")} />
              {errors.login && <p className="text-sm text-destructive">{errors.login.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  className="pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisible}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  className="pr-10"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisible}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                >
                  {isConfirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Cadastrar
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4 text-white">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4 text-white">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
