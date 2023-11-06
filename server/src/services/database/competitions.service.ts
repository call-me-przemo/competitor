import { PrismaClient, Prisma } from "@prisma/client";
import { CompetitionList } from "../../types/competitions.types";
import { DatabaseService } from "./base.service";

export class CompetitionsDatabaseService extends DatabaseService {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async getCompetitionsList(
    count: number,
    skip: number,
    includeHidden: boolean = false,
    includeInactive: boolean = false,
  ): Promise<CompetitionList> {
    const where: Prisma.CompetitionWhereInput = {
      hidden: includeHidden ? undefined : false,
      active: includeInactive ? undefined : true,
    };

    const [competitionsEntity, totalCount] = await Promise.all([
      this.prisma.competition.findMany({
        skip,
        take: count,
        orderBy: { dateFrom: "asc" },
        select: {
          id: true,
          name: true,
          place: true,
          dateFrom: true,
          dateTo: true,
        },
        where,
      }),
      this.prisma.competition.count({ where }),
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

    return {
      competitions,
      count: competitions.length,
      skip,
      totalCount,
      includeHidden,
      includeInactive,
    };
  }
}
