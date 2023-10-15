import { PrismaClient, Discipline, CurrencyCode } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seedDiscipline({
  count,
  competitionIds,
  prisma,
}: Params) {
  const disciplines = new Array<Discipline>(count);
  const ids = new Array<string>(count);
  const currencyCodes = Object.values(CurrencyCode);

  for (let i = 0, competitionIdsIndex = 0; i < count; i++) {
    if (competitionIdsIndex >= competitionIds.length) {
      competitionIdsIndex = 0;
    }

    ids[i] = faker.string.uuid();

    disciplines[i] = {
      id: ids[i],
      name: faker.lorem.word(),
      distance:
        Math.random() > 0.3 ? faker.number.int({ min: 2, max: 150 }) : null,
      price:
        Math.random() > 0.3 ? faker.number.int({ min: 50, max: 1500 }) : null,
      currency:
        Math.random() > 0.3
          ? currencyCodes[faker.number.int({ min: 1, max: 302 })]
          : null,
      competitionId: competitionIds[competitionIdsIndex++],
    };
  }

  await prisma.discipline.createMany({
    data: disciplines,
  });

  return ids;
}

type Params = {
  count: number;
  competitionIds: string[];
  prisma: PrismaClient;
};
