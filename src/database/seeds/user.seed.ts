import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { User } from "../../entity/User";

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(5);
  }
}
