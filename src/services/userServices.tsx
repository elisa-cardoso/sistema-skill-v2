import { LoginRequest, LoginResponse } from "@/@types/user";
import { api } from "./api";

export async function login(login: string, password: string): Promise<LoginResponse> {
  const requestData: LoginRequest = { login, password };
  try {
    const response = await api.post<LoginResponse>("/auth/login", requestData);
        
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }

    if (response.data.login) {
      localStorage.setItem('login', response.data.login);
    }

    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer login: " + error);
  }
}

export async function signUp(
  login: string,
  password: string

): Promise<LoginResponse> {
  const requestData: LoginRequest = { login, password };

  try {
    const response = await api.post<LoginResponse>("/auth/register", requestData);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    if (response.data.login) {
      localStorage.setItem('login', response.data.login);
    }

    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer registro: " + error);
  }
}