/*
  Warnings:

  - You are about to drop the `_CompetitionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompetitionToUser" DROP CONSTRAINT "_CompetitionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompetitionToUser" DROP CONSTRAINT "_CompetitionToUser_B_fkey";

-- DropTable
DROP TABLE "_CompetitionToUser";

-- CreateTable
CREATE TABLE "Participant" (
    "userId" UUID NOT NULL,
    "competitionId" UUID NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("userId","competitionId")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
