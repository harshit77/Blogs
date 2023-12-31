import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { MessageStatus } from "@prisma/client";
import { PRISMA_MESSAGE_STATUS } from "@/app/constants";

type MessageStatusWithContact = {
  message: string;
  mobileNumber: number;
  acknowledgement: MessageStatus;
};

type PostId = {
  id: string;
};

export async function POST(req: Request) {
  try {
    const { message, mobileNumber, acknowledgement }: MessageStatusWithContact =
      await req.json();

    const enumMappedAcknowledgement = PRISMA_MESSAGE_STATUS[+acknowledgement];

    if (enumMappedAcknowledgement) {
      const exists: PostId[] =
        await prisma.$queryRaw`SELECT * FROM "Post" WHERE ${message} LIKE CONCAT('%', title, '%')`;

      exists.length &&
        (await prisma.messagesOnContacts.update({
          where: {
            postId_contactNumber: {
              postId: exists[0].id,
              contactNumber: mobileNumber,
            },
          },
          data: {
            messageStatus: enumMappedAcknowledgement as MessageStatus,
          },
        }));
    }
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went wrong" },
      { status: 500 }
    );
  }
}
