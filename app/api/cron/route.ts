import { NextResponse } from "next/server";
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

export async function POST(req: Request) {
  const { number, message } = await req.json();
  const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" }),
    qrMaxRetries: 3,
    puppeteer: {
      headless: true,
      restartOnAuthFail: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });
  try {
    client.on("qr", (qr) => {
      console.log("QR recieved", qr);
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", async () => {
      let response;
      const getNumberId = await client.getNumberId(number);

      if (getNumberId) {
        response = await client.sendMessage(getNumberId._serialized, message);
      } else {
        console.log("Number is not valid");
        response = "Number is not valid";
      }
    });
    client.on("disconnected", () => {
      console.log("Client is disconnected!");
    });

    client.on("authenticated", () => {
      console.log("Client is authenticated!");
    });

    client.on("auth_failure", () => {
      console.log("Client is auth_failure!");
    });

    await client.initialize();
  } catch (error) {
    console.log(error);
  } finally {
    client.destroy;
  }
  return NextResponse.json({ message: "done" }, { status: 201 });
}
