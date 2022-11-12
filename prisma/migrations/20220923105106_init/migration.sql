/*
  Warnings:

  - You are about to drop the column `categories` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "categories";

-- CreateTable
CREATE TABLE "Categorie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategorieToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_name_key" ON "Categorie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategorieToRecipe_AB_unique" ON "_CategorieToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_CategorieToRecipe_B_index" ON "_CategorieToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_CategorieToRecipe" ADD CONSTRAINT "_CategorieToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Categorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorieToRecipe" ADD CONSTRAINT "_CategorieToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
