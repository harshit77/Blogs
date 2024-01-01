-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('DailyTips', 'BlogPost', 'Poll');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postType" "PostType" NOT NULL DEFAULT 'BlogPost';
