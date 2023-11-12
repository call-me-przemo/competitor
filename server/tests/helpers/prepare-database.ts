import { PrismaClient } from "@prisma/client";
import { Seeder } from "../../prisma/seeder";

export async function prepareDatabase(
  prisma: PrismaClient,
  {
    personCount,
    userCount,
    organizerCount,
    timerCount,
    organizationCount,
    organizationMemberCount,
    competitionCount,
    competitionTimerCount,
    disciplineCount,
    participantCount,
  }: PrepareDatabaseOptions,
) {
  const seeder = new Seeder(prisma);

  await prisma.participant.deleteMany();
  await prisma.discipline.deleteMany();
  await prisma.competitionTimer.deleteMany();
  await prisma.competition.deleteMany();
  await prisma.organizationMember.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();
  await prisma.person.deleteMany();

  await seeder.seedPerson(personCount);
  await seeder.seedUser(userCount, organizerCount, timerCount);
  await seeder.seedOrganization(organizationCount);
  await seeder.seedOrganizationMember(organizationMemberCount);
  await seeder.seedCompetition(competitionCount);
  await seeder.seedCompetitionTimer(competitionTimerCount);
  await seeder.seedDiscipline(disciplineCount);
  await seeder.seedParticipant(participantCount);
}

export type PrepareDatabaseOptions = {
  personCount: number;
  userCount: number;
  organizerCount: number;
  timerCount: number;
  organizationCount: number;
  organizationMemberCount: number;
  competitionCount: number;
  competitionTimerCount: number;
  disciplineCount: number;
  participantCount: number;
};
