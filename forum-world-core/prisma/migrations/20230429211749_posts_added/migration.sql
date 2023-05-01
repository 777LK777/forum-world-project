-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "contentId" INTEGER;

-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "contentId" INTEGER;

-- CreateTable
CREATE TABLE "Post" (
    "postId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "themeId" INTEGER,
    "countryId" INTEGER NOT NULL,
    "contentId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Content" (
    "contentId" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("contentId")
);

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("contentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("contentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("themeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("countryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("contentId") ON DELETE RESTRICT ON UPDATE CASCADE;
