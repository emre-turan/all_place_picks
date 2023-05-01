import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

import { PrismaClient, UserRole } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, role } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  let userRole;
  if (role === "ADMIN") {
    userRole = UserRole.ADMIN;
  } else {
    userRole = UserRole.USER;
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      role: userRole,
    },
  });

  return NextResponse.json(user);
}
