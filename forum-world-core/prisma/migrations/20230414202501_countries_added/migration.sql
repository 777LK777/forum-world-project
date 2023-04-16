/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
DELETE FROM "User";

ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Country" (
    "countryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pathFragment" TEXT NOT NULL,
    "flagImageUrl" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Country_pkey" PRIMARY KEY ("countryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_pathFragment_key" ON "Country"("pathFragment");
