import { Static, Type } from '@sinclair/typebox';

export const competitionsSchema = {
  list: {
    schema: {
      tags: ['competitions'],
      description: 'returns list of competitions',
      querystring: Type.Object(
        {
          count: Type.Integer({ minimum: 0 }),
          skip: Type.Integer({ minimum: 0 }),
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
              dateTs: Type.Number(),
              posterExtension: Type.Optional(Type.String()),
            }),
          ),
          totalCount: Type.Integer(),
          skip: Type.Integer({ minimum: 0 }),
        }),
      },
    },
  },
};

export type CompetitionsListQuerystring = Static<
  typeof competitionsSchema.list.schema.querystring
>;
export type CompetitionsListReply = Static<
  (typeof competitionsSchema.list.schema.response)['200']
>;
