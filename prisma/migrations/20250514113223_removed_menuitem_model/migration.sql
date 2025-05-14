/*
  Warnings:

  - You are about to drop the `MenuItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `menuCategoryId` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_categoryId_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "menuCategoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "MenuItem";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
