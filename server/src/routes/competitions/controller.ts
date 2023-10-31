import { RouteHandler } from "fastify";
import { ControllerListQuerystring, ControllerListReply } from "./types";
import { Service } from "./service";

export class Controller {
  constructor(private service: Service) {}

  list: RouteHandler<{
    Querystring: ControllerListQuerystring;
    Reply: ControllerListReply;
  }> = async (req, rep) => {
    const { limit, offset, includeHidden } = req.query;

    return this.service.getCompetitionsList(limit, offset, includeHidden);
  };
}
