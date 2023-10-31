import { PrismaClient, Prisma } from "@prisma/client";
import { CompetitionList } from "./types";

export class Service {
  constructor(private prisma: PrismaClient) {}

  async getCompetitionsList(
    limit: number,
    offset: number,
    includeHidden: boolean = false,
  ): Promise<CompetitionList> {
    const findManyQueryOptions: Prisma.CompetitionFindManyArgs = {
      skip: offset,
      take: limit,
      orderBy: { dateFrom: "asc" },
      select: {
        id: true,
        name: true,
        place: true,
        dateFrom: true,
        dateTo: true,
      },
    };

    if (!includeHidden) {
      findManyQueryOptions.where = { hidden: false };
    }

    const countQueryOptions: Prisma.CompetitionCountArgs = {};

    if (!includeHidden) {
      countQueryOptions.where = { hidden: false };
    }

    const [competitionsEntity, totalCount] = await Promise.all([
      this.prisma.competition.findMany(findManyQueryOptions),
      this.prisma.competition.count(countQueryOptions),
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

    return { competitions, limit, offset, totalCount, includeHidden };
  }
}
