-- CreateTable
CREATE TABLE "VillageProfile" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "history" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "missions" TEXT NOT NULL,
    "orgStructure" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "population" TEXT NOT NULL,
    "households" TEXT NOT NULL,
    "hamlets" TEXT NOT NULL,
    "boundaryNorth" TEXT NOT NULL,
    "boundarySouth" TEXT NOT NULL,
    "boundaryEast" TEXT NOT NULL,
    "boundaryWest" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VillageProfile_pkey" PRIMARY KEY ("id")
);
