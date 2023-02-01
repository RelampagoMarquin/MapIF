/*
  Warnings:

  - Added the required column `descricao` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `descricao` VARCHAR(191) NOT NULL,
    ADD COLUMN `isPublic` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `usuariogrupo` ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;
