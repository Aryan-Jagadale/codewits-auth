import prisma from "@/app/libs/prismadb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { name,email } = body;

  //console.log(name,email);
  

  if (!email || !name) {
    throw new NextResponse("Missing info", { status: 400 });
  }

  



  const newEmail = await prisma.client.create({
    data: {
        name,
        email,
    },
  });

  return NextResponse.json(newEmail);
}

export async function GET(request: Request) {

  const wailtList  = await prisma.client.findMany();

  console.log(wailtList);
  


  return NextResponse.json(wailtList);
}




