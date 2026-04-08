/*
  Warnings:

  - Added the required column `actualResult` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedResult` to the `BugReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BugReport" ADD COLUMN     "actualResult" TEXT NOT NULL,
ADD COLUMN     "expectedResult" TEXT NOT NULL;
