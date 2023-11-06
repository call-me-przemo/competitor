import { Type } from "@sinclair/typebox";

export const competitionsSchema = {
  list: {
    schema: {
      tags: ["competitions"],
      description: "returns list of competitions",
      querystring: Type.Object(
        {
          count: Type.Integer({ minimum: 0 }),
          skip: Type.Integer({ minimum: 0 }),
          includeHidden: Type.Optional(Type.Boolean()),
          includeInactive: Type.Optional(Type.Boolean()),
        },
        { additionalProperties: false },
      ),
      response: {
        200: Type.Object({
          competitions: Type.Array(
            Type.Object({
              id: Type.String(),
              name: Type.String(),
              place: Type.String(),
              dateFrom: Type.String({ format: "date" }),
              dateTo: Type.Optional(Type.String({ format: "date" })),
            }),
          ),
          totalCount: Type.Integer(),
          count: Type.Integer({ minimum: 0 }),
          skip: Type.Integer({ minimum: 0 }),
          includeHidden: Type.Boolean(),
          includeInactive: Type.Boolean(),
        }),
      },
    },
  },
};
