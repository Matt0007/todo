"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, Link } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LinkAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer l'email depuis l'URL si disponible
  const emailFromUrl = searchParams?.get("email") || session?.user?.email || "";

 const handleLinkAccount = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsLoading(true);
   setError("");

   try {
     // 1. Vérifier le mot de passe et obtenir l'autorisation
     const verifyResponse = await fetch("/api/auth/link-google", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         email: emailFromUrl,
         password,
       }),
     });

     const data = await verifyResponse.json();

     if (!verifyResponse.ok) {
       throw new Error(data.error || "Mot de passe incorrect");
     }

     // 2. Si l'autorisation est accordée, rediriger vers Google
     if (data.redirectToGoogle) {
       console.log("🔄 Redirection vers Google pour la liaison...");

       // Utiliser window.location au lieu de signIn
       window.location.href = data.googleAuthUrl;
       return; // Important : ne pas continuer
     }

     // 3. Sinon, rediriger vers la page d'accueil (cas fallback)
     router.push("/");
     toast.success("Liaison réussie");
   } catch (error) {
     setError((error as Error).message || "Une erreur est survenue");
     setIsLoading(false); // Réactiver seulement en cas d'erreur
   }
 };


  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Link className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Lier vos comptes</CardTitle>
          <CardDescription>
            Un compte existe déjà avec l&apos;email{" "}
            <strong>{emailFromUrl}</strong>.
            <br />
            Confirmez votre mot de passe pour lier votre compte Google.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLinkAccount} className="space-y-4">
            {/* Email (lecture seule) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  value={emailFromUrl}
                  disabled
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe actuel
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <Alert
                variant="destructive"
                className="flex flex-col items-center justify-center"
              >
                <AlertDescription className="text-center">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Boutons */}
            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !password}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Liaison en cours...
                  </>
                ) : (
                  <>
                    <Link className="mr-2 h-4 w-4" />
                    Lier avec Google
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/auth/login")}
                disabled={isLoading}
              >
                Annuler
              </Button>
            </div>
          </form>

          {/* Info supplémentaire */}
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary">
              <strong>Pourquoi cette étape ?</strong>
              <br />
              Pour votre sécurité, nous vérifions que vous êtes bien le
              propriétaire de ce compte avant de le lier à Google.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
