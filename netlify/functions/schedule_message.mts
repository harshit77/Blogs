import type { Config } from "@netlify/functions";

const handler = async () => {
  return { statusCode: 200, body: "Hello Netlify" };
};

export const config: Config = {
  schedule: "55 4 * * *",
};

export default handler;
