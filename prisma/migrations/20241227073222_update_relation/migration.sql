/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `kindeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Questions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `given_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- DropIndex
DROP INDEX `User_kindeId_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `firstName`,
    DROP COLUMN `kindeId`,
    DROP COLUMN `lastName`,
    ADD COLUMN `given_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `picture` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Questions`;

-- CreateTable
CREATE TABLE `Question` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
