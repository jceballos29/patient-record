/*
  Warnings:

  - Added the required column `doctor` to the `Office` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Office" ADD COLUMN     "doctor" TEXT NOT NULL;
