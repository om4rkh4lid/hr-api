/*
  Warnings:

  - You are about to drop the column `day` on the `AttendanceLog` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `AttendanceLog` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `AttendanceLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AttendanceLog" DROP COLUMN "day",
DROP COLUMN "month",
DROP COLUMN "year";

-- DropEnum
DROP TYPE "Month";
