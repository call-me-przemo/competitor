import { seedDb } from '../../database/seeders';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '..';

suite('Database Service', async () => {
  const prisma = new PrismaClient();
  const dbSvc = new DatabaseService();

  beforeEach(async () => {
    await prisma.$transaction([
      prisma.participant.deleteMany(),
      prisma.competition.deleteMany(),
      prisma.user.deleteMany(),
    ]);
    await seedDb();
  });

  test('should return paginated list of competitions', async () => {
    const listOne = await dbSvc.getCompetitionsList(6, 0);
    const listTwo = await dbSvc.getCompetitionsList(5, 5);

    expect(listOne.competitions).toHaveLength(6);
    expect(listOne.skip).toBe(0);
    expect(listOne.totalCount).toBe(105);

    expect(listTwo.competitions).toHaveLength(5);
    expect(listTwo.skip).toBe(5);
    expect(listTwo.totalCount).toBe(105);

    expect(listOne.competitions.at(-1)).toStrictEqual(listTwo.competitions[0]);
  });
});
