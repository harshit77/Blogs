/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('ACK_ERROR', 'ACK_PENDING', 'ACK_SERVER', 'ACK_DEVICE', 'ACK_READ');

-- CreateTable
CREATE TABLE "Contact" (
    "username" TEXT NOT NULL,
    "mobileNumber" BIGINT NOT NULL,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "MessagesOnContacts" (
    "postId" TEXT NOT NULL,
    "contactNumber" BIGINT NOT NULL,
    "messageStatus" "MessageStatus" NOT NULL,
    "linkVisited" BOOLEAN NOT NULL,

    CONSTRAINT "MessagesOnContacts_pkey" PRIMARY KEY ("postId","contactNumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_mobileNumber_key" ON "Contact"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");

-- AddForeignKey
ALTER TABLE "MessagesOnContacts" ADD CONSTRAINT "MessagesOnContacts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagesOnContacts" ADD CONSTRAINT "MessagesOnContacts_contactNumber_fkey" FOREIGN KEY ("contactNumber") REFERENCES "Contact"("mobileNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
