import { describe, expect, it, beforeAll } from "vitest";
import { app } from "../../src/app";
import { fastify } from "fastify";
import {
  prepareDatabase,
  PrepareDatabaseOptions,
} from "../helpers/prepare-database";
import { PrismaClient } from "@prisma/client";

describe("/competitions route", () => {
  const server = fastify();
  server.register(app);

  const prisma = new PrismaClient();
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

  describe("GET /competitions", () => {
    it("should return 400 error status code", async () => {
      const res = await server.inject().get("/competitions");

      expect(res.statusCode).toBe(400);
    });

    it("should return 200 success status code along with competitions list", async () => {
      const res = await server
        .inject()
        .get(
          "/competitions?count=10&skip=0&includeHidden=true&includeInactive=true",
        );
      const body = JSON.parse(res.body);

      expect(res.statusCode).toBe(200);
      expect(body.skip).toBe(0);
      expect(body.competitions.length).toBe(10);
      expect(body.totalCount).toBe(50);

      for (const competition of body.competitions) {
        expect(competition.id).toBeDefined();
        expect(competition.name).toBeDefined();
        expect(competition.place).toBeDefined();
        expect(competition.dateFrom).toBeDefined();
      }
    });
  });
});
