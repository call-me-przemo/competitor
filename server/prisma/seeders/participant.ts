import { PrismaClient, Participant } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seedParticipant({
  count,
  personIds,
  disciplineIds,
  prisma,
}: Params) {
  const disciplines = new Array<Omit<Participant, "createdAt" | "updatedAt">>(
    count,
  );

  for (let i = 0, disciplineIdsIndex = 0, personIdsIndex = 0; i < count; i++) {
    if (personIdsIndex >= personIds.length) {
      personIdsIndex = 0;
    }

    if (disciplineIdsIndex >= disciplineIds.length) {
      disciplineIdsIndex = 0;
    }

    disciplines[i] = {
      id: faker.string.uuid(),
      club: Math.random() > 0.3 ? faker.lorem.words() : null,
      team: Math.random() > 0.3 ? faker.lorem.words() : null,
      paid: Math.random() < 0.3 ? true : false,
      personId: personIds[personIdsIndex++],
      disciplineId: disciplineIds[disciplineIdsIndex++],
    };
  }

  await prisma.participant.createMany({
    data: disciplines,
  });
}

type Params = {
  count: number;
  personIds: string[];
  disciplineIds: string[];
  prisma: PrismaClient;
};
