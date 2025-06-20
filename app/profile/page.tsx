"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useUser, managementOptions } from "@/lib/constants/profile";
import { LogOut, User } from "lucide-react";
import Loading from "@/components/loading/loading";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { user, status } = useUser();

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardContent className="flex flex-col items-center pt-4">
              <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                <AvatarImage src={user.image || ""} alt={user.name} />
                <AvatarFallback className="bg-muted">
                  <User className="w-8 h-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.name}</h2>
              
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="w-full mt-8"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <CardTitle>
                        Actualités
                    </CardTitle>
                    <Button variant="outline">
                        Voir tout
                    </Button>
                </div>
              <CardContent>
                <p>Vous n&apos;avez pas de nouvelles actualités.</p>
              </CardContent>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modifier le profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Prénom</Label>
                <Input id="fullName" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user.email}
                  disabled
                />
              </div>
              <Button>Enregistrer les modifications</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des Weekboards</CardTitle>
              <CardDescription>
                Choisissez une option pour gérer vos weekboards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {managementOptions.map((option) => (
                <div
                  key={option.title}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                  <Link href={option.href} passHref>
                    <Button>Sélectionner</Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
