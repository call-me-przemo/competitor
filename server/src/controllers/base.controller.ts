import { DatabaseService } from "../services/database/base.service";

export abstract class Controller {
  constructor(protected databaseService: DatabaseService) {}
}
