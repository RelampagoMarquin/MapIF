/*
  Warnings:

  - You are about to drop the `local` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `local` DROP FOREIGN KEY `Local_poligonoId_fkey`;

-- AlterTable
ALTER TABLE `poligonos` ADD COLUMN `poligono` JSON NULL;

-- DropTable
DROP TABLE `local`;
