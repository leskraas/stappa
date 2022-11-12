-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "listOrder" INTEGER;

-- CreateTable
CREATE TABLE "RecipeIngredientTitle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "listOrder" INTEGER,
    "recipeId" TEXT,

    CONSTRAINT "RecipeIngredientTitle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecipeIngredientTitle" ADD CONSTRAINT "RecipeIngredientTitle_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
