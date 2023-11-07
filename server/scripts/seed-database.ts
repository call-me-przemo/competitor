import { PrismaClient } from "@prisma/client";
import { Seeder } from "../prisma/seeder";

(async () => {
  const prisma = new PrismaClient();
  const seeder = new Seeder(prisma);
  const personCount = 10_000;
  const userCount = 3_000;
  const organizationCount = 120;
  const organizationMembersCount = 400;
  const competitionCount = 500;
  const timersCount = 14;
  const competitionTimersCount = 1_200;
  const disciplineCount = 1_800;
  const participantCount = 200_000;

  await seeder.seedPerson(personCount);
  await seeder.seedUser(userCount, organizationMembersCount, timersCount);
  await seeder.seedOrganization(organizationCount);
  await seeder.seedOrganizationMember(organizationMembersCount);
  await seeder.seedCompetition(competitionCount);
  await seeder.seedCompetitionTimer(competitionTimersCount);
  await seeder.seedDiscipline(disciplineCount);
  await seeder.seedParticipant(participantCount);
  await prisma.$disconnect();
})();
