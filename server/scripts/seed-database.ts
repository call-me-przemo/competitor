import { PrismaClient } from "@prisma/client";
import { Seeder } from "../prisma/seeder";

(async () => {
  const seeder = new Seeder(new PrismaClient());
  await seeder.seedPerson(6_000);
  await seeder.seedUser(4_000, 45, 8);
  await seeder.seedOrganization(22);
  await seeder.seedOrganizationMember(4);
  await seeder.seedCompetition(120);
  await seeder.seedCompetitionTimer(3);
  await seeder.seedDiscipline(4);
  await seeder.seedParticipant(70);
})();
