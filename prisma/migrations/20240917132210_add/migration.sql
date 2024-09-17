/*
  Warnings:

  - You are about to drop the column `icons` on the `UserMap` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserMap" DROP COLUMN "icons",
ADD COLUMN     "mapData" JSONB;
