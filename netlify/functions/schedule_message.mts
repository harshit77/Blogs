import type { Config } from "@netlify/functions";

const handler = async () => {
  console.log("Schedule kicked off");
  return { statusCode: 200, body: "Hello Netlify" };
};

export const config: Config = {
  schedule: "30 3 * * *",
};

export default handler;
