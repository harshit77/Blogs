import type { Config } from "@netlify/functions";
import fetch from "node-fetch";

export default async (req: Request, res: Response) => {
  console.log("Schedule kicked off");
  await fetch("https://dashmind.netlify.app/api/scheduleMessages", { method: "GET" });
  return new Response("Ok");
};

export const config: Config = {
  schedule: "30 12 * * *",
};
