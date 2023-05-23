-- CreateTable
CREATE TABLE "Page" (
    "pageId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pathFragment" TEXT NOT NULL,
    "contentId" INTEGER,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("pageId")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("contentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add Home page (by default)
INSERT INTO "Page" ("name", "pathFragment")
SELECT 'Home page', '/'
WHERE NOT EXISTS (
   SELECT 1 FROM "Page"
   WHERE "pathFragment" = '/'
);
