-- CreateTable
CREATE TABLE "UserMap" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "previewMapUrl" TEXT NOT NULL,
    "icons" JSONB,

    CONSTRAINT "UserMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "previewMapUrl" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);
