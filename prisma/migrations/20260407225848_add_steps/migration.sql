/*
  Warnings:

  - Added the required column `steps` to the `BugReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BugReport" ADD COLUMN     "steps" TEXT NOT NULL;
