import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // 1. Vérifier le mot de passe
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // 🆕 2. METTRE À JOUR linkingAuthorizedAt
    await prisma.user.update({
      where: { email },
      data: {
        linkingAuthorizedAt: new Date(), // 🎯 C'EST ÇA QUI MANQUAIT !
      },
    });


    return NextResponse.json({
      success: true,
      message: "Mot de passe vérifié, autorisation accordée",
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
