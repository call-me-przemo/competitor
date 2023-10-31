import { Type } from "@sinclair/typebox";

export const schema = {
  list: {
    schema: {
      tags: ["competitions"],
      description: "returns list of competitions",
      querystring: Type.Object(
        {
          limit: Type.Integer({ minimum: 0 }),
          offset: Type.Integer({ minimum: 0 }),
          includeHidden: Type.Optional(Type.Boolean()),
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
          limit: Type.Integer(),
          offset: Type.Integer(),
          includeHidden: Type.Boolean(),
        }),
      },
    },
  },
};
