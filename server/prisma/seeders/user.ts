import { PrismaClient, User, UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seedUser({
  count,
  organizationMembersCount,
  timersCount,
  personIds,
  prisma,
}: Params) {
  const users = new Array<Omit<User, "createdAt">>(count);
  const ids = new Array<string>(count);

  for (let i = 0; i < count; i++) {
    ids[i] = faker.string.uuid();

    users[i] = {
      id: ids[i],
      mail: faker.internet.email() + i,
      password: faker.internet.password(),
      role:
        i < organizationMembersCount
          ? UserRole.ORGANIZER
          : i < organizationMembersCount + timersCount
          ? UserRole.TIMER
          : i + 1 === count
          ? UserRole.ADMIN
          : UserRole.COMPETITOR,
      personId: personIds[i],
    };
  }

  await prisma.user.createMany({
    data: users,
  });

  return ids;
}

type Params = {
  count: number;
  organizationMembersCount: number;
  timersCount: number;
  personIds: string[];
  prisma: PrismaClient;
};
