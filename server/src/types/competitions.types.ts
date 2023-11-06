import { competitionsSchema } from "../schemas";
import { Static } from "@sinclair/typebox";

// Controller types
export type ControllerListQuerystring = Static<
  typeof competitionsSchema.list.schema.querystring
>;
export type ControllerListReply = Static<
  (typeof competitionsSchema.list.schema.response)["200"]
>;

// Service types
export type CompetitionList = ControllerListReply;
