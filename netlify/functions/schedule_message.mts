import type { Config } from "@netlify/functions";

const handler = async () => {
console.log("Schedule kicked off");
  return { statusCode: 200, body: "Hello Netlify" };
};

export const config: Config = {
  schedule: "5 6 * * *",
};

export default handler;
