import { PrismaClient, Person, Gender } from "@prisma/client";
import { faker } from "@faker-js/faker";

export async function seedPerson({ count, prisma }: Params) {
  const people = new Array<Person>(count);
  const ids = new Array<string>(count);

  for (let i = 0; i < count; i++) {
    const gender = faker.person.sexType();
    ids[i] = faker.string.uuid();

    people[i] = {
      id: ids[i],
      firstName: faker.person.firstName(gender),
      lastName: faker.person.lastName(gender),
      gender: gender.toUpperCase() as Gender,
      dateOfBirth: faker.date.birthdate(),
      country: faker.location.country(),
      phone: faker.phone.imei(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      mail: faker.internet.email(),
    };
  }

  await prisma.person.createMany({
    data: people,
  });

  return ids;
}

type Params = {
  count: number;
  prisma: PrismaClient;
};
