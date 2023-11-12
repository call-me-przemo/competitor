import { expect } from "vitest";
import { CompetitionsDatabaseService } from "../../src/services/database/competitions.service";

const params = [
  {
    count: 5,
    skip: 0,
  },
  {
    count: 10,
    skip: 4,
  },
  {
    count: 40,
    skip: 13,
  },
];

export async function assertPagination(
  service: CompetitionsDatabaseService,
  count: number,
  includeHidden = false,
  includeInactive = false,
) {
  const listOne = await service.getCompetitionsList(
    params[0].count,
    params[0].skip,
    includeHidden,
    includeInactive,
  );
  const listTwo = await service.getCompetitionsList(
    params[1].count,
    params[1].skip,
    includeHidden,
    includeInactive,
  );
  const listThree = await service.getCompetitionsList(
    params[2].count,
    params[2].skip,
    includeHidden,
    includeInactive,
  );

  expect(listOne.totalCount).toBe(count);
  expect(listOne.competitions.length).toBe(params[0].count);
  expect(listOne.skip).toBe(params[0].skip);
  expect(listOne.competitions.at(-1)).toStrictEqual(listTwo.competitions[0]);

  expect(listTwo.totalCount).toBe(count);
  expect(listTwo.competitions.length).toBe(params[1].count);
  expect(listTwo.skip).toBe(params[1].skip);
  expect(listTwo.competitions.at(-1)).toStrictEqual(listThree.competitions[0]);

  expect(listThree.totalCount).toBe(count);
  expect(listThree.competitions.length).toBe(count - params[2].skip);
  expect(listThree.skip).toBe(params[2].skip);
}
