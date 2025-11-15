/*
  Warnings:

  - Made the column `imageUrl` on table `Coffee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Coffee" ALTER COLUMN "imageUrl" SET NOT NULL;
