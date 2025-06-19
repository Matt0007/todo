"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import type { LoginData } from "@/lib/type/auth";

export const useLogin = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const login = async ({ email, password }: LoginData) => {
    setLoginLoading(true);
    setLoginError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Connexion réussie !");
      router.push("/"); // ou ta route protégée
    } else {
      setLoginError("Email ou mot de passe incorrect");
    }
    setLoginLoading(false);
  };

  return { login, loginLoading, loginError };
};
