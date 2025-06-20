import { LogIn, User, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export const getIconsNav = (session: Session | null) => {
  if (session) {
    return [
      {
        label: "Profil",
        href: "/profile",
        icon: <User />,
      },
      {
        label: "Déconnexion",
        action: () => signOut({ callbackUrl: "/" }),
        icon: <LogOut />,
      },
    ];
  }

  return [
    {
      label: "Connexion",
      href: "/auth/login",
      icon: <LogIn />,
    },
  ];
};

export const NAV_LINKS = [
  {
    label: "Todo",
    href: "/",
  },
  {
    label: "Weekboard",
    href: "/weekboard",
  },
  
];
