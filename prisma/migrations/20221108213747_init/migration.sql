/*
  Warnings:

  - Made the column `amount` on table `RecipeIngredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ingredientName` on table `RecipeIngredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unitName` on table `RecipeIngredient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientName_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_unitName_fkey";

-- AlterTable
ALTER TABLE "RecipeIngredient" ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "ingredientName" SET NOT NULL,
ALTER COLUMN "unitName" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientName_fkey" FOREIGN KEY ("ingredientName") REFERENCES "Ingredient"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_unitName_fkey" FOREIGN KEY ("unitName") REFERENCES "Unit"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
