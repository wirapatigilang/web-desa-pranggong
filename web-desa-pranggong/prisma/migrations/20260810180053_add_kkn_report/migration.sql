-- CreateTable
CREATE TABLE "KknReport" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageData" BYTEA NOT NULL,
    "imageType" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "imageSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KknReport_pkey" PRIMARY KEY ("id")
);
