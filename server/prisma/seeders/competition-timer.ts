import { PrismaClient, CompetitionTimer } from "@prisma/client";

export async function seedCompetitionTimer({
  count,
  userIds,
  competitionIds,
  prisma,
}: Params) {
  const timers = new Array<CompetitionTimer>(count);

  for (let i = 0, userIdsIndex = 0, competitionIdsIndex = 0; i < count; i++) {
    if (userIdsIndex >= userIds.length) {
      userIdsIndex = 0;
    }

    if (competitionIdsIndex >= competitionIds.length) {
      competitionIdsIndex = 0;
    }

    const randNum = Math.random();

    timers[i] = {
      competitionId: competitionIds[competitionIdsIndex++],
      userId: userIds[userIdsIndex++],
      agreed: randNum > 0.8 ? false : randNum > 0.4 ? true : null,
    };
  }

  await prisma.competitionTimer.createMany({
    data: timers,
  });
}

type Params = {
  count: number;
  userIds: string[];
  competitionIds: string[];
  prisma: PrismaClient;
};
