-- AlterTable
ALTER TABLE `eventos` ADD COLUMN `isPublic` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `usuariogrupo` ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;
