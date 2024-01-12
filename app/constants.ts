export const POST = "Post";
export const CONTACT = "Contact";

export enum PRISMA_MESSAGE_STATUS {
  ACK_ERROR = -1,
  ACK_PENDING = 0,
  ACK_SERVER = 1,
  ACK_DEVICE = 2,
  ACK_READ = 3,
  ACK_PLAYED = 4,
}

export enum PRISMA_POST_TYPE {
  DailyTips = "DailyTips",
  BlogPost = "BlogPost",
  Poll = "Poll",
}

export const SAMPLE_BLOG: [string, string, Date] = [
  "Why You Need React Query",
  "Welcome to your Weekly Monthly Tech Crunch, where we provide essential insights to enhance your coding endeavours. Understanding the necessity of React Query for seamless asynchronous state management in data fetching is emphasized.",
  new Date(),
];

export type BulkType = typeof POST | typeof CONTACT;
