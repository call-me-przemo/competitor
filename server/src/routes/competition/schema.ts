import { Type } from "@sinclair/typebox";

export const schema = {
  list: {
    schema: {
      tags: ["competitions"],
      description: "returns list of competitions",
      querystring: Type.Object(
        {
          limit: Type.Number(),
          offset: Type.Number(),
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
          totalCount: Type.Number(),
          limit: Type.Number(),
          offset: Type.Number(),
        }),
      },
    },
  },
};
