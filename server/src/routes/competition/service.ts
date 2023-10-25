import { PrismaClient } from "@prisma/client";
import { CompetitionList } from "./types";

export class Service {
  constructor(private prisma: PrismaClient) {}

  async getCompetitionList(
    limit: number,
    offset: number,
    hidden: boolean = false,
  ): Promise<CompetitionList> {
    const competitions = (
      await this.prisma.competition.findMany({
        skip: offset,
        take: limit,
        where: { hidden },
        orderBy: { dateFrom: "asc" },
        select: {
          id: true,
          name: true,
          place: true,
          dateFrom: true,
          dateTo: true,
        },
      })
    ).map(({ id, name, place, dateFrom, dateTo }) => ({
      id,
      name,
      place,
      dateFrom: dateFrom.toString(),
      dateTo: dateTo?.toString(),
    }));

    const totalCount = await this.prisma.competition.count({
      where: { hidden },
    });

    return { competitions, limit, offset, totalCount };
  }
}
