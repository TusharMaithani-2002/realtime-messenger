import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    // we are not sending new instance as .json doesn't require new
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION ERROR");

    return new NextResponse("Internal Error",{status:500});
  }
}
