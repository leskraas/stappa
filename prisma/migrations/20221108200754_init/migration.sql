-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientName_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_unitName_fkey";

-- AlterTable
ALTER TABLE "RecipeIngredient" ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "ingredientName" DROP NOT NULL,
ALTER COLUMN "unitName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientName_fkey" FOREIGN KEY ("ingredientName") REFERENCES "Ingredient"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_unitName_fkey" FOREIGN KEY ("unitName") REFERENCES "Unit"("name") ON DELETE SET NULL ON UPDATE CASCADE;
