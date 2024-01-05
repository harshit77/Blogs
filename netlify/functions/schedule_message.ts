import type { Config } from "@netlify/functions";
import fetch from "node-fetch";

const handler = async (req: Request, res: Response) => {
  console.log("Schedule kicked off");
  await fetch("/api/scheduleMessages", { method: "GET" });
  return new Response("Ok");
};

export const config: Config = {
  schedule: "20 17 * * *",
};

export default handler;
