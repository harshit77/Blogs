import type { Config } from "@netlify/functions";
import axios from "axios";

const handler = async (req: Request, res: Response) => {
  console.log("Schedule kicked off");
  await axios.get("/api/scheduleMessages");
  return {
    statusCode: 200,
  };
};

export const config: Config = {
  schedule: "45 12 * * *",
};

export default handler;
