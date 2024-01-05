import prisma from "@/lib/db";
import { POST } from "../bulkpost/route";
import { draftMessage } from "@/lib/utils";
import { Contact } from "../bulkContact/route";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET() {
  try {
    const todaysScheduledPosts = await prisma.post.findMany({
      where: {
        scheduledTime: {
          equals: new Date(),
        },
      },
    });

    const allContacts: Contact[] = await prisma.contact.findMany({
      where: {
        preferredTime: {
          gte: dayjs().toISOString(),
          lte: dayjs().add(1, "h").toISOString(),
        },
      },
    });
    todaysScheduledPosts.forEach(
      async ({ title, content }: POST) =>
        await fetch(`${process.env.WHATSAPP_URL}`, {
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
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    console.log("Error in Scheduling messages", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 401 }
    );
  }
}

export const config = {
  schedule: "* * * * *",
};
