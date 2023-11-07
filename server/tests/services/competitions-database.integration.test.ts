import { describe, expect, it } from "vitest";
import { prisma } from "../helpers/prisma";

describe("CompetitionsDatabaseService", () => {
  it("should pass - sample", async () => {
    const res = await prisma.$queryRaw`select 1`;

    expect(res).toBe(1);
    expect(2).toBe(2);
  });
});
