import { PrismaClient } from "@prisma/client";
import { CompetitionList } from "./types";

export class Service {
  constructor(private prisma: PrismaClient) {}

  async getCompetitionList(
    limit: number,
    offset: number,
    hidden: boolean = false,
  ): Promise<CompetitionList> {
    const [competitionsEntity, totalCount] = await this.prisma.$transaction([
      this.prisma.competition.findMany({
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
      }),
      this.prisma.competition.count({
        where: { hidden },
      }),
    ]);

    const competitions = competitionsEntity.map(
      ({ id, name, place, dateFrom, dateTo }) => ({
        id,
        name,
        place,
        dateFrom: dateFrom.toString(),
        dateTo: dateTo?.toString(),
      }),
    );

    return { competitions, limit, offset, totalCount };
  }
}
