import { PrismaClient } from "@prisma/client";
import { seedPerson } from "./person";
import { seedUser } from "./user";
import { seedOrganization } from "./organization";
import { seedOrganizationMember } from "./organization-member";
import { seedCompetition } from "./competition";
import { seedCompetitionTimer } from "./competition-timer";
import { seedDiscipline } from "./discipline";
import { seedParticipant } from "./participant";

(async () => {
  const prisma = new PrismaClient();
  const personCount = 10_000;
  const userCount = 3_000;
  const organizationCount = 120;
  const organizationMembersCount = 400;
  const competitionCount = 500;
  const timersCount = 14;
  const competitionTimersCount = 1_200;
  const disciplineCount = 1_800;
  const participantCount = 200_000;

  const personIds = await seedPerson({ count: personCount, prisma });
  const userIds = await seedUser({
    count: userCount,
    organizationMembersCount,
    timersCount,
    personIds,
    prisma,
  });
  const organizationIds = await seedOrganization({
    count: organizationCount,
    prisma,
  });
  await seedOrganizationMember({
    count: organizationMembersCount,
    organizationIds,
    userIds,
    prisma,
  });
  const competitionIds = await seedCompetition({
    count: competitionCount,
    organizationIds,
    prisma,
  });
  await seedCompetitionTimer({
    count: competitionTimersCount,
    userIds: userIds.slice(
      organizationMembersCount,
      organizationMembersCount + timersCount,
    ),
    competitionIds,
    prisma,
  });
  const disciplineIds = await seedDiscipline({
    count: disciplineCount,
    competitionIds,
    prisma,
  });
  await seedParticipant({
    count: participantCount,
    personIds: personIds,
    disciplineIds,
    prisma,
  });

  await prisma.$disconnect();
})();
