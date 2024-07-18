import { CompetitionsController } from '..';
import { DatabaseService } from '../../services';

suite('Competitions Controller', () => {
  const dbSvcMock = {
    getCompetitionsList: vi.fn(),
  } as unknown as DatabaseService;

  const controller = new CompetitionsController(dbSvcMock);

  test('should call getCompetitionsList service method', async () => {
    const req = {
      query: {
        count: 10,
        skip: 5,
        dateFromTs: 0,
      },
    };

    await (controller as any).list(req, {});

    expect(dbSvcMock.getCompetitionsList).toHaveBeenCalledWith(
      req.query.count,
      req.query.skip,
      req.query.dateFromTs,
    );
  });
});
