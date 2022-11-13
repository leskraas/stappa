/*
  Warnings:

  - Made the column `recipeId` on table `RecipeIngredientTitle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredientTitle" DROP CONSTRAINT "RecipeIngredientTitle_recipeId_fkey";

-- AlterTable
ALTER TABLE "RecipeIngredientTitle" ALTER COLUMN "recipeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RecipeIngredientTitle" ADD CONSTRAINT "RecipeIngredientTitle_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
