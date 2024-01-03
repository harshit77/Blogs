/*
  Warnings:

  - Added the required column `preferredTime` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledTime` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "preferredTime" TIME(0) NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "scheduledTime" DATE NOT NULL;
