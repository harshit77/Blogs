import type { Config } from "@netlify/functions";
const fetch = require("node-fetch");

const handler = async (req: Request, res: Response) => {
  console.log("Schedule kicked off");
  await fetch("/api/scheduleMessages", { method: "GET" });
  return new Response("Ok");
};

export const config: Config = {
  schedule: "55 11 * * *",
};

export default handler;
