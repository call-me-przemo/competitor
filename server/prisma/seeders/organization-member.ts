import { PrismaClient, OrganizationMember } from "@prisma/client";

export async function seedOrganizationMember({
  count,
  organizationIds,
  userIds,
  prisma,
}: Params) {
  const members = new Array<OrganizationMember>(count);

  for (let i = 0, userIdsIndex = 0, organizationIdsIndex = 0; i < count; i++) {
    if (organizationIdsIndex >= organizationIds.length) {
      organizationIdsIndex = 0;
    }

    if (userIdsIndex >= userIds.length) {
      userIdsIndex = 0;
    }

    members[i] = {
      organizationId: organizationIds[organizationIdsIndex++],
      userId: userIds[userIdsIndex++],
    };
  }

  await prisma.organizationMember.createMany({
    data: members,
  });
}

type Params = {
  count: number;
  organizationIds: string[];
  userIds: string[];
  prisma: PrismaClient;
};
