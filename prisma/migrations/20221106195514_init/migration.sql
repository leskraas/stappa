/*
  Warnings:

  - The `blocked` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `title` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "title" SET NOT NULL,
DROP COLUMN "blocked",
ADD COLUMN     "blocked" BOOLEAN;
