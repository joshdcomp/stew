-- CreateEnum
CREATE TYPE "ChoreType" AS ENUM ('ONETIME', 'REPEATABLE');

-- CreateEnum
CREATE TYPE "ChoreStatus" AS ENUM ('AVAILABLE', 'COMPLETED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Chore" (
    "id" SERIAL NOT NULL,
    "type" "ChoreType" NOT NULL DEFAULT 'ONETIME',
    "createdByID" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedByID" TEXT,
    "completedOn" TIMESTAMP(3),
    "expiresOn" TIMESTAMP(3),
    "status" "ChoreStatus" NOT NULL DEFAULT 'AVAILABLE',
    "points" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Chore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChoreWar" (
    "id" SERIAL NOT NULL,
    "createdByID" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ChoreWar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chore" ADD CONSTRAINT "Chore_createdByID_fkey" FOREIGN KEY ("createdByID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chore" ADD CONSTRAINT "Chore_completedByID_fkey" FOREIGN KEY ("completedByID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoreWar" ADD CONSTRAINT "ChoreWar_createdByID_fkey" FOREIGN KEY ("createdByID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
