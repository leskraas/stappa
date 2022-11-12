/*
  Warnings:

  - The primary key for the `Categorie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Categorie` table. All the data in the column will be lost.
  - The primary key for the `Ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `recipeIngredient` on the `Instruction` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `RecipeIngredient` table. All the data in the column will be lost.
  - Added the required column `recipeIngredientId` to the `Instruction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientName` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitName` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "_CategorieToRecipe" DROP CONSTRAINT "_CategorieToRecipe_A_fkey";

-- AlterTable
ALTER TABLE "Categorie" DROP CONSTRAINT "Categorie_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Categorie_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Instruction" DROP COLUMN "recipeIngredient",
ADD COLUMN     "recipeIngredientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "unit",
ADD COLUMN     "ingredientName" TEXT NOT NULL,
ADD COLUMN     "unitName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Unit" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientName_fkey" FOREIGN KEY ("ingredientName") REFERENCES "Ingredient"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_unitName_fkey" FOREIGN KEY ("unitName") REFERENCES "Unit"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeIngredientId_fkey" FOREIGN KEY ("recipeIngredientId") REFERENCES "RecipeIngredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorieToRecipe" ADD CONSTRAINT "_CategorieToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Categorie"("name") ON DELETE CASCADE ON UPDATE CASCADE;
