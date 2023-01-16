/*
  Warnings:

  - You are about to drop the column `poligono` on the `poligonos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `poligonos` DROP COLUMN `poligono`,
    ADD COLUMN `locais` JSON NULL;
