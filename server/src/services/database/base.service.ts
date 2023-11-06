import { PrismaClient } from "@prisma/client";

export abstract class DatabaseService {
  constructor(protected prisma: PrismaClient) {}
}
