import type { Config } from "@netlify/functions";
import axios from "axios";

const handler = async (req: Request, res: Response) => {
  console.log("Schedule kicked off");
  await axios.get("https://dashmind.netlify.app/api/scheduleMessages");
  return new Response("Ok");
};

export const config: Config = {
  schedule: "50 12 * * *",
};

export default handler;
