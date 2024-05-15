import {
  Competition,
  PrismaClient,
  DistanceUnit,
  User,
  Gender,
  UserRole,
  Participant,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import argon2 from 'argon2';

export async function seedDb() {
  const prisma = new PrismaClient();
  if (await prisma.participant.count()) {
    return;
  }

  const compeititonIds = Array.from({ length: 100 }, () =>
    faker.string.uuid(),
  ).concat([
    '2c077a18-9a82-4bb5-b109-16bee4fce722',
    '7ff9ce50-820e-433c-9555-8c78e347bc63',
    '8e2ce92e-ed21-45f6-93c3-6f3a5f5b8846',
    'afe7dfae-70d0-4a93-b9fe-dac6981d871e',
    'fe5bf8a5-1c12-485e-ae8b-d1b6bedd6851',
  ]);

  const compeititons = compeititonIds.map<
    Omit<Competition, 'createdAt' | 'updatedAt' | 'posterExtension'>
  >((id) => ({
    id,
    name: faker.word.words(),
    place: faker.location.city(),
    date: faker.date.soon(),
    distance: faker.number.int({ min: 1, max: 1000000000 }),
    distanceUnit: faker.helpers.enumValue(DistanceUnit),
  }));

  const userUniqueData = Array.from(
    faker.helpers.uniqueArray(faker.internet.email, 200),
    (mail) => ({
      id: faker.string.uuid(),
      mail,
    }),
  );

  const users = userUniqueData.map<Omit<User, 'createdAt' | 'updatedAt'>>(
    ({ id, mail }) => {
      const sex = faker.person.sexType();

      return {
        id,
        mail,
        password: faker.internet.password(),
        firstName: faker.person.firstName(sex),
        lastName: faker.person.lastName(sex),
        gender: sex.toUpperCase() as Gender,
        role: UserRole.COMPETITOR,
      };
    },
  );

  users.push({
    id: faker.string.uuid(),
    mail: 'sample@mail.com',
    password: await argon2.hash('samplePass123'),
    firstName: 'Angelina',
    lastName: 'Jolie',
    gender: Gender.FEMALE,
    role: UserRole.ADMIN,
  });

  const participants = Array.from(
    compeititonIds,
    (competitionId): Participant[] =>
      Array.from(userUniqueData, ({ id }) => ({
        competitionId,
        userId: id,
      })),
  ).flat();

  await prisma.$transaction([
    prisma.competition.createMany({ data: compeititons as Competition[] }),
    prisma.user.createMany({ data: users as User[] }),
    prisma.participant.createMany({ data: participants }),
  ]);
}
