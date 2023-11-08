import { PrismaClient } from "@prisma/client";
import { Seeder } from "../prisma/seeder";

export const prisma = new PrismaClient();

(async () => {
  const seeder = new Seeder(prisma);
  const personCount = 1_000;
  const userCount = 300;
  const organizerCount = 20;
  const timerCount = 8;
  const organizationCount = 8;
  const organizationMembersCount = 3;
  const competitionCount = 50;
  const competitionTimersCount = 3;
  const disciplineCount = 3;
  const participantCount = 50;

  await seeder.seedPerson(personCount);
  await seeder.seedUser(userCount, organizerCount, timerCount);
  await seeder.seedOrganization(organizationCount);
  await seeder.seedOrganizationMember(organizationMembersCount);
  await seeder.seedCompetition(competitionCount);
  await seeder.seedCompetitionTimer(competitionTimersCount);
  await seeder.seedDiscipline(disciplineCount);
  await seeder.seedParticipant(participantCount);
})();
