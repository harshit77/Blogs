import type { Config } from "@netlify/functions";
import axios from "axios";

const handler = async (req: Request, res: Response) => {
  console.log("Schedule kicked off");
  await axios.get("http://localhost:3001/api/scheduleMessages");
  return {
    statusCode: 200,
  };
};

export const config: Config = {
  schedule: "40 12 * * *",
};

export default handler;
