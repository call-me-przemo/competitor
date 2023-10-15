import { PrismaClient, Organization } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seedOrganization({ count, prisma }: Params) {
  const organizations = new Array<Omit<Organization, "createdAt">>(count);
  const ids = new Array<string>(count);

  for (let i = 0; i < count; i++) {
    ids[i] = faker.string.uuid();

    organizations[i] = {
      id: ids[i],
      name: faker.company.name() + i,
      country: faker.location.country(),
      city: faker.location.city(),
      street: Math.random() > 0.3 ? faker.location.street() : null,
      zipCode: faker.location.zipCode(),
      bankAccountNumber: faker.finance.iban() + i,
      tin: faker.finance.routingNumber() + i,
      description: Math.random() > 0.3 ? faker.lorem.lines() : null,
    };
  }

  await prisma.organization.createMany({
    data: organizations,
  });

  return ids;
}

type Params = {
  count: number;
  prisma: PrismaClient;
};
