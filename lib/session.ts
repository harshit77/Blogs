import { getServerSession } from "next-auth";
import { nextOptions } from "./auth";

export default async function getCurrentUser() {
  const userSession = await getServerSession(nextOptions);
  if (!userSession) {
    return false;
  }
  return userSession.user;
}
