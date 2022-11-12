-- DropForeignKey
ALTER TABLE "Instruction" DROP CONSTRAINT "Instruction_recipeIngredientId_fkey";

-- AlterTable
ALTER TABLE "Instruction" ALTER COLUMN "recipeIngredientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeIngredientId_fkey" FOREIGN KEY ("recipeIngredientId") REFERENCES "RecipeIngredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
