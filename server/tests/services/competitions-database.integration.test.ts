import { beforeAll, describe, expect, it } from "vitest";
import { PrismaClient } from "@prisma/client";
import {
  PrepareDatabaseOptions,
  prepareDatabase,
  assertPagination,
} from "../helpers";
import { CompetitionsDatabaseService } from "../../src/services";

describe("CompetitionsDatabaseService", () => {
  const prisma = new PrismaClient();
  const service = new CompetitionsDatabaseService(prisma);
  const data: PrepareDatabaseOptions = {
    personCount: 1_000,
    userCount: 700,
    organizerCount: 23,
    timerCount: 6,
    organizationCount: 12,
    organizationMemberCount: 3,
    competitionCount: 50,
    competitionTimerCount: 2,
    disciplineCount: 3,
    participantCount: 44,
  };

  beforeAll(async () => {
    await prepareDatabase(prisma, data);
  });

  describe("getCompetitionsList", () => {
    it("should return empty list of competitions", async () => {
      const list = await service.getCompetitionsList(10, 50, true, true);

      expect(list.competitions.length).toBe(0);
    });

    it("should return paginated lists of active and visible competitions", async () => {
      const count = await prisma.competition.count({
        where: { active: true, visible: true },
      });

      await assertPagination(service, count);
    });

    it("should return paginated lists of active, inactive and visible competitions", async () => {
      const count = await prisma.competition.count({
        where: { visible: true },
      });

      await assertPagination(service, count, false, true);
    });

    it("should return paginated lists of active, visible and hidden competitions", async () => {
      const count = await prisma.competition.count({
        where: { active: true },
      });

      await assertPagination(service, count, true);
    });

    it("should return paginated lists of active, inactive, visible and hidden competitions", async () => {
      await assertPagination(service, data.competitionCount, true, true);
    });
  });
});
