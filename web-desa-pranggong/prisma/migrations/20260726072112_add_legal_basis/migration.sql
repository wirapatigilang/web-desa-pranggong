-- CreateTable
CREATE TABLE "LegalBasis" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "fileName" TEXT,
    "fileType" TEXT,
    "fileData" BYTEA,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalBasis_pkey" PRIMARY KEY ("id")
);
