import { RouteHandler } from "fastify";
import { ControllerListQuerystring, ControllerListReply } from "../types";
import { CompetitionsDatabaseService } from "../services";
import { Controller } from "./base.controller";

export class CompetitionsController extends Controller {
  constructor(protected databaseService: CompetitionsDatabaseService) {
    super(databaseService);
  }

  list: RouteHandler<{
    Querystring: ControllerListQuerystring;
    Reply: ControllerListReply;
  }> = async (req, rep) => {
    const { count, skip, includeHidden, includeInactive } = req.query;

    return this.databaseService.getCompetitionsList(
      count,
      skip,
      includeHidden,
      includeInactive,
    );
  };
}
