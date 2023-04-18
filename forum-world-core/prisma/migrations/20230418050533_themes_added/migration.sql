-- CreateTable
CREATE TABLE "Theme" (
    "themeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pathFragment" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("themeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Theme_pathFragment_key" ON "Theme"("pathFragment");
