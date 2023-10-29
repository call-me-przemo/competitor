import { schema } from "./schema";
import { Static } from "@sinclair/typebox";

// Controller types
export type ControllerListQuerystring = Static<
  typeof schema.list.schema.querystring
>;
export type ControllerListReply = Static<
  (typeof schema.list.schema.response)["200"]
>;

// Service types
export type CompetitionList = ControllerListReply;
