import prisma from "@/lib/db";
import getCurrentUser from "@/lib/session";
import { draftMessage } from "@/lib/utils";
import { NextResponse } from "next/server";
import { title } from "process";

export interface POST {
  title: string;
  content: string;
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { message: "You are not authorised to change the content" },
        { status: 401 }
      );
    }
    const { data } = await req.json();
    console.log(data);

    await prisma.post.createMany({
      data: data.map((post: POST) => ({ ...post, authorEmail: user?.email })),
    });

    data.map(
      async ({ title, content }: POST) =>
        await fetch("http://localhost:3050/sendmessage", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            message: draftMessage(user?.name!, title, content),
            number: "918840213727",
          }),
        })
    );

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
