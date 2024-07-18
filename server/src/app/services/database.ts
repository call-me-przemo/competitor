import { PrismaClient } from '@prisma/client';
import { CompetitionsListReply } from '../schemas';

export class DatabaseService {
  prisma = new PrismaClient();

  getCompetitionsList = async (
    count: number,
    skip: number,
    dateFromTs?: number,
  ): Promise<CompetitionsListReply> => {
    const [competitionsEntity, totalCount] = await Promise.all([
      this.prisma.competition.findMany({
        skip,
        take: count,
        orderBy: [{ date: 'asc' }, { name: 'asc' }, { place: 'asc' }],
        select: {
          id: true,
          name: true,
          place: true,
          date: true,
          posterExtension: true,
        },
        where: {
          date: {
            gt: dateFromTs == null ? new Date() : new Date(dateFromTs),
          },
        },
      }),
      this.prisma.competition.count({
        where: {
          date: {
            gt: dateFromTs == null ? new Date() : new Date(dateFromTs),
          },
        },
      }),
    ]);

    const competitions = competitionsEntity.map((competition) => ({
      ...competition,
      dateTs: competition.date.getTime(),
    }));

    return {
      competitions,
      skip,
      totalCount,
    };
  };
}
