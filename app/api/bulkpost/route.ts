import prisma from "@/lib/db";
import getCurrentUser from "@/lib/session";
import { draftMessage } from "@/lib/utils";
import { NextResponse } from "next/server";
import { Contact } from "../bulkContact/route";
import { MessageStatus } from "@prisma/client";
import { PRISMA_POST_TYPE } from "@/app/constants";

export interface POST {
  title: string;
  content: string;
  scheduledTime: Date;
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
    const { data, type } = await req.json();

    const allContacts: Contact[] = await prisma.contact.findMany();

    data.forEach(
      async (post: POST) =>
        await prisma.post.create({
          data: {
            ...post,
            postType: type as PRISMA_POST_TYPE,
            authorEmail: user.email as string,
            scheduledTime: new Date(),
            contacts: {
              create: allContacts.map((contact) => ({
                messageStatus: MessageStatus.ACK_PENDING,
                linkVisited: false,
                contact: {
                  connect: {
                    mobileNumber: contact.mobileNumber,
                  },
                },
              })),
            },
          },
        })
    );

    data.forEach(
      async ({ title, content }: POST) =>
        await fetch("http://localhost:3050/sendmessage", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            message: allContacts.map((contact: Contact) =>
              draftMessage(contact.username, title, content)
            ),
            number: allContacts.map((contact) =>
              contact.mobileNumber.toString()
            ),
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
