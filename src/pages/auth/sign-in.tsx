import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/userServices";
import { zodResolver } from "@hookform/resolvers/zod";

const signInForm = z.object({
  login: z.string().email(),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .regex(/[A-Z]/, { message: "A senha deve ter pelo menos uma letra maiúscula" })
    .regex(/[a-z]/, { message: "A senha deve ter pelo menos uma letra minúscula" })
    .regex(/[0-9]/, { message: "A senha deve ter pelo menos um número" }),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const navigate = useNavigate();
  const { register, setValue, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("login");
    if (savedLogin) {
      setValue("login", savedLogin);
      setRememberMe(true);
    }
  }, [setValue]);

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await login(data.login, data.password);
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      if (rememberMe) {
        localStorage.setItem("login", data.login);
      } else {
        localStorage.removeItem("login");
      }
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais!");
    }
  }

  const togglePasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleRememberMeChange = () => {
    setRememberMe((prev) => {
      const newValue = !prev;
      if (!newValue) {
        localStorage.removeItem("login");
      }
      return newValue;
    });
  };

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Crie sua conta</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-secondary-foreground">
              Acessar biblioteca
            </h1>
            <p className="text-sm text-muted-foreground">
              Entre na sua estante personalizada de tecnologia!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="login" type="email" {...register("login")} />
            </div>
            <div className="space-y-2">
              <Label className="text-secondary-foreground" htmlFor="password">Sua senha</Label>
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
                  {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={handleRememberMeChange}
              />
              <Label htmlFor="rememberMe">Lembre-se de mim</Label>
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
