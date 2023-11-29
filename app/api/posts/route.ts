import getCurrentUser from "@/lib/session";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.email) {
      return NextResponse.json(
        { message: "You are not authorised to see the content" },
        { status: 401 }
      );
    }
    const { title, content } = await req.json();

    await prisma.post.create({
      data: {
        title,
        content,
        authorEmail: user?.email,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!!!" },
      { status: 500 }
    );
  }
}
