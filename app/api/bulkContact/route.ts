import prisma from "@/lib/db";
import getCurrentUser from "@/lib/session";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export interface Contact {
  username: string;
  email?: string | null;
  mobileNumber: bigint | number;
  preferredTime: Date;
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

    await prisma.contact.createMany({
      data: data.map((contact: Contact) => ({
        ...contact,
        mobileNumber: `91${contact.mobileNumber}`,
        preferredTime: dayjs(`1970-01-01 ${contact.preferredTime}`),
      })),
    });

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
