import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import type { Account, User } from "next-auth";

export const authConfig = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Utilisateur non trouvé");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Mot de passe incorrect");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        if (existingUser) {
          const hasGoogleAccount = existingUser.accounts.some(
            (acc) => acc.provider === "google"
          );

          if (hasGoogleAccount) {
            return true;
          }

          if (!existingUser.linkingAuthorizedAt) {
            return `/auth/link-account?email=${encodeURIComponent(user.email)}`;
          }

          // Vérifier si l'autorisation n'est pas expirée (5 minutes)
          const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
          if (existingUser.linkingAuthorizedAt < fiveMinutesAgo) {
            return `/auth/link-account?email=${encodeURIComponent(user.email)}`;
          }

          // Lier les comptes
          try {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
              },
            });

            // Nettoyer l'autorisation
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { linkingAuthorizedAt: null },
            });

            return true;
          } catch {
            return false;
          }
        }
      }

      return true;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },
};
