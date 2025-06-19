import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { name,email, password, confirmPassword } = await request.json();

    // Vérifier que email et password sont fournis
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { status: "error", message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }
    const formattedName = name.trim();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { status: "error", message: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { status: "error", message: "Les mots de passe ne correspondent pas" },
        { status: 400 }
      );
    }
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: formattedName,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    return NextResponse.json({
      status: "success",
      message: "Utilisateur créé avec succès",
      user: user,
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Échec de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}