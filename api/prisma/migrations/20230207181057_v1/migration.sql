-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarioGrupo` (
    `usuarioId` INTEGER NOT NULL,
    `grupoId` INTEGER NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`usuarioId`, `grupoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `comeca` DATETIME(3) NOT NULL,
    `fim` DATETIME(3) NOT NULL,
    `grupoId` INTEGER NOT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Poligonos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventoId` INTEGER NOT NULL,
    `locais` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atividade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `horarioInicial` DATETIME(3) NOT NULL,
    `horarioFinal` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `poligonoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarioGrupo` ADD CONSTRAINT `usuarioGrupo_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarioGrupo` ADD CONSTRAINT `usuarioGrupo_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eventos` ADD CONSTRAINT `Eventos_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Poligonos` ADD CONSTRAINT `Poligonos_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atividade` ADD CONSTRAINT `Atividade_poligonoId_fkey` FOREIGN KEY (`poligonoId`) REFERENCES `Poligonos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
