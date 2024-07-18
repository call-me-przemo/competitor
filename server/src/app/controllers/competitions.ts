import { DatabaseService } from '../services';
import { RouteHandler } from 'fastify';
import { CompetitionsListQuerystring, CompetitionsListReply } from '../schemas';

export class CompetitionsController {
  constructor(private dbSvc: DatabaseService) {}

  list: RouteHandler<{
    Querystring: CompetitionsListQuerystring;
    Reply: CompetitionsListReply;
  }> = async (req, rep) => {
    const { count, skip, dateFromTs } = req.query;

    return this.dbSvc.getCompetitionsList(count, skip, dateFromTs);
  };
}
