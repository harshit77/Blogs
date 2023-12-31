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

export type BulkType = typeof POST | typeof CONTACT;
