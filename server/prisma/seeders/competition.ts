import { PrismaClient, Competition } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seedCompetition({
  count,
  organizationIds,
  prisma,
}: Params) {
  const competitions = new Array<Omit<Competition, "createdAt" | "updatedAt">>(
    count,
  );
  const ids = new Array<string>(count);

  for (let i = 0, organizationIdsIndex = 0; i < count; i++) {
    const dateFrom = faker.date.future();

    ids[i] = faker.string.uuid();

    if (organizationIdsIndex >= organizationIds.length) {
      organizationIdsIndex = 0;
    }

    competitions[i] = {
      id: ids[i],
      name: faker.word.words(),
      country: faker.location.country(),
      place: faker.location.city(),
      active: Math.random() > 0.3 ? true : false,
      hidden: Math.random() > 0.2 ? false : true,
      dateFrom,
      dateTo:
        Math.random() > 0.3 ? null : faker.date.soon({ refDate: dateFrom }),
      description: faker.lorem.lines(),
      statutePath: "sample path - not important for now",
      organizationId: organizationIds[organizationIdsIndex++],
    };
  }

  await prisma.competition.createMany({
    data: competitions,
  });

  return ids;
}

type Params = {
  count: number;
  organizationIds: string[];
  prisma: PrismaClient;
};
