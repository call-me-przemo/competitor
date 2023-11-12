import {
  Competition,
  CompetitionTimer,
  Gender,
  Organization,
  OrganizationMember,
  Person,
  PrismaClient,
  User,
  UserRole,
  Discipline,
  Participant,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

export class Seeder {
  constructor(private prisma: PrismaClient) {}

  async seedPerson(count: number) {
    const people = Array.from({ length: count }, (): Omit<Person, "id"> => {
      const gender = faker.person.sexType();

      return {
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
    });

    await this.prisma.person.createMany({ data: people });
  }

  async seedUser(count: number, organizerCount: number, timerCount: number) {
    if (count + 2 < organizerCount + timerCount) {
      throw new Error(
        `Number of organization members and timers must be less than number of all users plus 2
        (one for admin and minumum one for competitor role)`,
      );
    }

    const people = await this.prisma.person.findMany({
      select: {
        id: true,
      },
    });

    if (count > people.length) {
      throw new Error(
        `Number of users to seed (${count}) cannot be greater than number of people in database (${people.length})`,
      );
    }

    const users = Array.from(
      { length: count },
      (el, idx): Omit<User, "id" | "createdAt"> => ({
        mail: faker.internet.email() + idx,
        password: faker.internet.password(),
        role:
          idx < organizerCount
            ? UserRole.ORGANIZER
            : idx < organizerCount + timerCount
            ? UserRole.TIMER
            : idx + 1 === count
            ? UserRole.ADMIN
            : UserRole.COMPETITOR,
        personId: people[idx].id,
      }),
    );

    await this.prisma.user.createMany({
      data: users,
    });
  }

  async seedOrganization(count: number) {
    const organizations = Array.from(
      { length: count },
      (el, idx): Omit<Organization, "id" | "createdAt"> => ({
        name: faker.company.name() + idx,
        country: faker.location.country(),
        city: faker.location.city(),
        street: Math.random() > 0.3 ? faker.location.street() : null,
        zipCode: faker.location.zipCode(),
        bankAccountNumber: faker.finance.iban() + idx,
        tin: faker.finance.routingNumber() + idx,
        description: Math.random() > 0.3 ? faker.lorem.lines() : null,
      }),
    );

    await this.prisma.organization.createMany({ data: organizations });
  }

  async seedOrganizationMember(count: number) {
    const users = await this.prisma.user.findMany({
      select: { id: true },
      where: {
        role: UserRole.ORGANIZER,
      },
    });

    const organizations = await this.prisma.organization.findMany({
      select: { id: true },
    });

    if (count > users.length) {
      throw new Error(
        `Number of organization members (${count}) cannot be greater
         than number of users with organizer role (${users.length}) in database`,
      );
    }

    let userIndex = 0;
    const organizationMembers = Array<OrganizationMember>();

    for (const organization of organizations) {
      const members = Array.from(
        { length: count },
        (el, idx): OrganizationMember => {
          if (userIndex >= users.length) {
            userIndex = 0;
          }

          return {
            userId: users[userIndex++].id,
            organizationId: organization.id,
          };
        },
      );
      organizationMembers.push(...members);
    }

    await this.prisma.organizationMember.createMany({
      data: organizationMembers,
    });
  }

  async seedCompetition(count: number) {
    const organizations = await this.prisma.organization.findMany({
      select: { id: true },
    });

    if (!organizations.length) {
      throw new Error(`Organizations table is empty, seed organizations first`);
    }

    let organizationIndex = 0;
    const competitions = Array.from(
      { length: count },
      (el, idx): Omit<Competition, "id" | "createdAt" | "updatedAt"> => {
        if (organizationIndex >= organizations.length) {
          organizationIndex = 0;
        }

        const dateFrom = faker.date.future();

        return {
          name: faker.word.words(),
          country: faker.location.country(),
          place: faker.location.city(),
          active: Math.random() > 0.3 ? true : false,
          visible: Math.random() > 0.2 ? true : false,
          dateFrom,
          dateTo:
            Math.random() > 0.3 ? null : faker.date.soon({ refDate: dateFrom }),
          description: faker.lorem.lines(),
          statutePath: faker.system.filePath(),
          organizationId: organizations[organizationIndex++].id,
        };
      },
    );

    await this.prisma.competition.createMany({
      data: competitions,
    });
  }

  async seedCompetitionTimer(count: number) {
    const users = await this.prisma.user.findMany({
      select: { id: true },
      where: {
        role: UserRole.TIMER,
      },
    });

    const competitions = await this.prisma.competition.findMany({
      select: { id: true },
    });

    if (count > users.length) {
      throw new Error(
        `Number of competition timers (${count}) cannot be greater
         than number of users with timer role (${users.length}) in database`,
      );
    }

    let userIndex = 0;
    const competitionTimers = Array<CompetitionTimer>();

    for (const competition of competitions) {
      const timers = Array.from(
        { length: count },
        (el, idx): CompetitionTimer => {
          if (userIndex >= users.length) {
            userIndex = 0;
          }

          const randNum = Math.random();

          return {
            userId: users[userIndex++].id,
            competitionId: competition.id,
            agreed: randNum > 0.8 ? false : randNum > 0.4 ? true : null,
          };
        },
      );
      competitionTimers.push(...timers);
    }

    await this.prisma.competitionTimer.createMany({ data: competitionTimers });
  }

  async seedDiscipline(count: number) {
    const competitions = await this.prisma.competition.findMany({
      select: { id: true },
    });

    if (!competitions.length) {
      throw new Error(`Competitions table is empty, seed competitions first`);
    }

    const competitionDisciplines = new Array<Omit<Discipline, "id">>();

    for (const competition of competitions) {
      const disciplines = Array.from(
        { length: count },
        (el, idx): Omit<Discipline, "id"> => {
          return {
            name: faker.lorem.word(),
            distance:
              Math.random() > 0.3
                ? faker.number.int({ min: 2, max: 150 })
                : null,
            price:
              Math.random() > 0.3
                ? faker.number.int({ min: 50, max: 1500 })
                : null,
            currency: Math.random() > 0.3 ? faker.finance.currencyCode() : null,
            competitionId: competition.id,
          };
        },
      );

      competitionDisciplines.push(...disciplines);
    }

    await this.prisma.discipline.createMany({
      data: competitionDisciplines,
    });
  }

  async seedParticipant(count: number) {
    const people = await this.prisma.person.findMany({
      select: { id: true },
      where: {
        OR: [
          {
            User: {
              role: UserRole.COMPETITOR,
            },
          },
          {
            User: null,
          },
        ],
      },
    });
    const disciplines = await this.prisma.discipline.findMany({
      select: { id: true },
    });

    if (count > people.length) {
      throw new Error(
        `Number of discipline participant (${count}) cannot be greater
         than number of privileged people with (${people.length}) in database`,
      );
    }

    let personIndex = 0;
    const disciplineParticipants = new Array<
      Omit<Participant, "id" | "createdAt" | "updatedAt">
    >();

    for (const discipline of disciplines) {
      const participants = Array.from(
        { length: count },
        (el, idx): Omit<Participant, "id" | "createdAt" | "updatedAt"> => {
          if (personIndex >= people.length) {
            personIndex = 0;
          }

          return {
            club: Math.random() > 0.3 ? faker.lorem.words() : null,
            team: Math.random() > 0.3 ? faker.lorem.words() : null,
            paid: Math.random() < 0.3 ? true : false,
            personId: people[personIndex++].id,
            disciplineId: discipline.id,
          };
        },
      );
      disciplineParticipants.push(...participants);
    }

    await this.prisma.participant.createMany({ data: disciplineParticipants });
  }
}
