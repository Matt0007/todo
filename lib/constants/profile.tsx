import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();

  const user = {
    name: session?.user?.name || "Utilisateur inconnue",
    email: session?.user?.email || "Utilisateur inconnue",
    image: session?.user?.image || null,
  };

  return { user, status };
};

export const managementOptions = [
  {
    title: "Création de Weekboard",
    description: "Créez un nouveau weekboard pour organiser votre semaine.",
    href: "/weekboard/new",
  },
  {
    title: "Historique des Weekboards",
    description: "Consultez et gérez vos weekboards passés.",
    href: "/weekboard/history",
  },
  {
    title: "Gestion des Semaines Types",
    description:
      "Créez et modifiez des modèles de semaine pour une planification rapide.",
    href: "/weekboard/templates",
  },
];
