/*
  Warnings:

  - You are about to drop the `LikedComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikedComment" DROP CONSTRAINT "LikedComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "LikedComment" DROP CONSTRAINT "LikedComment_userId_fkey";

-- DropTable
DROP TABLE "LikedComment";
